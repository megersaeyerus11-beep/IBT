
"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not load dishes");
  }

  return response.json();
};

function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedValue(value),
      delay
    );

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function DishSearch() {
  const [term, setTerm] = useState("");
  const debouncedTerm = useDebounce(term.trim());

  const { data, error, isLoading, isValidating } = useSWR(
    debouncedTerm
      ? ["/api/dishes", debouncedTerm]
      : null,
    ([url, query]) =>
      fetcher(`${url}?q=${encodeURIComponent(query)}`),
    {
      keepPreviousData: true,
      dedupingInterval: 2000,
    }
  );

  const dishes = Array.isArray(data)
    ? data
    : data?.data ?? [];

  return (
    <section>
      <label htmlFor="dish-search">Search dishes</label>
      <input
        id="dish-search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Search dishes..."
      />

      {isLoading && <p>Loading dishes...</p>}
      {isValidating && !isLoading && (
        <p>Updating results...</p>
      )}
      {error && <p role="alert">Could not load dishes.</p>}

      {!error && !isLoading && dishes.length === 0 && (
        <p>No matching dishes found.</p>
      )}

      <ul>
        {dishes.map((dish) => (
          <li key={dish.id}>
            {dish.nameEn} — {dish.priceETB} ETB
          </li>
        ))}
      </ul>
    </section>
  );
}
