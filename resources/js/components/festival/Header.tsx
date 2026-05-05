import Logo from './Logo';
import LinkHeader from './LinkHeader';
import { useState } from 'react';
import { 
    HiOutlineShoppingBag, 
    HiOutlineUser, 
    HiChevronDown, 
    HiOutlineAdjustmentsHorizontal 
} from "react-icons/hi2";
import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const { auth } = usePage().props as any;
    const [menuOpen, setMenuOpen] = useState(false);

    const opcionesEntradas = [
        { nombre: 'Abonos Generales', href: '/entradas?tipo=abono' },
        { nombre: 'Día 23 Julio', href: '/entradas?dia=2026-07-23' },
        { nombre: 'Día 24 Julio', href: '/entradas?dia=2026-07-24' },
        { nombre: 'Día 25 Julio', href: '/entradas?dia=2026-07-25' },
    ];

    return (
        <header className="fixed top-0 w-full z-50 bg-pink-500 shadow-lg">
            <nav className="max-w-[1500px] mx-auto flex justify-between items-center py-4 px-10">

                <div className="flex items-center">
                    <LinkHeader href="/">
                        <Logo className="h-22 w-auto transition-transform" />
                    </LinkHeader>
                </div>

                <div className="flex gap-8 items-center">
                    <LinkHeader href="/">HOME</LinkHeader>
                    <LinkHeader href="/cartel">CARTEL</LinkHeader>
                    <LinkHeader href="/informacion">INFORMACIÓN</LinkHeader>
                    <LinkHeader href="/merchandising">MERCHANDISING</LinkHeader>

                    <div
                        className="relative h-full flex items-center"
                        onMouseEnter={() => setMenuOpen(true)}
                        onMouseLeave={() => setMenuOpen(false)}
                    >
                        <button className="flex items-center text-white font-black text-[16px] uppercase hover:opacity-70 transition-opacity">
                            ENTRADAS <HiChevronDown className={`transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {menuOpen && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-2xl rounded-xl py-2 mt-0 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                {opcionesEntradas.map((opcion) => (
                                    <Link
                                        key={opcion.nombre}
                                        href={opcion.href}
                                        className="block px-4 py-3 text-[12px] font-black uppercase tracking-widest text-gray-700 hover:bg-pink-500 hover:text-white transition-colors"
                                    >
                                        {opcion.nombre}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-6 ml-4">
                        <button className="text-white hover:scale-110 transition-transform text-3xl">
                            <HiOutlineShoppingBag />
                        </button>

                        {auth.user ? (
                            <div className="flex items-center gap-4">
                                
                                {auth.user.role_id === 1 && (
                                    <Link 
                                        href="/admin/dashboard" 
                                        className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-full border border-black hover:bg-white hover:text-black transition-all group shadow-md"
                                    >
                                        <HiOutlineAdjustmentsHorizontal className="text-xl group-hover:rotate-90 transition-transform duration-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Panel Admin</span>
                                    </Link>
                                )}

                                <div className="flex items-center gap-2 bg-black/15 px-5 py-2.5 rounded-full border border-black/10 backdrop-blur-sm">
                                    <HiOutlineUser className="text-white text-lg" />
                                    <span className="text-white text-xs font-black uppercase tracking-widest pt-0.5">
                                        {auth.user.name}
                                    </span>
                                </div>

                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="border-2 border-white text-white px-6 py-2.5 rounded-full text-xs font-black tracking-widest hover:bg-white hover:text-pink-500 transition-all"
                                >
                                    SALIR
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/login">
                                    <span className="border-2 border-white text-white px-8 py-3 rounded-full text-sm font-black tracking-widest hover:bg-white hover:text-pink-500 transition-all shadow-md">
                                        LOGIN
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}