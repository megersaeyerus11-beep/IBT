// STATE
let groceryItems = [];

// DOM ELEMENTS
const form = document.querySelector("#grocery-form");
const input = document.querySelector("#grocery-input");
const list = document.querySelector("#grocery-list");
const counter = document.querySelector("#item-counter");

// RENDER
function render() {
  // Clear the current list
  list.innerHTML = "";

  // Create the list items from the current state
  groceryItems.forEach((item) => {
    const li = document.createElement("li");

    // Item name
    const itemName = document.createElement("span");
    itemName.textContent = item.name;

    if (item.bought) {
      itemName.classList.add("bought");
    }

    // Bought button
    const boughtButton = document.createElement("button");
    boughtButton.textContent = item.bought ? "Undo" : "Bought";

    boughtButton.addEventListener("click", () => {
      // UPDATE STATE
      item.bought = !item.bought;

      // RENDER AGAIN
      render();
    });

    // Remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", () => {
      // UPDATE STATE
      groceryItems = groceryItems.filter(
        (groceryItem) => groceryItem.id !== item.id
      );

      // RENDER AGAIN
      render();
    });

    li.appendChild(itemName);
    li.appendChild(boughtButton);
    li.appendChild(removeButton);

    list.appendChild(li);
  });

  // Update counter
  counter.textContent = `Items: ${groceryItems.length}`;
}

// ADD ITEM
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const itemName = input.value.trim();

  if (itemName === "") {
    return;
  }

  // UPDATE STATE
  groceryItems.push({
    id: Date.now(),
    name: itemName,
    bought: false
  });

  // Clear input
  input.value = "";

  // RENDER AGAIN
  render();
});

// Initial render
render();