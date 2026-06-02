'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { menuItems } from '@/data/menuData';
import ProductCustomizer from './components/ProductCustomizer';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('id');

  const selectedProduct = menuItems.find((item) => item.id === productId);

  if (selectedProduct) {
    return (
      <div className="max-w-4xl mx-auto px-4 mt-6">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-zinc-400 hover:text-white text-xs font-black uppercase tracking-wider mb-6 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </button>

        <ProductCustomizer product={selectedProduct} />
      </div>
    );
  }

  // Fallback: list all products if no ID is specified
  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-white">
          Our Full <span className="text-[#ff2a14]">Platters Menu</span>
        </h1>
        <p className="text-zinc-500 text-xs font-semibold mt-2">
          Select any burger or side below to customize and order it directly!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => router.push(`/products?id=${item.id}`)}
            className="bg-[#121214] border-2 border-zinc-800 rounded-3xl p-5 hover:border-amber-400 hover:translate-y-[-2px] transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-full h-36 bg-zinc-950/40 border border-zinc-950/10 rounded-2xl flex items-center justify-center p-3 overflow-hidden">
                <img src={item.image} alt={item.name} className="h-full object-contain hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="text-sm font-black uppercase text-white tracking-wide mt-4">{item.name}</h3>
              <p className="text-zinc-500 text-[10px] font-semibold mt-1 line-clamp-2">{item.description}</p>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-800/40 pt-4 mt-4">
              <span className="text-sm font-black text-amber-400">{item.price} BDT</span>
              <span className="text-[9px] font-black uppercase tracking-wider text-white bg-[#ff2a14] px-2.5 py-1 rounded-lg border border-zinc-950">
                Customize
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="w-full pt-28 pb-16">
      <Suspense fallback={
        <div className="max-w-4xl mx-auto px-4 mt-6 text-center text-zinc-500 text-xs font-semibold py-20">
          Loading menu items...
        </div>
      }>
        <ProductsContent />
      </Suspense>
    </div>
  );
}
