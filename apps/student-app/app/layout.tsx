import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'GYMTEC - Aforo del Gimnasio UTEC',
    description:
        'Consulta el aforo, predice ocupación y encuentra mejores horarios para entrenar.',
    viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className={inter.variable}>
        <head>
            <meta name="theme-color" content="#2563EB" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        </head>
        <body className="bg-slate-900">{children}</body>
        </html>
    );
}