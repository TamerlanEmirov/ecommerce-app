import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SearchState {
  query: string
  filter: 'all' | 'mostRated'
  category: string
  subCategory: string | null
}

const initialState: SearchState = {
  query: '',
  filter: 'all',
  category: 'all',
  subCategory: null,
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setFilter: (state, action: PayloadAction<'all' | 'mostRated'>) => {
      state.filter = action.payload
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
      state.subCategory = null // kategoriya dəyişəndə alt-kategoriya sıfırlanır
    },
    setSubCategory: (state, action: PayloadAction<string | null>) => {
      state.subCategory = action.payload
    },
  },
})

export const { setQuery, setFilter, setCategory, setSubCategory } = searchSlice.actions
export default searchSlice.reducer
