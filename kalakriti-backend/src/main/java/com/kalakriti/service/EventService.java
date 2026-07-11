package com.kalakriti.service;

import com.kalakriti.dto.EventDTO;
import com.kalakriti.exception.BadRequestException;
import com.kalakriti.exception.ResourceNotFoundException;
import com.kalakriti.model.*;
import com.kalakriti.repository.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventBookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;

    public EventService(EventRepository eventRepository, EventBookingRepository bookingRepository,
                        UserRepository userRepository, CloudinaryService cloudinaryService) {
        this.eventRepository = eventRepository;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public List<Event> getAllActiveEvents() {
        return eventRepository.findByActiveTrueOrderByEventDateAsc();
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));
    }

    public Event createEvent(EventDTO.Request request, MultipartFile image) throws IOException {
        Event event = new Event();
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setEventDate(request.getEventDate());
        event.setVenue(request.getVenue());
        event.setPaid(request.isPaid());
        event.setPrice(request.getPrice());
        event.setTotalSeats(request.getTotalSeats());
        event.setAvailableSeats(request.getTotalSeats());

        if (image != null && !image.isEmpty()) {
            Map result = cloudinaryService.upload(image, "events");
            event.setImageUrl((String) result.get("secure_url"));
        }
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, EventDTO.Request request, MultipartFile image) throws IOException {
        Event event = getEventById(id);
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setEventDate(request.getEventDate());
        event.setVenue(request.getVenue());
        event.setPaid(request.isPaid());
        event.setPrice(request.getPrice());
        event.setTotalSeats(request.getTotalSeats());

        if (image != null && !image.isEmpty()) {
            Map result = cloudinaryService.upload(image, "events");
            event.setImageUrl((String) result.get("secure_url"));
        }
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        Event event = getEventById(id);
        event.setActive(false);
        eventRepository.save(event);
    }

    public EventBooking bookEvent(Long eventId, String paymentId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (bookingRepository.existsByUserIdAndEventIdAndStatusIn(
                user.getId(),
                eventId,
                List.of(EventBooking.BookingStatus.PENDING, EventBooking.BookingStatus.CONFIRMED))) {
            throw new BadRequestException("Already registered or requested registration for this event");
        }

        Event event = getEventById(eventId);
        if (event.getAvailableSeats() != null && event.getAvailableSeats() <= 0) {
            throw new BadRequestException("No seats available");
        }

        EventBooking booking = new EventBooking();
        booking.setUser(user);
        booking.setEvent(event);
        booking.setPaymentId(paymentId);
        booking.setPaymentStatus(paymentId != null ? "PENDING" : "UNPAID");
        booking.setStatus(EventBooking.BookingStatus.PENDING);

        return bookingRepository.save(booking);
    }

    public List<EventBooking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public EventBooking updateBookingStatus(Long bookingId, String status) {
        EventBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        EventBooking.BookingStatus newStatus = EventBooking.BookingStatus.valueOf(status.toUpperCase());
        
        // Deduct seats *only* when changing status to CONFIRMED
        if (newStatus == EventBooking.BookingStatus.CONFIRMED && booking.getStatus() != EventBooking.BookingStatus.CONFIRMED) {
            Event event = booking.getEvent();
            if (event.getAvailableSeats() != null) {
                if (event.getAvailableSeats() <= 0) {
                    throw new BadRequestException("No seats available for this event");
                }
                event.setAvailableSeats(event.getAvailableSeats() - 1);
                eventRepository.save(event);
            }
        }
        
        // Revert seats if previous status was CONFIRMED and new status is cancelled/rejected
        if (booking.getStatus() == EventBooking.BookingStatus.CONFIRMED && 
            (newStatus == EventBooking.BookingStatus.CANCELLED || newStatus == EventBooking.BookingStatus.REJECTED)) {
            Event event = booking.getEvent();
            if (event.getAvailableSeats() != null) {
                event.setAvailableSeats(event.getAvailableSeats() + 1);
                eventRepository.save(event);
            }
        }

        booking.setStatus(newStatus);
        if (newStatus == EventBooking.BookingStatus.CONFIRMED) {
            booking.setPaymentStatus("PAID");
        } else if (newStatus == EventBooking.BookingStatus.REJECTED) {
            booking.setPaymentStatus("REJECTED");
        }
        
        return bookingRepository.save(booking);
    }

    public List<EventBooking> getMyBookings() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return bookingRepository.findByUserId(user.getId());
    }
}
