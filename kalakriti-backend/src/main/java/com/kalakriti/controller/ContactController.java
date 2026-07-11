package com.kalakriti.controller;

import com.kalakriti.dto.ContactDTO;
import com.kalakriti.model.Contact;
import com.kalakriti.service.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<Contact> submit(@RequestBody ContactDTO.Request request) {
        return ResponseEntity.ok(contactService.submit(request));
    }
}
