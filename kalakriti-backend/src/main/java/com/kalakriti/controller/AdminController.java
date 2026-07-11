package com.kalakriti.controller;

import com.kalakriti.dto.CourseDTO;
import com.kalakriti.dto.EventDTO;
import com.kalakriti.dto.GalleryDTO;
import com.kalakriti.model.*;
import com.kalakriti.repository.UserRepository;
import com.kalakriti.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final CourseService courseService;
    private final EventService eventService;
    private final GalleryService galleryService;
    private final TestimonialService testimonialService;
    private final ContactService contactService;
    private final SiteSettingsService settingsService;
    private final UserRepository userRepository;

    public AdminController(CourseService courseService, EventService eventService,
                           GalleryService galleryService, TestimonialService testimonialService,
                           ContactService contactService, SiteSettingsService settingsService,
                           UserRepository userRepository) {
        this.courseService = courseService;
        this.eventService = eventService;
        this.galleryService = galleryService;
        this.testimonialService = testimonialService;
        this.contactService = contactService;
        this.settingsService = settingsService;
        this.userRepository = userRepository;
    }

    // ── STATS ─────────────────────────────────────────────
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalCourses", (long) courseService.getAllCourses().size());
        stats.put("pendingEnrollments", (long) courseService.getPendingEnrollments().size());
        stats.put("totalEnrollments", (long) courseService.getAllEnrollments().size());
        stats.put("totalEvents", (long) eventService.getAllEvents().size());
        stats.put("totalImages", (long) galleryService.getAllImages().size());
        stats.put("pendingTestimonials", (long) testimonialService.getPending().size());
        stats.put("unreadContacts", (long) contactService.getUnread().size());
        stats.put("totalUsers", userRepository.count());
        return ResponseEntity.ok(stats);
    }

    // ── COURSES ──────────────────────────────────────────────
    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @PostMapping("/courses")
    public ResponseEntity<Course> createCourse(@RequestBody CourseDTO.Request request) throws IOException {
        return ResponseEntity.ok(courseService.createCourse(request, null));
    }

    @PutMapping("/courses/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id,
                                               @RequestBody CourseDTO.Request request) throws IOException {
        return ResponseEntity.ok(courseService.updateCourse(id, request, null));
    }

    @DeleteMapping("/courses/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/courses/{id}/batches")
    public ResponseEntity<CourseBatch> addBatch(@PathVariable Long id,
                                                @RequestBody CourseDTO.BatchRequest request) {
        return ResponseEntity.ok(courseService.addBatch(id, request));
    }

    // ── ENROLLMENTS ──────────────────────────────────────────
    @GetMapping("/enrollments/pending")
    public ResponseEntity<List<Enrollment>> getPendingEnrollments() {
        return ResponseEntity.ok(courseService.getPendingEnrollments());
    }

    @GetMapping("/enrollments")
    public ResponseEntity<List<Enrollment>> getAllEnrollments() {
        return ResponseEntity.ok(courseService.getAllEnrollments());
    }

    @PutMapping("/enrollments/{id}/status")
    public ResponseEntity<Enrollment> updateEnrollmentStatus(@PathVariable Long id,
                                                             @RequestParam String status) {
        return ResponseEntity.ok(courseService.updateEnrollmentStatus(id, status));
    }

    // ── EVENTS ───────────────────────────────────────────────
    @GetMapping("/events")
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @PostMapping("/events")
    public ResponseEntity<Event> createEvent(@RequestBody EventDTO.Request request) throws IOException {
        return ResponseEntity.ok(eventService.createEvent(request, null));
    }

    @PutMapping("/events/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id,
                                             @RequestBody EventDTO.Request request) throws IOException {
        return ResponseEntity.ok(eventService.updateEvent(id, request, null));
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/events/bookings")
    public ResponseEntity<List<EventBooking>> getAllEventBookings() {
        return ResponseEntity.ok(eventService.getAllBookings());
    }

    @PutMapping("/events/bookings/{id}/status")
    public ResponseEntity<EventBooking> updateEventBookingStatus(@PathVariable Long id,
                                                                 @RequestParam String status) {
        return ResponseEntity.ok(eventService.updateBookingStatus(id, status));
    }

    // ── GALLERY ──────────────────────────────────────────────
    @PostMapping("/gallery/categories")
    public ResponseEntity<GalleryCategory> createCategory(@RequestBody GalleryDTO.CategoryRequest request) {
        return ResponseEntity.ok(galleryService.createCategory(request));
    }

    @DeleteMapping("/gallery/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        galleryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/gallery/images")
    public ResponseEntity<GalleryImage> uploadImage(@RequestPart("data") GalleryDTO.ImageRequest request,
                                                    @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
        return ResponseEntity.ok(galleryService.uploadImage(request, file));
    }

    @DeleteMapping("/gallery/images/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) throws IOException {
        galleryService.deleteImage(id);
        return ResponseEntity.noContent().build();
    }

    // ── TESTIMONIALS ─────────────────────────────────────────
    @GetMapping("/testimonials")
    public ResponseEntity<List<Testimonial>> getAllTestimonials() {
        return ResponseEntity.ok(testimonialService.getAll());
    }

    @PutMapping("/testimonials/{id}/status")
    public ResponseEntity<Testimonial> updateTestimonialStatus(@PathVariable Long id,
                                                               @RequestParam String status) {
        return ResponseEntity.ok(testimonialService.updateStatus(id, status));
    }

    @DeleteMapping("/testimonials/{id}")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable Long id) {
        testimonialService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ── CONTACTS ─────────────────────────────────────────────
    @GetMapping("/contacts")
    public ResponseEntity<?> getAllContacts() {
        return ResponseEntity.ok(contactService.getAll());
    }

    @PutMapping("/contacts/{id}/read")
    public ResponseEntity<?> markRead(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.markAsRead(id));
    }

    // ── USERS ────────────────────────────────────────────────
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // ── SITE SETTINGS ────────────────────────────────────────
    @PutMapping("/settings")
    public ResponseEntity<SiteSettings> updateSettings(@RequestBody SiteSettings settings) {
        return ResponseEntity.ok(settingsService.updateSettings(settings));
    }

    @PostMapping("/settings/logo")
    public ResponseEntity<SiteSettings> uploadLogo(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(settingsService.uploadLogo(file));
    }

    @PostMapping("/settings/qrcode")
    public ResponseEntity<SiteSettings> uploadQrCode(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(settingsService.uploadQrCode(file));
    }
}
