'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  description: string;
  image: string;
  category: string;
  subcategory: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    rating: 0,
    description: '',
    image: '',
    category: '',
    subcategory: '',
  });

  const API_URL = 'https://68936184c49d24bce86a9883.mockapi.io/api/auu/products';

  const getProducts = async () => {
    try {
      const res = await axios.get<Product[]>(API_URL);
      setProducts(res.data);
    } catch (error) {
      console.error('Məhsullar yüklənmədi:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async () => {
    const emptyField = Object.values(newProduct).some((v) => v === '' || v === 0);
    if (emptyField) {
      alert('Bütün sahələri doldurun!');
      return;
    }
    try {
      const res = await axios.post<Product>(API_URL, newProduct);
      setProducts((prev) => [...prev, res.data]);
      resetForm();
    } catch (error) {
      console.error('Məhsul əlavə olunmadı:', error);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Bu məhsulu silmək istədiyinizə əminsiniz?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Məhsul silinmədi:', error);
    }
  };

  const startEdit = (product: Product) => {
    setEditMode(true);
    setEditId(product.id);
    setNewProduct({
      name: product.name,
      price: product.price,
      rating: product.rating,
      description: product.description,
      image: product.image,
      category: product.category,
      subcategory: product.subcategory,
    });
  };

  const updateProduct = async () => {
    if (!editId) return;
    try {
      const res = await axios.put<Product>(`${API_URL}/${editId}`, newProduct);
      setProducts((prev) =>
        prev.map((p) => (p.id === editId ? res.data : p))
      );
      resetForm();
    } catch (error) {
      console.error('Məhsul yenilənmədi:', error);
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      price: 0,
      rating: 0,
      description: '',
      image: '',
      category: '',
      subcategory: '',
    });
    setEditMode(false);
    setEditId(null);
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) return <p className="text-gray-500 text-lg">Yüklənir...</p>;

  return (
    <div className="p-6 text-gray-800">
      <h2 className="text-3xl font-bold mb-6"> Məhsullar</h2>

      {/* Form */}
      <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-3">
        {[
          { type: 'text', placeholder: 'Ad', key: 'name' },
          { type: 'number', placeholder: 'Qiymət', key: 'price' },
          { type: 'number', placeholder: 'Rating', key: 'rating' },
          { type: 'text', placeholder: 'Şəkil URL', key: 'image' },
          { type: 'text', placeholder: 'Kateqoriya', key: 'category' },
          { type: 'text', placeholder: 'Alt kateqoriya', key: 'subcategory' },
        ].map((field, idx) => (
          <input
            key={idx}
            type={field.type}
            placeholder={field.placeholder}
            value={(newProduct as any)[field.key]}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                [field.key]:
                  field.type === 'number'
                    ? parseFloat(e.target.value)
                    : e.target.value,
              })
            }
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
          />
        ))}

        <textarea
          placeholder="Açıqlama"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm col-span-1 md:col-span-2"
        />

        <div className="col-span-1 md:col-span-4 flex gap-3 mt-2">
          <button
            onClick={editMode ? updateProduct : addProduct}
            className={`px-5 py-2 rounded-lg text-white font-semibold transition shadow-md ${
              editMode
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {editMode ? 'Yenilə' : 'Əlavə et'}
          </button>
          {editMode && (
            <button
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg font-semibold transition shadow-md"
            >
              Ləğv et
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-emerald-600 text-white">
              {['Şəkil', 'Ad', 'Qiymət', 'Rating', 'Kateqoriya', 'Alt kateqoriya', 'Açıqlama', 'Əməliyyatlar'].map((header, idx) => (
                <th key={idx} className="px-3 py-2 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-3 py-2">
                  <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-lg shadow-sm" />
                </td>
                <td className="px-3 py-2">{p.name}</td>
                <td className="px-3 py-2">{p.price} ₼</td>
                <td className="px-3 py-2">{p.rating}</td>
                <td className="px-3 py-2">{p.category}</td>
                <td className="px-3 py-2">{p.subcategory}</td>
                <td className="px-3 py-2">{p.description}</td>
                <td className="px-3 py-2 flex flex-col gap-2 items-start">
                  <button
                    onClick={() => startEdit(p)}
                    className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition shadow-sm"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition shadow-sm"
                  >
                    <FaTrash /> Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
