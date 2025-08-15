'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import Favorites from './favorites/Favorites'
import OrdersPage from './orders/page'
import CouponsPage from './cupons/page'
import CuponsPage from './cupons/page'

const tabs = ['Profile', 'Orders', 'Favorites', 'Coupons'] as const
type Tab = typeof tabs[number]

export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [activeTab, setActiveTab] = useState<Tab>('Profile')

  if (!isLoaded) return <p className="p-6">Loading...</p>

  if (!isSignedIn) {
    return (
      <div className="p-6 mt-32 text-center">
        <h2 className="text-2xl font-semibold">You are signed out.</h2>
        <p className="text-gray-600 mt-2">
          Please <a href="/" className="text-blue-500 underline">go to homepage</a> or sign in again.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 pt-24">
      <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto px-4 md:px-12 py-8 gap-10">

        {/* Sidebar */}
        <aside className="w-full md:w-1/4 border-r border-gray-200 pr-4">
          <ul className="space-y-3 sticky top-28">
            {tabs.map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-4 py-2 rounded-md transition font-medium ${
                    activeTab === tab
                      ? 'bg-emerald-500 text-white shadow'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
 <section className="w-full md:w-3/4">
  {activeTab === 'Profile' && (
    <div className="bg-white shadow-sm rounded-xl p-6">
      <h2 className="text-3xl font-semibold mb-6 border-b pb-3 text-emerald-500">
        Profile Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-base">
        <div>
          <p className="font-medium text-gray-500 mb-1">Full Name</p>
          <p className="font-semibold text-gray-900">{user.fullName}</p>
        </div>

        <div>
          <p className="font-medium text-gray-500 mb-1">Email</p>
          <p className="font-semibold text-gray-900">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>

        <div>
          <p className="font-medium text-gray-500 mb-1">User ID</p>
          <p className="font-semibold text-gray-900">{user.id}</p>
        </div>
      </div>
    </div>
  )}



          {activeTab === 'Orders' && <OrdersPage/>}

          {activeTab === 'Favorites' && <Favorites />}
          {activeTab === 'Coupons' && <CuponsPage/>}
        </section>
      </div>
    </div>
  )
}
