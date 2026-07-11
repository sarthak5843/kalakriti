package com.kalakriti.dto;

import com.kalakriti.model.GalleryImage.ArtworkType;

public class GalleryDTO {

    public static class CategoryRequest {
        private String name;
        private String description;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    public static class ImageRequest {
        private String title;
        private String artistName;
        private ArtworkType artworkType;
        private Long categoryId;
        private String imageUrl;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getArtistName() { return artistName; }
        public void setArtistName(String artistName) { this.artistName = artistName; }
        public ArtworkType getArtworkType() { return artworkType; }
        public void setArtworkType(ArtworkType artworkType) { this.artworkType = artworkType; }
        public Long getCategoryId() { return categoryId; }
        public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    }
}
