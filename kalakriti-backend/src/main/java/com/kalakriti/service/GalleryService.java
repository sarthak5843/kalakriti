package com.kalakriti.service;

import com.kalakriti.dto.GalleryDTO;
import com.kalakriti.exception.ResourceNotFoundException;
import com.kalakriti.model.GalleryCategory;
import com.kalakriti.model.GalleryImage;
import com.kalakriti.repository.GalleryCategoryRepository;
import com.kalakriti.repository.GalleryImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class GalleryService {

    private final GalleryImageRepository imageRepository;
    private final GalleryCategoryRepository categoryRepository;
    private final CloudinaryService cloudinaryService;

    public GalleryService(GalleryImageRepository imageRepository,
                          GalleryCategoryRepository categoryRepository,
                          CloudinaryService cloudinaryService) {
        this.imageRepository = imageRepository;
        this.categoryRepository = categoryRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public List<GalleryCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    public GalleryCategory createCategory(GalleryDTO.CategoryRequest request) {
        GalleryCategory category = new GalleryCategory();
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    public List<GalleryImage> getAllImages() {
        return imageRepository.findAll();
    }

    public List<GalleryImage> getImagesByCategory(Long categoryId) {
        return imageRepository.findByCategoryId(categoryId);
    }

    public GalleryImage uploadImage(GalleryDTO.ImageRequest request, MultipartFile file) throws IOException {
        String url = null;
        String publicId = null;

        if (file != null && !file.isEmpty()) {
            Map result = cloudinaryService.upload(file, "gallery");
            url = (String) result.get("secure_url");
            publicId = (String) result.get("public_id");
        } else if (request.getImageUrl() != null && !request.getImageUrl().trim().isEmpty()) {
            url = request.getImageUrl().trim();
        } else {
            throw new IllegalArgumentException("Either an image file or a valid image URL is required");
        }

        GalleryImage image = new GalleryImage();
        image.setImageUrl(url);
        image.setPublicId(publicId);
        image.setTitle(request.getTitle());
        image.setArtistName(request.getArtistName());
        image.setArtworkType(request.getArtworkType());

        if (request.getCategoryId() != null) {
            GalleryCategory category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            image.setCategory(category);
        }
        return imageRepository.save(image);
    }

    public void deleteImage(Long id) throws IOException {
        GalleryImage image = imageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Image not found"));
        if (image.getPublicId() != null) {
            cloudinaryService.delete(image.getPublicId());
        }
        imageRepository.delete(image);
    }
}
