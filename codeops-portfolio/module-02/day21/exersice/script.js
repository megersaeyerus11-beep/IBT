const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const errorArea = document.getElementById("error");
const successArea = document.getElementById("success");
const userCount = document.getElementById("userCount");

// Ethiopian phone number regex
const phoneRegex = /^(09\d{8}|\+2519\d{8})$/;

// Get users from localStorage
function getUsers() {
  const storedUsers = localStorage.getItem("users");

  if (storedUsers) {
    return JSON.parse(storedUsers);
  }

  return [];
}

// Show the number of signed-up users
function updateUserCount() {
  const users = getUsers();
  userCount.textContent = users.length;
}

// Handle form submission
form.addEventListener("submit", function (event) {
  // Prevent page reload
  event.preventDefault();

  // Clear previous messages
  errorArea.textContent = "";
  successArea.textContent = "";

  // Get trimmed values
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  // Validate name first
  if (name.length < 2) {
    errorArea.textContent = "Name must be at least 2 characters.";
    return;
  }

  // Validate phone
  if (!phoneRegex.test(phone)) {
    errorArea.textContent =
      "Please enter a valid Ethiopian phone number (09xxxxxxxx or +2519xxxxxxxx).";
    return;
  }

  // Get existing users
  const users = getUsers();

  // Add new user
  users.push({
    name: name,
    phone: phone
  });

  // Save as JSON in localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Clear form
  form.reset();

  // Update count
  updateUserCount();

  // Show success message
  successArea.textContent = "Signup successful!";
});

// Restore count when page loads
updateUserCount();