import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'PXOMXD Dashboard', description: 'Next.js + Tailwind dashboard for PXOMXD' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body>{children}</body></html>;
}
