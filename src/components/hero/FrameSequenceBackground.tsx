'use client';

import React, { useEffect, useRef, useState } from 'react';

interface FrameSequenceBackgroundProps {
  currentFrame: number;
}

export const FRAME_COUNT = 30;

export const FrameSequenceBackground: React.FC<FrameSequenceBackgroundProps> = ({ currentFrame }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Generate paths from frame_0001.webp to frame_0030.webp
  const framePaths = Array.from({ length: FRAME_COUNT }, (_, i) => {
    const frameNum = String(i + 1).padStart(4, '0');
    return `/assets/landing scroll/frame_${frameNum}.webp`;
  });

  // Preload all images on component mount
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    framePaths.forEach((path, index) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImagesLoaded(true);
        }
      };
      images[index] = img;
    });

    imagesRef.current = images;
  }, []);

  // Handle resizing and drawing on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      drawFrame();
    };

    const drawFrame = () => {
      const img = imagesRef.current[currentFrame - 1];
      if (!img) return;

      const w = canvas.width;
      const h = canvas.height;

      // Calculate object-fit: cover scale math
      const imgW = img.naturalWidth || img.width;
      const imgH = img.naturalHeight || img.height;

      if (!imgW || !imgH) return; // avoid NaN errors

      const r = imgW / imgH;
      const dRatio = w / h;

      let sX = 0;
      let sY = 0;
      let sW = imgW;
      let sH = imgH;

      if (r > dRatio) {
        sW = imgH * dRatio;
        sX = (imgW - sW) / 2;
      } else if (r < dRatio) {
        sH = imgW / dRatio;
        sY = (imgH - sH) / 2;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, sX, sY, sW, sH, 0, 0, w, h);
    };

    // Draw frame and attach window resize observer
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [currentFrame, imagesLoaded]);

  return (
    <div className="absolute inset-0 w-full h-full bg-black select-none pointer-events-none overflow-hidden">
      {/* Canvas for instant, flicker-free rendering of pre-loaded images */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          opacity: imagesLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />

      {/* Fallback frame 1 rendered during initial asset preloading */}
      {!imagesLoaded && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/assets/landing scroll/frame_0001.webp"
          alt="Loading sequence..."
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      )}
    </div>
  );
};

export default FrameSequenceBackground;
