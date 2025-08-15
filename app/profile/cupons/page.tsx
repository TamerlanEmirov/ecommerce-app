'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { FaGift, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

export default function MyCouponsPage() {
  const coupons = useSelector((state: RootState) => state.cupons.coupons)

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6 text-black"> Kuponlarım</h2>

      {coupons.length === 0 ? (
        <p className="text-gray-400">Hazırda heç bir kuponunuz yoxdur.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coupons.map((c) => (
            <div
              key={c.id}
              className={`rounded-xl shadow-lg p-5 border ${
                c.used
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-emerald-600 border-emerald-500'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold">{c.code}</span>
                <FaGift className="text-yellow-300 text-2xl" />
              </div>
              <p className="text-lg">
                <span className="font-semibold">{c.discount} ₼</span> endirim
              </p>
              <p className="text-sm text-gray-300">
                Minimum məbləğ: {c.minAmount} ₼
              </p>
              <p className="text-sm text-gray-300">
                Bitmə tarixi: {new Date(c.expiresAt).toLocaleDateString()}
              </p>

              <div className="mt-4 flex items-center gap-2">
                {c.used ? (
                  <>
                    <FaTimesCircle className="text-red-400" />
                    <span className="text-red-400 font-medium">
                      İstifadə olunub
                    </span>
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="text-green-200" />
                    <span className="text-green-200 font-medium">Aktiv</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
