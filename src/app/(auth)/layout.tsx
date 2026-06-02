'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-amber-400 selection:text-red-950">
      {/* Header */}
      <Header />

      {/* Auth Main Page Layout */}
      <main className="w-full pt-28 pb-12">
        {children}
      </main>

      {/* Cart drawer panel */}
      <CartDrawer />

      {/* Footer */}
      <Footer />
    </div>
  );
}
