import type { Metadata } from "next";
import { Inter, Playfair_Display, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import SearchModal from "@/components/ui/SearchModal";
import MainContent from "@/components/layout/MainContent";


const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const tiroDevanagari = Tiro_Devanagari_Hindi({
  variable: "--font-sanskrit",
  subsets: ["devanagari", "latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "सनातन विद्या — Complete Encyclopaedia of Sanatan Dharma",
  description: "Explore the ancient scriptures, philosophy, timeline, and deities of Sanatan Dharma under φ (Golden Ratio) and ॐ (Om Frequency) principles.",
  keywords: ["Sanatan Dharma", "Bhagavad Gita", "Vedas", "Upanishads", "Puranas", "Sanskrit", "Dharma", "Devata"],
  openGraph: {
    title: "सनातन विद्या — Complete Encyclopaedia of Sanatan Dharma",
    description: "Explore the ancient scriptures, philosophy, timeline, and deities of Sanatan Dharma.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${tiroDevanagari.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var st = localStorage.getItem('theme');
                var sd = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (st === 'dark' || (!st && sd)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen flex flex-col relative overflow-x-hidden">
        {/* Navigation Header */}
        <Header />
        
        {/* Main Content Area */}
        <MainContent>{children}</MainContent>
        
        {/* Universal Search Modal (Cmd+K) */}
        <SearchModal />

        {/* Mobile Bottom Navigation Bar */}
        <MobileNav />
      </body>
    </html>
  );
}
