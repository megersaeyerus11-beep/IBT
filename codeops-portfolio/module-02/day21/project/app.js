const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const errorArea = document.getElementById("error");
const userCount = document.getElementById("userCount");


const PHONE = /^(?:\+251|0)9\d{8}$/;



function validate(name, phone) {
  if (name.trim().length < 2) {
    return "Enter your full name.";
  }

  if (!PHONE.test(phone)) {
    return "Enter a valid Ethiopian phone number.";
  }

  return "";
}


function save(users) {
  localStorage.setItem("users", JSON.stringify(users));
}



function load() {
  try {
    const stored = localStorage.getItem("users");

  
    if (stored === null) {
      return [];
    }

    const users = JSON.parse(stored);

    
    if (!Array.isArray(users)) {
      return [];
    }

    return users;

  } catch (error) {
   
    return [];
  }
}



form.addEventListener("submit", function (event) {

 
  event.preventDefault();

  
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  
  const errorMessage = validate(name, phone);

  
  if (errorMessage) {
    errorArea.textContent = errorMessage;
    return;
  }

  
  errorArea.textContent = "";

  
  const users = load();

 
  users.push({
    name: name,
    phone: phone
  });

 
  save(users);

 
  form.reset();


  userCount.textContent = users.length;
});



const users = load();

userCount.textContent = users.length;