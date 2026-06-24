import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Studio — Источник',
  description: 'Command Center для редактирования сайта клиники',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="min-h-[100svh] bg-slate-100 text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
