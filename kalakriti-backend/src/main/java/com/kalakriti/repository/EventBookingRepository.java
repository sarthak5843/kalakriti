package com.kalakriti.repository;

import com.kalakriti.model.EventBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventBookingRepository extends JpaRepository<EventBooking, Long> {
    List<EventBooking> findByUserId(Long userId);
    boolean existsByUserIdAndEventId(Long userId, Long eventId);
    boolean existsByUserIdAndEventIdAndStatusIn(Long userId, Long eventId, List<EventBooking.BookingStatus> statuses);
    List<EventBooking> findByStatus(EventBooking.BookingStatus status);
}
