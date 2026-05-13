import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

interface Props {
    nombre: string;
    desc: string;
    icon: ReactNode;
    href: string;
    color: string;
}

export default function BotonDashboard({ nombre, desc, icon, href, color }: Props) {
    return (
        <Link 
            href={href}
            className="group bg-white p-8 rounded-[30px] border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col h-full"
        >
            <div className={`${color} text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all`}>
                {icon}
            </div>
            
            <h2 className="text-2xl font-black uppercase italic mb-2 tracking-tighter leading-none">
                {nombre}
            </h2>
            <p className="text-gray-500 text-xs font-bold leading-tight uppercase tracking-wide">
                {desc}
            </p>
            
            <div className="mt-auto pt-6 flex items-center font-black text-[10px] uppercase italic group-hover:text-pink-500 transition-colors">
                Entrar a gestión —→
            </div>
        </Link>
    );
}