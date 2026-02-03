import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Security+ Study App',
  description: 'CompTIA Security+ SY0-701 Flashcard Study Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
