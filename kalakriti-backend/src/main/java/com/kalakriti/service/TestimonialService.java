package com.kalakriti.service;

import com.kalakriti.dto.TestimonialDTO;
import com.kalakriti.exception.ResourceNotFoundException;
import com.kalakriti.model.Testimonial;
import com.kalakriti.model.User;
import com.kalakriti.repository.TestimonialRepository;
import com.kalakriti.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;
    private final UserRepository userRepository;

    public TestimonialService(TestimonialRepository testimonialRepository, UserRepository userRepository) {
        this.testimonialRepository = testimonialRepository;
        this.userRepository = userRepository;
    }

    public Testimonial submit(TestimonialDTO.Request request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElse(null);

        Testimonial testimonial = new Testimonial();
        if (user != null) {
            testimonial.setStudentName(user.getFullName());
        } else {
            testimonial.setStudentName(request.getStudentName() != null ? request.getStudentName() : "Anonymous Student");
        }
        testimonial.setMessage(request.getMessage());
        testimonial.setRating(request.getRating());
        testimonial.setCourseName(request.getCourseName());
        return testimonialRepository.save(testimonial);
    }

    public List<Testimonial> getApproved() {
        return testimonialRepository.findByStatus(Testimonial.TestimonialStatus.APPROVED);
    }

    public List<Testimonial> getPending() {
        return testimonialRepository.findByStatus(Testimonial.TestimonialStatus.PENDING);
    }

    public List<Testimonial> getAll() {
        return testimonialRepository.findAll();
    }

    public Testimonial updateStatus(Long id, String status) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found"));
        testimonial.setStatus(Testimonial.TestimonialStatus.valueOf(status.toUpperCase()));
        if (status.equalsIgnoreCase("APPROVED")) {
            testimonial.setApprovedAt(LocalDateTime.now());
        }
        return testimonialRepository.save(testimonial);
    }

    public void delete(Long id) {
        testimonialRepository.deleteById(id);
    }
}
