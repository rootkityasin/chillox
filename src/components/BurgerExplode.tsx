'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { useCart } from '../context/CartContext';
import FrameSequenceBackground, { FRAME_COUNT } from './hero/FrameSequenceBackground';
import ScrollCategoryText from './hero/ScrollCategoryText';

export const BurgerExplode: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setActiveSection } = useCart();
  const [frame, setFrame] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transitions for the sticky scene wrapper
  const sceneY = useTransform(scrollYProgress, [0.72, 1], [0, -90]);
  const sceneScale = useTransform(scrollYProgress, [0.72, 1], [1, 1.08]);
  const sceneOpacity = useTransform(scrollYProgress, [0.82, 1], [1, 0.58]);

  // Background side text shifts and fades
  const leftTextOpacity = useTransform(scrollYProgress, [0, 0.25], [0.2, 0]);
  const leftTextX = useTransform(scrollYProgress, [0, 0.25], [0, -50]);
  
  const rightTextOpacity = useTransform(scrollYProgress, [0, 0.25], [0.2, 0]);
  const rightTextX = useTransform(scrollYProgress, [0, 0.25], [0, 50]);

  // CTA button fade-out and slide-down at the end
  const btnOpacity = useTransform(scrollYProgress, [0, 0.8, 0.92], [1, 1, 0]);
  const btnY = useTransform(scrollYProgress, [0, 0.8, 0.92], [0, 0, 45]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextFrame = Math.min(
      FRAME_COUNT,
      Math.max(1, Math.round(latest * (FRAME_COUNT - 1)) + 1)
    );
    setFrame(nextFrame);
  });

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
      className="relative w-full h-[320vh] sm:h-[360vh] bg-black text-white overflow-clip select-none"
    >
      <motion.div
        style={{ y: sceneY, scale: sceneScale, opacity: sceneOpacity }}
        className="sticky top-0 h-screen w-full origin-center flex items-center justify-center overflow-hidden z-0"
      >
        {/* Frame Sequence Background */}
        <FrameSequenceBackground currentFrame={frame} />

        {/* Dynamic Category Text Taglines */}
        <ScrollCategoryText scrollYProgress={scrollYProgress} />

        {/* Subtle Neo-Brutalist Grid and Shadow Overlays */}
        <div className="pointer-events-none absolute inset-0 z-[15] bg-[radial-gradient(circle_at_top,_rgba(255,198,7,0.08),_transparent_30%),linear-gradient(180deg,_rgba(0,0,0,0.15)_0%,_rgba(0,0,0,0.3)_52%,_rgba(0,0,0,0.6)_100%)]" />
        <div className="pointer-events-none absolute inset-0 z-[15] bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_52px)] opacity-15" />

        {/* Symmetrical Left/Right Vertical Text Layers */}
        <motion.div
          style={{ opacity: leftTextOpacity, x: leftTextX }}
          className="absolute left-[5%] top-1/2 -translate-y-1/2 select-none pointer-events-none z-10 hidden md:block"
        >
          <span
            className="text-[6.5vw] font-black leading-none uppercase tracking-widest text-[#ff2a14]/20 block"
            style={{
              WebkitTextStroke: '1.5px rgba(255,42,20,0.3)',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              whiteSpace: 'nowrap',
            }}
          >
            SINCE 2016
          </span>
        </motion.div>

        <motion.div
          style={{ opacity: rightTextOpacity, x: rightTextX }}
          className="absolute right-[5%] top-1/2 -translate-y-1/2 select-none pointer-events-none z-10 hidden md:block"
        >
          <span
            className="text-[6.5vw] font-black leading-none uppercase tracking-widest text-[#ff2a14]/20 block"
            style={{
              WebkitTextStroke: '1.5px rgba(255,42,20,0.3)',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              whiteSpace: 'nowrap',
            }}
          >
            SMASHED BEEF
          </span>
        </motion.div>

        {/* Bottom Center: Bouncing Interactive Neo-Brutalist CTA Button */}
        <motion.div
          style={{ opacity: btnOpacity, y: btnY }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 select-none flex flex-col items-center pointer-events-auto"
        >
          <button
            onClick={handleBuyNow}
            className="py-3.5 px-7 bg-amber-400 hover:bg-amber-300 text-zinc-950 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest border-3 border-zinc-950 shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer flex items-center space-x-2"
          >
            <span>Explore Menu</span>
            <span className="inline-block animate-bounce text-base">↓</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BurgerExplode;
