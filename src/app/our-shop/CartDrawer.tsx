"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";

export default function CartDrawer() {
  const { items, removeItem, updateQty, clearCart, subtotal, isDrawerOpen, closeDrawer } =
    useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  // Close on Escape key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeDrawer]);

  async function handleCheckout() {
    setIsCheckingOut(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Server error ${res.status}`);
      }

      const { checkoutUrl } = await res.json();
      clearCart();
      window.location.href = checkoutUrl;
    } catch (err) {
      setCheckoutError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setIsCheckingOut(false);
    }
  }

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[1010]"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[1020] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-navy-dark">
            Your Cart{" "}
            {items.length > 0 && (
              <span className="text-sm font-normal text-gray-400">
                ({items.reduce((s, i) => s + i.quantity, 0)} item
                {items.reduce((s, i) => s + i.quantity, 0) !== 1 ? "s" : ""})
              </span>
            )}
          </h2>
          <button
            onClick={closeDrawer}
            aria-label="Close cart"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-gray-400">
              <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="font-medium text-gray-500">Your cart is empty</p>
              <button
                onClick={closeDrawer}
                className="text-amber text-sm font-semibold hover:underline"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-7 h-7 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy-dark text-sm leading-snug truncate">
                      {product.name}
                    </p>
                    <p className="text-amber font-bold text-sm mt-0.5">
                      ${product.price.toFixed(2)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(product.id, quantity - 1)}
                        aria-label="Decrease quantity"
                        className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-amber hover:text-amber transition-colors text-sm font-bold"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold text-navy-dark w-4 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQty(product.id, quantity + 1)}
                        aria-label="Increase quantity"
                        disabled={quantity >= product.stock}
                        className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-amber hover:text-amber transition-colors text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-500"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Line total + remove */}
                  <div className="flex flex-col items-end justify-between flex-shrink-0">
                    <span className="font-bold text-navy-dark text-sm">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(product.id)}
                      aria-label={`Remove ${product.name}`}
                      className="text-xs text-gray-400 hover:text-red-500 transition-colors mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-4">
            {checkoutError && (
              <p className="text-red-500 text-sm text-center">{checkoutError}</p>
            )}

            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Subtotal</span>
              <span className="text-navy-dark font-bold text-lg">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <p className="text-gray-400 text-xs">
              Shipping and taxes calculated at checkout.
            </p>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-amber hover:bg-amber/90 text-white font-bold uppercase tracking-widest text-sm py-3.5 rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? "Redirecting to Checkout…" : "Checkout"}
            </button>

            <button
              onClick={closeDrawer}
              className="w-full text-center text-gray-400 text-xs hover:text-gray-600 transition-colors py-1"
            >
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
