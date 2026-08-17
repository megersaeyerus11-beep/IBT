const state = {
rates: {},
watchlist: [],
currency: "USD",
loading: false,
error: "",
result: ""
};

const $ = id => document.querySelector(id);

const status = $("#status");
const form = $("#convert-form");
const amount = $("#amount");
const currency = $("#currency");
const result = $("#result");
const watchCurrency = $("#watch-currency");
const addButton = $("#add-watchlist");
const watchlist = $("#watchlist");

const KEY = "birr-watch";

// Render everything from state
function render() {
const currencies = Object.keys(state.rates).sort();

status.textContent = state.loading
    ? "Loading..."
    : state.error || "Rates loaded.";

currency.innerHTML = currencies
    .map(c => `<option value="${c}">${c}</option>`)
    .join("");

watchCurrency.innerHTML = currency.innerHTML;
currency.value = state.currency;
result.textContent = state.result;

watchlist.innerHTML = state.watchlist.length
    ? state.watchlist.map(c => `
        <li data-c="${c}">
        ${c}: ${state.rates[c]?.toFixed(4) ?? "—"}
        <button data-c="${c}">Remove</button>
        </li>
    `).join("")
    : "<li>Your watchlist is empty.</li>";
}


async function loadRates() {
state.loading = true;
render();

try {
    const res = await fetch(
    "https://api.exchangerate-api.com/v4/latest/ETB"
    );

    if (!res.ok) throw new Error();

    state.rates = (await res.json()).rates;
    state.rates.ETB = 1;
    state.loading = false;
    render();
} catch {
    state.loading = false;
    state.error = "Could not load exchange rates.";
    render();
}
}

form.addEventListener("submit", e => {
e.preventDefault();

const value = Number(amount.value);
const rate = state.rates[state.currency];

if (!amount.value.trim() || !Number.isFinite(value) || value <= 0) {
    state.result = "Enter an amount greater than 0.";
} else {
    state.result =
    `${value.toLocaleString()} ETB = ` +
      `${(value * rate).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })} ${state.currency}`;
}

render();
});

currency.addEventListener("change", () => {
state.currency = currency.value;
save();
});

addButton.addEventListener("click", () => {
const c = watchCurrency.value;

if (c && !state.watchlist.includes(c)) {
    state.watchlist.push(c);
    save();
    render();
}
});

watchlist.addEventListener("click", e => {
const c = e.target.dataset.c;

if (c) {
    state.watchlist = state.watchlist.filter(x => x !== c);
    save();
    render();
}
});

function save() {
localStorage.setItem(KEY, JSON.stringify({
    watchlist: state.watchlist,
    currency: state.currency
}));
}

function load() {
try {
    const data = JSON.parse(localStorage.getItem(KEY));

    if (data) {   
        state.watchlist = data.watchlist || [];
    state.currency = data.currency || "USD";
    }
} catch {}
}

async function init() {
load();
render();
await loadRates();
}

init();