// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://carlosmorones.com',
  trailingSlash: 'ignore',
  redirects: {
    '/about': { status: 301, destination: '/#about' },
    '/services': { status: 301, destination: '/#services' },
    '/contact': { status: 301, destination: '/#contact' },
    '/tools': { status: 301, destination: '/#systems' },
    '/case-studies': { status: 301, destination: '/#systems' },
  },
  integrations: [react(), sitemap({ filter: (page) => !page.includes('/thank-you') })],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});