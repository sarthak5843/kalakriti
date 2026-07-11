package com.kalakriti.repository;

import com.kalakriti.model.GalleryCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryCategoryRepository extends JpaRepository<GalleryCategory, Long> {
}
