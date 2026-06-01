'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ArrowDown } from 'lucide-react';

interface LayerInfo {
  name: string;
  cal: string;
  side: 'left' | 'right';
}

const LAYER_DETAILS: LayerInfo[] = [
  { name: 'Bun (Top)', cal: '130 cal', side: 'left' },
  { name: 'Tomatoes', cal: '26 cal', side: 'right' },
  { name: 'Onions', cal: '26 cal', side: 'left' },
  { name: 'Bacon', cal: '65 cal', side: 'right' },
  { name: 'Cheese', cal: '112 cal', side: 'left' },
  { name: 'Meat Patty', cal: '235 cal', side: 'right' },
  { name: 'Salad (Lettuce)', cal: '10 cal', side: 'left' },
  { name: 'Bun (Bottom)', cal: '130 cal', side: 'right' },
];

export const BurgerExplode: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useCart();
  const [layers, setLayers] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load individual pre-cleaned transparent layers
  useEffect(() => {
    const layerUrls = [
      '/layer_0.png',
      '/layer_1.png',
      '/layer_2.png',
      '/layer_3.png',
      '/layer_4.png',
      '/layer_5.png',
      '/layer_6.png',
      '/layer_7.png',
    ];

    let loadedCount = 0;
    layerUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 8) {
          setLayers(layerUrls);
          setIsLoading(false);
        }
      };
      img.onerror = () => {
        console.error(`Failed to pre-cache layer asset: ${url}`);
        loadedCount++;
        if (loadedCount === 8) {
          setLayers(layerUrls);
          setIsLoading(false);
        }
      };
    });
  }, []);

  // Monitor scroll progress relative to the animation section height
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const containerHeight = container.scrollHeight;

      // Calculate scroll offset from top of the container
      const scrollOffset = -rect.top;
      const scrollableDist = containerHeight - viewHeight;

      if (scrollableDist <= 0) return;

      // Compute progress ratio (0 to 1)
      // Reaches 1.0 (fully assembled) at 70% of the total scrollable height.
      // This leaves a 30% unpinning buffer to ensure the burger is fully assembled
      // and overlays are legible before the page scrolls past.
      const animLimit = scrollableDist * 0.70;
      const progress = Math.max(0, Math.min(1, scrollOffset / animLimit));
      setScrollProgress(progress);

      // Switch active nav section
      if (typeof window !== 'undefined' && (window as any).isProgrammaticScroll) return;
      if (rect.top <= 100 && rect.bottom > 200) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    // Initial check
    setTimeout(handleScroll, 200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [setActiveSection]);

  // Interpolation variables (offsets in pixels)
  // Exploded spacing (more compact on mobile to fit vertical viewport)
  const explodedOffsets = isMobile
    ? [-150, -110, -70, -30, 10, 50, 90, 130]
    : [-240, -170, -110, -50, 10, 70, 130, 190];
  
  // Collapsed spacing (tighter assembly on mobile)
  const collapsedOffsets = isMobile
    ? [-30, -20, -14, -8, -4, 2, 8, 14]
    : [-50, -32, -22, -14, -7, 4, 14, 25];

  const handleBuyNow = () => {
    const menuSec = document.getElementById('menu');
    if (menuSec) {
      menuSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: '260vh' }} // Expands the scrolling region to bind the animation
    >
      {/* Sticky viewport frame */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#ff2a14]">
        
        {/* Background text elements matching user layout */}
        <div className="absolute left-[5%] top-1/2 -translate-y-1/2 select-none pointer-events-none z-0 hidden md:block">
          <span 
            className="text-[12vw] font-black leading-none uppercase tracking-widest text-transparent block"
            style={{ 
              WebkitTextStroke: '2px rgba(255,255,255,0.12)',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed'
            }}
          >
            YUMMY
          </span>
        </div>

        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 select-none pointer-events-none z-0 hidden md:block">
          <span 
            className="text-[12vw] font-black leading-none uppercase tracking-widest text-transparent block"
            style={{ 
              WebkitTextStroke: '2px rgba(255,255,255,0.12)',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed'
            }}
          >
            BURGER
          </span>
        </div>

        {/* Clean background gradient (no glitchy background icons) */}

        {/* Outer UI Elements */}
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 text-center select-none pointer-events-none z-10">
          <p className="font-serif italic text-white/90 text-2xl tracking-wider select-none">
            since 1980
          </p>
        </div>

        {/* Canvas slice loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-800/80 backdrop-blur-sm z-50 transition-opacity duration-500">
            <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white font-bold mt-4 tracking-widest text-sm animate-pulse">CREATING BURGER ART...</p>
          </div>
        )}

        {/* Core animated Burger Container */}
        <div 
          onClick={handleBuyNow}
          className="relative w-full max-w-[280px] md:max-w-[400px] h-[550px] flex items-center justify-center z-10 transition-all duration-300 cursor-pointer pointer-events-auto hover:scale-[1.03]"
        >
          
          {layers.map((layerSrc, index) => {
            // Interpolate position based on progress
            const explodedY = explodedOffsets[index];
            const collapsedY = collapsedOffsets[index];
            const currentY = explodedY * (1 - scrollProgress) + collapsedY * scrollProgress;

            // Fade pointers and labels as burger collapses
            const pointerOpacity = Math.max(0, 1 - scrollProgress / 0.35);

            // Fetch detail details for the pointers
            const detail = LAYER_DETAILS[index];

            return (
              <div
                key={index}
                className="absolute w-full flex items-center justify-center pointer-events-none select-none transition-transform duration-75 ease-out"
                style={{
                  transform: `translateY(${currentY}px)`,
                  zIndex: 20 - index, // Layers stack from top to bottom
                }}
              >
                {/* The keyed burger layer image slice */}
                <img
                  src={layerSrc}
                  alt={detail.name}
                  className="w-[85%] md:w-[100%] h-auto object-contain filter drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] transition-all duration-300"
                  style={{
                    transform: `scale(${1 + scrollProgress * 0.05})`, // Minor swelling on assembly for 3D bounce
                  }}
                />

                {/* Point lines and text labels (visible at top of scroll) */}
                {pointerOpacity > 0 && (
                  <div
                    className={`absolute flex items-center transition-opacity duration-200 ${
                      detail.side === 'left'
                        ? 'w-[95px] md:w-[180px] left-[-20px] md:left-[-110px] flex-row-reverse'
                        : 'w-[95px] md:w-[180px] right-[-20px] md:right-[-110px] flex-row'
                    }`}
                    style={{
                      opacity: pointerOpacity,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    {/* Ring anchor dot on the burger slice */}
                    <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-orange-500 shadow-md flex-shrink-0 animate-ping absolute" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-orange-500 shadow-md flex-shrink-0 relative z-10" />

                    {/* Horizontal connection wire */}
                    <div className="h-[1px] bg-white/70 flex-grow mx-1 shadow-sm" />

                    {/* Info Card label */}
                    <div 
                      className="text-white text-[10px] md:text-sm font-sans pointer-events-auto leading-tight shadow-md select-none max-w-[70px] md:max-w-none"
                      style={{ textAlign: detail.side === 'left' ? 'right' : 'left' }}
                    >
                      <div className="font-bold border-b border-white/20 pb-0.5 md:whitespace-nowrap">
                        {detail.name}
                      </div>
                      <div className="text-[8px] md:text-xs text-amber-200 mt-0.5">
                        {detail.cal}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Scroll helper mouse wheel indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50 text-xs tracking-widest uppercase transition-opacity duration-500 select-none z-10"
          style={{ opacity: Math.max(0, 1 - scrollProgress / 0.15) }}
        >
          <span className="mb-2 font-semibold">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-2.5 bg-amber-400 rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Scroll Stop Situation: The Best Burger in Town overlay (Mobile View Only, Positioned Higher) */}
        <div 
          className="md:hidden absolute left-1/2 top-[22%] -translate-x-1/2 text-center text-white font-black z-5 w-full px-6 select-none pointer-events-none transition-all duration-500"
          style={{ 
            opacity: scrollProgress >= 0.85 ? (scrollProgress - 0.85) / 0.15 : 0,
            transform: `translate(-50%, ${scrollProgress >= 0.85 ? 0 : 25}px)`,
          }}
        >
          <h2 className="text-3xl font-sans tracking-wide leading-tight drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)] uppercase">
            The Best Burger in Town
          </h2>
        </div>

      </div>
    </div>
  );
};
export default BurgerExplode;
