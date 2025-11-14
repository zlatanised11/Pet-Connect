import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Layout.css";
import "../styles/Dashboard.css";

function UserDashboard() {
  const [listings, setListings] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/listings/user/" + username)
      .then((res) => setListings(res.data));

    axios.get("http://localhost:8080/user/" + username)
      .then((res) => setUserInfo(res.data));
  }, [username]);

  const requestItem = (id) => {
    axios
      .post(`http://localhost:8080/listings/request/${id}?user=${username}`)
      .then(() => {
        alert("Request sent!");
        axios.get("http://localhost:8080/listings/user/" + username)
          .then((res) => setListings(res.data));
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>Welcome, {username}</h2>
          {userInfo?.image && (
            <img src={userInfo.image} alt="Profile" className="profile-pic" />
          )}
        </div>
        <div>
          <button className="button" onClick={() => navigate("/profile")}>
            My Profile
          </button>
          <button className="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="main-content">
        <h3 className="section-title">Available Listings</h3>
        <div className="listing-grid">
          {listings.map((l) => (
            <div key={l.id} className="listing-item">
              <strong>{l.title}</strong>
              <p
                dangerouslySetInnerHTML={{
                  __html: l.description.replace(/\n/g, "<br/>"),
                }}
              />
              {l.image && (
                <img src={l.image} alt="Listing" />
              )}
              <p>Status: <em>{l.status}</em></p>

			  {l.status === "AVAILABLE" && l.deniedForUser === username && (
			    <span style={{ color: "red", fontWeight: "bold" }}>
			      Previously Denied
			    </span>
			  )}


              <div className="listing-actions" style={{ marginTop: "10px" }}>
                {l.requested && l.requestedBy === username ? (
                  <span className="requested-label">
                    You have requested this item (Status: {l.status})
                  </span>
                ) : l.requested ? (
                  <span className="requested-label">
                    Already requested by another user
                  </span>
                ) : (
                  <button className="button" onClick={() => requestItem(l.id)}>
                    Request
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
