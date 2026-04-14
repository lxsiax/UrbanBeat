import { FaInstagram, FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import SocialLink from './SocialLink';
import Patrocinador from './Patrocinador';
import FooterLink from './FooterLink';

export default function Footer() {
    return (
        <footer className="bg-pink-500 text-white py-8 px-6 border-t border-zinc-800">
            <div className="max-w-7xl mx-auto">
                
                <div className="flex justify-between items-center mb-6">
                    <div className="text-2xl font-black italic tracking-tighter">URBANBEAT</div>
                </div>

                <div className="border-t border-white my-6"></div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[12px] text-white font-bold uppercase mb-2">Quiénes Somos</h3>
                        <FooterLink href="#">Nuestra empresa</FooterLink>
                        <FooterLink href="#">Centro multimedia</FooterLink>
                        <FooterLink href="#">Nuestra historia</FooterLink>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[12px] text-white font-bold uppercase mb-2">¿Necesitas ayuda?</h3>
                        <FooterLink href="#">Soporte</FooterLink>
                        <FooterLink href="#">Preguntas frecuentes</FooterLink>
                        <FooterLink href="#">Contacto</FooterLink>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[12px] text-white font-bold uppercase mb-2">Legal</h3>
                        <FooterLink href="#">Condiciones de uso</FooterLink>
                        <FooterLink href="#">Privacidad</FooterLink>
                        <FooterLink href="#">Cookies</FooterLink>
                    </div>
                    
                    <div className="flex gap-3 items-start justify-end">
                        <SocialCircleIcon icon={<FaInstagram />} />
                        <SocialCircleIcon icon={<FaFacebook />} />
                        <SocialCircleIcon icon={<FaYoutube />} />
                    </div>
                </div>

                <div className="border-t border-white pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-6">
                        <Patrocinador />
                        <Patrocinador />
                    </div>
                    <p className="text-[10px] text-white uppercase">
                        © 2026 UrbanBeat. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}

function SocialCircleIcon({ icon }: { icon: any }) {
    return (
        <a href="#" className="border border-white rounded-full p-2 hover:scale-120 text-lg">
            {icon}
        </a>
    );
}