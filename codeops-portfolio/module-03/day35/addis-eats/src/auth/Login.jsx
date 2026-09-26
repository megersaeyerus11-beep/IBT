import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "./AuthContext";

function Login() {
  const [name, setName] =
    useState("");

  const [error, setError] =
    useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const from =
    location.state?.from || "/";

  function handleSubmit(event) {
    event.preventDefault();

    const cleanName =
      name.trim();

    if (!cleanName) {
      setError(
        "Please enter your name."
      );
      return;
    }

    if (cleanName.length < 2) {
      setError(
        "Name must be at least 2 characters."
      );
      return;
    }

    login(cleanName);

    navigate(from, {
      replace: true,
    });
  }

  return (
    <main className="page auth-page">
      <section className="auth-card">
        <p className="eyebrow">
          Welcome
        </p>

        <h1>Login to Addis Eats</h1>

        <p>
          Enter your name to continue
          to checkout.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
        >
          <label htmlFor="login-name">
            Your name
          </label>

          <input
            id="login-name"
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            placeholder="Enter your name"
            autoComplete="name"
          />

          {error && (
            <p
              className="form-error"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="button primary full-width"
          >
            Continue
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;