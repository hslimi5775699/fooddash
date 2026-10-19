
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { restaurants } from "../lib/restaurants";
import { useCart } from "../components/CartProvider";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { count } = useCart();

  const categories = [
    "All",
    ...new Set(restaurants.map((item) => item.category)),
  ];

  const filteredRestaurants = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return restaurants.filter((restaurant) => {
      const matchesSearch =
        restaurant.name
          .toLowerCase()
          .includes(searchTerm) ||
        restaurant.category
          .toLowerCase()
          .includes(searchTerm);

      const matchesCategory =
        category === "All" ||
        restaurant.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const hasActiveFilters =
    search.trim() !== "" || category !== "All";

  function clearFilters() {
    setSearch("");
    setCategory("All");
  }

  return (
    <main>
      <section className="hero">
        <div className="container hero-content">
          <div>
            <span className="eyebrow">
              YOUR NEXT GREAT MEAL STARTS HERE
            </span>

            <h1>
              Delicious food,
              <br />
              delivered to you.
            </h1>

            <p>
              Discover great local restaurants and enjoy
              your favorite meals without leaving home.
            </p>

            <a
              href="#restaurants"
              className="primary-button"
            >
              Explore Restaurants
            </a>
          </div>

          <div className="hero-art" aria-hidden="true">
            <span>🍔</span>
            <span>🍕</span>
            <span>🥗</span>
          </div>
        </div>
      </section>

      <section
        className="container restaurant-section"
        id="restaurants"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              EXPLORE FOODDASH
            </span>

            <h2>Restaurants near you</h2>

            <p>
              Find something delicious for every craving.
            </p>
          </div>

          <Link
            href="/cart"
            className="cart-shortcut"
          >
            🛒 Cart ({count})
          </Link>
        </div>

        <div className="search-area">
          <input
            type="search"
            placeholder="Search restaurants or cuisines..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            aria-label="Search restaurants"
          />
        </div>

        <div className="categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={
                category === item
                  ? "category-button active"
                  : "category-button"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="search-results-toolbar">
          <p
            className="search-results-count"
            role="status"
          >
            {filteredRestaurants.length}{" "}
            {filteredRestaurants.length === 1
              ? "restaurant"
              : "restaurants"}{" "}
            found
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              className="clear-filters-button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="restaurant-grid">
          {filteredRestaurants.map((restaurant) => (
            <Link
              href={`/restaurants/${restaurant.id}`}
              className="restaurant-card"
              key={restaurant.id}
            >
              <div className="restaurant-image">
                <span>{restaurant.emoji}</span>
              </div>

              <div className="restaurant-details">
                <div className="restaurant-title-row">
                  <h3>{restaurant.name}</h3>

                  <span className="rating">
                    ★ {restaurant.rating}
                  </span>
                </div>

                <p>{restaurant.description}</p>

                <div className="restaurant-meta">
                  <span>{restaurant.category}</span>
                  <span>{restaurant.deliveryTime}</span>
                </div>

                <div className="restaurant-bottom">
                  <span>
                    Delivery $
                    {restaurant.deliveryFee.toFixed(2)}
                  </span>

                  <span className="view-menu">
                    View menu →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="empty-state">
            <h3>No restaurants found</h3>

            <p>
              Try another search or category.
            </p>

            <button
              type="button"
              className="clear-filters-button"
              onClick={clearFilters}
            >
              Show All Restaurants
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
