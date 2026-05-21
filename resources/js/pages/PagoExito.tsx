import { useEffect } from 'react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { Head, Link } from '@inertiajs/react';

interface Props {
    compra_id: number;
}

export default function PagoExito({ compra_id }: Props) {
    
    useEffect(() => {
        localStorage.removeItem('carrito');
        localStorage.removeItem('cart');
        document.cookie = "carrito=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }, []);

    return (
        <div className="min-h-screen bg-[#fcfcfc] text-black font-sans antialiased flex flex-col">
            <Head title="¡Pago Completado! — UrbanBeat" />
            <Header />

            <main className="max-w-2xl mx-auto pt-44 pb-32 px-8 flex-grow text-center">
                <div className="bg-white p-10 rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-6xl mb-6 block">🎉</span>
                    <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-4">
                        ¡Pago <span className="text-pink-500">Completado</span>!
                    </h1>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-8">
                        Tu compra ha sido realizada con éxito. Puedes acceder a ella a través de tu perfil.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a 
                            href={`/pago/factura/${compra_id}/pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-block bg-pink-500 text-white px-8 py-4 font-black uppercase tracking-widest text-[10px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                        >
                            📄 Ver Factura en PDF
                        </a>

                        <Link 
                            href="/entradas" 
                            className="w-full sm:w-auto inline-block bg-black text-white px-8 py-4 font-black uppercase tracking-widest text-[10px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                        >
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}