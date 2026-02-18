import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const [popular, setPopular] = useState([]); // NEW
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch top 2 recipes
  useEffect(() => {
    fetch("http://127.0.0.1:5001/recipes")
      .then((res) => res.json())
      .then((data) => {
        setPopular(data.slice(0, 2)); // Only top 2 recipes
      })
      .catch((err) => console.log("Error fetching recipes:", err));
  }, []);

  return (
    <div className="home-container">
      {/* POINTS BAR */}
      <div className="points-bar">
        <img src="/assets/Star (2) 3.png" alt="star" className="star-icon" />
        <span>{user?.points || 0} Points</span>
      </div>

      {/* HOME BUTTON */}
      <button className="home-btn">Home</button>

      {/* TITLE */}
      <p className="subtitle">Cook with what's in your kitchen!</p>

      {/* SEARCH BOX */}
      <div
        className="search-box"
        onClick={() => navigate("/search")}
        style={{ cursor: "pointer" }}
      >
        <svg
          className="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6E8B3D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>

        <input type="text" placeholder="Search or select ingredients..." disabled />
      </div>

      {/* POPULAR SECTION */}
      <h2 className="popular-title">Popular This Week</h2>

      {/* POPULAR RECIPES FROM BACKEND */}
      {popular.map((item) => (
        <div
          key={item.recipe_id}
          className="recipe-card"
          onClick={() =>
            navigate("/details", { state: { recipe_id: item.recipe_id } })
          }
          style={{ cursor: "pointer" }}
        >
          <img src={item.image_url} alt={item.name} className="recipe-img" />
          <span className="recipe-name">{item.name}</span>
        </div>
      ))}

      {/* BOTTOM NAV */}
<div className="bottom-nav">

  {/* HOME */}
  <div className="nav-item active" onClick={() => navigate("/home")}>
    <img src="/assets/HomeSelected 3.png" alt="home" />
    <span>Home</span>
  </div>

  {/* RECIPES */}
  <div className="nav-item" onClick={() => navigate("/recipes")}>
    <img src="/assets/RecipesSelected 4.png" alt="recipes" />
    <span>Recipes</span>
  </div>

  {/* REWARDS */}
  <div className="nav-item" onClick={() => navigate("/rewards")}>
    <img src="/assets/BelMawjudRewardsSelected 3.png" alt="rewards" />
    <span>Rewards</span>
  </div>

  {/* PROFILE */}
  <div className="nav-item" onClick={() => navigate("/profile")}>
    <img src="/assets/ProfileSelected 2.png" alt="profile" />


    <span>Profile</span>
  </div>

</div>

    </div>
  );
}

export default Home;
