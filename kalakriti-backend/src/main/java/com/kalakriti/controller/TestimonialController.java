package com.kalakriti.controller;

import com.kalakriti.dto.TestimonialDTO;
import com.kalakriti.model.Testimonial;
import com.kalakriti.service.TestimonialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

    private final TestimonialService testimonialService;

    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @PostMapping
    public ResponseEntity<Testimonial> submit(@RequestBody TestimonialDTO.Request request) {
        return ResponseEntity.ok(testimonialService.submit(request));
    }

    @GetMapping("/approved")
    public ResponseEntity<List<Testimonial>> getApproved() {
        return ResponseEntity.ok(testimonialService.getApproved());
    }
}
