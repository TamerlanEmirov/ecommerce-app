'use client'

import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { setSubCategory } from '@/redux/searchSlice'
import ProductCard from '../ProductCard'

interface Product {
  id: string
  name: string
  category: string
  subCategory: string
  rating: number
  price?: number
  image?: string
  description?: string
  [key: string]: any
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const dispatch = useDispatch()
  const category = useSelector((state: RootState) => state.search.category)
  const subCategory = useSelector((state: RootState) => state.search.subCategory)
  const filter = useSelector((state: RootState) => state.search.filter)

  const subCategories = useMemo(() => {
    if (!category || category === 'all') return []
    return Array.from(
      new Set(
        products
          .filter((p) => p.category === category)
          .map((p) => p.subCategory)
      )
    ).filter(Boolean)
  }, [products, category])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await axios.get<Product[]>(
          'https://68936184c49d24bce86a9883.mockapi.io/api/auu/products'
        )

        const mapped = res.data.map((p: any) => ({
          ...p,
          subCategory: p.subCategory || p.subcategory || ''
        }))

        setProducts(mapped)
      } catch (err) {
        console.error(err)
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    let list = [...products]

    if (category && category !== 'all') {
      list = list.filter((p) => p.category === category)
    }

    if (subCategory) {
      list = list.filter((p) => p.subCategory === subCategory)
    }

    if (filter === 'mostRated') {
      list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    }

    return list
  }, [products, category, subCategory, filter])

  if (loading) return <p>Loading products...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="space-y-6">
      {category !== 'all' && subCategories.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => dispatch(setSubCategory(null))}
            className={`px-4 py-2 rounded-lg shadow-sm font-medium transition-colors duration-200 
              ${subCategory === null 
                ? 'bg-emerald-500 text-white shadow-md' 
                : 'bg-gray-100 text-gray-800 hover:bg-blue-50'}`}
          >
            All
          </button>
          {subCategories.map((sub) => (
            <button
              key={sub}
              onClick={() => dispatch(setSubCategory(sub))}
              className={`px-4 py-2 rounded-lg shadow-sm font-medium transition-colors duration-200 
                ${subCategory === sub 
                  ? 'bg-emerald-500 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-800 hover:bg-blue-50'}`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name ?? 'Unknown'}
              price={product.price ?? 0}
              image={product.image ?? '/placeholder.jpg'}
              rating={product.rating ?? 0}
              description={product.description ?? 'No description'}
            />
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  )
}
