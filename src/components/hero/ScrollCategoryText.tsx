'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface ScrollCategoryTextProps {
  scrollYProgress: MotionValue<number>;
}

export const ScrollCategoryText: React.FC<ScrollCategoryTextProps> = ({ scrollYProgress }) => {
  // Category 1: SMASHED BEEF (Active between 5% and 35% of the scroll)
  const opacity1 = useTransform(scrollYProgress, [0.05, 0.12, 0.28, 0.35], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.05, 0.12, 0.28, 0.35], [40, 0, 0, -40]);

  // Category 2: LIQUID CHEESE (Active between 38% and 68% of the scroll)
  const opacity2 = useTransform(scrollYProgress, [0.38, 0.45, 0.61, 0.68], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.38, 0.45, 0.61, 0.68], [40, 0, 0, -40]);

  // Category 3: NAGA HEAT (Active between 71% and 92% of the scroll)
  const opacity3 = useTransform(scrollYProgress, [0.71, 0.78, 0.86, 0.92], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.71, 0.78, 0.86, 0.92], [40, 0, 0, -40]);

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none">
      {/* Category 1: SMASHED BEEF */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute flex flex-col items-center px-4"
      >
        <span className="text-amber-400 font-extrabold text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">
          CHILLOX SIGNATURE
        </span>
        <h2 className="text-white font-black text-4xl sm:text-5xl md:text-7xl leading-none uppercase tracking-tighter text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          SMASHED BEEF
        </h2>
      </motion.div>

      {/* Category 2: LIQUID CHEESE */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute flex flex-col items-center px-4"
      >
        <span className="text-[#ff2a14] font-extrabold text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">
          CHEESE BLAST
        </span>
        <h2 className="text-white font-black text-4xl sm:text-5xl md:text-7xl leading-none uppercase tracking-tighter text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          LIQUID CHEESE
        </h2>
      </motion.div>

      {/* Category 3: NAGA HEAT */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute flex flex-col items-center px-4"
      >
        <span className="text-amber-400 font-extrabold text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">
          SPICY SENSATION
        </span>
        <h2 className="text-white font-black text-4xl sm:text-5xl md:text-7xl leading-none uppercase tracking-tighter text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          NAGA HEAT
        </h2>
      </motion.div>
    </div>
  );
};

export default ScrollCategoryText;
