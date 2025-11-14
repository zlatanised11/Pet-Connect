import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileSection from "../components/ProfileSection";
import "../styles/Layout.css";

export default function ProfilePage() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>My Profile</h2>
        <button className="button" onClick={() => navigate(-1)}>⬅ Back</button>
      </div>

      <div className="main-content">
        <ProfileSection username={username} />
      </div>
    </div>
  );
}
