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
                cyan: {
                    400: '#22d3ee',
                    600: '#0891b2',
                },
                slate: {
                    750: '#1e293b',
                    850: '#1f2937',
                    950: '#0f172a',
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
        },
    },
    plugins: [],
};

export default config;