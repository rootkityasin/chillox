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
      <footer className="bg-black border-t border-white/10 py-10 px-4 text-center text-xs text-white/40">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="max-w-md mx-auto leading-relaxed select-none">
            © 2016–{new Date().getFullYear()} Chillox Bangladesh. All rights reserved.
          </p>
          <div className="h-[1px] bg-white/5 max-w-xs mx-auto" />
        </div>
      </footer>


    </div>
  );
}
