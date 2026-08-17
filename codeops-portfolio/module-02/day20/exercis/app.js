const API_URL = "https://dummyjson.com/recipes";

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const dishList = document.getElementById("dishList");
const refreshBtn = document.getElementById("refreshBtn");


async function load() {

  loading.textContent = "Loading...";

  error.textContent = "";

 
  dishList.textContent = "";

  try {

   
    const res = await fetch(API_URL);

    
    if (!res.ok) {
      throw new Error("Request failed");
    }

   
    const data = await res.json();

    
    data.recipes.forEach(function (dish) {

      const li = document.createElement("li");

      const title = document.createElement("h3");
      title.textContent = dish.name;

      const description = document.createElement("p");
      description.textContent =
        `Cuisine: ${dish.cuisine} | Rating: ${dish.rating}`;

      li.appendChild(title);
      li.appendChild(description);

      dishList.appendChild(li);
    });

  } catch (err) {

    
    error.textContent =
      "Sorry, we couldn't load the dishes. Please try again.";

  } finally {

    
    loading.textContent = "";
  }
}


refreshBtn.addEventListener("click", load);


load();