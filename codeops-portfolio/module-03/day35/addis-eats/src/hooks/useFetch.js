import { useEffect, useState } from "react";

export function useFetch(fetcher) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setLoading(true);
    setError("");

    fetcher(controller.signal)
      .then((result) => {
        if (active) {
          setData(result);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError" && active) {
          setError(err.message || "Something went wrong.");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [fetcher]);

  return {
    data,
    loading,
    error,
  };
}