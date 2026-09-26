export async function fetchMenu(signal) {
  const response = await fetch("/menu.json", {
    signal,
  });

  if (!response.ok) {
    throw new Error("Could not load the menu.");
  }

  const result = await response.json();

  if (result.status !== "ok") {
    throw new Error("Menu data is not available.");
  }

  return result.data;
}