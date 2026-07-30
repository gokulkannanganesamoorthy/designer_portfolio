import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Add any private routes here if needed in the future
    },
    sitemap: 'https://gokulmakes.in/sitemap.xml',
  };
}
