import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import favoriteReducer from './favoritesSlice'
import searchReducer from './searchSlice'
import ordersReducer from './ordersSlice'
import cuponsReducer from './cuponSlice'
import categoryReducer from './categorySlice'
import notificationReducer from './notificationSlice'
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoriteReducer,
     search:searchReducer,
       orders: ordersReducer,
       cupons:cuponsReducer,
       notification: notificationReducer,
       category:categoryReducer, 
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
