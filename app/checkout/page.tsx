"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import { useCart } from "../../components/CartProvider";
import { getRestaurant } from "../../lib/restaurants";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const restaurant = items.length
    ? getRestaurant(items[0].restaurantId)
    : undefined;

  const deliveryFee = restaurant?.deliveryFee ?? 0;
  const grandTotal = total + deliveryFee;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !phone.trim() || !address.trim()) {
      return;
    }

    if (items.length === 0) {
      return;
    }

    setOrderPlaced(true);
    clearCart();
  }

  if (orderPlaced) {
    return (
      <main className="container page-content">
        <div className="empty-state">
          <div className="empty-emoji">✅</div>

          <h1>Order Confirmed!</h1>

          <p>
            Thank you, {name}! Your demo order has been
            placed successfully.
          </p>

          <p>
            This is a demonstration checkout.
            No real order or payment was processed.
          </p>

          <Link href="/" className="primary-button">
            Back to Restaurants
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="container page-content">
        <div className="empty-state">
          <div className="empty-emoji">🛒</div>

          <h1>Your cart is empty</h1>

          <p>
            Add some delicious food before checking out.
          </p>

          <Link href="/" className="primary-button">
            Explore Restaurants
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container page-content">
      <Link href="/cart" className="back-link">
        ← Back to Cart
      </Link>

      <div className="section-heading">
        <div>
          <h1>Checkout</h1>
          <p>
            Just a few details before your food is on its way.
          </p>
        </div>
      </div>

      <div className="checkout-layout">
        <section className="checkout-form">
          <h2>Delivery Information</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="customer-name">
                Full Name
              </label>

              <input
                id="customer-name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="customer-phone">
                Phone Number
              </label>

              <input
                id="customer-phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="customer-address">
                Delivery Address
              </label>

              <input
                id="customer-address"
                type="text"
                placeholder="Street address, city, postal code"
                value={address}
                onChange={(event) =>
                  setAddress(event.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="delivery-instructions">
                Delivery Instructions (Optional)
              </label>

              <textarea
                id="delivery-instructions"
                placeholder="Apartment number, building entrance..."
                rows={4}
                value={instructions}
                onChange={(event) =>
                  setInstructions(event.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className="primary-button full-width"
            >
              Place Demo Order
            </button>
          </form>
        </section>

        <aside className="order-summary">
          <h2>Order Summary</h2>

          {restaurant && (
            <p className="summary-restaurant">
              {restaurant.name}
            </p>
          )}

          {items.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>
                {item.quantity} × {item.name}
              </span>

              <span>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>

          <div className="summary-row total-row">
            <strong>Total</strong>
            <strong>${grandTotal.toFixed(2)}</strong>
          </div>

          <p className="summary-note">
            Demo checkout only. No real payment
            will be collected.
          </p>
        </aside>
      </div>
    </main>
  );
}