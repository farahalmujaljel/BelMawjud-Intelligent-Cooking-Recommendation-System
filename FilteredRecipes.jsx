import React from "react";
import "./FilteredRecipes.css";
import { useLocation, useNavigate } from "react-router-dom";

function FilteredRecipes() {
  const navigate = useNavigate();
  const location = useLocation();

  const recipes = location.state?.recipes || [];

  const localImages = {
    "Chicken Kabsa": "/assets/Kabsa 3.png",
    "Beef Kabab": "/assets/kabab.png.webp",
    "Shakshuka":
      "https://feelgoodfoodie.net/wp-content/uploads/2018/10/Shakshuka-09-709x1065.jpg",
  };

  
  const handleOpenDetails = (recipe) => {
    let id =
      recipe.recipe_id ||
      recipe.id ||
      recipe.recipeId ||
      recipe.RECIPE_ID;

    if (!id) {
      alert("Recipe ID missing");
      console.error("❌ MISSING recipe_id FOR:", recipe);
      return;
    }

    id = String(id).replace(/[^0-9]/g, "");

    navigate("/details", { state: { recipe_id: id } });
  };

  return (
    <div className="recipes-page">
      <h2 className="recipes-title">Recipes</h2>

      <div className="recipes-list">
        {recipes.map((recipe, index) => {
          console.log("RECIPE OBJECT:", recipe);

          return (
            <div
              key={index}
              className="recipe-card"
              onClick={() => handleOpenDetails(recipe)}
            >
              <img
                className="recipe-img"
                src={
                  localImages[recipe.name]
                    ? localImages[recipe.name]
                    : `http://127.0.0.1:5001/proxy_image?url=${encodeURIComponent(
                        recipe.image_url
                      )}`
                }
                alt={recipe.name}
              />

              <div className="recipe-info">
                <h3 className="recipe-name">{recipe.name}</h3>

                <div className="recipe-sub">
                  <span className="recipe-time">⏱ {recipe.prep_time} mins</span>

                  <img
                    className="recipe-flag"
                    src={`https://flagsapi.com/${recipe.origin_country}/flat/32.png`}
                    onError={(e) => (e.target.style.display = "none")}
                  />

                  <span className="recipe-rating">⭐ {recipe.rating_avg}</span>
                </div>
              </div>

              <div className="bookmark-icon">🔖</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FilteredRecipes;
