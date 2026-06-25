import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gokul Kannan Ganesamoorthy | Digital Experience Designer",
  description: "Designing the Invisible. Building things people remember. Digital Experience Designer portfolio of Gokul Kannan Ganesamoorthy.",
  openGraph: {
    title: "Gokul Kannan Ganesamoorthy",
    description: "Digital Experience Designer",
    url: "https://gokulkannanganesamoorthy.dev",
    siteName: "Gokul Kannan Ganesamoorthy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gokul Kannan Ganesamoorthy | Digital Experience Designer",
    description: "Designing the Invisible. Building things people remember.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
