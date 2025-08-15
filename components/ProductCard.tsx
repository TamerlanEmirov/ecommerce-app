'use client'

import React from 'react'
import { FaShoppingCart, FaEye, FaHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/redux/cartSlice'
import { RootState } from '@/redux/store'
import { toggleFavorite } from '@/redux/favoritesSlice'
import Link from 'next/link'

type ProductCardProps = {
  id: string
  name: string
  price: number
  image: string
  rating: number
  description: string
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  rating,
  description,
}: ProductCardProps) {
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites.items)
  const isFavorite = favorites.some(item => item.id === id)

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, price, image }))
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite({ id, name, price, image, rating, description }))
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col relative">
      <img src={image} alt={name} className="w-full h-56 object-cover" />

      {/* ❤️ Favorite button */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-3 right-3 text-xl text-red-500 hover:scale-110 transition"
      >
        <FaHeart className={isFavorite ? 'fill-red-600' : 'fill-white stroke-red-500'} />
      </button>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-bold text-emerald-600">${price}</span>
            <span className="text-sm text-yellow-500">⭐ {rating}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm w-full transition"
            >
              <FaShoppingCart /> Add to Cart
            </button>

           
<Link href={`/products/${id}`} className="w-full">
  <button
    className="flex items-center justify-center gap-2 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-md text-sm w-full transition"
  >
    <FaEye /> View Details
  </button>
</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
