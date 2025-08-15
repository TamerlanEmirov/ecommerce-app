// redux/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

type CartState = {
  items: CartItem[]
}

// ⬇️ LocalStorage-dən data oxuma funksiyası
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('cart')
    return stored ? JSON.parse(stored) : []
  }
  return []
}

const initialState: CartState = {
  items: loadCartFromStorage(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existing = state.items.find(item => item.id === action.payload.id)
      if (existing) {
        existing.quantity++
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) item.quantity++
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item && item.quantity > 1) item.quantity--
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    clearCart: (state) => {
      state.items = []
      localStorage.removeItem('cart')
    }
  },
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
