package com.studybuddy.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studybuddy.backend.entity.User;

public interface UserRepository
        extends JpaRepository<User, Long> {

    User findByEmail(String email);
}