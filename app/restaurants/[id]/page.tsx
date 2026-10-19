
"use client";

import AddToCartButton from "../../../components/AddToCartButton";
import Link from "next/link";
import { Suspense } from "react";
import { useParams } from "next/navigation";

import { getRestaurant } from "../../../lib/restaurants";
import { useCart } from "../../../components/CartProvider";

function RestaurantContent() {
  const params = useParams<{ id: string }>();
  const restaurant = getRestaurant(params.id);
  const { addItem, count } = useCart();

  if (!restaurant) {
    return (
      <main className="container page-content">
        <h1>Restaurant not found</h1>

        <p>
          The restaurant you requested is unavailable.
        </p>

        <Link href="/" className="primary-button">
          Back to Restaurants
        </Link>
      </main>
    );
  }

  return (
    <main className="container page-content">
      <Link href="/" className="back-link">
        ← All Restaurants
      </Link>

      <div className="restaurant-banner">
        <div className="banner-emoji">
          {restaurant.emoji}
        </div>

        <div>
          <span className="eyebrow">
            {restaurant.category}
          </span>

          <h1>{restaurant.name}</h1>

          <p>{restaurant.description}</p>

          <div className="banner-meta">
            <span>★ {restaurant.rating}</span>

            <span>{restaurant.deliveryTime}</span>

            <span>
              Delivery ${restaurant.deliveryFee.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <h2>Our Menu</h2>
          <p>Freshly prepared favorites.</p>
        </div>

        <Link href="/cart" className="cart-shortcut">
          🛒 Cart ({count})
        </Link>
      </div>

      <div className="menu-grid">
        {restaurant.menu.map((item) => (
          <article className="menu-card" key={item.id}>
            <div className="menu-emoji">
              {item.emoji}
            </div>

            <div className="menu-details">
              <h3>{item.name}</h3>

              <p>{item.description}</p>

              <div className="menu-bottom">
                <strong>
                  ${item.price.toFixed(2)}
                </strong>

                <AddToCartButton
                  onAdd={() =>
                    addItem(item, restaurant.id)
                  }
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default function RestaurantPage() {
  return (
    <Suspense
      fallback={
        <main className="container page-content">
          <p>Loading restaurant...</p>
        </main>
      }
    >
      <RestaurantContent />
    </Suspense>
  );
}
