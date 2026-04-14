import Logo from './Logo';
import LinkHeader from './LinkHeader';
import { HiOutlineShoppingBag } from "react-icons/hi2";

export default function Header() {
    return (
        <header className="fixed top-0 w-full z-50 bg-pink-500 shadow-lg">
            <nav className="max-w-[1500px] mx-auto flex justify-between items-center p4 px-10">
                
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
                    
                    <div className="flex items-center gap-6 ml-4">
                        <button className="text-white hover:scale-120 text-3xl">
                            <HiOutlineShoppingBag />
                        </button>

                        <LinkHeader href="/login">
                            <span className="border-2 border-white text-white px-8 py-3 rounded-full text-sm font-black tracking-widest hover:bg-white hover:text-pink-500 transition-all shadow-md">
                                ENTRADAS
                            </span>
                        </LinkHeader>
                    </div>
                </div>
            </nav>
        </header>
    );
}