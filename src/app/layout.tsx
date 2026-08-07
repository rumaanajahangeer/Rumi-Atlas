import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import { BookmarkProvider } from "@/components/providers/BookmarkProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "The Rumi Atlas | Luxury Travel Blog & Magazine",
  description: "Collecting Places. Preserving Memories. A luxury travel blog featuring architectural photography, high-altitude expeditions, coastal sanctuaries, and timeless cultural heritage.",
  keywords: ["Luxury Travel", "Travel Blog", "Travel Photography", "Travel Guides", "Expeditions", "The Rumi Atlas"],
  openGraph: {
    title: "The Rumi Atlas | Collecting Places. Preserving Memories.",
    description: "A luxury travel magazine where every destination tells a story.",
    url: "https://rumiatlas.com",
    siteName: "The Rumi Atlas",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "The Rumi Atlas",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen flex flex-col selection:bg-[#C5A059] selection:text-white">
        <AuthProvider>
          <ThemeProvider>
            <BookmarkProvider>
              <Navbar />
              <main className="flex-grow pt-0">{children}</main>
              <Footer />
            </BookmarkProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
