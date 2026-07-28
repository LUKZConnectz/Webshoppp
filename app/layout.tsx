import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'คอร์สไทย Dashboard', description: 'Next.js + Tailwind dashboard for Thai course management' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body>{children}</body></html>;
}
