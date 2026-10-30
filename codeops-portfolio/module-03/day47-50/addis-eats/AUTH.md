# AUTH.md — Authentication and Security

## 1. Purpose

This document explains the authentication and authorization architecture used in the Addis Eats application.

The application protects private routes, manages user sessions, and ensures that users can only access their own orders.

## 2. Authentication Routes

| Route | Access | Purpose |
|---|---|---|
| `/signin` | Public | Allows users to sign in |
| `/signup` | Public | Allows users to create an account |
| `/menu` | Public | Displays available dishes |
| `/checkout` | Authenticated | Allows signed-in users to place orders |
| `/orders` | Authenticated | Displays the current user's orders |
| `/kitchen` | Staff only | Provides access to kitchen operations |

## 3. Authentication Layers

### Layer 1: Password Security

- Passwords are hashed using bcrypt.
- Plain-text passwords are never stored in the database.
- Login verifies passwords against their stored hashes.

### Layer 2: Session Management

- Sessions are created after successful authentication.
- Session cookies use HttpOnly.
- Secure cookies are enabled in production.
- SameSite settings help protect against cross-site requests.
- Invalid or expired sessions are rejected.

### Layer 3: Route Protection

- Middleware or the application proxy checks protected routes.
- Unauthenticated users are redirected to the sign-in page.
- The original destination can be preserved using a safe redirect.

### Layer 4: Server-Side Authorization

- Protected pages verify the current session.
- Database queries are scoped to the authenticated user's ID.
- Users cannot access another user's private order records.
- Staff-only routes require staff authorization.

## 4. Security Attack Tests

### Attack 1: Unauthenticated Access

Test:
1. Sign out of the application.
2. Open `/orders` directly.
3. Attempt to access the protected page.

Expected result:
The application redirects the user to `/signin`.

Actual result:
[Record your test result here.]

### Attack 2: Accessing Another User's Order

Test:
1. Sign in as User A.
2. Identify an order belonging to User B.
3. Attempt to open User B's order using its ID.

Expected result:
The application denies access to the other user's order.

Actual result:
[Record your test result here.]

### Attack 3: Invalid or Expired Session

Test:
1. Modify or invalidate the session cookie.
2. Attempt to access `/orders` or `/checkout`.
3. Check whether the application accepts the invalid session.

Expected result:
The application rejects the invalid session and requires authentication.

Actual result:
[Record your test result here.]

## 5. Security Conclusion

Addis Eats uses multiple security layers to protect user accounts, sessions, and private order information.

Authentication verifies user identity, while authorization determines what each user is allowed to access.

Security tests should be repeated before production deployment and after significant authentication changes.