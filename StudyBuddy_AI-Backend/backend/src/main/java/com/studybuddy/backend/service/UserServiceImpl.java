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


        if (UserRepository.findByEmail(user.getEmail()) != null) {

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
    public User login(User user) {


        User existingUser =
                UserRepository.findByEmail(user.getEmail());



        if(existingUser != null &&

           passwordEncoder.matches(
               user.getPassword(),
               existingUser.getPassword()
           )) {



            return existingUser;

        }



        return null;

    }


}
