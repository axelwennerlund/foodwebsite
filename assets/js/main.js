import {fetchRecipes} from "./recipes.js";

addEventListener('load', main);

function main() {
    removeEventListener('load', main);
    fetchRecipes();
}