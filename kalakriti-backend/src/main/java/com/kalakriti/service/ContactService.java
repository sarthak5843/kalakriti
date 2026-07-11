package com.kalakriti.service;

import com.kalakriti.dto.ContactDTO;
import com.kalakriti.exception.ResourceNotFoundException;
import com.kalakriti.model.Contact;
import com.kalakriti.repository.ContactRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public Contact submit(ContactDTO.Request request) {
        Contact contact = new Contact();
        contact.setName(request.getName());
        contact.setEmail(request.getEmail());
        contact.setPhone(request.getPhone());
        contact.setSubject(request.getSubject());
        contact.setMessage(request.getMessage());
        return contactRepository.save(contact);
    }

    public List<Contact> getAll() {
        return contactRepository.findAll();
    }

    public List<Contact> getUnread() {
        return contactRepository.findByReadFalse();
    }

    public Contact markAsRead(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found"));
        contact.setRead(true);
        return contactRepository.save(contact);
    }
}
