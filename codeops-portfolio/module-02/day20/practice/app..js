const rate = document.getElementById("rate");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const userList = document.getElementById("userList");
const detailsList = document.getElementById("detailsList");
const refreshBtn = document.getElementById("refreshBtn");
const test404Btn = document.getElementById("test404Btn");
const testResult = document.getElementById("testResult");

async function getRate() {
  try {
    const res = await fetch(
      "https://api.frankfurter.dev/v2/rate/USD/ETB?providers=NBE"
    );

    if (!res.ok) throw new Error("Rate request failed");

    const data = await res.json();
    rate.textContent = `1 USD = ${data.rate} ETB`;
  } catch {
    rate.textContent = "Could not load exchange rate.";
  }
}

async function load() {
  loading.textContent = "Loading...";
  error.textContent = "";
  userList.textContent = "";
  detailsList.textContent = "";

  try {
    const res = await fetch("https://dummyjson.com/users");

    if (!res.ok) throw new Error("Request failed");

    const data = await res.json();

    data.users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.firstName} ${user.lastName} - ${user.email}`;
      userList.appendChild(li);
    });

    const details = await Promise.all(
      data.users.slice(0, 2).map(async user => {
        const res = await fetch(
          `https://dummyjson.com/users/${user.id}`
        );

        if (!res.ok) throw new Error("Details request failed");

        return res.json();
      })
    );

    details.forEach(user => {
      const li = document.createElement("li");
      li.textContent =
        `${user.firstName} ${user.lastName}, Age: ${user.age}, ` +
        `City: ${user.address.city}`;

      detailsList.appendChild(li);
    });

  } catch {
    error.textContent =
      "Sorry, we couldn't load the users. Please try again.";
  } finally {
    loading.textContent = "";
  }
}

async function test404() {
  try {
    const res = await fetch("https://dummyjson.com/users/999999");

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    await res.json();

  } catch (err) {
    testResult.textContent = `Catch ran: ${err.message}`;
  }
}

refreshBtn.addEventListener("click", load);
test404Btn.addEventListener("click", test404);

getRate();
load();