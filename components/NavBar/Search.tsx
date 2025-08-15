'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery } from '@/redux/searchSlice'
import { RootState } from '@/redux/store'

export default function Search() {
  const dispatch = useDispatch()
  const query = useSelector((state: RootState) => state.search.query)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value))
  }

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={query}
      onChange={handleChange}
      className="w-full px-3 py-2 rounded text-sm border border-gray-300 focus:outline-none focus:ring focus:ring-emerald-300"
    />
  )
}
