'use client';

import React, { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';

export const BurgerExplode: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      // Switch active nav section
      if (typeof window !== 'undefined' && (window as any).isProgrammaticScroll) return;
      if (rect.top <= 100 && rect.bottom > 200) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    setTimeout(handleScroll, 200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setActiveSection]);

  const handleBuyNow = () => {
    const menuSec = document.getElementById('menu');
    if (menuSec) {
      menuSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black select-none"
    >
      {/* Background Video (Edge to Edge) */}
      <video
        src="/burger.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark contrast overlay */}
      <div className="absolute inset-0 bg-black/45 z-0 pointer-events-none" />

      {/* Background text elements */}
      <div className="absolute left-[5%] top-1/2 -translate-y-1/2 select-none pointer-events-none z-10 hidden md:block">
        <span 
          className="text-[6.5vw] font-black leading-none uppercase tracking-widest text-[#ff2a14]/20 block"
          style={{ 
            WebkitTextStroke: '1.5px rgba(255,42,20,0.3)',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            whiteSpace: 'nowrap',
            transform: 'rotate(180deg)'
          }}
        >
          SINCE 2016
        </span>
      </div>

      <div className="absolute right-[5%] top-1/2 -translate-y-1/2 select-none pointer-events-none z-10 hidden md:block">
        <span 
          className="text-[6.5vw] font-black leading-none uppercase tracking-widest text-[#ff2a14]/20 block"
          style={{ 
            WebkitTextStroke: '1.5px rgba(255,42,20,0.3)',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            whiteSpace: 'nowrap'
          }}
        >
          SMASHED BEEF
        </span>
      </div>



      {/* Bottom Center: Bouncing Interactive Neo-Brutalist CTA Button */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 select-none flex flex-col items-center pointer-events-auto animate-fade-in">
        <button
          onClick={handleBuyNow}
          className="py-3.5 px-7 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest border-3 border-zinc-950 shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer flex items-center space-x-2"
        >
          <span>Explore Menu</span>
          <span className="inline-block animate-bounce text-base">↓</span>
        </button>
      </div>
    </div>
  );
};

export default BurgerExplode;
