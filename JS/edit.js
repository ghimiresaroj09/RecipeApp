const imageInput = document.getElementById("recipeImage");
const imagePreview = document.getElementById("imagePreview");

imageInput.addEventListener("change", function() {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

function addRecipe() {
    const title = document.getElementById("recipeTitle").value;
    const description = document.getElementById("recipeDescription").value;
    const ingredients = document.getElementById("recipeIngredients").value;
    const steps = document.getElementById("recipeSteps").value;
    const imageDataUrl = imagePreview.src;

    const recipe = {
        title: title,
        description: description,
        ingredients: ingredients,
        steps: steps,
        image: imageDataUrl,
    };

    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));

    window.location.href = "addrecipe.html";
}