package com.kalakriti.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private Cloudinary cloudinary;
    private final boolean configured;

    public CloudinaryService(@Value("${cloudinary.cloud-name}") String cloudName,
                             @Value("${cloudinary.api-key}") String apiKey,
                             @Value("${cloudinary.api-secret}") String apiSecret) {
        this.configured = !cloudName.startsWith("YOUR_") && !cloudName.isBlank();
        if (this.configured) {
            this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", cloudName,
                    "api_key", apiKey,
                    "api_secret", apiSecret
            ));
        }
    }

    public Map upload(MultipartFile file, String folder) throws IOException {
        if (!configured) {
            java.io.File uploadDir = new java.io.File("uploads/" + folder);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String uniqueName = java.util.UUID.randomUUID().toString() + extension;
            java.io.File destFile = new java.io.File(uploadDir, uniqueName);
            file.transferTo(destFile.getAbsoluteFile());
            
            String relativeUrl = "/uploads/" + folder + "/" + uniqueName;
            return Map.of(
                "secure_url", relativeUrl,
                "public_id", folder + "/" + uniqueName
            );
        }
        return cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("folder", "kalakriti/" + folder));
    }

    public void delete(String publicId) throws IOException {
        if (!configured) {
            java.io.File file = new java.io.File("uploads/" + publicId);
            if (file.exists()) {
                file.delete();
            }
            return;
        }
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }
}
