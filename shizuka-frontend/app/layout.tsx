import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const noto = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto',
});

export const metadata: Metadata = {
  title: 'Shizuka – AI Email Assistant | シズカ',
  description:
    'Shizuka is a calm, sakura-pink, Japanese-inspired AI email assistant that drafts polished replies in seconds.',
  openGraph: {
    title: 'Shizuka – AI Email Assistant',
    description:
      'Calm, sakura-pink, Japanese-inspired AI email assistant. Draft polished replies in seconds.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${noto.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
