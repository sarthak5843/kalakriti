package com.kalakriti.controller;

import com.kalakriti.model.SiteSettings;
import com.kalakriti.service.SiteSettingsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
public class SiteSettingsController {

    private final SiteSettingsService settingsService;

    public SiteSettingsController(SiteSettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @GetMapping
    public ResponseEntity<SiteSettings> getSettings() {
        return ResponseEntity.ok(settingsService.getSettings());
    }
}
