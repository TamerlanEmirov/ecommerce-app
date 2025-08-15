// components/Footer.tsx
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-emerald-600 text-white px-6 py-10 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo and About */}
        <div>
          <h2 className="text-xl font-bold">MyStore</h2>
          <p className="text-sm mt-3 text-gray-400">
            Sizi sevən və keyfiyyətli məhsullar təqdim edən bir e-ticarət saytı.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Sürətli Keçidlər</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#">Ana Səhifə</a></li>
            <li><a href="#">Məhsullar</a></li>
            <li><a href="#">Haqqımızda</a></li>
            <li><a href="#">Əlaqə</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Bizə Qoşul</h3>
          <div className="flex space-x-4 text-gray-400">
            <a href="#"><FaFacebook className="hover:text-white" /></a>
            <a href="#"><FaInstagram className="hover:text-white" /></a>
            <a href="#"><FaTwitter className="hover:text-white" /></a>
            <a href="#"><FaYoutube className="hover:text-white" /></a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Yeniliklər üçün abunə olun</h3>
          <form className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Email adresiniz" 
              className="px-3 py-2 text-sm rounded bg-gray-800 border border-gray-700 placeholder-gray-500"
            />
            <button 
              type="submit" 
              className="bg-white text-black px-3 py-2 rounded text-sm hover:bg-gray-300"
            >
              Abunə ol
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MyStore. Bütün hüquqlar qorunur.
      </div>
    </footer>
  )
}
