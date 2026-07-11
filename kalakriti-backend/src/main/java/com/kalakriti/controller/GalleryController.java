package com.kalakriti.controller;

import com.kalakriti.model.GalleryCategory;
import com.kalakriti.model.GalleryImage;
import com.kalakriti.service.GalleryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {

    private final GalleryService galleryService;

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<GalleryCategory>> getCategories() {
        return ResponseEntity.ok(galleryService.getAllCategories());
    }

    @GetMapping
    public ResponseEntity<List<GalleryImage>> getAllImages() {
        return ResponseEntity.ok(galleryService.getAllImages());
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<GalleryImage>> getByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(galleryService.getImagesByCategory(categoryId));
    }
}
