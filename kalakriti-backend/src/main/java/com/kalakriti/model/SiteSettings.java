package com.kalakriti.model;

import jakarta.persistence.*;

@Entity
@Table(name = "site_settings")
public class SiteSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String logoUrl;
    private String logoPublicId;
    private String qrCodeUrl;
    private String qrCodePublicId;
    private String siteName = "Kalakriti Art Studio";
    private String tagline;
    private String phone;
    private String email;
    private String address;
    private String instagramUrl;
    private String facebookUrl;
    private String youtubeUrl;

    @Column(columnDefinition = "TEXT")
    private String aboutText;

    private String instructorName;

    @Column(columnDefinition = "TEXT")
    private String instructorBio;

    private String aboutImageUrl;
    private String instructorImageUrl;

    @Column(columnDefinition = "TEXT")
    private String instructorImages;

    // Admin-configurable stats shown on homepage & about page
    private String happyStudents = "500+";
    private String artCourses = "20+";
    private String yearsExperience = "10+";
    private String workshopsConducted = "50+";

    public Long getId() { return id; }
    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
    public String getLogoPublicId() { return logoPublicId; }
    public void setLogoPublicId(String logoPublicId) { this.logoPublicId = logoPublicId; }
    public String getQrCodeUrl() { return qrCodeUrl; }
    public void setQrCodeUrl(String qrCodeUrl) { this.qrCodeUrl = qrCodeUrl; }
    public String getQrCodePublicId() { return qrCodePublicId; }
    public void setQrCodePublicId(String qrCodePublicId) { this.qrCodePublicId = qrCodePublicId; }
    public String getSiteName() { return siteName; }
    public void setSiteName(String siteName) { this.siteName = siteName; }
    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getInstagramUrl() { return instagramUrl; }
    public void setInstagramUrl(String instagramUrl) { this.instagramUrl = instagramUrl; }
    public String getFacebookUrl() { return facebookUrl; }
    public void setFacebookUrl(String facebookUrl) { this.facebookUrl = facebookUrl; }
    public String getYoutubeUrl() { return youtubeUrl; }
    public void setYoutubeUrl(String youtubeUrl) { this.youtubeUrl = youtubeUrl; }
    public String getAboutText() { return aboutText; }
    public void setAboutText(String aboutText) { this.aboutText = aboutText; }
    public String getInstructorName() { return instructorName; }
    public void setInstructorName(String instructorName) { this.instructorName = instructorName; }
    public String getInstructorBio() { return instructorBio; }
    public void setInstructorBio(String instructorBio) { this.instructorBio = instructorBio; }
    public String getAboutImageUrl() { return aboutImageUrl; }
    public void setAboutImageUrl(String aboutImageUrl) { this.aboutImageUrl = aboutImageUrl; }
    public String getInstructorImageUrl() { return instructorImageUrl; }
    public void setInstructorImageUrl(String instructorImageUrl) { this.instructorImageUrl = instructorImageUrl; }
    public String getInstructorImages() { return instructorImages; }
    public void setInstructorImages(String instructorImages) { this.instructorImages = instructorImages; }
    public String getHappyStudents() { return happyStudents; }
    public void setHappyStudents(String happyStudents) { this.happyStudents = happyStudents; }
    public String getArtCourses() { return artCourses; }
    public void setArtCourses(String artCourses) { this.artCourses = artCourses; }
    public String getYearsExperience() { return yearsExperience; }
    public void setYearsExperience(String yearsExperience) { this.yearsExperience = yearsExperience; }
    public String getWorkshopsConducted() { return workshopsConducted; }
    public void setWorkshopsConducted(String workshopsConducted) { this.workshopsConducted = workshopsConducted; }
}
