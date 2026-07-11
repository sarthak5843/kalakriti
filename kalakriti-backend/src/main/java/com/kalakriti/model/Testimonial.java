package com.kalakriti.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "testimonials")
public class Testimonial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String studentName;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    private Integer rating;
    private String courseName;
    private String photoUrl;

    @Enumerated(EnumType.STRING)
    private TestimonialStatus status = TestimonialStatus.PENDING;

    @Column(updatable = false)
    private LocalDateTime submittedAt = LocalDateTime.now();

    private LocalDateTime approvedAt;

    public enum TestimonialStatus { PENDING, APPROVED, REJECTED }

    public Long getId() { return id; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
    public TestimonialStatus getStatus() { return status; }
    public void setStatus(TestimonialStatus status) { this.status = status; }
    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public LocalDateTime getApprovedAt() { return approvedAt; }
    public void setApprovedAt(LocalDateTime approvedAt) { this.approvedAt = approvedAt; }
}
