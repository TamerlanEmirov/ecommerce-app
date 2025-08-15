'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateStatus } from '@/redux/ordersSlice';

export default function AdminOrdersPage() {
  const orders = useSelector((state: RootState) => state.orders.items);
  const dispatch = useDispatch();

  const handleStatusChange = (id: string, newStatus: string) => {
    dispatch(updateStatus({ id, newStatus: newStatus as any }));
  };

  const statusColors: Record<string, string> = {
    Pending: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    Shipped: 'bg-blue-100 text-blue-800 border border-blue-300',
    Delivered: 'bg-purple-100 text-purple-800 border border-purple-300',
    Completed: 'bg-green-100 text-green-800 border border-green-300',
  };

  return (
    <div className="p-6 text-gray-800">
      <h2 className="text-3xl font-bold mb-8"> Sifarişlər (Admin)</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-lg">Heç bir sifariş yoxdur.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all p-5 flex flex-col"
            >
              {/* Başlıq */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${statusColors[order.status]}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Kupon */}
              {order.coupon && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4 shadow-sm">
                  <p className="text-sm text-emerald-700 font-semibold">
                    🏷 Kupon: {order.coupon.code}  
                    <span className="ml-2 font-normal">
                      (-{order.coupon.discount} ₼)
                    </span>
                  </p>
                </div>
              )}

              {/* Məhsullar */}
              <div className="space-y-3 mb-4 flex-1">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border rounded-lg p-2 hover:bg-gray-50 transition shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} ədəd • {item.price} ₼
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total və Status dəyişmə */}
              <div className="mt-auto border-t pt-3 flex items-center justify-between">
                <p className="text-lg font-semibold text-emerald-600">
                  {order.total} ₼
                </p>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="border rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-emerald-400 shadow-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
