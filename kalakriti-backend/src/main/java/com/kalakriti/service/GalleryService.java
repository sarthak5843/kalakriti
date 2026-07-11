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
        Map result = cloudinaryService.upload(file, "gallery");

        GalleryImage image = new GalleryImage();
        image.setImageUrl((String) result.get("secure_url"));
        image.setPublicId((String) result.get("public_id"));
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
