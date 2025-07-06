const URL = "https://dummyjson.com/recipes";
let allRecipes = [];

const form = document.querySelector('#filter-form');
form.addEventListener("submit", filterRecipes);

function filterRecipes(event){
  event.preventDefault();
  const maxTime = parseInt(document.querySelector('#maxTime').value);
  const difficulty = document.querySelector('#difficulty').value;

  const filtered = allRecipes.filter(recipe => {
    const matchesTime = isNaN(maxTime) || recipe.cookTimeMinutes + recipe.prepTimeMinutes <= maxTime;
    const matchesDifficulty = !difficulty || recipe.difficulty?.toLowerCase() === difficulty;

    return matchesTime && matchesDifficulty;
  });

  renderRecipes(filtered);

}


export async function fetchRecipes() {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      allRecipes = data.recipes;
      renderRecipes(allRecipes);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    }
}
  
  function renderRecipes(recipes) {
    const gallery = document.querySelector("#recipe-gallery");
    gallery.innerHTML = "";

    if (recipes.length === 0) {
      gallery.innerHTML = "<p>Inga recept matchade dina filter.</p>";
      return;
    }
  
    recipes.forEach(recipe => {
      const card = createRecipeCard(recipe);
      gallery.appendChild(card);
    });
}
  
  function createRecipeCard(recipe) {
    const card = document.createElement("div");
    card.classList.add("card");
  
    card.innerHTML = `
      <a href="recipe.html?id=${recipe.id}"><img src="${recipe.image}" alt="${recipe.name}"></a>
      <div class="card-body">
        <h3>${recipe.name}</h3>
        <p>${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min | ${recipe.difficulty}</p>
      </div>
    `;
  
    return card;
}