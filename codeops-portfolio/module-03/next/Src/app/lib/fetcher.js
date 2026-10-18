export async function fetcher(url) {
  const response = await fetch(url);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error || `Request failed: ${response.status}`);
  }

  return result;
}