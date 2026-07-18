import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// Vercel build environments may block outbound calls to Google Fonts.
// Avoid hard-failing the build by falling back when font fetch fails.
const noto = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto',
  // next/font/google fetches at build-time; if it cannot reach Google, fallback to system sans.
  // This prevents production build failure due to ETIMEDOUT.
  fallback: ['system-ui', 'sans-serif'],
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
