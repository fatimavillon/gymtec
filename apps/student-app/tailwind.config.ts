import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './screens/**/*.{js,ts,jsx,tsx}',
        './data/**/*.{js,ts,jsx,tsx}',
        './lib/**/*.{js,ts,jsx,tsx}',
        './services/**/*.{js,ts,jsx,tsx}',
        './types/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                blue: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
            },
            fontFamily: {
                sans: [
                    'var(--font-inter)',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'sans-serif',
                ],
            },
            minHeight: {
                screen: '100dvh',
                '100dvh': '100dvh',
            },
            height: {
                '100dvh': '100dvh',
            },
        },
    },
    plugins: [],
};

export default config;