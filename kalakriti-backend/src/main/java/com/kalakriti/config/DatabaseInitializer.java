package com.kalakriti.config;

import com.kalakriti.model.User;
import com.kalakriti.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByEmail("admin@kalakriti.com")) {
            User admin = new User();
            admin.setFullName("Kalakriti Admin");
            admin.setEmail("admin@kalakriti.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setPhone("8197344421");
            admin.setRole(User.Role.ADMIN);
            admin.setEnabled(true);
            userRepository.save(admin);
            System.out.println("Default admin user created: admin@kalakriti.com / admin123");
        }

        if (!userRepository.existsByEmail("admin2@kalakriti.com")) {
            User admin2 = new User();
            admin2.setFullName("Admin");
            admin2.setEmail("admin2@kalakriti.com");
            admin2.setPassword(passwordEncoder.encode("admin123"));
            admin2.setPhone("8197344421");
            admin2.setRole(User.Role.ADMIN);
            admin2.setEnabled(true);
            userRepository.save(admin2);
            System.out.println("Default admin2 user created: admin2@kalakriti.com / admin123");
        }
    }
}
