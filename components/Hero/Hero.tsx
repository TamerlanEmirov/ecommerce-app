// components/Hero.tsx
'use client'
import React from 'react'

export default function Hero() {
  // Home.tsx və ya Hero.tsx içində

const scrollToProducts = () => {
  const element = document.getElementById("productlist");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

  return (
    <section className="flex items-center justify-center bg-gray-100 dark:white py-25 mb-20 mt-20 h-[70vh]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Content hissəsi mərkəzdə */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-500  leading-tight mb-4">
            Yeni Trendləri Kəşf Et
          </h1>
          <p className="text-lg text-black  mb-6">
            Gündəlik geyimlərdən lüks kolleksiyalara qədər – hamısı burada.
          </p>
         <button
  onClick={scrollToProducts}
  className="text-white bg-black hover:bg-emerald-500 transition-colors px-8 py-4 rounded"
>
  İndi Alış-veriş Et
</button>

        </div>

      </div>
    </section>
  )
}
