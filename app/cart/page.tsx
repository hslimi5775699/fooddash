"use client";

import Link from "next/link";

import { useCart } from "../../components/CartProvider";
import { getRestaurant } from "../../lib/restaurants";

export default function CartPage() {
  const {
    items,
    addItem,
    removeItem,
    clearCart,
    total,
  } = useCart();

  const restaurant = items.length
    ? getRestaurant(items[0].restaurantId)
    : undefined;

  const deliveryFee = restaurant?.deliveryFee ?? 0;
  const grandTotal = total + deliveryFee;

  return (
    <main className="container page-content">
      <Link href="/" className="back-link">
        ← Continue Shopping
      </Link>

      <div className="section-heading">
        <div>
          <h1>Your Cart</h1>
          <p>Review your order before checkout.</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-emoji">🛒</div>

          <h2>Your cart is empty</h2>

          <p>
            Discover a restaurant and add something tasty.
          </p>

          <Link href="/" className="primary-button">
            Explore Restaurants
          </Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <section className="cart-items">
            <h2>
              {restaurant?.name ?? "Your Order"}
            </h2>

            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-item-emoji">
                  {item.emoji}
                </div>

                <div className="cart-item-info">
                  <h3>{item.name}</h3>

                  <p>
                    ${item.price.toFixed(2)} each
                  </p>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove one ${item.name}`}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        addItem(item, item.restaurantId)
                      }
                      aria-label={`Add one ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <strong>
                  ${(item.price * item.quantity).toFixed(2)}
                </strong>
              </article>
            ))}

            <button
              type="button"
              className="text-button"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </section>

          <aside className="order-summary">
            <h2>Order Summary</h2>

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
              Demo pricing. Taxes and payment processing
              are not included.
            </p>

            <Link
              href="/checkout"
              className="primary-button full-width"
            >
              Continue to Checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}