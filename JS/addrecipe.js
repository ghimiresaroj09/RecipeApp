const recipeContainer = document.getElementById("recipeList");

// Retrieve and display stored recipes
const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

function deleteRecipe(index) {
    recipes.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    displayRecipes();
}

function toggleDetails(index) {
    const details = document.getElementById(`recipeDetails${index}`);
    const button = document.getElementById(`showDetailsButton${index}`);
    if (details.style.display === "block") {
        details.style.display = "none";
        button.textContent = "Show Details"; // Update button text
    } else {
        details.style.display = "block";
        button.textContent = "Hide Details"; // Update button text
    }
}

function displayRecipes() {
    recipeContainer.innerHTML = "";
    recipes.forEach(function(recipe, index) {
        const recipeItem = document.createElement("div");
        recipeItem.className = "recipe-container"; // Use the container class here
        recipeItem.innerHTML = `
            <div class="recipe-item">
                <img class="recipe-image" src="${recipe.image}" alt="Recipe Image">
                <h2 class="recipe-title">${recipe.title}</h2>
                <div class="button-container">
                    <button class="show-details-button" id="showDetailsButton${index}" onclick="toggleDetails(${index})">Show Details</button>
                    <button class="delete-button" onclick="deleteRecipe(${index})">Delete</button>
                </div>
                <div class="recipe-details" id="recipeDetails${index}">
                    <p class="recipe-label">Description:</p>
                    <p>${recipe.description}</p>
                    <p class="recipe-label">Ingredients:</p>
                    <p>${recipe.ingredients}</p>
                    <p class="recipe-label">Steps:</p>
                    <p>${recipe.steps}</p>
                </div>
            </div>
        `;
        recipeContainer.appendChild(recipeItem);
    });
}

displayRecipes();