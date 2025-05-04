"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the context
const CartContext = createContext({
  cartCount: 0,
  incrementCart: () => {},
  decrementCart: () => {},
  refreshCart: () => {},
})

// Provider component
export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0)

  // Function to fetch cart count from server
  const refreshCart = async () => {
    try {
      // Use fetch instead of direct server action call
      const response = await fetch('/api/cart-count')
      if (response.ok) {
        const data = await response.json()
        setCartCount(data.count || 0)
      }
    } catch (error) {
      console.error("Error fetching cart count:", error)
    }
  }

  // Increment cart count (used when adding items)
  const incrementCart = () => {
    setCartCount((prevCount) => prevCount + 1)
  }

  // Decrement cart count (used when removing items)
  const decrementCart = () => {
    setCartCount((prevCount) => Math.max(0, prevCount - 1))
  }

  // Initial fetch
  useEffect(() => {
    refreshCart()
  }, [])

  return (
    <CartContext.Provider value={{ cartCount, incrementCart, decrementCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use the cart context
export function useCart() {
  return useContext(CartContext)
}
