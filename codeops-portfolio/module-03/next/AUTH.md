
# Authentication and Authorization — Addis Eats

## Purpose

This document explains how the capstone protects private pages, server actions,
API routes, and user-owned orders.

## Protected resources

- `/checkout`: requires an authenticated session.
- `/orders` and `/orders/[id]`: require an authenticated session.
- Order APIs: require authentication and verify ownership of the requested order.
- Public pages such as `/` and `/menu` remain accessible without signing in.

## Protection layers

### Layer 1: Middleware

The middleware checks for the session cookie on protected paths and redirects
unauthenticated requests to `/signin`.

The middleware is an early navigation check, not the only security boundary.
A cookie's presence alone does not prove that a session is valid.

### Layer 2: Server-side session validation

Server components, server actions, and protected API handlers must validate
the session on the server using the project's session helper.

The session cookie should use:

- `httpOnly: true`
- `secure: true` in production
- `sameSite: "lax"` (or a stricter policy where appropriate)
- A suitable expiration time and path

### Layer 3: Resource authorization

Every operation involving a user's order must scope the query or mutation to
the authenticated user's ID.

For example, a user requesting order `123` must not receive another user's
order, even if they know its ID.

## Sign-in redirect validation

The `next` parameter must be checked before redirecting after sign-in.
Accept only local paths beginning with one `/`; reject values beginning with
`//`, absolute URLs, and other invalid values. Use a safe default such as
`/orders` when the value is invalid.

## Verification checklist

- [ ] An unauthenticated visitor is redirected away from `/checkout`.
- [ ] An unauthenticated visitor is redirected away from `/orders`.
- [ ] A valid session can access its own order.
- [ ] A user cannot read another user's order by changing the order ID.
- [ ] A user cannot cancel another user's order.
- [ ] API handlers reject missing or invalid sessions.
- [ ] Invalid `next` values cannot redirect to an external website.
- [ ] Session cookies have the intended security attributes.
- [ ] Authorization is enforced on the server, not only in the UI.

## Evidence

Record the commands, test steps, HTTP status codes, and observed results here
after running the tests. Do not mark a check complete without evidence.
