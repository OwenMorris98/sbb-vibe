"use client";

import { useCart } from "@/components/CartProvider";

export default function CartButton() {
  const { totalItems, openDrawer } = useCart();

  return (
    <button
      onClick={openDrawer}
      aria-label={`Open cart — ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
      className="relative p-2 text-gray-400 hover:text-white transition-colors"
    >
      {/* Shopping bag icon */}
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>

      {/* Item count badge */}
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-amber text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  );
}
