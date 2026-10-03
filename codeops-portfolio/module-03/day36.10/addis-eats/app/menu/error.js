"use client";

export default function MenuError({
  error,
  reset,
}) {
  return (
    <main className="container error-page">
      <div className="error-box">
        <div className="error-icon">
          ⚠️
        </div>

        <h1>Something Went Wrong</h1>

        <p>
          We couldn't load the menu.
          Please try again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="button"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}