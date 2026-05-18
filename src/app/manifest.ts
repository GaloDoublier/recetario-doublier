import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Recetario Doublier',
    short_name: 'Recetario',
    description: 'Mi recetario personal y panel de administración',
    start_url: '/',
    display: 'standalone', // Esto es la magia que oculta la barra del navegador
    background_color: '#df202e',
    theme_color: '#df202e', // Podés cambiarlo al color principal de tu app
    icons: [
      {
        src: '/galicono-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/galicono-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}