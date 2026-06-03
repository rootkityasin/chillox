'use client';

import React from 'react';

interface FrameSequenceBackgroundProps {
  currentFrame: number;
}

export const FRAME_COUNT = 30;

export const FrameSequenceBackground: React.FC<FrameSequenceBackgroundProps> = ({ currentFrame }) => {
  // Generate file paths from frame_0001.webp to frame_0030.webp
  const frames = Array.from({ length: FRAME_COUNT }, (_, i) => {
    const frameNum = String(i + 1).padStart(4, '0');
    return `/assets/landing scroll/frame_${frameNum}.webp`;
  });

  return (
    <div className="absolute inset-0 w-full h-full bg-black select-none pointer-events-none overflow-hidden">
      {frames.map((src, index) => {
        const frameIndex = index + 1;
        const isActive = frameIndex === currentFrame;
        return (
          // Using standard img element for faster direct frame swaps without Next.js Image overhead
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={`Burger Frame ${frameIndex}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: isActive ? 1 : 0,
              willChange: 'opacity',
              transition: 'opacity 0s',
            }}
          />
        );
      })}
    </div>
  );
};

export default FrameSequenceBackground;
