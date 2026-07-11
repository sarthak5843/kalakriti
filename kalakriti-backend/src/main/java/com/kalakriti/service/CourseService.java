package com.kalakriti.service;

import com.kalakriti.dto.CourseDTO;
import com.kalakriti.exception.BadRequestException;
import com.kalakriti.exception.ResourceNotFoundException;
import com.kalakriti.model.*;
import com.kalakriti.repository.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseBatchRepository batchRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;

    public CourseService(CourseRepository courseRepository, CourseBatchRepository batchRepository,
                         EnrollmentRepository enrollmentRepository, UserRepository userRepository,
                         CloudinaryService cloudinaryService) {
        this.courseRepository = courseRepository;
        this.batchRepository = batchRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public List<Course> getAllActiveCourses() {
        return courseRepository.findByActiveTrue();
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));
    }

    public Course createCourse(CourseDTO.Request request, MultipartFile image) throws IOException {
        Course course = new Course();
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setHighlights(request.getHighlights());
        course.setMode(request.getMode());
        course.setPrice(request.getPrice());
        course.setDurationWeeks(request.getDurationWeeks());
        course.setTotalSeats(request.getTotalSeats());

        if (image != null && !image.isEmpty()) {
            Map result = cloudinaryService.upload(image, "courses");
            course.setImageUrl((String) result.get("secure_url"));
        } else if (request.getImageUrl() != null && !request.getImageUrl().isBlank()) {
            course.setImageUrl(request.getImageUrl());
        }
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, CourseDTO.Request request, MultipartFile image) throws IOException {
        Course course = getCourseById(id);
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setHighlights(request.getHighlights());
        course.setMode(request.getMode());
        course.setPrice(request.getPrice());
        course.setDurationWeeks(request.getDurationWeeks());
        course.setTotalSeats(request.getTotalSeats());

        if (image != null && !image.isEmpty()) {
            Map result = cloudinaryService.upload(image, "courses");
            course.setImageUrl((String) result.get("secure_url"));
        } else if (request.getImageUrl() != null && !request.getImageUrl().isBlank()) {
            course.setImageUrl(request.getImageUrl());
        }
        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        Course course = getCourseById(id);
        course.setActive(false);
        courseRepository.save(course);
    }

    public CourseBatch addBatch(Long courseId, CourseDTO.BatchRequest request) {
        Course course = getCourseById(courseId);
        CourseBatch batch = new CourseBatch();
        batch.setCourse(course);
        batch.setBatchName(request.getBatchName());
        batch.setSchedule(request.getSchedule());
        batch.setTiming(request.getTiming());
        batch.setStartDate(request.getStartDate());
        batch.setAvailableSeats(request.getAvailableSeats());
        return batchRepository.save(batch);
    }

    public List<CourseBatch> getBatchesByCourse(Long courseId) {
        return batchRepository.findByCourseIdAndActiveTrue(courseId);
    }

    public Enrollment enrollStudent(CourseDTO.EnrollRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (enrollmentRepository.existsByUserIdAndCourseIdAndStatusIn(
                user.getId(),
                request.getCourseId(),
                List.of(Enrollment.EnrollmentStatus.PENDING, Enrollment.EnrollmentStatus.APPROVED))) {
            throw new BadRequestException("Already enrolled or requested enrollment for this course");
        }

        Course course = getCourseById(request.getCourseId());
        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollment.setPaymentId(request.getPaymentId());
        enrollment.setPaymentStatus(request.getPaymentId() != null ? "PENDING" : "UNPAID");

        if (request.getBatchId() != null) {
            CourseBatch batch = batchRepository.findById(request.getBatchId())
                    .orElseThrow(() -> new ResourceNotFoundException("Batch not found"));
            enrollment.setBatch(batch);
        }
        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getMyEnrollments() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return enrollmentRepository.findByUserId(user.getId());
    }

    public List<Enrollment> getPendingEnrollments() {
        return enrollmentRepository.findByStatus(Enrollment.EnrollmentStatus.PENDING);
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public Enrollment updateEnrollmentStatus(Long enrollmentId, String status) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found"));
        enrollment.setStatus(Enrollment.EnrollmentStatus.valueOf(status.toUpperCase()));
        if (status.equalsIgnoreCase("APPROVED")) {
            enrollment.setApprovedAt(LocalDateTime.now());
        }
        return enrollmentRepository.save(enrollment);
    }
}
