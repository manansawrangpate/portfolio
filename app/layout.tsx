import type { Metadata } from 'next';
import { Poppins, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
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
      className={`${poppins.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
