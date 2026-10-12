
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/app/lib/fetcher";

export default function DishSearch({ initialPage = 1 }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Wait 300 ms after typing stops.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(term.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [term]);

  // Read the current page from the URL.
  const page = Math.max(
    1,
    Number.parseInt(
      searchParams.get("page") ?? String(initialPage),
      10
    ) || 1
  );

  // Normal menu and search use separate SWR keys.
  const listKey = `/api/dishes?page=${page}`;

  const searchKey = debouncedTerm
    ? `/api/dishes?search=${encodeURIComponent(
        debouncedTerm
      )}&page=${page}`
    : null;

  const {
    data: listData,
    error: listError,
    isLoading: listLoading,
    isValidating: listValidating,
  } = useSWR(listKey, fetcher, {
    keepPreviousData: true,
  });

  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
    isValidating: searchValidating,
  } = useSWR(searchKey, fetcher, {
    keepPreviousData: true,
  });

  // Expected API format:
  // { status: "ok", data: [...], pagination: {...} }
  const activeData = debouncedTerm ? searchData : listData;
  const activeError = debouncedTerm ? searchError : listError;
  const activeLoading = debouncedTerm ? searchLoading : listLoading;
  const activeValidating = debouncedTerm
    ? searchValidating
    : listValidating;

  const dishes = Array.isArray(activeData)
    ? activeData
    : activeData?.data ?? [];

  const pagination = activeData?.pagination;
  const totalPages = pagination?.totalPages ?? null;

  function goToPage(nextPage) {
    if (nextPage < 1) return;
    if (totalPages !== null && nextPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));

    router.push(`/menu?${params.toString()}`);
  }

  // Reset pagination when the user changes the search term.
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    router.replace(
      params.toString() ? `/menu?${params.toString()}` : "/menu",
      { scroll: false }
    );
  }, [debouncedTerm]); // Intentionally reset only when the debounced term changes.

  return (
    <section className="my-6">
      <label
        htmlFor="dish-search"
        className="mb-2 block font-semibold"
      >
        Search dishes
      </label>

      <input
        id="dish-search"
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Search dishes..."
        className="w-full rounded-lg border p-3"
      />

      {debouncedTerm === "" && (
        <p className="mt-2 text-sm text-gray-500">
          Type a dish name to search.
        </p>
      )}

      {activeLoading && !activeData && (
        <p className="mt-3">Loading dishes...</p>
      )}

      {activeError && !activeData && (
        <p role="alert" className="mt-3">
          Could not load dishes. Check the API endpoint.
        </p>
      )}

      {activeValidating && activeData && (
        <p className="mt-2 text-sm text-gray-500">
          Updating results...
        </p>
      )}

      {!activeLoading && !activeError && (
        <>
          <h3 className="mt-6 text-lg font-semibold">
            {debouncedTerm
              ? `Search results for "${debouncedTerm}"`
              : `Menu — Page ${page}`}
          </h3>

          <ul className="mt-3 space-y-2">
            {dishes.map((dish) => (
              <li
                key={dish.id}
                className="rounded-lg border p-3"
              >
                <div className="font-medium">
                  {dish.nameEn ?? dish.name}
                </div>

                {dish.priceETB != null && (
                  <div className="text-sm text-gray-600">
                    {dish.priceETB} ETB
                  </div>
                )}
              </li>
            ))}
          </ul>

          {dishes.length === 0 && (
            <p className="mt-3">No dishes found.</p>
          )}

          <div className="mt-5 flex items-center gap-4">
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
              className="rounded border px-4 py-2 disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {page}
              {totalPages !== null ? ` of ${totalPages}` : ""}
            </span>

            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              disabled={
                totalPages !== null && page >= totalPages
              }
              className="rounded border px-4 py-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
