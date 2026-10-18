"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSession,
  DEMO_USER,
  deleteSessionByToken,
} from "../lib/session-store";

function safeNextPath(value) {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  if (value.includes("\\")) return "/";

  try {
    const parsed = new URL(value, "http://localhost");

    if (parsed.origin !== "http://localhost") return "/";

    return parsed.pathname + parsed.search;
  } catch {
    return "/";
  }
}

export async function signInAction(previousState, formData) {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") || "");

  // Coursework demo credentials only. Do not use this pattern for real users.
  if (
    email !== "abebe@example.com" ||
    password !== "addiseats-demo"
  ) {
    return {
      error: "Email or password is incorrect.",
    };
  }

  const token = createSession(DEMO_USER);
  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(safeNextPath(formData.get("next")));
}

export async function signOutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  deleteSessionByToken(token);
  cookieStore.delete("session");

  redirect("/signin");
}