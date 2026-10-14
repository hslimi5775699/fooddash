import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

import { CartProvider } from "../components/CartProvider";

export const metadata: Metadata = {
  title: "FOODDASH | Food Delivery",
  description:
    "Discover local restaurants and order your favorite food.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <header className="site-header">
            <div className="container header-content">
              <Link href="/" className="logo">
                FOOD<span>DASH</span>
              </Link>

              <nav className="navigation">
                <Link href="/">Restaurants</Link>
                <Link href="/cart">My Cart</Link>
              </nav>
            </div>
          </header>

          {children}

          <footer className="site-footer">
            <div className="container footer-content">
              <strong>FOODDASH</strong>
              <p>Good food. Great moments.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}