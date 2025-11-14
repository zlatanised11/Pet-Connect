import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Layout.css";
import "../styles/Dashboard.css";

function AdminDashboard() {
  const [listings, setListings] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const imageInputRef = useRef(null);

  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const fetchData = () => {
    axios.get("http://localhost:8080/listings")
      .then((res) => setListings(res.data));

    axios.get("http://localhost:8080/user/" + username)
      .then((res) => setUserInfo(res.data));
  };

  useEffect(() => {
    fetchData();
  }, [username]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const addListing = () => {
    if (!title.trim() || !description.trim() || !image) {
      alert("Please enter Title, Description, and upload an Image.");
      return;
    }

    axios.post("http://localhost:8080/listings/add", {
      title,
      description,
      image,
    })
      .then(() => {
        setTitle("");
        setDescription("");
        setImage("");
        if (imageInputRef.current) imageInputRef.current.value = "";
        fetchData();
      })
      .catch((err) => {
        alert("Failed to add listing.");
        console.error(err);
      });
  };

  const handleApprove = (id) => {
    axios.post(`http://localhost:8080/listings/approve/${id}`).then(fetchData);
  };

  const handleDeny = (id) => {
    axios.post(`http://localhost:8080/listings/deny/${id}`).then(fetchData);
  };

  const deleteListing = (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      axios
        .delete(`http://localhost:8080/listings/delete/${id}`)
        .then((res) => {
          alert("Listing deleted successfully.");
          fetchData();
        })
		.catch((err) => {
		  console.error("Delete error:", err);

		  const errorData = err.response?.data;
		  const message =
		    typeof errorData === "string"
		      ? errorData
		      : errorData?.message || errorData?.error || "Something went wrong while deleting.";

		  alert("" + message);
		});

    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>Admin Dashboard</h2>
          {userInfo?.image && (
            <img src={userInfo.image} alt="Admin" className="profile-pic" />
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
	  <div className="add-listing-form">
	    <h3 className="section-title">Add Listing</h3>
	    <input
	      type="text"
	      placeholder="Title"
	      value={title}
	      onChange={(e) => setTitle(e.target.value)}
	    />
	    <textarea
	      placeholder="Description)"
	      value={description}
	      onChange={(e) => setDescription(e.target.value)}
	    />
	    <input
	      type="file"
	      accept="image/*"
	      ref={imageInputRef}
	      onChange={handleImageChange}
	    />
	    <button onClick={addListing}>Add Listing</button>
	  </div>


        <h3 className="section-title">All Listings</h3>
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
              {l.requested && l.requestedBy && (
                <>
                  <p>Requested by: {l.requestedBy}</p>
                  {l.status === "PENDING" && (
                    <>
                      <button className="button" onClick={() => handleApprove(l.id)}>Approve</button>
                      <button className="button" onClick={() => handleDeny(l.id)}>Deny</button>
                    </>
                  )}
                </>
              )}
              <button className="button danger" onClick={() => deleteListing(l.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
