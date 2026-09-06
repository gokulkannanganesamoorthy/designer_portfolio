import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import Footer from '../components/layout/Footer';
import SmoothScroll from '../components/layout/SmoothScroll';
import { ThemeProvider } from '../components/layout/ThemeProvider';
import BottomHUD from '../components/layout/BottomHUD';
import './globals.css';
import Navigation from '@/components/layout/Navigation';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gokulmakes.in'),
  title: {
    default: 'Gokul Kannan — Digital Experience Designer',
    template: '%s | Gokul Kannan',
  },
  description:
    'Digital Experience Designer. Designing the Invisible. Building things people remember. Founder, Luno Tech.',
  keywords: [
    'Digital Experience Designer',
    'UI/UX Designer',
    'Product Designer',
    'Gokul Kannan Ganesamoorthy',
    'Creative Director',
    'Brand Strategist',
    'Gokul Makes',
  ],
  authors: [
    { name: 'Gokul Kannan Ganesamoorthy', url: 'https://gokulmakes.in' },
  ],
  creator: 'Gokul Kannan Ganesamoorthy',
  publisher: 'Gokul Kannan Ganesamoorthy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.png',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Gokul Kannan — Digital Experience Designer',
    description: 'Designing the Invisible. Building things people remember.',
    url: 'https://gokulmakes.in',
    siteName: 'Gokul Makes',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gokul Kannan — Digital Experience Designer',
    description: 'Designing the Invisible. Building things people remember.',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gokul Kannan Ganesamoorthy',
    jobTitle: 'Digital Experience Designer',
    url: 'https://gokulmakes.in',
    sameAs: [
      'https://twitter.com/gokulkannan',
      'https://linkedin.com/in/gokulkannan',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Gokul Makes',
    url: 'https://gokulmakes.in',
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <GoogleAnalytics gaId="G-LGV6KYWDH1" />
          <div
            dangerouslySetInnerHTML={{
              __html: '<!-- Designing the Invisible. -->',
            }}
          />
          <Navigation delay={8} />
          <SmoothScroll>
            {children}
            <Footer />
          </SmoothScroll>
          <BottomHUD delay={8} />
        </ThemeProvider>
      </body>
    </html>
  );
}
