import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type OrderItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export type CouponInfo = {
  code: string
  discount: number
}

export type Order = {
  id: string
  date: string
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Completed'
  total: number
  items: OrderItem[]
  coupon?: CouponInfo
  customerName?: string   // ✅ əlavə olundu
  customerEmail?: string  // ✅ əlavə olundu
}

type OrdersState = {
  items: Order[]
}

const loadOrdersFromStorage = (): Order[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('orders')
    return stored ? JSON.parse(stored) : []
  }
  return []
}

const initialState: OrdersState = {
  items: loadOrdersFromStorage(),
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.items.push(action.payload)
      localStorage.setItem('orders', JSON.stringify(state.items))
    },
    updateStatus: (state, action: PayloadAction<{ id: string; newStatus: Order['status'] }>) => {
      const order = state.items.find(o => o.id === action.payload.id)
      if (order) {
        order.status = action.payload.newStatus
        localStorage.setItem('orders', JSON.stringify(state.items))
      }
    },
  },
})

export const { addOrder, updateStatus } = ordersSlice.actions
export default ordersSlice.reducer
