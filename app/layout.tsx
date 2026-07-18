/**
 * =============================================================================
 *  The Daily Count
 * =============================================================================
 *
 *  Description: Root Layout, wraps every page with the shared Nav and Footer
 *
 *  Created by:   David Strickland
 *  Company:      DCSS Web Development LLC
 *  Created on:   2026-07-17
 * =============================================================================
 */

import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "The Daily Count",
    template: "%s | The Daily Count",
  },
  description:
    "An honest, unfiltered daily account of living with diabetes, the funny, the mundane, and the genuinely hard days.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-800 antialiased">
        <Nav />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
