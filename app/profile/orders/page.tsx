// ✅ app/orders/page.tsx
'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function OrdersPage() {
  const orders = useSelector((state: RootState) => state.orders.items)

  return (
    <div className="max-w-6xl mx-auto  px-4 py-10">
      <h2 className="text-3xl font-semibold mb-6 border-b pb-2 text-emerald-500">
        Your Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg">You have no orders yet.</p>
      ) : (
        <div className="space-y-10">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-xl shadow-sm bg-white p-6 space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <p className="text-xl font-semibold">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                </div>
                <p
                  className={`font-medium mt-2 md:mt-0 ${
                    order.status === 'Pending'
                      ? 'text-yellow-600'
                      : 'text-green-600'
                  }`}
                >
                  {order.status}
                </p>
              </div>

              {order.coupon && (
                <div className="bg-emerald-50 p-4 rounded-md border border-emerald-200">
                  <p className="text-sm text-emerald-700 font-semibold">
                    🏱 Used Coupon: <span className="font-bold">{order.coupon.code}</span> — 
                    Discount: {order.coupon.discount} AZN
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border rounded-md p-3 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm font-bold text-emerald-600">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold">
                  Total:{' '}
                  <span className="text-emerald-600">${order.total.toFixed(2)}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}