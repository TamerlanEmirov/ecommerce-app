'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';
import { FaHome, FaBox, FaClipboardList, FaTags } from 'react-icons/fa';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/admin', icon: <FaHome /> },
    { name: 'Məhsullar', href: '/admin/products', icon: <FaBox /> },
    { name: 'Sifarişlər', href: '/admin/orders', icon: <FaClipboardList /> },
    { name: 'Kuponlar', href: '/admin/coupons', icon: <FaTags /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-600 text-white flex flex-col p-4 shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded flex items-center gap-2 transition-colors duration-200 ${
                pathname === link.href
                  ? 'bg-emerald-800 font-semibold'
                  : 'hover:bg-emerald-700'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}
