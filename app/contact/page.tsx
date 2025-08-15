'use client'

import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Zəhmət olmasa bütün sahələri doldurun!')
      return
    }
    toast.success('Mesaj uğurla göndərildi!')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <main className="min-h-screen pt-28 pb-16 bg-gray-50 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Başlıq */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Bizimlə Əlaqə</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Suallarınız və ya təklifləriniz varsa, bizimlə rahatlıqla əlaqə saxlaya bilərsiniz.
          </p>
        </section>

        {/* Əlaqə və Form Bölməsi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Əlaqə Məlumatları */}
          <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-2xl text-emerald-500" />
              <p className="text-gray-700">Bakı, Azərbaycan</p>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-2xl text-emerald-500" />
              <p className="text-gray-700">info@tamerstore.az</p>
            </div>
            <div className="flex items-center gap-4">
              <FaPhone className="text-2xl text-emerald-500" />
              <p className="text-gray-700">+994 50 123 45 67</p>
            </div>
          </div>

          {/* Əlaqə Formu */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-8 space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Adınız</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Adınızı daxil edin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="example@gmail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mesajınız</label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 bg-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Mesajınızı bura yazın..."
              />
            </div>
            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition"
            >
              Göndər
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
