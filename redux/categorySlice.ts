// redux/categorySlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

type Category = { id: string; name: string }
type SubCategory = { id: string; name: string }
type Product = {
  id: string
  name: string
  price: number
  image: string
  rating: number
  description: string
}

type CategoryState = {
  categories: Category[]
  subcategories: SubCategory[]
  products: Product[]
  selectedCategoryId: string | null
  selectedSubCategoryId: string | null
  loading: boolean
}

const initialState: CategoryState = {
  categories: [],
  subcategories: [],
  products: [],
  selectedCategoryId: null,
  selectedSubCategoryId: null,
  loading: false,
}

// ✅ Kategoriyalar
export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const res = await axios.get('/api/categories')
  return res.data
})

// ✅ Subkategoriyalar
export const fetchSubCategories = createAsyncThunk(
  'subcategories/fetch',
  async (categoryId: string) => {
    const res = await axios.get(`/api/categories/${categoryId}/subcategories`)
    return res.data
  }
)

// ✅ Məhsullar
export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async ({ categoryId, subCategoryId }: { categoryId: string; subCategoryId?: string }) => {
    let url = `/api/products?category=${categoryId}`
    if (subCategoryId) url += `&subcategory=${subCategoryId}`
    const res = await axios.get(url)
    return res.data
  }
)

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategoryId = action.payload
      state.selectedSubCategoryId = null // reset subcat
    },
    setSelectedSubCategory(state, action: PayloadAction<string>) {
      state.selectedSubCategoryId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.subcategories = action.payload
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
      })
  },
})

export const { setSelectedCategory, setSelectedSubCategory } = categorySlice.actions
export default categorySlice.reducer
