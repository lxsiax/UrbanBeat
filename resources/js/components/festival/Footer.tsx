import { FaInstagram, FaFacebook, FaTiktok, FaYoutube, FaXTwitter } from 'react-icons/fa6';
import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-pink-500 text-white py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="text-3xl font-black italic tracking-tighter">URBANBEAT 2026</div>
                </div>

                <div className="border-t border-white/30 my-6"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[12px] font-bold uppercase mb-2 tracking-widest">El Evento</h3>
                        <Link href="/informacion" className="text-sm hover:underline">Información y horarios</Link>
                        <Link href="/cartel" className="text-sm hover:underline">Lineup de artistas</Link>
                        <Link href="/entradas" className="text-sm hover:underline">Compra de entradas</Link>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-[12px] font-bold uppercase mb-2 tracking-widest">Contacto</h3>
                        <p className="text-sm">Sanlúcar de Barrameda, Cádiz</p>
                        <a href="mailto:info@urbanbeat.es" className="text-sm hover:underline">info@urbanbeat.es</a>
                    </div>

                    <div className="flex flex-col gap-4 items-start md:items-end">
                        <h3 className="text-[12px] font-bold uppercase tracking-widest">Síguenos</h3>
                        <div className="flex gap-3">
                            <SocialCircleIcon href="https://www.instagram.com" icon={<FaInstagram />} />
                            <SocialCircleIcon href="https://www.facebook.com" icon={<FaFacebook />} />
                            <SocialCircleIcon href="https://www.tiktok.com" icon={<FaTiktok />} />
                            <SocialCircleIcon href="https://twitter.com" icon={<FaXTwitter />} />
                            <SocialCircleIcon href="https://www.youtube.com" icon={<FaYoutube />} />
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/30 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] uppercase tracking-widest">
                        © 2026 UrbanBeat. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}

function SocialCircleIcon({ icon, href }: { icon: any; href: string }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="border border-white rounded-full p-3 hover:bg-white hover:text-pink-500 transition-all duration-300 text-lg"
        >
            {icon}
        </a>
    );
}