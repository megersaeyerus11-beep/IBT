"use client";

export default function Error({ reset }) {
return (
    <main className="error-message">
    <h1>Something went wrong!</h1>

    <p>
        We not load the Addis Eats menu.
    </p>

    <button onClick={() => reset()}>
        Try Again
    </button>
    </main>
);
}