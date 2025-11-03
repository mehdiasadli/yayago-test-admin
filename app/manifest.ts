import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Yayago Admin Dashboard',
    short_name: 'Yayago Admin Dashboard',
    description: 'Yayago Admin Dashboard',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f5f5',
    theme_color: '#f5f5f5',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
