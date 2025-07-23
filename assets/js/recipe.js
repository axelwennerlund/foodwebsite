const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

if (recipeId) {
    fetchRecipe(recipeId);
  } else {
    document.querySelector("main").innerHTML = "<p>Inget recept valt.</p>";
}

async function fetchRecipe(id){
    try{
        let response = await fetch(`https://dummyjson.com/recipes/${id}`);
        let json = await response.json();
        renderRecipe(json);
    } catch(error) {
        console.error("Kunde inte hitta receptet: ", error);
    }
}

function renderRecipe(recipe){

    const webpageTitle = document.querySelector("title");
    webpageTitle.innerHTML = `Gott & Enkelt - ${recipe.name}`;
    
    const title = document.querySelector("h3");
    title.innerHTML = `${recipe.name}`;

    const image = document.querySelector("img");
    image.src = recipe.image;
    image.alt = recipe.name;

    const time = document.querySelector("#time");
    time.innerHTML = `Förberedelser: ${recipe.prepTimeMinutes} min | Tillagning: ${recipe.cookTimeMinutes} min`;

    const calories = document.querySelector("#calories");
    calories.innerHTML = `${recipe.caloriesPerServing} kcal/portion`;

    const ingredients = document.querySelector("#ingredients");
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement("li");
        li.innerHTML = ingredient;
        ingredients.appendChild(li);
    });

    const instructions = document.querySelector("#instructions");
    recipe.instructions.forEach(instruction => {
        const li = document.createElement("li");
        li.innerHTML = instruction;
        instructions.appendChild(li);
    });

}