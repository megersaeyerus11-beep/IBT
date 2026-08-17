/* ------------------------------------------------------------------
   Exercise 1: Select an <h1>, change its text with textContent,
   then toggle a CSS class on it with classList.toggle.
------------------------------------------------------------------ */
const heading = document.querySelector("#main-heading");
const ex1Btn = document.querySelector("#ex1-btn");

ex1Btn.addEventListener("click", () => {
  heading.textContent = "Selam, Addis!";
  heading.classList.toggle("highlight");
});

/* ------------------------------------------------------------------
   Exercise 2: Given an array of three Ethiopian city names, create
   an <li> for each with createElement and append them to a <ul>.
------------------------------------------------------------------ */
const cities = ["Addis Ababa", "Bahir Dar", "Hawassa"];
const cityList = document.querySelector("#city-list");

cities.forEach((city) => {
  const li = document.createElement("li");
  li.textContent = city;
  cityList.append(li);
});

/* ------------------------------------------------------------------
   Exercise 3: Click listener on a button that logs event.target,
   then wrap the button in a div with its own listener and observe
   bubbling (the click fires on the button first, then the div).
------------------------------------------------------------------ */
const innerBtn = document.querySelector("#inner-btn");
const outerDiv = document.querySelector("#outer-div");

innerBtn.addEventListener("click", (event) => {
  console.log("Button listener — event.target:", event.target);
});

outerDiv.addEventListener("click", (event) => {
  console.log("Div listener (bubbled) — event.target:", event.target);
});

/* ------------------------------------------------------------------
   Exercise 4: A list of items each with a delete button, removed via
   a SINGLE delegated listener on the parent <ul>.
------------------------------------------------------------------ */
const deleteList = document.querySelector("#delete-list");
const initialItems = ["Injera", "Shiro", "Doro Wat"];

initialItems.forEach((name) => {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = name;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.dataset.action = "delete";

  li.append(span, deleteBtn);
  deleteList.append(li);
});


deleteList.addEventListener("click", (event) => {
  if (event.target.dataset.action === "delete") {
    event.target.closest("li").remove();
  }
});

/* ------------------------------------------------------------------
   Exercise 5: Form with one text input. On submit, preventDefault,
   read input.value, append it to a list, and clear the field.
------------------------------------------------------------------ */
const addForm = document.querySelector("#add-form");
const addInput = document.querySelector("#add-input");
const submittedList = document.querySelector("#submitted-list");

addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = addInput.value.trim();
  if (!value) return;

  const li = document.createElement("li");
  li.textContent = value;
  submittedList.append(li);

  addInput.value = "";
});