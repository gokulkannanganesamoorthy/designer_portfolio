import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import localFont from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';
import Footer from '../components/layout/Footer';
import SmoothScroll from '../components/layout/SmoothScroll';
import { ThemeProvider } from '../components/layout/ThemeProvider';
import BottomHUD from '../components/layout/BottomHUD';
import './globals.css';
import Navigation from '@/components/layout/Navigation';

const nohemi = localFont({
  src: [
    {
      path: '../../public/fonts/nohemi/Nohemi-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/nohemi/Nohemi-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/nohemi/Nohemi-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/nohemi/Nohemi-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/nohemi/Nohemi-ExtraBold.woff',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/nohemi/Nohemi-Black.woff',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-primary',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-secondary',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://gokulmakes.in'),
  title: {
    default: 'Gokul Kannan — Digital Experience Designer & Creative Technologist',
    template: '%s | Gokul Kannan',
  },
  description:
    'Digital Experience Designer crafting world-class digital products, bespoke 3D web experiences, and thoughtful brand identities. Founder of Luno Tech.',
  keywords: [
    'Digital Experience Designer',
    'Creative Technologist',
    'UI/UX Designer',
    'Product Designer',
    'Gokul Kannan',
    'Gokul Kannan Ganesamoorthy',
    'Gokul Makes',
    'Creative Director',
    'Brand Strategist',
    'Interactive Web Experiences',
    '3D Web Design',
    'Frontend Engineer',
    'Luno Tech',
    'Design Portfolio',
    'Modern Web Design',
    'Awwwards Portfolio',
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
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/favicon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: 'https://gokulmakes.in',
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
    title: 'Gokul Kannan — Digital Experience Designer & Creative Technologist',
    description:
      'Digital Experience Designer crafting world-class digital products, bespoke 3D web experiences, and thoughtful brand identities. Founder of Luno Tech.',
    url: 'https://gokulmakes.in',
    siteName: 'Gokul Makes',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gokul Kannan — Digital Experience Designer & Creative Technologist',
    description:
      'Digital Experience Designer crafting world-class digital products, bespoke 3D web experiences, and thoughtful brand identities.',
    creator: '@gokulkannan',
  },
  category: 'design',
  classification: 'Portfolio',
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Gokul Kannan Ganesamoorthy',
    alternateName: ['Gokul Kannan', 'Gokul Makes'],
    jobTitle: 'Digital Experience Designer & Creative Technologist',
    description:
      'Digital Experience Designer crafting world-class digital products, bespoke 3D web experiences, and thoughtful brand identities. Founder of Luno Tech.',
    url: 'https://gokulmakes.in',
    image: 'https://gokulmakes.in/favicon.png',
    sameAs: [
      'https://twitter.com/gokulkannan',
      'https://linkedin.com/in/gokulkannan',
      'https://github.com/gokulkannanganesamoorthy',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Luno Tech',
      url: 'https://lunotech.in',
    },
    knowsAbout: [
      'Digital Experience Design',
      'UI/UX Design',
      'Creative Technologist',
      'Frontend Engineering',
      'Interaction Design',
      'Brand Identity',
      'Design Systems',
      '3D Web Development',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Gokul Makes',
    alternateName: 'Gokul Kannan — Portfolio',
    url: 'https://gokulmakes.in',
    description: 'Designing the Invisible. Building things people remember.',
    publisher: {
      '@type': 'Person',
      name: 'Gokul Kannan Ganesamoorthy',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: '2026-01-01T00:00:00Z',
    dateModified: new Date().toISOString(),
    mainEntity: {
      '@type': 'Person',
      name: 'Gokul Kannan Ganesamoorthy',
      jobTitle: 'Digital Experience Designer',
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/assets/works/castella.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/assets/works/GRE.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body
        className={`${nohemi.variable} ${jetbrainsMono.variable} antialiased`}
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
          <Navigation delay={6.5} />
          <SmoothScroll>
            {children}
            <Footer />
          </SmoothScroll>
          <BottomHUD delay={6.5} />
        </ThemeProvider>
      </body>
    </html>
  );
}
