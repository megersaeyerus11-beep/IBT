
# Data Fetching — Addis Eats

## Menu

The menu page should load its initial dish data on the server and pass that
data to the client search component as `initialDishes`.

This provides useful content on the first render and avoids requiring an
initial client-side request just to show the menu.

## Debounced search

The menu search waits approximately 400 milliseconds after the user stops
typing before requesting matching dishes.

- Search endpoint: `/api/dishes?search=<term>`
- Empty search: use a null SWR key to avoid an unnecessary request.
- Debounce delay: 400 ms.
- Previous results: retain them while new results are loading, where appropriate.
- Initial menu: seeded from server-fetched data.

### Search verification

1. Open `/menu` and confirm dishes appear on the first render.
2. Type a search term.
3. Inspect the browser Network panel.
4. Confirm a request is made after typing pauses.
5. Confirm an empty search does not trigger an API request.
6. Confirm failed requests display a useful error state.

## Order status polling

The order details page should fetch the authenticated user's order on the
server and pass the result to the client status component as `initialOrder`.

The client uses SWR to refresh the status every 5 seconds.

- Example key: `/api/orders/<orderId>`
- Initial data: `initialOrder` from the server.
- Polling interval: 5000 ms.
- Revalidate on focus: enabled where appropriate.

The API must authenticate the request and return only an order owned by the
current user. A missing or unauthorized order must not disclose another
user's data.

## Cache and freshness

Menu data may be revalidated periodically if the route uses a suitable
revalidation interval. Authenticated order data must not be publicly cached
or shared between users.

Verify the actual cache behavior for the installed Next.js version and route
configuration.

## Evidence

Record the following after testing:

- [ ] Initial menu is server-seeded.
- [ ] Empty search uses a null SWR key.
- [ ] Search requests are debounced.
- [ ] Order status starts with server-provided data.
- [ ] Order status refreshes at the configured interval.
- [ ] API errors are handled.
- [ ] Order API checks session and ownership.
- [ ] Private responses are not shared across users.

Network observations and relevant source paths:
- Menu page: `src/app/menu/page.js`
- Search component: `src/app/menu/DishSearch.jsx`
- Dish API: `src/app/api/dishes/route.js`
- Order status page: `src/app/orders/[id]/page.js`
- Order status component: `src/app/orders/[id]/OrderStatusClient.jsx`
- Order API: `src/app/api/orders/[id]/route.js`

Update these paths if your actual source tree differs.
