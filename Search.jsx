import React, { useEffect, useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
const storedUser = JSON.parse(localStorage.getItem("user"));
console.log("🔥 STORED USER:", storedUser);


function Search() {
  const navigate = useNavigate();

  // ======== USER & POINTS ========
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);

  // Load user + fetch points
  useEffect(() => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  console.log("🔥 SEARCH PAGE — LOADED USER:", savedUser);

  if (savedUser) {
    setUser(savedUser);

    fetch(`http://127.0.0.1:5001/get_points/${savedUser.user_id}`)
      .then(res => res.json())
      .then(data => {
        console.log("🔥 SEARCH PAGE — POINTS:", data);
        setPoints(data.points);
      })
      .catch(err => console.log(err));
  }
}, []);  // VERY IMPORTANT




  // ============= GET INGREDIENTS =============
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/ingredients")
      .then((res) => res.json())
      .then((data) => setIngredients(data))
      .catch((err) => console.log("Error fetching ingredients:", err));
  }, []);

  // ============= SELECTED INGREDIENTS =============
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState("");

  const toggleIngredient = (name) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((x) => x !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  // ============= GROUP BY CATEGORY =============
  const grouped = ingredients.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // ============= NEXT LOGIC =============
  const handleNext = async () => {
    if (selected.length === 0) {
      setError("Please select at least one ingredient");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5001/smart_predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: selected }),
      });

      const data = await response.json();

      navigate("/results", { state: { recipes: data.recipes } });
    } catch (error) {
      console.log("Error fetching recipes:", error);
    }
  };

  return (
    <div className="search-page">

      {/* ===== POINTS BAR ===== */}
      <div className="points-bar">
        <img src="/assets/Star (2) 3.png" className="points-icon" alt="star" />
        <span className="points-text">{points} Points</span>
      </div>

      <button className="search-button">Search</button>

      <p className="search-subtitle">Search ingredients to add...</p>

      <div className="search-input-container">
        <div className="search-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        <input
          type="text"
          placeholder="Search ingredients to add..."
          className="search-input"
        />
      </div>

      {/* ===== RENDER CATEGORIES ===== */}
      {Object.keys(grouped).map((category) => (
        <div key={category}>
          <div className="category-title">{category}</div>

          <div className="chips-container">
            {grouped[category].map((item) => (
              <div
                key={item.id}
                className={`ingredient-box ${selected.includes(item.name) ? "selected" : ""}`}
                onClick={() => toggleIngredient(item.name)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ===== FOOTER BUTTONS ===== */}
      <div className="footer-buttons">
        <button className="footer-btn" onClick={() => navigate("/home")}>
          Back
        </button>

        <button
          className={`footer-btn ${selected.length === 0 ? "disabled" : ""}`}
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default Search;
