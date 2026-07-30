import type { Metadata } from "next";
import DevToolsLogger from "../components/layout/DevToolsLogger";
import Footer from "../components/layout/Footer";
import "./globals.css";

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
    <html lang="en">
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div dangerouslySetInnerHTML={{ __html: "<!-- Look Closer. -->" }} />
        <DevToolsLogger />
        {children}
        <Footer />
      </body>
    </html>
  );
}
