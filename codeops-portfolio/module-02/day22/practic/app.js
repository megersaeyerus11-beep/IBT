const state = {
  rates: {},
  watchlist: [],
  loading: false,
  error: ""
};

const statusEl = document.querySelector("#status");
const form = document.querySelector("#convert-form");
const amountInput = document.querySelector("#amount");
const currencySelect = document.querySelector("#currency");
const resultEl = document.querySelector("#result");
const watchCurrencySelect = document.querySelector("#watch-currency");
const addWatchlistButton = document.querySelector("#add-watchlist");
const watchlistEl = document.querySelector("#watchlist");

const STORAGE_KEY = "currency-watchlist";


function render() {
  statusEl.textContent = state.loading
    ? "Loading exchange rates..."
    : state.error
      ? state.error
      : "Rates loaded.";

  const currencies = Object.keys(state.rates).sort();

  currencySelect.innerHTML = "";
  watchCurrencySelect.innerHTML = "";

  currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.textContent = currency;

    currencySelect.appendChild(option);

    const watchOption = option.cloneNode(true);
    watchCurrencySelect.appendChild(watchOption);
  });

  renderWatchlist();
}


async function loadRates() {
  state.loading = true;
  state.error = "";
  render();

  try {
    const res = await fetch(
      "https://api.exchangerate-api.com/v4/latest/ETB"
    );

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    const data = await res.json();

    state.rates = data.rates;

    // The API does not need to provide ETB in rates because ETB is
    // the base currency.
    state.rates.ETB = 1;

    state.loading = false;
    render();
  } catch (error) {
    console.error(error);

    state.loading = false;
    state.error = "Could not load exchange rates.";
    render();
  }

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const currency = currencySelect.value;
  const rate = state.rates[currency];

  if (!Number.isFinite(amount) || amount <= 0) {
    resultEl.textContent = "Please enter a valid positive amount.";
    return;
  }

  if (typeof rate !== "number") {
    resultEl.textContent = "Please select a valid currency.";
    return;
  }

  const converted = amount * rate;

  resultEl.textContent =
    `${amount.toLocaleString()} ETB = ` +
    `${converted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })} ${currency}`;
});



addWatchlistButton.addEventListener("click", () => {
const currency = watchCurrencySelect.value;

if (!currency) {
    return;
}



if (state.watchlist.includes(currency)) {
    return;
}

state.watchlist.push(currency);

save();
renderWatchlist();
});

function renderWatchlist() {
watchlistEl.innerHTML = "";

state.watchlist.forEach((currency) => {
    const li = document.createElement("li");

    li.dataset.c = currency;

    const rate = state.rates[currency];

    li.innerHTML = `
    <span>
        ${currency}: ${
        typeof rate === "number"
            ? rate.toLocaleString(undefined, {
                maximumFractionDigits: 6
            })
            : "—"
        }
    </span>
    <button type="button" data-c="${currency}">
        Remove
    </button>
    `;

    watchlistEl.appendChild(li);
});
}


watchlistEl.addEventListener("click", (event) => {
const button = event.target.closest("button[data-c]");

if (!button) {
    return;
}

const currency = button.dataset.c;

state.watchlist = state.watchlist.filter(
    (item) => item !== currency
);

save();
renderWatchlist();
});


function save() {
localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state.watchlist)
);
}

function load() {
const stored = localStorage.getItem(STORAGE_KEY);

if (!stored) {
    state.watchlist = [];
    return;
}

try {
    const parsed = JSON.parse(stored);

    if (Array.isArray(parsed)) {
    state.watchlist = parsed;
    } else {
    state.watchlist = [];
    }
} catch {
    state.watchlist = [];
}
}


async function init() {
load();
render();
await loadRates();
}

init();