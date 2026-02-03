import type { Metadata } from 'next';
import './globals.css';
import { PreferencesProvider } from '@/components/providers/PreferencesProvider';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bungee&family=Roboto+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <PreferencesProvider>{children}</PreferencesProvider>
      </body>
    </html>
  );
}
