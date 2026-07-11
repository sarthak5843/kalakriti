package com.kalakriti.repository;

import com.kalakriti.model.Enrollment;
import com.kalakriti.model.Enrollment.EnrollmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByUserId(Long userId);
    List<Enrollment> findByStatus(EnrollmentStatus status);
    boolean existsByUserIdAndCourseId(Long userId, Long courseId);
    boolean existsByUserIdAndCourseIdAndStatusIn(Long userId, Long courseId, List<EnrollmentStatus> statuses);
}
