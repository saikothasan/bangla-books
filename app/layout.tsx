import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for SEO and page info
export const metadata: Metadata = {
  title: "Create Next App",
  description: "A Next.js app generated by Create Next App",
  keywords: ["Next.js", "App", "PDF Books", "Search Engine", "Programmable Search Engine"],
  creator: "Your Name",
  robots: "index, follow", 
  openGraph: {
    title: "Create Next App",
    description: "Generated by create next app",
    url: "https://www.yourwebsite.com",
    images: [
      {
        url: "https://www.yourwebsite.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Create Next App OG Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "Create Next App",
    description: "Generated by create next app",
    images: [  // Changed from 'image' to 'images'
      {
        url: "https://www.yourwebsite.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Create Next App Twitter Image",
      },
    ],
  },
};

// Layout component (wraps all pages)
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Use Next.js Head for dynamic meta tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
