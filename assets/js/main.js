import {fetchRecipes} from "./functions.js";

addEventListener('load', main);

function main() {
    removeEventListener('load', main);
    fetchRecipes();
}