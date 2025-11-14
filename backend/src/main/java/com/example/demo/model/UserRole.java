package com.example.demo.model;

public enum UserRole {
    ADMIN,
    USER;

    public static UserRole fromString(String value) {
        return UserRole.valueOf(value.toUpperCase());
    }
}
