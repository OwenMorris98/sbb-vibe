import type { Metadata } from "next";
import { Barlow, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/app/our-shop/CartDrawer";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

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
    <html
      lang="en"
      className={`${barlow.variable} ${bebasNeue.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <CartProvider>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
