
"use client";

import { useState } from "react";
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not load dishes");
  }

  return response.json();
};

export default function PagedDishList() {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isValidating } = useSWR(
    ["/api/dishes", page],
    ([url, currentPage]) =>
      fetcher(`${url}?page=${currentPage}`),
    { keepPreviousData: true }
  );

  const dishes = Array.isArray(data)
    ? data
    : data?.data ?? [];

  const hasNextPage = Array.isArray(data)
    ? data.length > 0
    : data?.hasNextPage ?? dishes.length > 0;

  return (
    <section>
      <h2>Menu — Page {page}</h2>

      {isLoading && <p>Loading dishes...</p>}
      {isValidating && !isLoading && <p>Loading next results...</p>}
      {error && <p role="alert">Could not load dishes.</p>}

      <ul>
        {dishes.map((dish) => (
          <li key={dish.id}>
            {dish.nameEn} — {dish.priceETB} ETB
          </li>
        ))}
      </ul>

      <button
        disabled={page === 1}
        onClick={() => setPage((current) => current - 1)}
      >
        Previous
      </button>

      <span> Page {page} </span>

      <button
        disabled={!hasNextPage || isValidating}
        onClick={() => setPage((current) => current + 1)}
      >
        Next
      </button>
    </section>
  );
}
