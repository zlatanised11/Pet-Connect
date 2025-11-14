import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginPage.css"; 

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const imageInputRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const register = async () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !username.trim() ||
      !password.trim() ||
      !image
    ) {
      alert("Please enter all the required fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/register", {
        username,
        password,
        role,
        firstName,
        lastName,
        email,
        phone,
        address,
        image,
      });

      alert(res.data);

      // Clear all fields
      setUsername("");
      setPassword("");
      setRole("USER");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setImage("");
      if (imageInputRef.current) imageInputRef.current.value = "";
    } catch (err) {
      const errData = err.response?.data;
      const msg =
        typeof errData === "string"
          ? errData
          : errData?.message || errData?.error || "Registration failed.";
      alert("❌ " + msg);
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h1>Join PetConnect 🐾</h1>
        <p>Start your journey with a new best friend today.</p>
        <img
          src="https://images.unsplash.com/photo-1554830072-52d78d0d4c18?q=80&w=3024&auto=format&fit=crop&w=800&q=80"
          alt="Pet Adoption"
          className="pet-image"
        />
      </div>

      <div className="right-section">
        <h2>Register</h2>
        <input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <input type="file" accept="image/*" ref={imageInputRef} onChange={handleImageUpload} />
        <button onClick={register}>Register</button>
        <p>
          Already have an account? <Link to="/">Click here to login</Link>
        </p>
      </div>
    </div>
  );
}
