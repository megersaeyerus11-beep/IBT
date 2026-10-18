"use client";

import { useActionState } from "react";
import { signInAction } from "../actions/auth";

const initialState = {
  error: "",
};

export default function SignInForm({ nextPath = "/" }) {
  const [state, formAction, pending] = useActionState(
    signInAction,
    initialState
  );

  return (
    <form action={formAction} className="mx-auto max-w-md space-y-4 p-6">
      <input type="hidden" name="next" value={nextPath} />

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="block w-full rounded border p-2"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="block w-full rounded border p-2"
        />
      </div>

      {state.error && <p role="alert">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded border px-4 py-2"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-sm">
        Demo: abebe@example.com / addiseats-demo
      </p>
    </form>
  );
}