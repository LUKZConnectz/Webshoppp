import type { Metadata } from 'next';
import { Kanit } from 'next/font/google';
import './globals.css';

const kanit = Kanit({ subsets: ['thai', 'latin'], weight: ['300','400','500','600','700','800','900'], variable: '--font-kanit' });

export const metadata: Metadata = { title: 'PXOMXD Dashboard', description: 'Next.js + Tailwind dashboard for PXOMXD' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th" className={kanit.variable}><body>{children}</body></html>;
}
