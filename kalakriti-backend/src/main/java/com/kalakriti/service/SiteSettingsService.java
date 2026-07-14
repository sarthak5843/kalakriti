package com.kalakriti.service;

import com.kalakriti.model.SiteSettings;
import com.kalakriti.repository.SiteSettingsRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class SiteSettingsService {

    private final SiteSettingsRepository settingsRepository;
    private final CloudinaryService cloudinaryService;

    public SiteSettingsService(SiteSettingsRepository settingsRepository,
                                CloudinaryService cloudinaryService) {
        this.settingsRepository = settingsRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public SiteSettings getSettings() {
        return settingsRepository.findAll().stream().findFirst()
                .orElseGet(() -> settingsRepository.save(new SiteSettings()));
    }

    public SiteSettings updateSettings(SiteSettings updated) {
        SiteSettings settings = getSettings();
        settings.setSiteName(updated.getSiteName());
        settings.setTagline(updated.getTagline());
        settings.setPhone(updated.getPhone());
        settings.setEmail(updated.getEmail());
        settings.setAddress(updated.getAddress());
        settings.setInstagramUrl(updated.getInstagramUrl());
        settings.setFacebookUrl(updated.getFacebookUrl());
        settings.setYoutubeUrl(updated.getYoutubeUrl());
        settings.setAboutText(updated.getAboutText());
        settings.setInstructorName(updated.getInstructorName());
        settings.setInstructorBio(updated.getInstructorBio());
        settings.setAboutImageUrl(updated.getAboutImageUrl());
        settings.setInstructorImageUrl(updated.getInstructorImageUrl());
        settings.setInstructorImages(updated.getInstructorImages());
        settings.setHappyStudents(updated.getHappyStudents());
        settings.setArtCourses(updated.getArtCourses());
        settings.setYearsExperience(updated.getYearsExperience());
        settings.setWorkshopsConducted(updated.getWorkshopsConducted());
        return settingsRepository.save(settings);
    }

    public SiteSettings uploadLogo(MultipartFile file) throws IOException {
        SiteSettings settings = getSettings();
        if (settings.getLogoPublicId() != null) {
            cloudinaryService.delete(settings.getLogoPublicId());
        }
        Map result = cloudinaryService.upload(file, "logo");
        settings.setLogoUrl((String) result.get("secure_url"));
        settings.setLogoPublicId((String) result.get("public_id"));
        return settingsRepository.save(settings);
    }

    public SiteSettings uploadQrCode(MultipartFile file) throws IOException {
        SiteSettings settings = getSettings();
        if (settings.getQrCodePublicId() != null) {
            cloudinaryService.delete(settings.getQrCodePublicId());
        }
        Map result = cloudinaryService.upload(file, "payments");
        settings.setQrCodeUrl((String) result.get("secure_url"));
        settings.setQrCodePublicId((String) result.get("public_id"));
        return settingsRepository.save(settings);
    }

    // Upload a single instructor photo and return just the URL (not saved to settings)
    public String uploadInstructorPhoto(MultipartFile file) throws IOException {
        Map result = cloudinaryService.upload(file, "instructor");
        String url = (String) result.get("secure_url");
        if (url == null) url = (String) result.get("url");
        return url;
    }
}
