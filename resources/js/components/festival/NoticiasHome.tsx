import { Link, router, usePage } from '@inertiajs/react';
import { HiOutlinePencil, HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

interface Noticia {
    id: number;
    titulo: string;
    contenido: string;
    imagen?: string;
    created_at: string;
    esta_oculta: boolean;
}

interface NoticiasHomeProps {
    noticias: Noticia[];
}

export default function NoticiasHome({ noticias }: NoticiasHomeProps) {
    const { auth } = usePage().props as any;
    const esAdmin = auth?.user?.role_id === 1;

    if (!noticias || noticias.length === 0) return null;

    const noticiasMostradas = noticias
        .filter(n => esAdmin || !n.esta_oculta)
        .slice(0, 3);

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
        <section className="pt-12 pb-28 bg-zinc-50 text-black border-t border-gray-200/60 shadow-[inner_0_10px_20px_rgba(0,0,0,0.02)]">
            <div className="max-w-[90vw] mx-auto px-4">
                <div className="mb-20 text-center lg:text-left">
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic text-black leading-none">
                        ÚLTIMAS <span className="text-pink-500">NOVEDADES</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                    {noticiasMostradas.map((n) => (
                        <div
                            key={n.id}
                            className={`relative bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm transition-all duration-300 flex flex-col h-full ${n.esta_oculta ? 'opacity-60 grayscale border-yellow-400' : 'hover:shadow-xl hover:-translate-y-1'}`}
                        >
                            {esAdmin && (
                                <div className="absolute top-4 right-4 z-20 flex gap-2">
                                    <button
                                        onClick={(ev) => cambiarVisibilidad(ev, n.id)}
                                        className={`p-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-90 ${n.esta_oculta ? 'bg-black text-white' : 'bg-yellow-400 text-black'}`}
                                    >
                                        {n.esta_oculta ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
                                    </button>
                                    <button
                                        onClick={() => router.get(`/admin/noticias/${n.id}/edit`)}
                                        className="p-3 bg-pink-500 text-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-90 hover:bg-black"
                                    >
                                        <HiOutlinePencil size={20} />
                                    </button>
                                </div>
                            )}

                            {n.imagen && (
                                <div className="w-full relative overflow-hidden bg-white">
                                    <img
                                        src={`/storage/${n.imagen}`}
                                        alt={n.titulo}
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                            )}

                            <div className="p-10 flex flex-col flex-grow justify-between bg-white">
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between text-xs font-bold text-gray-400">
                                        <span className="text-pink-500 bg-pink-50 px-3 py-1 rounded-full font-black uppercase tracking-widest text-[10px]">
                                            {n.esta_oculta ? 'Oculta' : 'Última hora'}
                                        </span>
                                        <span>{new Date(n.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-3xl font-black uppercase tracking-tight text-black line-clamp-2 leading-none">
                                        {n.titulo}
                                    </h3>
                                    <p className="text-gray-600 text-base font-medium line-clamp-4 whitespace-pre-line leading-relaxed">
                                        {n.contenido}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <Link
                        href="/informacion"
                        className="inline-block px-16 py-6 bg-black text-white font-black uppercase text-xs tracking-widest rounded-full hover:bg-pink-500 hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                        Ver todas las noticias
                    </Link>
                </div>
            </div>
        </section>
    );
}