
"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export default function DishSearch({ initialDishes }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const key = debouncedSearch
    ? `/api/dishes?search=${encodeURIComponent(debouncedSearch)}`
    : null;

  const { data, error, isLoading } = useSWR(key, fetcher, {
    fallbackData: undefined,
    keepPreviousData: true,
  });

  const dishes = debouncedSearch
    ? data?.data ?? []
    : initialDishes;

  return (
    <section className="space-y-4">
      <label htmlFor="dish-search" className="block font-medium">
        Search dishes
      </label>

      <input
        id="dish-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search dishes..."
        className="w-full rounded-lg border p-3"
      />

      {isLoading && debouncedSearch && (
        <p>Searching dishes...</p>
      )}

      {error && (
        <p role="alert">Could not search dishes. Please try again.</p>
      )}

      {!error && dishes.length === 0 && (
        <p>No dishes found.</p>
      )}

      <ul className="space-y-3">
        {dishes.map((dish) => (
          <li key={dish.id} className="rounded-lg border p-4">
            <h2 className="font-bold">{dish.name}</h2>
            <p>{dish.description}</p>
            <p>{dish.price} {dish.currency}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
