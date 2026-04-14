import { Link } from '@inertiajs/react';

interface Props {
    href: string;
    children: React.ReactNode;
}

export default function LinkHeader({ href, children }: Props) {
    return (
        <Link 
            href={href} 
            className="text-[16px] font-black uppercase tracking-tighter text-white hover:scale-110"
        >
            {children}
        </Link>
    );
}