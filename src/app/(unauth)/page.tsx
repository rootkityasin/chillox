'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import HeroSection from '@/components/sections/HeroSection';
import PromoSection from '@/components/PromoSection';
import SocialFeed from '@/components/SocialFeed';
import MenuSection from '@/components/MenuSection';
import OutletsSection from '@/components/OutletsSection';
import FeedbackSection from '@/components/FeedbackSection';
import OrderTracker from '@/components/OrderTracker';

export default function Home() {
  const { orderState } = useCart();

  return (
    <>
      {/* Section 1: Hero Exploding Burger Scroll Section */}
      <div id="home" className="w-full">
        <HeroSection />
      </div>

      {/* Section 2: Promo Banner (Smash, Eat & Repeat) */}
      <PromoSection />

      {/* Section: Chillox Buzz (Interactive Social Feed) */}
      <SocialFeed />

      {/* Section 3: Interactive Menu */}
      <MenuSection />

      {/* Section 3: Simulated Live Order Tracking Dashboard */}
      {orderState && <OrderTracker />}

      {/* Section 4: Outlets Directory */}
      <OutletsSection />

      {/* Section 5: Customer Feedback Form */}
      <FeedbackSection />
    </>
  );
}
