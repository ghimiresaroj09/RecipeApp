let visibleRecipes = 6; // Number of initially visible recipes
let recipesData; // Store the JSON data

// Function to load JSON data from a file using fetch
function loadJSON(callback) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            recipesData = data; // Store the data globally
            callback(data);
        })
        .catch(error => console.error('Error loading JSON:', error));
}

// Function to create recipe elements
function createRecipeElements(recipe, recipeKey) {
    var recipeContainer = document.createElement("div");
    recipeContainer.className = "recipe-container";

    var image = document.createElement("img");
    image.className = "recipe-image";
    image.src = recipe.image;
    image.alt = recipe.title;
    recipeContainer.appendChild(image);

    var details = document.createElement("div");
    details.className = "recipe-details";

    var title = document.createElement("h2");
    title.className = "recipe-title";
    title.textContent = recipe.title;
    details.appendChild(title);

    var descriptionLabel = document.createElement("h3");
    descriptionLabel.textContent = "Description:";
    details.appendChild(descriptionLabel);

    var description = document.createElement("p");
    description.className = "recipe-description";
    description.textContent = recipe.Description;
    details.appendChild(description);

    var ingredientsLabel = document.createElement("h3");
    ingredientsLabel.textContent = "Ingredients:";
    details.appendChild(ingredientsLabel);

    var ingredientsList = document.createElement("ul");
    ingredientsList.className = "recipe-ingredients";
    for (var i = 0; i < recipe.ingredients.length; i++) {
        var ingredientItem = document.createElement("li");
        ingredientItem.textContent = recipe.ingredients[i];
        ingredientsList.appendChild(ingredientItem);
    }
    details.appendChild(ingredientsList);

    var stepsLabel = document.createElement("h3");
    stepsLabel.textContent = "Steps:";
    details.appendChild(stepsLabel);

    var stepsList = document.createElement("ol");
    stepsList.className = "recipe-steps";
    for (var stepKey in recipe.steps) {
        if (recipe.steps.hasOwnProperty(stepKey)) {
            var stepItem = document.createElement("li");
            stepItem.textContent = recipe.steps[stepKey];
            stepsList.appendChild(stepItem);
        }
    }
    details.appendChild(stepsList);

    var toggleButton = document.createElement("button");
    toggleButton.className = "recipe-button";
    toggleButton.textContent = "Show Details";
    toggleButton.addEventListener("click", function() {
        toggleDetails(description, ingredientsList, stepsList, toggleButton);
    });
    details.appendChild(toggleButton);
    recipeContainer.appendChild(details);
    return recipeContainer;
}

// Function to toggle the visibility of recipe details
function toggleDetails(description, ingredients, steps, button) {
    if (description.style.display === "none") {
        description.style.display = "block";
        ingredients.style.display = "block";
        steps.style.display = "block";
        button.textContent = "Hide Details";
    } else {
        description.style.display = "none";
        ingredients.style.display = "none";
        steps.style.display = "none";
        button.textContent = "Show Details";
    }
}

// Function to display recipes
function displayRecipes(data) {
    var recipeList = document.getElementById("recipe-list");

    // Display the first batch of recipes
    for (var i = 0; i < visibleRecipes; i++) {
        var recipeKey = Object.keys(data.receipes)[i];
        if (data.receipes.hasOwnProperty(recipeKey)) {
            var recipe = data.receipes[recipeKey];
            var recipeElement = createRecipeElements(recipe);
            recipeList.appendChild(recipeElement);
        }
    }

    // Check if there are more recipes to show
    if (visibleRecipes < Object.keys(data.receipes).length) {
        document.getElementById("show-more-button").style.display = "block";
    } else {
        document.getElementById("show-more-button").style.display = "none";
    }
}

// Function to load and display more recipes
function loadMoreRecipes() {
    var recipeList = document.getElementById("recipe-list");

    // Display the next batch of recipes
    for (var i = visibleRecipes; i < visibleRecipes + 3; i++) {
        var recipeKey = Object.keys(recipesData.receipes)[i];
        if (recipesData.receipes.hasOwnProperty(recipeKey)) {
            var recipe = recipesData.receipes[recipeKey];
            var recipeElement = createRecipeElements(recipe);
            recipeList.appendChild(recipeElement);
        }
    }

    // Update the number of visible recipes
    visibleRecipes += 3;

    // Check if there are more recipes to show
    if (visibleRecipes >= Object.keys(recipesData.receipes).length) {
        document.getElementById("show-more-button").style.display = "none";
    }
}

// Function to filter recipes based on search input
function filterRecipes() {
    var searchTerm = document.getElementById("search-input").value.toLowerCase();
    var recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = ""; // Clear the recipe list

    // Filter and display recipes that match the search term
    for (var recipeKey in recipesData.receipes) {
        if (recipesData.receipes.hasOwnProperty(recipeKey)) {
            var recipe = recipesData.receipes[recipeKey];
            if (recipe.title.toLowerCase().includes(searchTerm)) {
                var recipeElement = createRecipeElements(recipe);
                recipeList.appendChild(recipeElement);
            }
        }
    }

    // Show or hide the "Show More" button based on filtered recipes
    if (visibleRecipes < Object.keys(recipesData.receipes).length) {
        document.getElementById("show-more-button").style.display = "block";
    } else {
        document.getElementById("show-more-button").style.display = "none";
    }
}

// Load JSON data and display initial recipes
loadJSON(displayRecipes);

// Event listener for the "Show More" button
document.getElementById("show-more-button").addEventListener("click", loadMoreRecipes);

// Event listener for the search input
document.getElementById("search-input").addEventListener("input", filterRecipes);