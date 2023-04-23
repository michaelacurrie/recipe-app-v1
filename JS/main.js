const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "e19ab49f";
const APP_key = "63465b8117da7ae4cc2a995cf35bd28b";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector.value;
  fetchAPI();
});

async function fetchAPI() {
  /* 
    const { data } = axios.get(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_key}`)
    generateHTML(data.hits);
    */
  const baseURL = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_key}`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
}

function generateHTML(results) {
  let generatedHTML = "";

  results.map((result) => {
    generatedHTML += `
        <div class="item">
            <img src=${result.recipe.image} alt="" />
            <div class="flex-container">
              <h1 class="title">${result.recipe.label}</h1>
              <a  class="view-button" href=${result.recipe.url}>View Recipe</a>
            </div>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(
              2
            )}</p>
          </div>

        `;
  });

  searchResultDiv.innerHTML = generatedHTML;
}
