// redux/favoriteSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Product = {
  id: string
  name: string
  price: number
  image: string
  rating: number
  description: string
}

type FavoriteState = {
  items: Product[]
}

// ⬇️ localStorage-dən favoritləri oxuyan funksiya
const loadFavoritesFromStorage = (): Product[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('favorites')
    return stored ? JSON.parse(stored) : []
  }
  return []
}

const initialState: FavoriteState = {
  items: loadFavoritesFromStorage(),
}

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(item => item.id === action.payload.id)
      if (exists) {
        state.items = state.items.filter(item => item.id !== action.payload.id)
      } else {
        state.items.push(action.payload)
      }
      // hər dəfə dəyişəndə yadda saxla
      localStorage.setItem('favorites', JSON.stringify(state.items))
    },
  },
})

export const { toggleFavorite } = favoriteSlice.actions
export default favoriteSlice.reducer
