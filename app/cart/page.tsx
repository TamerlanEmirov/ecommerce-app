'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '@/redux/cartSlice';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import CheckoutButton from './CheckoutButton';
import { markAsUsed } from '@/redux/cuponSlice';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const coupons = useSelector((state: RootState) => state.cupons.coupons);
  const dispatch = useDispatch();

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [error, setError] = useState('');

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

 const handleApplyCoupon = () => {
  const found = coupons.find(
    (c) =>
      c.code.toLowerCase() === couponInput.trim().toLowerCase() &&
      !c.used &&
      totalPrice >= c.minAmount &&
      new Date(c.expiresAt).getTime() > Date.now()
  );

  if (found) {
    setAppliedCoupon(found);
    setError('');
    // ❌ buradakı dispatch(markAsUsed) silinir
  } else {
    setError('❌ Kupon keçərli deyil və ya istifadə olunmuşdur.');
  }
};



  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setError('');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 p-6">
        <img
          src="/empty-cart.svg"
          alt="Empty Cart"
          className="w-56 mb-6 opacity-80"
        />
        <h2 className="text-2xl font-semibold text-gray-800">Səbətiniz boşdur</h2>
        <p className="text-gray-500 mt-2">Alış-verişə başlamaq üçün məhsul əlavə edin.</p>
        <Link href="/" className="mt-6">
          <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition">
            Alış-verişə davam et
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-10">Səbətiniz</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5 flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg border"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                  {item.description && (
                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                  )}
                  <p className="mt-3 text-emerald-600 font-bold">{item.price} AZN</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <FaMinus className="text-gray-600" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <FaPlus className="text-gray-600" />
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 hover:text-red-600 ml-auto"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-6 lg:sticky lg:top-24 self-start">
            <h2 className="text-lg font-semibold text-gray-800">Sifariş Xülasəsi</h2>

            {/* Coupon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kupon Kodu
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Kupon kodu daxil edin"
                  className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                >
                  Tətbiq et
                </button>
              </div>
              {appliedCoupon && (
                <button
                  onClick={handleRemoveCoupon}
                  className="text-sm text-red-500 hover:underline mt-1"
                >
                  Kuponu sil
                </button>
              )}
              {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
              {appliedCoupon && (
                <p className="text-green-600 mt-2 text-sm">
                  ✅ {appliedCoupon.code} — {appliedCoupon.discount} AZN endirim
                </p>
              )}
            </div>

            {/* Total */}
            <div className="border-t pt-4 space-y-2">
              {appliedCoupon && (
                <p className="text-gray-400 line-through text-sm">
                  {totalPrice.toFixed(2)} AZN
                </p>
              )}
              <div className="flex justify-between text-lg font-semibold text-gray-700">
                <span>Ümumi:</span>
                <span className="text-emerald-600">
                  {(totalPrice - (appliedCoupon?.discount || 0)).toFixed(2)} AZN
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <Link href="/">
                <button className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition mb-8">
                  ← Alış-verişə davam et
                </button>
              </Link>
              <CheckoutButton appliedCoupon={appliedCoupon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
