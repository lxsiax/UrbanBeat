import Logo from './Logo';
import LinkHeader from './LinkHeader';
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi2";
import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const { auth } = usePage().props as any;

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
                    <LinkHeader href="/entradas">ENTRADAS</LinkHeader>
                    
                    <div className="flex items-center gap-6 ml-4">
                        <button className="text-white hover:scale-110 transition-transform text-3xl">
                            <HiOutlineShoppingBag />
                        </button>

                        {auth.user ? (
                            <div className="flex items-center gap-4">
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
                                <LinkHeader href="/register">ENTRADAS</LinkHeader>
                                
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