// resources/js/components/festival/LinkHeader.tsx
import { Link } from '@inertiajs/react';

interface Props {
    href: string;
    children: React.ReactNode;
}

export default function LinkHeader({ href, children }: Props) {
    return (
        <Link 
            href={href} 
            className="text-white font-bold uppercase tracking-tighter text-sm inline-block transition-all duration-300 ease-in-out hover:scale-120 transform"
        >
            {children}
        </Link>
    );
}