package com.studybuddy.backend.service;

import com.studybuddy.backend.entity.User;

public interface UserService {

    String register(User user);

    String login(User user);
    
}