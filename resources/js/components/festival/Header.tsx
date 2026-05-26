import Logo from './Logo';
import LinkHeader from './LinkHeader';
import { useState } from 'react';
import {
    HiOutlineShoppingBag,
    HiOutlineUser,
    HiChevronDown,
    HiOutlineAdjustmentsHorizontal,
    HiBars3,
    HiXMark
} from "react-icons/hi2";
import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const { auth, dias_evento } = usePage().props as any;
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuMovil, setmenuMovil] = useState(false);

    const opcionesEntradas = [
        { nombre: 'Abonos Generales', href: '/entradas?tipo=abono' },
        ...(dias_evento || []).map((dia: any) => ({
            nombre: `Día ${new Date(dia.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}`,
            href: `/entradas?dia=${dia.fecha}`
        }))
    ];

    return (
        <header className="fixed top-0 w-full z-50 bg-pink-500 shadow-lg">
            <nav className="max-w-[1500px] mx-auto flex justify-between items-center py-4 px-6 md:px-10">

                <div className="flex items-center">
                    <LinkHeader href="/">
                        <Logo className="h-16 md:h-22 w-auto transition-transform" />
                    </LinkHeader>
                </div>

                <div className="hidden lg:flex gap-8 items-center">
                    <LinkHeader href="/">HOME</LinkHeader>
                    <LinkHeader href="/informacion">INFORMACIÓN</LinkHeader>
                    <LinkHeader href="/cartel">CARTEL</LinkHeader>
                    <LinkHeader href="/merchandising">MERCHANDISING</LinkHeader>

                    <div
                        className="relative h-full flex items-center"
                        onMouseEnter={() => setMenuOpen(true)}
                        onMouseLeave={() => setMenuOpen(false)}
                    >
                        <Link href='/entradas' className="flex items-center text-white font-black text-[16px] uppercase hover:opacity-70 transition-opacity">
                            ENTRADAS <HiChevronDown className={`ml-2 transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`} />
                        </Link>

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
                        {auth.user ? (
                            <div className="flex items-center gap-4">
                                <Link href='/carrito' className="relative text-white hover:scale-110 transition-transform text-3xl block p-1">
                                    <HiOutlineShoppingBag />
                                    {auth.carrito_count > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-pink-500 animate-in zoom-in duration-200">
                                            {auth.carrito_count}
                                        </span>
                                    )}
                                </Link>

                                {auth.user.role_id === 1 && (
                                    <Link
                                        href="/admin/dashboard"
                                        className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-full border border-black hover:bg-white hover:text-black transition-all group shadow-md"
                                    >
                                        <HiOutlineAdjustmentsHorizontal className="text-xl group-hover:rotate-90 transition-transform duration-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Panel Admin</span>
                                    </Link>
                                )}

                                <Link
                                    href="/perfil"
                                    className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full border-2 border-black tracking-widest hover:bg-white hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group"
                                >
                                    <HiOutlineUser className="text-white text-lg group-hover:text-black transition-colors" />
                                    <span className="text-xs font-black uppercase pt-0.5">
                                        {auth.user.name}
                                    </span>
                                </Link>

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

                <div className="flex items-center gap-4 lg:hidden">
                    {auth.user && (
                        <Link href='/carrito' className="relative text-white text-3xl block p-1">
                            <HiOutlineShoppingBag />
                            {auth.carrito_count > 0 && (
                                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-pink-500">
                                    {auth.carrito_count}
                                </span>
                            )}
                        </Link>
                    )}
                    <button
                        onClick={() => setmenuMovil(true)}
                        className="text-white text-3xl focus:outline-none"
                    >
                        <HiBars3 />
                    </button>
                </div>
            </nav>

            {menuMovil && (
                <div className="fixed inset-0 z-50 flex lg:hidden">
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setmenuMovil(false)}
                    />

                    <div className="relative ml-auto w-full max-w-xs h-full bg-white border-l-4 border-black p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <span className="font-black italic text-xl tracking-tighter text-pink-500">MENÚ</span>
                                <button
                                    onClick={() => setmenuMovil(false)}
                                    className="text-black text-3xl focus:outline-none"
                                >
                                    <HiXMark />
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Link href="/" onClick={() => setmenuMovil(false)} className="text-black font-black text-lg uppercase border-b-2 border-transparent hover:border-black py-1">HOME</Link>
                                <Link href="/cartel" onClick={() => setmenuMovil(false)} className="text-black font-black text-lg uppercase border-b-2 border-transparent hover:border-black py-1">CARTEL</Link>
                                <Link href="/informacion" onClick={() => setmenuMovil(false)} className="text-black font-black text-lg uppercase border-b-2 border-transparent hover:border-black py-1">INFORMACIÓN</Link>
                                <Link href="/merchandising" onClick={() => setmenuMovil(false)} className="text-black font-black text-lg uppercase border-b-2 border-transparent hover:border-black py-1">MERCHANDISING</Link>

                                <div className="border-t-2 border-black pt-4 mt-2">
                                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-2">Entradas</span>
                                    {opcionesEntradas.map((opcion) => (
                                        <Link
                                            key={opcion.nombre}
                                            href={opcion.href}
                                            onClick={() => setmenuMovil(false)}
                                            className="block py-2 text-sm font-black uppercase text-gray-700 hover:text-pink-500"
                                        >
                                            {opcion.nombre}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="border-t-2 border-black pt-6 flex flex-col gap-4">
                            {auth.user ? (
                                <>
                                    {auth.user.role_id === 1 && (
                                        <Link
                                            href="/admin/dashboard"
                                            onClick={() => setmenuMovil(false)}
                                            className="flex items-center justify-center gap-2 bg-yellow-400 text-black py-3 rounded-xl border-2 border-black font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                                        >
                                            <HiOutlineAdjustmentsHorizontal className="text-lg" />
                                            Panel Admin
                                        </Link>
                                    )}

                                    <Link
                                        href="/perfil"
                                        onClick={() => setmenuMovil(false)}
                                        className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl border-2 border-black font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        <HiOutlineUser className="text-lg" />
                                        {auth.user.name}
                                    </Link>

                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        onClick={() => setmenuMovil(false)}
                                        className="w-full border-2 border-black text-black py-3 rounded-xl text-xs font-black tracking-widest bg-gray-100 hover:bg-red-500 hover:text-white transition-all text-center uppercase"
                                    >
                                        SALIR
                                    </Link>
                                </>
                            ) : (
                                <Link href="/login" onClick={() => setmenuMovil(false)}>
                                    <span className="block border-2 border-black bg-pink-500 text-white py-3 rounded-xl text-sm font-black tracking-widest text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        LOGIN
                                    </span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}