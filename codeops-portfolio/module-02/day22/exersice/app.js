const state = {
base: "ETB",
result: "",
rates: {},
watchlist: [],
amount: 100,
currency: "USD",
};

const API = "https://open.er-api.com/v6/latest/ETB";
const KEY = "birrwatch";

const status = document.querySelector("#status");
const select = document.querySelector("#currency");
const form = document.querySelector("#convert-form");
const amount = document.querySelector("#amount");
const result = document.querySelector("#result");
const addBtn = document.querySelector("#watch");
const watchUl = document.querySelector("#watchlist");


async function loadRates() {
status.textContent = "Loading rates...";

try {
    const res = await fetch(API);

    if (!res.ok) {
    throw new Error("HTTP " + res.status);
    }

    const data = await res.json();

    state.rates = data.rates;

    status.textContent = "Rates loaded successfully.";
} catch (err) {
    status.textContent = "Could not load rates.";
}
}


function render() {
const codes = Object.keys(state.rates);

select.innerHTML = codes
    .map(c => `<option value="${c}">${c}</option>`)
    .join("");


if (state.rates[state.currency]) {
    select.value = state.currency;
} else if (codes.length > 0) {
    state.currency = codes[0];
    select.value = state.currency;
}

amount.value = state.amount;
renderWatchlist();
}


form.addEventListener("submit", (e) => {
e.preventDefault();

const amt = Number(amount.value);

if (!Number.isFinite(amt) || amt <= 0) {
    result.textContent = "Enter a valid amount.";
    return;
}

state.amount = amt;
state.currency = select.value;

const rate = state.rates[state.currency];

if (rate === undefined) {
    result.textContent = "Currency rate is not available.";
    return;
}

  const out = (amt * rate).toFixed(2);

state.result = `${amt} ETB = ${out} ${state.currency}`;

result.textContent = state.result;

save();
});



addBtn.addEventListener("click", () => {
const c = select.value;

if (state.watchlist.includes(c)) {
    return;
}

state.watchlist.push(c);

save();
renderWatchlist();
});



function renderWatchlist() {
if (state.watchlist.length === 0) {
    watchUl.innerHTML = "<li>No currencies yet</li>";
    return;
}

watchUl.innerHTML = state.watchlist
    .map(c => {
    const r = state.rates[c];

    return `
        <li data-c="${c}">
        1 ETB = ${r} ${c}
        <button class="rm">×</button>
        </li>
    `;
    })
    .join("");
}



watchUl.addEventListener("click", (e) => {
if (!e.target.matches(".rm")) {
    return;
}

const c = e.target.closest("li").dataset.c;

state.watchlist = state.watchlist.filter(
    x => x !== c
);

save();
renderWatchlist();
});



function save() {
localStorage.setItem(
    KEY,
    JSON.stringify({
    watchlist: state.watchlist,
    currency: state.currency,
    amount: state.amount,
    })
);
}


function load() {
const saved = localStorage.getItem(KEY);

if (!saved) {
    return;
}

try {
    const data = JSON.parse(saved);

    state.watchlist = data.watchlist ?? [];
    state.currency = data.currency ?? "USD";
    state.amount = data.amount ?? 100;
} catch (err) {
    console.error("Could not load saved data:", err);
}
}



async function init() {
load();

await loadRates();

if (Object.keys(state.rates).length > 0) {
    render();
}
}

init();