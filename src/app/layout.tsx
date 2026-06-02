import type { Metadata } from "next";
import { Outfit, Inter, Pacifico } from "next/font/google";
import { CartProvider } from "../context/CartContext";
import "../styles/global.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  weight: '400',
  variable: "--font-pacifico",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chillox | Smashed Burgers, Fried Chicken & Shakes",
  description: "Savor the best beef and chicken burgers in Bangladesh! Freshly grilled on order with our signature cheese blast, smasher, and wings.",
  keywords: ["Chillox", "Burgers Bangladesh", "Smasher Burger", "Cheese Blast Burger", "Fast Food Dhaka"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${pacifico.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black font-sans selection:bg-amber-400 selection:text-red-950">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
