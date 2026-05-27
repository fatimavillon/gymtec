'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
    href: string;
    label?: string;
}

export function BackButton({ href, label = 'Volver' }: BackButtonProps) {
    return (
        <Link
            href={href}
            className="inline-flex items-center gap-1 text-blue-100 hover:text-white font-semibold transition-colors mb-4"
        >
            <ChevronLeft size={20} strokeWidth={2} />
            {label}
        </Link>
    );
}