package com.kalakriti.controller;

import com.kalakriti.dto.CourseDTO;
import com.kalakriti.model.CourseBatch;
import com.kalakriti.model.Course;
import com.kalakriti.model.Enrollment;
import com.kalakriti.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public ResponseEntity<List<Course>> getActiveCourses() {
        return ResponseEntity.ok(courseService.getAllActiveCourses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourse(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    @GetMapping("/{id}/batches")
    public ResponseEntity<List<CourseBatch>> getBatches(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getBatchesByCourse(id));
    }

    @PostMapping("/enroll")
    public ResponseEntity<Enrollment> enroll(@RequestBody CourseDTO.EnrollRequest request) {
        return ResponseEntity.ok(courseService.enrollStudent(request));
    }

    @GetMapping("/my-enrollments")
    public ResponseEntity<List<Enrollment>> myEnrollments() {
        return ResponseEntity.ok(courseService.getMyEnrollments());
    }
}
