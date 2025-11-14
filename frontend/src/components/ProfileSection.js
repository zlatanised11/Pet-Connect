import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function ProfileSection({ username }) {
  const [user, setUser] = useState(null);
  const imageInputRef = useRef();

  useEffect(() => {
    axios.get(`http://localhost:8080/user/${username}`).then((res) => {
      setUser(res.data);
    });
  }, [username]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((prev) => ({ ...prev, image: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveChanges = () => {
    if (
      !user.firstName?.trim() ||
      !user.lastName?.trim() ||
      !user.email?.trim() ||
      !user.phone?.trim() ||
      !user.address?.trim() ||
      !user.image
    ) {
      alert("Please fill in all the fields including uploading a profile image.");
      return;
    }

    axios
      .put("http://localhost:8080/user/update", user)
      .then(() => alert("Profile updated successfully"))
      .catch(() => alert("Failed to update profile"));
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "12px", marginBottom: "20px" }}>
      <h3>My Profile</h3>
      <input
        name="firstName"
        placeholder="First Name"
        value={user.firstName}
        onChange={handleChange}
      />
      <input
        name="lastName"
        placeholder="Last Name"
        value={user.lastName}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={user.email}
        onChange={handleChange}
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={user.phone}
        onChange={handleChange}
      />
      <input
        name="address"
        placeholder="Address"
        value={user.address}
        onChange={handleChange}
      />
      <input
        type="text"
        value={user.username}
        disabled
        placeholder="Username (read-only)"
      />

      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        onChange={handleImageUpload}
        style={{ marginTop: "8px" }}
      />

      {user.image && (
        <div>
          <img
            src={user.image}
            alt="Profile"
            style={{ width: "100px", marginTop: "10px", borderRadius: "50%" }}
          />
        </div>
      )}

      <button onClick={saveChanges} style={{ marginTop: "10px" }}>
        Save Profile
      </button>
    </div>
  );
}
