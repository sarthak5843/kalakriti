package com.kalakriti.dto;

import com.kalakriti.model.Course.CourseMode;
import java.math.BigDecimal;
import java.util.List;

public class CourseDTO {

    public static class Request {
        private String title;
        private String description;
        private String highlights;
        private CourseMode mode;
        private BigDecimal price;
        private Integer durationWeeks;
        private Integer totalSeats;
        private String imageUrl;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getHighlights() { return highlights; }
        public void setHighlights(String highlights) { this.highlights = highlights; }
        public CourseMode getMode() { return mode; }
        public void setMode(CourseMode mode) { this.mode = mode; }
        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal price) { this.price = price; }
        public Integer getDurationWeeks() { return durationWeeks; }
        public void setDurationWeeks(Integer durationWeeks) { this.durationWeeks = durationWeeks; }
        public Integer getTotalSeats() { return totalSeats; }
        public void setTotalSeats(Integer totalSeats) { this.totalSeats = totalSeats; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    }

    public static class BatchRequest {
        private String batchName;
        private String schedule;
        private String timing;
        private String startDate;
        private Integer availableSeats;

        public String getBatchName() { return batchName; }
        public void setBatchName(String batchName) { this.batchName = batchName; }
        public String getSchedule() { return schedule; }
        public void setSchedule(String schedule) { this.schedule = schedule; }
        public String getTiming() { return timing; }
        public void setTiming(String timing) { this.timing = timing; }
        public String getStartDate() { return startDate; }
        public void setStartDate(String startDate) { this.startDate = startDate; }
        public Integer getAvailableSeats() { return availableSeats; }
        public void setAvailableSeats(Integer availableSeats) { this.availableSeats = availableSeats; }
    }

    public static class EnrollRequest {
        private Long courseId;
        private Long batchId;
        private String paymentId;

        public Long getCourseId() { return courseId; }
        public void setCourseId(Long courseId) { this.courseId = courseId; }
        public Long getBatchId() { return batchId; }
        public void setBatchId(Long batchId) { this.batchId = batchId; }
        public String getPaymentId() { return paymentId; }
        public void setPaymentId(String paymentId) { this.paymentId = paymentId; }
    }
}
