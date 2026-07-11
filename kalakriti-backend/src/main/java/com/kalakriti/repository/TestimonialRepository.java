package com.kalakriti.repository;

import com.kalakriti.model.Testimonial;
import com.kalakriti.model.Testimonial.TestimonialStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {
    List<Testimonial> findByStatus(TestimonialStatus status);
}
