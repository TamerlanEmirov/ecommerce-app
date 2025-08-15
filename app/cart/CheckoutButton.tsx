'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { clearCart } from '@/redux/cartSlice';
import { addOrder } from '@/redux/ordersSlice';
import { addCoupon, markAsUsed } from '@/redux/cuponSlice';
import { v4 as uuidv4 } from 'uuid';

export default function CheckoutButton({ appliedCoupon }: { appliedCoupon: any }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    cardNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const totalDiscount = appliedCoupon?.discount || 0;

    // ✅ Yeni sifariş obyektini yarat
    const newOrder = {
      id: uuidv4(),
      date: new Date().toLocaleString('en-GB'),
      items: cartItems,
      total: totalPrice - totalDiscount,
      status: 'Completed',
      coupon: appliedCoupon
        ? { code: appliedCoupon.code, discount: appliedCoupon.discount }
        : undefined,
    };

    dispatch(addOrder(newOrder));

    // ✅ İstifadə edilmiş kuponu işarələ
    if (appliedCoupon) {
      dispatch(markAsUsed(appliedCoupon.id));
    }

    // ✅ Səbəti təmizlə
    dispatch(clearCart());

    // ✅ 5000 AZN-dən çox alış-verişdə hədiyyə kuponu ver
    if (totalPrice >= 5000 && !appliedCoupon) {
      const couponCount = Math.floor(totalPrice / 5000);

      for (let i = 0; i < couponCount; i++) {
        const coupon = {
          id: uuidv4(),
          code: `GIFT-${Math.floor(1000 + Math.random() * 9000)}`, // GIFT-1234
          discount: 100,
          minAmount: 5000,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 gün sonra
          used: false,
        };
        dispatch(addCoupon(coupon));
      }

      alert(`🎁 Təbriklər! ${couponCount} kupon hədiyyə edildi!`);
    } else {
      alert('✅ Sifariş qeydə alındı!');
    }

    // ✅ Formu bağla və sıfırla
    setShowForm(false);
    setForm({ firstName: '', lastName: '', address: '', cardNumber: '' });
  };

  return (
    <div>
      <button
        onClick={() => setShowForm(true)}
        className="bg-emerald-500 text-white px-4 py-2 rounded-md shadow hover:bg-emerald-600"
      >
        Proceed to Checkout
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Ad"
                required
                className="w-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 p-2 rounded"
              />
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Soyad"
                required
                className="w-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 p-2 rounded"
              />
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Ünvan"
                required
                className="w-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 p-2 rounded"
              />
              <input
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="Kart nömrəsi (saxta)"
                required
                className="w-full border border-gray-700 bg-gray-800 text-white placeholder-gray-400 p-2 rounded"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded border border-gray-600 hover:bg-gray-800"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 text-white px-4 py-2 rounded shadow hover:bg-emerald-600"
                >
                  Ödənişi təsdiqlə
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
