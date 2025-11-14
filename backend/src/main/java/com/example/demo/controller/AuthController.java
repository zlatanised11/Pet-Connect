package com.example.demo.controller;
import com.example.demo.model.UserRole;


import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Username is required.");
        }

        if (userRepo.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists.");
        }

        userRepo.save(user);
        return ResponseEntity.ok("Registration successful");
    }
    
    @PutMapping("/user/update")
    public ResponseEntity<String> updateUser(@RequestBody User updatedUser) {
        User existingUser = userRepo.findByUsername(updatedUser.getUsername());
        if (existingUser == null) {
            return ResponseEntity.status(404).body("User not found.");
        }

        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName(updatedUser.getLastName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setAddress(updatedUser.getAddress());
        existingUser.setImage(updatedUser.getImage());

        userRepo.save(existingUser);
        return ResponseEntity.ok("Profile updated successfully");
    }


    
    @GetMapping("/user/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username) {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }
    
    @PostMapping("/login")
    public ResponseEntity<String> userLogin(@RequestBody User user) {
        User existing = userRepo.findByUsername(user.getUsername());
        if (existing != null && existing.getPassword().equals(user.getPassword())) {
            if (existing.getRole() == UserRole.USER) {
                return ResponseEntity.ok("User login successful");
            } else {
                return ResponseEntity.status(401).body("Access denied: Not a user");
            }
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/admin")
    public ResponseEntity<String> adminLogin(@RequestBody User user) {
        User existing = userRepo.findByUsername(user.getUsername());
        if (existing != null && existing.getPassword().equals(user.getPassword())) {
            if (existing.getRole() == UserRole.ADMIN) {
                return ResponseEntity.ok("Admin login successful");
            } else {
                return ResponseEntity.status(401).body("Access denied: Not an admin");
            }
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

}
