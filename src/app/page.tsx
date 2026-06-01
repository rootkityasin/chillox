'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import BurgerExplode from '../components/BurgerExplode';
import PromoSection from '../components/PromoSection';
import MenuSection from '../components/MenuSection';
import OutletsSection from '../components/OutletsSection';
import FeedbackSection from '../components/FeedbackSection';
import CartDrawer from '../components/CartDrawer';
import OrderTracker from '../components/OrderTracker';

export default function Home() {
  const { orderState } = useCart();



  return (
    <div className="bg-black min-h-screen text-white selection:bg-amber-400 selection:text-red-950">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Page Layout */}
      <main className="w-full">
        {/* Section 1: Hero Exploding Burger Scroll Section */}
        <div id="home" className="w-full">
          <BurgerExplode />
        </div>

        {/* Section 2: Promo Banner (Smash, Eat & Repeat) */}
        <PromoSection />

        {/* Section 3: Interactive Menu */}
        <MenuSection />

        {/* Section 3: Simulated Live Order Tracking Dashboard */}
        {orderState && <OrderTracker />}

        {/* Section 4: Outlets Directory */}
        <OutletsSection />

        {/* Section 5: Customer Feedback Form */}
        <FeedbackSection />
      </main>

      {/* Cart drawer panel */}
      <CartDrawer />

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 px-4 text-center text-xs text-white/40">
        <div className="max-w-7xl mx-auto space-y-5 flex flex-col items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2.5 select-none pointer-events-none mb-1">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 bg-white flex items-center justify-center p-0.5 shadow-sm">
              <img src="/logo.png" alt="Chillox Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <span className="flex items-baseline font-black font-sans uppercase tracking-wider text-white">
              <span style={{ fontSize: '1.05rem' }}>C</span>
              <span style={{ fontSize: '1.10rem' }}>H</span>
              <span style={{ fontSize: '1.15rem' }}>I</span>
              <span style={{ fontSize: '1.20rem' }}>L</span>
              <span style={{ fontSize: '1.25rem', marginLeft: '-1px' }}>L</span>
              <span style={{ fontSize: '1.30rem', marginLeft: '-2.5px' }}>O</span>
              <span style={{ fontSize: '1.35rem', marginLeft: '-3px' }} className="text-[#ff2a14]">X</span>
            </span>
          </div>
          <p className="max-w-md mx-auto leading-relaxed select-none">
            © 2016–{new Date().getFullYear()} Chillox Bangladesh. All rights reserved.
          </p>
          <div className="h-[1px] bg-white/5 max-w-xs w-full mx-auto" />
        </div>
      </footer>


    </div>
  );
}
