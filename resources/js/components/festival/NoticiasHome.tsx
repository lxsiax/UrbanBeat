import { Link, router, usePage } from '@inertiajs/react';
import { HiOutlinePencil, HiOutlineEye, HiOutlineEyeSlash, HiOutlineMusicalNote, HiOutlineShoppingBag, HiOutlineMegaphone } from 'react-icons/hi2';

interface Noticia {
    id: number;
    titulo: string;
    contenido: string;
    imagen?: string;
    created_at: string;
    esta_oculta: boolean;
    tipo: 'artista' | 'producto' | 'novedad'; 
}

interface NoticiasHomeProps {
    noticias: Noticia[];
}

interface FormatoConfig {
    badge: string;
    icon: React.ReactNode;
    badgeClass: string;
    // Eliminamos 'imgPosition' porque ya no recortaremos la imagen artificialmente
}

export default function NoticiasHome({ noticias }: NoticiasHomeProps) {
    const { auth } = usePage().props as any;
    const esAdmin = auth?.user?.role_id === 1;

    if (!noticias || noticias.length === 0) return null;

    const noticiasMostradas = esAdmin
        ? noticias.slice(0, 3)
        : noticias.filter(n => !n.esta_oculta).slice(0, 3);

    const cambiarVisibilidad = (ev: React.MouseEvent, id: number) => {
        ev.preventDefault();
        router.post(`/admin/noticias/${id}/cambiar-visibilidad`, {}, {
            preserveScroll: true,
            preserveState: true
        });
    };

    return (
        <section className="pt-12 pb-28 bg-zinc-50 text-black border-t border-gray-200/60 shadow-[inner_0_10px_20px_rgba(0,0,0,0.02)]">
            <div className="max-w-[90vw] mx-auto px-4">
                <div className="mb-20 text-center lg:text-left">
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic text-black leading-none">
                        ÚLTIMAS <span className="text-pink-500">NOVEDADES</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
                    {noticiasMostradas.map((n) => {
                        
                        const formatos: Record<'artista' | 'producto' | 'novedad', FormatoConfig> = {
                            artista: {
                                badge: 'Lineup 2026',
                                icon: <HiOutlineMusicalNote />,
                                badgeClass: 'bg-black text-white'
                            },
                            producto: {
                                badge: 'Merch / Tickets',
                                icon: <HiOutlineShoppingBag />,
                                badgeClass: 'bg-yellow-400 text-black'
                            },
                            novedad: {
                                badge: 'Última Hora',
                                icon: <HiOutlineMegaphone />,
                                badgeClass: 'bg-pink-500 text-white'
                            }
                        };

                        const config = formatos[n.tipo] || formatos.novedad;

                        return (
                            <div
                                key={n.id}
                                className={`relative bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm transition-all duration-300 flex flex-col h-full ${n.esta_oculta ? 'opacity-60 grayscale border-yellow-400' : 'hover:shadow-xl hover:-translate-y-1'}`}
                            >
                                {esAdmin && (
                                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                                        <button
                                            onClick={(ev) => cambiarVisibilidad(ev, n.id)}
                                            className={`p-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-90 ${n.esta_oculta ? 'bg-black text-white' : 'bg-white text-black'}`}
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
                                    /* SOLUCIÓN MAESTRA: Quitamos 'h-72'. Ahora el contenedor se adapta al tamaño 
                                      real de la imagen. Al usar max-h-[450px] evitamos que una imagen exageradamente 
                                      vertical rompa la pantalla, manteniendo un límite estilizado.
                                    */
                                    <div className="w-full h-auto max-h-[450px] relative overflow-hidden border-b border-gray-100 bg-zinc-100">
                                        <img
                                            src={`/storage/${n.imagen}`}
                                            alt={n.titulo}
                                            /* object-cover sin restricciones fijas de altura = Cero efecto zoomeado */
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                    </div>
                                )}

                                <div className="p-10 flex flex-col flex-grow justify-between bg-white">
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between">
                                            <span className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px] ${config.badgeClass}`}>
                                                {config.icon}
                                                {n.esta_oculta ? 'Oculta' : config.badge}
                                            </span>
                                            <span className="text-xs font-bold text-gray-400">
                                                {new Date(n.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-3xl font-black uppercase tracking-tight text-black leading-tight break-words">
                                            {n.titulo}
                                        </h3>
                                        
                                        <p className="text-gray-600 text-base font-medium line-clamp-4 whitespace-pre-line leading-relaxed">
                                            {n.contenido}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
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