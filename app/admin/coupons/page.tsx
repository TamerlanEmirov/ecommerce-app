'use client'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { v4 as uuidv4 } from 'uuid'
import { FaCheck, FaPlus } from 'react-icons/fa'
import { addCoupon, markAsUsed, Coupon } from '@/redux/cuponSlice'

export default function AdminCouponsPage() {
  const coupons = useSelector((state: RootState) => state.cupons.coupons)
  const dispatch = useDispatch()

  const [newCoupon, setNewCoupon] = useState<Omit<Coupon, 'id' | 'used'>>({
    code: '',
    discount: 0,
    minAmount: 0,
    expiresAt: '',
  })

  const handleAddCoupon = () => {
    if (
      !newCoupon.code.trim() ||
      newCoupon.discount <= 0 ||
      newCoupon.minAmount < 0 ||
      !newCoupon.expiresAt
    ) {
      alert('Bütün sahələri düzgün doldurun!')
      return
    }

    const coupon: Coupon = {
      id: uuidv4(),
      ...newCoupon,
      used: false,
    }

    dispatch(addCoupon(coupon))
    setNewCoupon({ code: '', discount: 0, minAmount: 0, expiresAt: '' })
  }

  const handleMarkUsed = (id: string) => {
    dispatch(markAsUsed(id))
  }

  return (
    <div className="p-6 text-gray-800">
      <h2 className="text-3xl font-bold mb-6">Kuponlar</h2>

      {/* Yeni kupon formu */}
      <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          type="text"
          placeholder="Kupon kodu"
          value={newCoupon.code}
          onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
        />
        <input
          type="number"
          placeholder="Endirim (₼)"
          value={newCoupon.discount}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, discount: parseFloat(e.target.value) })
          }
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
        />
        <input
          type="number"
          placeholder="Min. məbləğ (₼)"
          value={newCoupon.minAmount}
          onChange={(e) =>
            setNewCoupon({
              ...newCoupon,
              minAmount: parseFloat(e.target.value),
            })
          }
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
        />
        <input
          type="date"
          value={newCoupon.expiresAt}
          onChange={(e) =>
            setNewCoupon({ ...newCoupon, expiresAt: e.target.value })
          }
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
        />

        <div className="col-span-1 md:col-span-4 flex gap-3 mt-2">
          <button
            onClick={handleAddCoupon}
            className="px-5 py-2 rounded-lg text-white font-semibold transition shadow-md bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
          >
            <FaPlus /> Əlavə et
          </button>
        </div>
      </div>

      {/* Kupon cədvəli */}
      {coupons.length === 0 ? (
        <p className="text-gray-500">Hazırda heç bir kupon yoxdur.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-emerald-600 text-white">
                <th className="px-3 py-2 text-left">Kod</th>
                <th className="px-3 py-2 text-left">Endirim</th>
                <th className="px-3 py-2 text-left">Min. Məbləğ</th>
                <th className="px-3 py-2 text-left">Bitmə tarixi</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-3 py-2 font-semibold">{c.code}</td>
                  <td className="px-3 py-2">{c.discount} ₼</td>
                  <td className="px-3 py-2">{c.minAmount} ₼</td>
                  <td className="px-3 py-2">
                    {new Date(c.expiresAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2">
                    {c.used ? (
                      <span className="text-red-500 font-medium">İstifadə olunub</span>
                    ) : (
                      <span className="text-green-600 font-medium">Aktiv</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {!c.used && (
                      <button
                        onClick={() => handleMarkUsed(c.id)}
                        className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition shadow-sm"
                      >
                        <FaCheck /> İstifadə et
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
