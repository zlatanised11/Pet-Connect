# 🐾 PetConnect – Full-Stack Listing & Adoption System

A full-stack web application where **admins can post pet listings**, **users can request them**, and an approval/denial workflow handles the lifecycle. Built using **Spring Boot**, **React.js**, and **MongoDB**.

---

## 🚀 Features

- 👥 **User/Admin Registration & Login**
- 🖼️ **Profile with Image Upload**
- 📋 **Admin Dashboard: Add, Approve, Deny, Delete Listings**
- 🧑‍💻 **User Dashboard: View, Request, and Track Listings**
- 🧾 **CSV Logging** for actions: ADD, DELETE, APPROVE, DENY
- 🔴 "Previously Denied" badge shown only to denied users
- 🔐 Role-based access control with React routing
- 🧠 Designed with Object-Oriented Programming principles

---

## 🧰 Tech Stack

| Layer      | Technologies                          |
|------------|----------------------------------------|
| Frontend   | React.js, Axios, React Router          |
| Backend    | Spring Boot, Spring Security, Java 23  |
| Database   | MongoDB Atlas (NoSQL)                  |
| Other      | Base64 Image Upload, CSV Logging, CORS |

---

## 🗃️ Folder Structure

```plaintext
backend/
├── controller/         # REST APIs (Auth, Listing)
├── model/              # User, Listing, Enums, BaseEntity
├── repository/         # MongoRepository interfaces
├── service/            # ListingService for business logic
├── util/               # Exportable interface & CSV logger
├── logs/listings_log.csv  # CSV log file (auto-created)
└── DemoApplication.java

frontend/
├── pages/              # Login, Register, Dashboards, Profile
├── components/         # ProfileSection
├── styles/             # CSS files
└── App.js              # Routing and layout
```

---

## 🧠 OOP Principles Used

- **Inheritance**: `BaseEntity` with common fields (`id`, timestamps)
- **Polymorphism**: `Listing` implements `Exportable` for CSV logging
- **Encapsulation**: All model fields use getters/setters
- **Interface**: `Exportable` used in `ListingCSVLogger`
- **Composition**: Listing contains enums and status objects

---

## 📂 Data Logging

All listing actions are logged to a CSV file:
```
backend/logs/listings_log.csv
```

### Logged Fields:
- timestamp
- action (ADD, DELETE, APPROVE, DENY)
- listing details: id, title, description, status, requestedBy, etc.
- 🔕 image is **excluded** to prevent file bloat

---

## ⚙️ Prerequisites

- Java 17+ (Java 23 recommended)
- Node.js & npm
- Maven
- MongoDB Atlas or local MongoDB

---

## 🧑‍💻 Running the Project

### 🟩 Backend (Spring Boot)

1. Navigate to the backend folder:
```bash
cd backend
```

2. Configure MongoDB in `application.properties`:
```properties
spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster-url/dbname
```

3. Run the Spring Boot app:
```bash
./mvnw spring-boot:run
```

✅ Server runs at `http://localhost:8080`

---

### 🔵 Frontend (React)

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

✅ React app runs at `http://localhost:3000`

---

## 🔐 User Roles

| Role   | Capabilities                                       |
|--------|----------------------------------------------------|
| ADMIN  | Add, delete, approve/deny listings; view all       |
| USER   | View available listings, request items, update profile |

---

## 🌱 Future Enhancements

- ✅ JWT Authentication (Token-based login)
- ✅ Pagination & Search
- ✅ Image Upload to AWS S3 instead of Base64
- ✅ Email notifications for approvals
- ✅ Admin analytics dashboard (charts, filters)

---

## 👨‍💻 Author

**Ujwal Chandrashekar and Shreyas Pogal Naveen**  
Graduate Students, Northeastern University  
Built for academic and learning purposes 🧠

---
