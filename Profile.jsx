import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="profile-page">

      {/* POINTS BAR */}
      <div className="profile-points-bar">
        <img src="/assets/Star (2) 3.png" alt="star" className="star-icon" />
        <span className="points-text">{user?.points} Points</span>
      </div>

      <h2 className="profile-title">Profile</h2>

      {/* MAIN CARD */}
      <div className="profile-card">

        {/* USER IMAGE */}
        <div className="profile-img-container">
          <img
            src="/assets/UserProfile (2) 3.png"
            alt="profile"
            className="profile-img"
          />
        </div>

        {/* USER NAME */}
        <h3 className="profile-name">{user?.name}</h3>

        {/* USER POINTS */}
        <p className="profile-points">
          Points <img src="/assets/Star (2) 3.png" className="star-inline" alt="star" /> 
          <span className="user-points">{user?.points} Points</span>
        </p>

        {/* HELP ROW */}
        <div className="help-row" onClick={() => navigate("/help")}>
          <div className="help-left">
            <img src="/assets/Help 3.png" className="help-icon" alt="help" />
            <span className="help-text">Help</span>
          </div>
          <span className="help-arrow">›</span>
        </div>

        {/* LOG OUT BUTTON */}
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>

      </div>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        <div className="nav-item" onClick={() => navigate("/home")}>
          <img src="/assets/HomeSelected 3.png" alt="home" />
          <span>Home</span>
        </div>

        <div className="nav-item" onClick={() => navigate("/recipes")}>
          <img src="/assets/RecipesSelected 4.png" alt="recipes" />
          <span>Recipes</span>
        </div>

        <div className="nav-item" onClick={() => navigate("/rewards")}>
          <img src="/assets/BelMawjudRewardsSelected 3.png" alt="rewards" />
          <span>Rewards</span>
        </div>

        <div className="nav-item active">
          <img src="/assets/ProfileSelected 2.png" alt="profile" />
          <span>Profile</span>
        </div>
      </div>

    </div>
  );
}

export default Profile;
