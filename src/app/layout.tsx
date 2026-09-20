import type { Metadata } from 'next';
import './globals.css';
import { manrope } from './fonts';

export const metadata: Metadata = {
  title: 'NextJS Production Ready',
  description: 'NextJS Production Ready portofolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
