'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import ProductCard from '@/components/ProductCard'

export default function Favorites() {
  const favorites = useSelector((state: RootState) => state.favorites.items)

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 border-b pb-2 text-emerald-400">Your Favorites</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-600">You have no favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {favorites.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  )
}
