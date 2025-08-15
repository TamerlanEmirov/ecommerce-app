'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import { FaBox, FaShoppingCart, FaUsers, FaMoneyBillWave } from 'react-icons/fa'

export default function AdminDashboardPage() {
  const orders = useSelector((state: RootState) => state.orders.items)
  const [products, setProducts] = useState<any[]>([])

  // ✅ API-dən məhsulları çəkmək
  useEffect(() => {
    fetch('https://68936184c49d24bce86a9883.mockapi.io/api/auu/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Məhsul yükləmə xətası:', err))
  }, [])

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0)
  const totalOrders = orders.length
  const uniqueCustomers = new Set(orders.map((o) => o.customerEmail || '')).size
  const totalProducts = products.length

  const salesByDay = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    const dateStr = date.toLocaleDateString('az-AZ', { day: '2-digit', month: 'short' })
    const dailySales = orders
      .filter((o) => new Date(o.date).toDateString() === date.toDateString())
      .reduce((sum, o) => sum + o.total, 0)
    return { date: dateStr, sales: dailySales }
  })

  const statusCounts: Record<string, number> = {}
  orders.forEach((o) => {
    statusCounts[o.status] = (statusCounts[o.status] || 0) + 1
  })
  const statusData = Object.keys(statusCounts).map((status) => ({
    name: status,
    value: statusCounts[status],
  }))
  const COLORS = ['#facc15', '#3b82f6', '#a855f7', '#22c55e']

  const latestOrders = [...orders].slice(0, 5)

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800"> Admin Panel</h1>

      {/* Statistik Kartlar */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<FaMoneyBillWave />} title="Ümumi Satış" value={`${totalSales} ₼`} color="bg-green-500" />
        <StatCard icon={<FaShoppingCart />} title="Sifarişlər" value={totalOrders} color="bg-blue-500" />
        <StatCard icon={<FaUsers />} title="Müştərilər" value={uniqueCustomers} color="bg-yellow-500" />
        <StatCard icon={<FaBox />} title="Məhsullar" value={totalProducts} color="bg-purple-500" />
      </div>

      {/* Qrafiklər */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Satış Qrafiki */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-lg font-semibold mb-4"> Həftəlik Satış Qrafiki</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesByDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status Paylanması */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-lg font-semibold mb-4"> Sifariş Status Paylanması</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Son Sifarişlər */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <h2 className="text-lg font-semibold mb-4">🆕 Son Sifarişlər</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Müştəri</th>
                <th className="px-4 py-2">Tarix</th>
                <th className="px-4 py-2">Məbləğ</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{order.id.slice(0, 8)}</td>
                  <td className="px-4 py-2">{order.customerName || 'Anonim Müştəri'}</td>
                  <td className="px-4 py-2">{order.date}</td>
                  <td className="px-4 py-2 text-emerald-600 font-semibold">{order.total} ₼</td>
                  <td className="px-4 py-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, title, value, color }: { icon: React.ReactNode; title: string; value: string | number; color: string }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4">
      <div className={`text-white p-3 rounded-full text-xl ${color}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  )
}
