// redux/cuponSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Coupon = {
  id: string
  code: string
  discount: number
  minAmount: number
  expiresAt: string
  used: boolean
}

type CouponsState = {
  coupons: Coupon[]
}

const loadCouponsFromStorage = (): Coupon[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('coupons')
    return stored ? JSON.parse(stored) : []
  }
  return []
}

const initialState: CouponsState = {
  coupons: loadCouponsFromStorage(),
}

export const couponsSlice = createSlice({
  name: 'cupons',
  initialState,
  reducers: {
    addCoupon: (state, action: PayloadAction<Coupon>) => {
      state.coupons.push(action.payload)
      localStorage.setItem('coupons', JSON.stringify(state.coupons))
    },
    markAsUsed: (state, action: PayloadAction<string>) => {
      const coupon = state.coupons.find(c => c.id === action.payload)
      if (coupon) coupon.used = true
      localStorage.setItem('coupons', JSON.stringify(state.coupons))
    },
  },
})

export const { addCoupon, markAsUsed } = couponsSlice.actions
export default couponsSlice.reducer
