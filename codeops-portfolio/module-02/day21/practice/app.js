
function save(key, array) {
localStorage.setItem(key, JSON.stringify(array));
}

function load(key) {
try {
    const data = localStorage.getItem(key);

    if (!data) {
    return [];
    }

    const parsed = JSON.parse(data);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}


const themeToggle = document.getElementById("themeToggle");

// Restore theme on page load
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}


themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});



const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const errorArea = document.getElementById("error");
const userCount = document.getElementById("userCount");


const phoneRegex = /^(09\d{8}|\+2519\d{8})$/;



form.addEventListener("submit", function (event) {

  
  event.preventDefault();

  
  errorArea.textContent = "";

  
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();



  if (name.length < 2) {
    errorArea.textContent =
      "Name must be at least 2 characters.";
    return;
  }


  if (!phoneRegex.test(phone)) {
    errorArea.textContent =
      "Please enter a valid Ethiopian phone number (09xxxxxxxx or +2519xxxxxxxx).";
    return;
  }



  const users = load("users");



  users.push({
    name: name,
    phone: phone
  });



  save("users", users);



  form.reset();



  userCount.textContent = users.length;



  errorArea.textContent = "Signup successful!";
  errorArea.style.color = "green";
});




const users = load("users");

userCount.textContent = users.length;