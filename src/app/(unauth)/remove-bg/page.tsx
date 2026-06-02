'use client';

import dynamic from 'next/dynamic';

const BackgroundRemover = dynamic(
  () => import('@/components/BackgroundRemover'),
  { ssr: false }
);

export default function Page() {
  return (
    <div className="min-h-screen bg-[#faf6ed]">
      <BackgroundRemover />
    </div>
  );
}
