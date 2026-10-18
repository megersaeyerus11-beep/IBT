import { randomUUID } from "node:crypto";

const sessions = new Map();

export const DEMO_USER = {
  id: "user_addis_101",
  name: "Abebe Bikila",
  email: "abebe@example.com",
  role: "customer",
};

const SESSION_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000;

export function createSession(user = DEMO_USER) {
  const token = randomUUID();

  sessions.set(token, {
    user,
    expiresAt: Date.now() + SESSION_LIFETIME_MS,
  });

  return token;
}

export function getSessionByToken(token) {
  if (!token) return null;

  const session = sessions.get(token);

  if (!session) return null;

  if (session.expiresAt <= Date.now()) {
    sessions.delete(token);
    return null;
  }

  return session.user;
}

export function deleteSessionByToken(token) {
  if (token) {
    sessions.delete(token);
  }
}