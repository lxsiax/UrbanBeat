import { Link } from '@inertiajs/react';

export default function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <Link 
            href={href} 
            className="text-[13px] font-bold hover:text-fuchsia-500 transition-colors py-0.5"
        >
            {children}
        </Link>
    );
}