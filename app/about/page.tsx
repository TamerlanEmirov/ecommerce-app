'use client'

import React from 'react'
import { FaRocket, FaUsers, FaShoppingCart } from 'react-icons/fa'

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-28 pb-16 bg-gray-50 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Biz Kimik?</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Müasir e-commerce platforması olaraq, müştərilərimizə innovativ və sadə alış-veriş təcrübəsi təqdim edirik.
          </p>
        </section>

        {/* Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
            <FaRocket className="text-4xl text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Yenilikçi Texnologiya</h3>
            <p className="text-gray-600">
              Saytımız yüksək sürət və mobil uyğunluq üçün optimallaşdırılmışdır.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
            <FaUsers className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">İstifadəçi Mərkəzli</h3>
            <p className="text-gray-600">
              Bizim üçün əsas önəm istifadəçilərimizin rahatlığı və məmnuniyyətidir.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
            <FaShoppingCart className="text-4xl text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sadə Alış-Veriş</h3>
            <p className="text-gray-600">
              Məhsulları tez tap, səbətə əlavə et və asanlıqla sifariş et.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mt-16 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-emerald-600 mb-4">Bizim Missiyamız</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Texnologiyanın imkanlarından istifadə edərək hər kəs üçün əlçatan və rahat alış-veriş platforması qurmaq. 
            Komandamız daim yeni ideyalar üzərində çalışır və sizin təcrübənizi daha da yaxşılaşdırmaq üçün inkişafı davam etdirir.
          </p>
        </section>
      </div>
    </main>
  )
}
