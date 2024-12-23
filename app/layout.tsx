import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Correct import
import "./globals.css";

// Font declarations
const geistSans = Geist({
  variable: "--font-geist-sans",  // Correct font declaration
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",  // Correct font declaration
  subsets: ["latin"],
});

// Metadata for the page
export const metadata: Metadata = {
  title: "PDF Books Search & Download | Largest Collection of Books",
  description:
    "Search and download from the largest collection of free PDF books. Discover educational resources, novels, textbooks, and more, with direct download links for easy access.",
  authors: [
    {
      name: "Your Name", // The name of the author
      url: "https://yourwebsite.com", // Optional: URL of the author's profile or website
    },
  ],  // Corrected to use an object with 'name' and optionally 'url'
  keywords: "PDF books, free books download, book collection, educational resources, textbooks, novels, search and download, largest PDF collection",
  viewport: "width=device-width, initial-scale=1.0",
  twitter: {
    card: "summary_large_image",
    site: "@your_twitter",
    title: "PDF Books Search & Download",
    description:
      "Search and download from the largest collection of free PDF books. Discover educational resources, novels, textbooks, and more.",
    images: [
      {
        url: "/path/to/image.jpg",
        alt: "PDF Books Search and Download",
        width: 1200,
        height: 630,
      },
    ],
  },
  openGraph: {
    title: "PDF Books Search & Download | Largest Collection of Books",
    description:
      "Search and download from the largest collection of free PDF books. Discover educational resources, novels, textbooks, and more, with direct download links for easy access.",
    url: "https://yourwebsite.com",
    siteName: "PDF Books Search & Download",
    images: [
      {
        url: "/path/to/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PDF Books Search and Download",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* You can add any additional head elements here */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // Applying the font variables
      >
        {children}
      </body>
    </html>
  );
}
