// for visualise if my input or item aray is 
//   { id: 1, text: "Milk", done: false },
//   { id: 2, text: "Bread", done: false },
//   { id: 3, text: "Eggs", done: true }

// TODO: Hold items in an array (this is your single source of truth)
let items = [];
let nextId = 1; // i use this for every id is unique by ++ increments

// TODO: Select necessary DOM elements (form, input, list, count)
const form = document.getElementById("item-form");
const input = document.getElementById("item-input");
const list = document.getElementById("list");
const count = document.getElementById("count");


// TODO: Write a render() function to rebuild the list from the array
// 1. Clear the current list (innerHTML = "")
// 2. Loop through the items array
// 3. Create elements, use data-id on each row, and append to the list
// 4. Update the live count paragraph


function render() {
  list.innerHTML = ""; 

  items.forEach((item) => {
    const li = document.createElement("li");
    li.dataset.id = item.id;
    if (item.done) {
      li.classList.add("done");
    }
 
    const span = document.createElement("span");
    span.textContent = item.text;
    li.appendChild(span);
 
    const delBtn = document.createElement("button");
    delBtn.textContent = "Remove";
    delBtn.className = "del";
    li.appendChild(delBtn);
 
    list.appendChild(li);
  });
 
  const remaining = items.filter((item) => !item.done).length;
  count.textContent = ${remaining} item${remaining === 1 ? "" : "s"} remaining (${items.length} total);
}
// TODO: Handle form submission
// 1. preventDefault to stop page reload
// 2. Read and validate the input
// 3. Push a new object to the items array (include a unique id and done: false)
// 4. Call render()
form.addEventListener("submit", (e) => {
  e.preventDefault();
 
  const text = input.value.trim();
  if (text === "") {
    return;
  }
 
  items.push({ id: nextId++, text, done: false });
  input.value = "";
  input.focus();
 
  render();
});

// TODO: Set up event delegation on the #list
// 1. Listen for clicks on the parent <ul>
// 2. Use e.target and closest() to find the clicked row
// 3. Determine if the user is toggling ".done" or removing a row
// 4. Update the items array accordingly
// 5. Call render()
list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
 
  const id = Number(li.dataset.id);
 
  if (e.target.classList.contains("del")) {
    // Remove button clicked
    items = items.filter((item) => item.id !== id);
  } else {
    // Row clicked elsewhere: toggle done
    const item = items.find((item) => item.id === id);
    if (item) {
      item.done = !item.done;
    }
  }
 
  render();
});
 

render();









