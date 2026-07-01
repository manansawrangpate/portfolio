import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Manan Sawrangpate // Robotics Engineer',
  description:
    'Robotics Engineering Student @ University of Toronto. Building autonomous systems at the intersection of embedded hardware and AI.',
  keywords: [
    'robotics',
    'embedded systems',
    'FOC',
    'ROS2',
    'STM32',
    'firmware',
    'Manan Sawrangpate',
    'University of Toronto',
  ],
  authors: [{ name: 'Manan Sawrangpate' }],
  openGraph: {
    title: 'Manan Sawrangpate // Robotics Engineer',
    description:
      'Building autonomous systems at the intersection of embedded hardware and AI.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
