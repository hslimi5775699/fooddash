
"use client";

import { useState } from "react";

type AddToCartButtonProps = {
  onAdd: () => void;
};

export default function AddToCartButton({
  onAdd,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    onAdd();
    setAdded(true);
  }

  return (
    <div className="add-to-cart-control">
      <button
        type="button"
        onClick={handleAdd}
        className="add-to-cart-button"
      >
        Add to Cart
      </button>

      {added && (
        <p className="add-to-cart-success" role="status">
          ✓ Added to cart!
        </p>
      )}
    </div>
  );
}
