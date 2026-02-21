import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Ship Bottom Brewery | Brewed at the Beach for the Beach",
    template: "%s | Ship Bottom Brewery",
  },
  description:
    "Award-winning craft beers brewed on Long Beach Island, NJ. Taprooms in Ship Bottom, Beach Haven, and at Linvilla Orchards in Media, PA.",
  keywords: [
    "craft beer",
    "brewery",
    "Long Beach Island",
    "LBI",
    "Ship Bottom",
    "NJ brewery",
    "beach beer",
  ],
  openGraph: {
    siteName: "Ship Bottom Brewery",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
