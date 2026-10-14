"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { MenuItem } from "../lib/restaurants";

type CartItem = MenuItem & {
  restaurantId: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: MenuItem, restaurantId: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("fooddash-cart");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch {
      localStorage.removeItem("fooddash-cart");
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        "fooddash-cart",
        JSON.stringify(items)
      );
    }
  }, [items, loaded]);

  function addItem(item: MenuItem, restaurantId: string) {
    setItems((current) => {
      const sameRestaurant = current.every(
        (entry) => entry.restaurantId === restaurantId
      );

      const startingItems = sameRestaurant ? current : [];

      const existing = startingItems.find(
        (entry) => entry.id === item.id
      );

      if (existing) {
        return startingItems.map((entry) =>
          entry.id === item.id
            ? {
                ...entry,
                quantity: entry.quantity + 1,
              }
            : entry
        );
      }

      return [
        ...startingItems,
        {
          ...item,
          restaurantId,
          quantity: 1,
        },
      ];
    });
  }

  function removeItem(id: string) {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const count = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartProvider is missing");
  }

  return context;
}