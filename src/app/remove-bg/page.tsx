import dynamic from 'next/dynamic';

const BackgroundRemover = dynamic(
  () => import('../../components/BackgroundRemover'),
  { ssr: false }
);

export const metadata = {
  title: 'AI Background Remover - Chillox',
  description: 'Remove background from your product images instantly using local WebAssembly AI.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#faf6ed]">
      <BackgroundRemover />
    </div>
  );
}
