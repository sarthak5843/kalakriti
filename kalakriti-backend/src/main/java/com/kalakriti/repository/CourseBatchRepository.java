package com.kalakriti.repository;

import com.kalakriti.model.CourseBatch;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CourseBatchRepository extends JpaRepository<CourseBatch, Long> {
    List<CourseBatch> findByCourseIdAndActiveTrue(Long courseId);
}
