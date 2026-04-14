import Logo from './Logo';
import LinkHeader from './LinkHeader';

export default function Header() {
    return (
        <nav className="fixed w-full flex justify-between items-center px-10 m-0 bg-pink-500 shadow-2xl">
            <div className="flex items-center">
                <LinkHeader href="/">
                    <Logo className="h-23 m-0 p-0 w-auto" />
                </LinkHeader>
            </div>
    
            <div className="flex gap-10">
                <LinkHeader href="/">Inicio</LinkHeader>
                <LinkHeader href="/artistas">Entradas</LinkHeader>
                <LinkHeader href="/tienda">Cartel</LinkHeader>
                <LinkHeader href="/login">Información</LinkHeader>
                <LinkHeader href="/login">Merchandising</LinkHeader>
            </div>
        </nav>
    );
}