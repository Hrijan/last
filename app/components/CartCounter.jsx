"use client"

import { useCart } from "../context/CartContext"

export function CartCounter() {
  const { cartCount } = useCart()

  if (cartCount === 0) return null

  return (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
      {cartCount}
    </span>
  )
}
