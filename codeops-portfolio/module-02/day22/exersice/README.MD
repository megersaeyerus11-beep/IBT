# BirrWatch Currency Converter 

## Objective

Build a functional currency converter that fetches live Ethiopian Birr (ETB) exchange rates from a public API, converts user-entered amounts, and maintains a persistent currency watchlist.

## Requirements

**Live Data Integration**: Use `fetch` and `async/await` to retrieve live exchange rates with ETB as the base currency.

**State Management**: Store the application data in a central `state` object containing the exchange rates, selected currency, amount, and watchlist.

**Currency Conversion**: Validate the user's amount, look up the selected currency's exchange rate, and calculate the converted value.

**Status Handling**: Display appropriate loading, success, and error messages while exchange-rate data is being retrieved.

**Watchlist Management**: Allow users to add currencies to a personal watchlist while preventing duplicate currencies.

**Event Delegation**: Use event delegation on the watchlist to handle dynamically created remove buttons.

**Persistence**: Use `localStorage` to save the watchlist, selected currency, and last entered amount so they survive a page reload.

**DOM Rendering**: Dynamically render the currency dropdown, conversion result, and watchlist from the application state.

## Implementation Tips

Test each small feature individually before connecting everything together. For example, verify that the API returns exchange rates, that selecting `USD` correctly retrieves the USD rate, and that `100 ETB` produces the expected converted amount.

Keep `state` as the main source of truth. When the user changes the amount, currency, or watchlist, update the state and then update the UI.

Use `async/await` with `try/catch` when working with the API so loading and error states can be handled clearly.

Use `Array.prototype.includes()` to prevent duplicate currencies in the watchlist and `filter()` to remove currencies.

Use event delegation for the watchlist because its remove buttons are created dynamically when the list is rendered.

Use `localStorage` with `JSON.stringify()` when saving state and `JSON.parse()` when loading it.

## Technologies

* HTML5
* CSS3
* JavaScript
* Fetch API
* Async/Await
* DOM Manipulation
* Event Delegation
* Local Storage
* Public Exchange Rate API

## Learning Goal

By completing this exercise, students practice asynchronous JavaScript, API integration, application state management, DOM manipulation, event handling, data persistence, and responsive frontend development.
