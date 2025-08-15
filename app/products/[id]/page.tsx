'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/redux/cartSlice'
import { RootState } from '@/redux/store'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { toggleFavorite } from '@/redux/favoritesSlice'
import ProductCard from '@/components/ProductCard'

type Product = {
  id: string
  name: string
  price: number
  image: string
  rating: number
  description: string
}

export default function ProductDetailsPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [related, setRelated] = useState<Product[]>([])

  const favorites = useSelector((state: RootState) => state.favorites.items)
  const isFavorite = favorites.some(item => item.id === product?.id)

  useEffect(() => {
    if (!id) return
    axios.get(`https://68936184c49d24bce86a9883.mockapi.io/api/auu/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => setError('Failed to load product.'))
      .finally(() => setLoading(false))
  }, [id])

    useEffect(() => {
    if (!id) return
    axios.get(`https://68936184c49d24bce86a9883.mockapi.io/api/auu/products`)
      .then(res => {
        const others = res.data.filter((p: Product) => p.id !== id)
        const randomSix = others.sort(() => 0.5 - Math.random()).slice(0, 6)
        setRelated(randomSix)
      })
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }))
    }
  }

  const handleToggleFavorite = () => {
    if (product) {
      dispatch(toggleFavorite(product))
    }
  }

  if (loading) return <p className="text-center p-4">Loading...</p>
  if (error) return <p className="text-center p-4 text-red-500">{error}</p>
  if (!product) return null

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6 bg-white rounded-xl shadow">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-cover rounded-lg"
        />
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <button
              onClick={handleToggleFavorite}
              className={`text-xl ${isFavorite ? 'text-emerald-600' : 'text-gray-400'} hover:text-emerald-700 transition`}
              aria-label="Toggle Favorite"
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-emerald-600 mb-4">${product.price}</p>
          <p className="text-sm text-gray-600 mb-6">Rating: {product.rating}</p>

          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
         {/* 🔽 Related Products Bölməsi */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {related.map((prod) => (
              <ProductCard key={prod.id} {...prod} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
