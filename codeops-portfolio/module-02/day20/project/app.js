const form = document.querySelector("#searchForm");
const input = document.querySelector("#countryInput");
const facts = document.querySelector("#facts");

async function showCountry(name) {
  facts.textContent = "Loading...";

  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`
    );

    if (!res.ok) throw new Error("Country not found");

    const [c] = await res.json();

    facts.textContent = "";

    const flag = document.createElement("img");
    flag.src = c.flags.svg;
    flag.className = "flag";
    facts.appendChild(flag);

    const info = [
      ["Country", c.name.common],
      ["Capital", c.capital?.[0] || "N/A"],
      ["Population", c.population.toLocaleString()],
      ["Region", c.region],
      [
        "Currencies",
        Object.values(c.currencies || {})
          .map(x => `${x.name} (${x.symbol || ""})`)
          .join(", ") || "N/A"
      ]
    ];

    info.forEach(([label, value]) => {
      const p = document.createElement("p");
      p.textContent = `${label}: ${value}`;
      facts.appendChild(p);
    });

  } catch (error) {
    facts.textContent = error.message;
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const name = input.value.trim();

  if (name) {
    showCountry(name);
  } else {
    facts.textContent = "Please enter a country name.";
  }
});

showCountry("ethiopia");