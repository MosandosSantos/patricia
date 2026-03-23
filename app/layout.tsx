import type { Metadata } from 'next'
import { Cinzel, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cinzel = Cinzel({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif"
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: 'Patricia Oliveira | Psicoterapia Online',
  description: 'Psicóloga clínica especializada em Terapia Cognitivo-Comportamental. Atendimento online para ansiedade, depressão, TDAH e desenvolvimento pessoal.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${cinzel.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased scroll-smooth overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
