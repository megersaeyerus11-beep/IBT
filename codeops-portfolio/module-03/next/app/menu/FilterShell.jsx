"use client";

import { useState } from "react";

export default function FilterShell({ children }) {
const [showVegetarian, setShowVegetarian] = useState(false);

return (
    <div>
    <div className="filter-controls">
        <button
        type="button"
        onClick={() => setShowVegetarian((value) => !value)}
        >
        {showVegetarian
            ? "Show All Dishes"
            : "Show Vegetarian Only"}
        </button>
    </div>

    {showVegetarian ? (
        <p>
        Vegetarian filter is active. The server-rendered
        DishList is still provided through children.
        </p>
    ) : null}

    {children}
    </div>
);
}