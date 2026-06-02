'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export default function UnauthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRemoveBg = pathname === '/remove-bg';

  if (isRemoveBg) {
    return <>{children}</>;
  }

  return (
    <div className="bg-black min-h-screen text-white selection:bg-amber-400 selection:text-red-950">
      {/* Sticky Header */}
      <Header />

      {/* Main Page Layout */}
      <main className="w-full">
        {children}
      </main>

      {/* Cart drawer panel */}
      <CartDrawer />

      {/* Footer */}
      <Footer />
    </div>
  );
}
