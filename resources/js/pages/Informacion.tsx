import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { HiOutlinePencil, HiPlus, HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import WidgetChat from '@/components/festival/WidgetChat';

interface NoticiaItemProps {
    n: {
        id: number;
        titulo: string;
        contenido: string;
        imagen?: string;
        created_at: string;
        esta_oculta: boolean;
    };
    esAdmin: boolean;
}

const NoticiaItem = ({ n, esAdmin }: NoticiaItemProps) => {
    const cambiarVisibilidad = (ev: React.MouseEvent, id: number) => {
        ev.preventDefault();
        router.post(
            `/admin/noticias/${id}/cambiar-visibilidad`,
            {}, 
            {
                preserveScroll: true, 
                preserveState: true  
            }
        );
    };

    return (
        <div className={`relative bg-gray-50 rounded-[40px] border border-gray-100 overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-300 ${n.esta_oculta ? 'opacity-50 grayscale border-yellow-400' : 'opacity-100'}`}>
            {esAdmin && (
                <div className="flex gap-2 absolute top-4 right-4 z-20">
                    <button
                        onClick={(ev) => cambiarVisibilidad(ev, n.id)}
                        title={n.esta_oculta ? "Mostrar noticia" : "Ocultar noticia"}
                        className={`p-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-90 active:shadow-none hover:-translate-y-1 ${n.esta_oculta ? 'bg-black text-white' : 'bg-yellow-400 text-black'}`}
                    >
                        {n.esta_oculta ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
                    </button>
                    <button
                        onClick={() => router.get(`/admin/noticias/${n.id}/edit`)}
                        className="p-3 bg-pink-500 text-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-90 active:shadow-none hover:bg-black hover:-translate-y-1"
                    >
                        <HiOutlinePencil size={20} />
                    </button>
                </div>
            )}
            {n.imagen && (
                <div className="w-full h-80 relative overflow-hidden bg-zinc-100">
                    <img src={`/storage/${n.imagen}`} alt={n.titulo} className="w-full h-full object-cover" />
                </div>
            )}
            <div className={`p-8 md:p-10 flex flex-col justify-between ${n.imagen ? 'md:col-span-2' : 'md:col-span-3'}`}>
                <div className="space-y-4">
                    <span className="text-xs font-black text-pink-500 uppercase">{new Date(n.created_at).toLocaleDateString()}</span>
                    <h3 className="text-3xl font-black uppercase">{n.titulo}</h3>
                    <p className="text-gray-600 whitespace-pre-line">{n.contenido}</p>
                </div>
            </div>
        </div>
    );
};

export default function Informacion({ novedades, horario, ubicacion, normas, mapa_src }: any) {
    const { auth } = usePage().props as any;
    const esAdmin = auth?.user?.role_id === 1;
    const [visibles, setVisibles] = useState(6);

    const noticiasOrdenadas = [...novedades].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const noticiasMostradas = noticiasOrdenadas.slice(0, visibles);
    const tieneMasNoticias = noticiasOrdenadas.length > visibles;

    const srcMapaPublico = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ubicacion)}`;

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-pink-500 selection:text-white">
            <Header />

            <section className="pt-52 pb-24 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 text-center lg:text-left">
                        <div>
                            <span className="text-xs font-black tracking-widest text-pink-500 uppercase block mb-3">Urban Beat</span>
                            <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter italic text-black">
                                Últimas <span className="text-pink-500">Noticias</span>
                            </h1>
                        </div>
                        {esAdmin && (
                            <Link href="/admin/noticias/create" className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-800 text-white px-10 py-3 rounded-full font-black text-xs uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <HiPlus size={16} /> Añadir Noticia
                            </Link>
                        )}
                    </div>

                    {noticiasMostradas.length > 0 ? (
                        <div className="space-y-12">
                            {noticiasMostradas.map((n) => <NoticiaItem key={n.id} n={n} esAdmin={esAdmin} />)}
                            {tieneMasNoticias && (
                                <div className="text-center">
                                    <button onClick={() => setVisibles((prev) => prev + 6)} className="px-12 py-5 bg-black text-white font-black uppercase rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-500 transition-all">
                                        Mostrar más
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : <p className="text-center text-gray-400">No hay novedades por ahora.</p>}
                </div>
            </section>

            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-8">
                    <h2 className="text-5xl font-black uppercase italic mb-16">El Recinto <span className="text-pink-500">Urban Beat</span></h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                        <div className="bg-white p-10 rounded-[32px] border border-gray-100">
                            <h3 className="text-2xl font-black uppercase mb-4">📅 Horarios</h3>
                            <p className="text-gray-600 whitespace-pre-line">{horario || 'Información no disponible'}</p>
                        </div>
                        <div className="bg-white p-10 rounded-[32px] border border-gray-100">
                            <h3 className="text-2xl font-black uppercase mb-4">📣 Normas Generales</h3>
                            <p className="text-gray-600 whitespace-pre-line">{normas || 'Información no disponible'}</p>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[32px] border mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h3 className="text-2xl font-black uppercase">📍 {ubicacion}</h3>
                        <a href={srcMapaPublico} target="_blank" className="px-8 py-3 bg-zinc-900 text-white font-black uppercase rounded-full hover:bg-pink-500">Google Maps</a>
                    </div>
                    <div className="w-full h-[500px] rounded-[40px] overflow-hidden border-4 border-white bg-gray-200 shadow-md">
                        <iframe src={mapa_src} width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" />
                    </div>
                    {esAdmin && (
                        <div className="mt-20 text-center">
                            <Link href="/admin/evento" className="inline-block bg-pink-500 text-white px-10 py-4 rounded-xl font-black uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-all">
                                Editar información del evento
                            </Link>
                        </div>
                    )}
                </div>
            </section>
            <WidgetChat />
            <Footer />
        </div>
    );
}