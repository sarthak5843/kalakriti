package com.kalakriti.controller;

import com.kalakriti.model.Event;
import com.kalakriti.model.EventBooking;
import com.kalakriti.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<Event>> getActiveEvents() {
        return ResponseEntity.ok(eventService.getAllActiveEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEvent(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @PostMapping("/{id}/book")
    public ResponseEntity<EventBooking> bookEvent(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.bookEvent(id));
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<List<EventBooking>> myBookings() {
        return ResponseEntity.ok(eventService.getMyBookings());
    }
}
