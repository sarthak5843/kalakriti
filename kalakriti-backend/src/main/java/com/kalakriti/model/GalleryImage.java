package com.kalakriti.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "gallery_images")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class GalleryImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;

    private String publicId;
    private String title;
    private String artistName;

    @Enumerated(EnumType.STRING)
    private ArtworkType artworkType;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private GalleryCategory category;

    @Column(updatable = false)
    private LocalDateTime uploadedAt = LocalDateTime.now();

    public enum ArtworkType { STUDENT, INSTRUCTOR, BOTH }

    public Long getId() { return id; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getPublicId() { return publicId; }
    public void setPublicId(String publicId) { this.publicId = publicId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getArtistName() { return artistName; }
    public void setArtistName(String artistName) { this.artistName = artistName; }
    public ArtworkType getArtworkType() { return artworkType; }
    public void setArtworkType(ArtworkType artworkType) { this.artworkType = artworkType; }
    public GalleryCategory getCategory() { return category; }
    public void setCategory(GalleryCategory category) { this.category = category; }
    public LocalDateTime getUploadedAt() { return uploadedAt; }
}
