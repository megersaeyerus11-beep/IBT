"use client";

export default function MenuError({ error, reset }) {
  return (
    <section>
      <h2>Something went wrong</h2>

      <p>{error?.message || "Unable to load the menu."}</p>

      <button onClick={() => reset()}>
        Try again
      </button>
    </section>
  );
}