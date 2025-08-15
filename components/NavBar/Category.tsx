'use client'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCategory, setSubCategory } from '@/redux/searchSlice'

const categories = [
  { name: 'Elektronika' },
  { name: 'Geyim' },
  { name: 'Kitablar' },
  { name: 'Aksesuarlar' },
]

const Category = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dispatch = useDispatch()

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  const handleCategoryClick = (cat: string) => {
    dispatch(setCategory(cat))
    dispatch(setSubCategory(null)) // Alt-kateqoriya sıfırlanır
    setMobileMenuOpen(false) // menyunu bağla
  }

  return (
    <div className="relative">
      {/* Mobil Versiya */}
      <div className="md:hidden block">
        <button
          onClick={toggleMobileMenu}
          className="w-full px-4 py-2 bg-gray-100 text-black text-left font-medium rounded hover:bg-gray-200 transition"
        >
          Kategoriyalar
        </button>

        {mobileMenuOpen && (
          <div className="absolute z-20 bg-white text-black w-full shadow-lg mt-1 rounded">
            <ul className="flex flex-col divide-y divide-gray-200">
              {categories.map((cat) => (
                <li
                  key={cat.name}
                  className="px-4 py-2 hover:bg-emerald-50 cursor-pointer transition"
                  onClick={() => handleCategoryClick(cat.name)}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Desktop Versiya */}
      <div className="hidden md:block relative group">
        <button className="px-4 py-2 bg-gray-100 text-black font-medium rounded hover:bg-gray-200 transition">
          Kategoriyalar
        </button>

        <div
          className="absolute left-0 top-full mt-1 w-40 bg-white text-black rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20"
        >
          <ul className="flex flex-col divide-y divide-gray-200">
            {categories.map((cat) => (
              <li
                key={cat.name}
                className="px-4 py-2 hover:bg-emerald-50 cursor-pointer transition"
                onClick={() => handleCategoryClick(cat.name)}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Category
