import React, { useEffect, useState } from "react";
import "./Recipes.css";
import { useNavigate } from "react-router-dom";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  fetch("http://127.0.0.1:5001/recipes")
    .then((res) => res.json())
    .then((data) => {
      
      if (Array.isArray(data)) {
        setRecipes(data);
      } else {
        
        setRecipes(data.recipes || []);
      }
    })
    .catch((err) => console.log("Error fetching recipes:", err));
}, []);


  return (
    <div className="recipes-page">
      <h2 className="page-title">Recipes</h2>

      {recipes.map((r) => (
        <div
          key={r.recipe_id}
          className="recipe-card"
          onClick={() =>
            navigate("/details", { state: { recipe_id: r.recipe_id } })
          }
        >
          {/* IMAGE */}
          <img
            src={r.image_url}
            alt={r.name}
            className="recipe-img"
          />

          {/* TEXT + META */}
          <div className="recipe-content">
            <h3 className="recipe-name">{r.name}</h3>

            <div className="meta-row">
              {/* TIME */}
              <span className="meta-item">
  <img src="/assets/Time 3.png" className="meta-icon" alt="time" />
  {r.prep_time} mins
</span>


              {/* FLAG */}
              <img
                src={`https://flagsapi.com/${r.origin_country}/flat/48.png`}
                className="flag-icon"
                alt="flag"
              />

              {/* RATING */}
              <span className="meta-item">
                <img
                  src="/assets/Star (2) 3.png"
                  className="meta-icon"
                  alt="star"
                />
                {r.rating_avg}
              </span>
            </div>
          </div>

          {/* SAVE BUTTON */}
          <img
            src="/assets/Bookmark (2) 3.png"
            className="save-icon"
            alt="save"
          />
        </div>
      ))}
    </div>
  );
}

export default Recipes;
