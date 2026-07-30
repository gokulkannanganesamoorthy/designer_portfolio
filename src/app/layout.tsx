import type { Metadata } from "next";
import DevToolsLogger from "../components/layout/DevToolsLogger";
import Footer from "../components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gokulmakes.in"),
  title: {
    default: "Gokul Kannan Ganesamoorthy | Digital Experience Designer",
    template: "%s | Gokul Kannan Ganesamoorthy",
  },
  description: "Designing the Invisible. Building things people remember. Digital Experience Designer portfolio of Gokul Kannan Ganesamoorthy.",
  keywords: [
    "Digital Experience Designer",
    "UI/UX Designer",
    "Product Designer",
    "Gokul Kannan Ganesamoorthy",
    "Web Designer",
    "Portfolio",
  ],
  authors: [{ name: "Gokul Kannan Ganesamoorthy", url: "https://gokulmakes.in" }],
  creator: "Gokul Kannan Ganesamoorthy",
  publisher: "Gokul Kannan Ganesamoorthy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Gokul Kannan Ganesamoorthy",
    description: "Digital Experience Designer",
    url: "https://gokulmakes.in",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gokul Kannan Ganesamoorthy",
  jobTitle: "Digital Experience Designer",
  url: "https://gokulmakes.in",
  sameAs: [
    "https://twitter.com/gokulkannan",
    "https://linkedin.com/in/gokulkannan",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div dangerouslySetInnerHTML={{ __html: "<!-- Look Closer. -->" }} />
        <DevToolsLogger />
        {children}
        <Footer />
      </body>
    </html>
  );
}
