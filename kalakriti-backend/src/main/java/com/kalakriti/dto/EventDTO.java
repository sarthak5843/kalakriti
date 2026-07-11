package com.kalakriti.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class EventDTO {

    public static class Request {
        private String title;
        private String description;
        private LocalDateTime eventDate;
        private String venue;
        private boolean isPaid;
        private BigDecimal price;
        private Integer totalSeats;
        private Integer availableSeats;
        private String imageUrl;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public LocalDateTime getEventDate() { return eventDate; }
        public void setEventDate(LocalDateTime eventDate) { this.eventDate = eventDate; }
        public String getVenue() { return venue; }
        public void setVenue(String venue) { this.venue = venue; }
        public boolean isPaid() { return isPaid; }
        public void setPaid(boolean paid) { isPaid = paid; }
        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal price) { this.price = price; }
        public Integer getTotalSeats() { return totalSeats; }
        public void setTotalSeats(Integer totalSeats) { this.totalSeats = totalSeats; }
        public Integer getAvailableSeats() { return availableSeats; }
        public void setAvailableSeats(Integer availableSeats) { this.availableSeats = availableSeats; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    }
}
