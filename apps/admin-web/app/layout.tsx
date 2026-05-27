import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'GYMTEC Admin - Panel Administrativo',
    description: 'Panel de control para monitorear el aforo del gimnasio UTEC',
    viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className={inter.variable}>
        <head>
            <meta name="theme-color" content="#0f172a" />
        </head>
        <body className="bg-slate-950">{children}</body>
        </html>
    );
}