import { Metadata } from 'next';
import './globals.css';
import { Inter, Pacifico } from 'next/font/google';
import ErrorBoundary from '@/components/ErrorBoundary';
import Footer from '@/components/layout/footer';



const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
});

export const metadata: Metadata = {
  title: 'EVCharge - Smart EV Charging Network',
  description: 'Discover, book, and charge at thousands of reliable EV stations. Join the sustainable transportation revolution with our intelligent charging network.',
  keywords: 'EV charging, electric vehicle, charging station, booking, sustainable energy',
  authors: [{ name: 'EVCharge Team' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${pacifico.variable}`}>
      <head>
        {/* Remix Icon CDN */}
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body>
      <ErrorBoundary>
        <main>
          {children}
        </main>
        <Footer />
      </ErrorBoundary>
      </body>
    </html>
  );
}