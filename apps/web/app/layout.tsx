import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Клиника «Источник»',
  description: 'Медицинский центр «Источник»',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}
