const URL = "https://dummyjson.com/recipes";

export async function fetchRecipes() {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      renderRecipes(data.recipes);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    }
  }
  
  function renderRecipes(recipes) {
    const gallery = document.getElementById("recipe-gallery");
    gallery.innerHTML = "";
  
    recipes.forEach(recipe => {
      const card = createRecipeCard(recipe);
      gallery.appendChild(card);
    });
  }
  
  function createRecipeCard(recipe) {
    const card = document.createElement("div");
    card.classList.add("card");
  
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}">
      <div class="card-body">
        <h3>${recipe.name}</h3>
        <p>${recipe.cookTimeMinutes} min</p>
      </div>
    `;
  
    return card;
  }