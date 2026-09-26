import { useCart } from "../cart/CartContext";
import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchMenu } from "../api/menuApi";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";

import Spinner from "../ui/Spinner";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

function Menu() {
  // Get addToCart from CartContext
  const { addToCart } = useCart();

  const {
    data: dishes = [],
    loading,
    error,
  } = useFetch(fetchMenu);

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");

  const searchRef = useRef(null);

  const selectedCategory =
    searchParams.get("category") || "All";

  const debouncedSearch = useDebounce(search, 300);

  // Create category list
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        dishes.map((dish) => dish.category)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [dishes]);

  // Filter dishes
  const filteredDishes = useMemo(() => {
    const term = debouncedSearch
      .trim()
      .toLowerCase();

    return dishes.filter((dish) => {
      const matchesCategory =
        selectedCategory === "All" ||
        dish.category === selectedCategory;

      const matchesSearch =
        !term ||
        dish.nameEn
          ?.toLowerCase()
          .includes(term) ||
        dish.nameAm?.includes(term);

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [
    dishes,
    selectedCategory,
    debouncedSearch,
  ]);

  // Change category in URL
  function handleCategory(category) {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category,
      });
    }
  }

  // Focus search input
  function focusSearch() {
    searchRef.current?.focus();
  }

  // Loading
  if (loading) {
    return <Spinner />;
  }

  // Error
  if (error) {
    return (
      <main className="page">
        <div className="error-card">
          <h1>Menu Error</h1>

          <p>{error}</p>

          <button
            className="button"
            onClick={focusSearch}
          >
            Try Search
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page">

      {/* Menu Header */}
      <section className="menu-header">

        <div>
          <p className="eyebrow">
            Addis Ababa
          </p>

          <h1>Our Menu</h1>

          <p>
            Traditional Ethiopian food made for
            every appetite.
          </p>
        </div>

        {/* Search */}
        <div className="search-box">

          <label htmlFor="menu-search">
            Search dishes
          </label>

          <input
            ref={searchRef}
            id="menu-search"
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search dishes..."
          />

        </div>

      </section>

      {/* Categories */}
      <CategoryBar
        categories={categories}
        selected={selectedCategory}
        onSelect={handleCategory}
      />

      {/* Result count */}
      <p className="results-count">
        Showing {filteredDishes.length} dishes
      </p>

      {/* Dish List */}
      <DishList
        dishes={filteredDishes}
        onAdd={addToCart}
      />

    </main>
  );
}

export default Menu;