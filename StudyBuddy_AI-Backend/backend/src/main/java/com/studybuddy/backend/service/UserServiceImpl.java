package com.studybuddy.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.studybuddy.backend.entity.User;
import com.studybuddy.backend.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository repo,
                           PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String register(User user) {

        System.out.println("Register API Called");

        if (repo.findByEmail(user.getEmail()) != null) {
            return "Email already exists";
        }

        if (user.getPassword().length() < 8) {
            return "Password must be at least 8 characters";
        }

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        repo.save(user);

        return "Registration Successful";
    }

    @Override
    public String login(User user) {

        User existingUser = repo.findByEmail(user.getEmail());

        if (existingUser == null) {
            return "User not found";
        }

        boolean matched = passwordEncoder.matches(
                user.getPassword(),
                existingUser.getPassword()
        );

        if (matched) {
            return "Login Successful";
        }

        return "Invalid Credentials";
    }
}