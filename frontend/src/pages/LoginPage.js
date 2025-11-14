import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); 
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const endpoint = role === "ADMIN" ? "/admin" : "/login";

    try {
      const res = await axios.post(`http://localhost:8080${endpoint}`, {
        username,
        password,
      });

      setMessage(res.data);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);

      if (role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      const errorData = err.response?.data;
      const errorMsg =
        typeof errorData === "string"
          ? errorData
          : errorData?.message || errorData?.error || "Login failed.";
      setMessage(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h1>Welcome to PetConnect 🐾</h1>
        <p>Find your perfect companion. Adopt a pet. Change a life.</p>
        <img
          src="https://images.unsplash.com/photo-1554830072-52d78d0d4c18?q=80&w=3024&auto=format&fit=crop&w=800&q=80"
          alt="Adopt a Pet"
          className="pet-image"
        />
      </div>
      <div className="right-section">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button type="submit">Login</button>
        </form>

        {message && (
          <p className="message">
            {typeof message === "string"
              ? message
              : message.message || message.error || "An error occurred"}
          </p>
        )}

        <p>
          Don’t have an account?{" "}
          <Link to="/register" className="register-link">
            Click here to register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
