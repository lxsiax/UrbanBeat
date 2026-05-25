import { Link } from '@inertiajs/react';

interface Noticia {
    id: number;
    titulo: string;
    contenido: string;
    imagen?: string;
    created_at: string;
}

interface NoticiasHomeProps {
    noticias: Noticia[];
}

export default function NoticiasHome({ noticias }: NoticiasHomeProps) {
    if (!noticias || noticias.length === 0) return null;

    const noticiasMostradas = noticias.slice(0, 3);

    return (
        <section className="pt-12 pb-28 bg-zinc-50 text-black border-t border-gray-200/60 shadow-[inner_0_10px_20px_rgba(0,0,0,0.02)]">
            <div className="max-w-[90vw] mx-auto px-4">
                
                <div className="mb-20 text-center lg:text-left">
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic text-black leading-none">
                        ÚLTIMAS <span className="text-pink-500">NOTICIAS</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                    {noticiasMostradas.map((n) => (
                        <div 
                            key={n.id} 
                            className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                        >
                            {n.imagen && (
                                <div className="w-full relative overflow-hidden bg-white">
                                    <img 
                                        src={`/storage/${n.imagen}`} 
                                        alt={n.titulo}
                                        className="w-full h-auto display-block object-contain transition-transform duration-500 hover:scale-102"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/images/placeholder-artista.jpg';
                                        }}
                                    />
                                </div>
                            )}
                            
                            <div className="p-10 flex flex-col flex-grow justify-between bg-white">
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between text-xs font-bold text-gray-400">
                                        <span className="text-pink-500 bg-pink-50 px-3 py-1 rounded-full font-black uppercase tracking-widest text-[10px]">
                                            Última hora
                                        </span>
                                        <span>
                                            {new Date(n.created_at).toLocaleDateString()}
                                        </span>
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
                        className="inline-block px-16 py-6 bg-black text-white font-black uppercase text-xs tracking-widest italic rounded-full hover:bg-pink-500 hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                        Ver todas las noticias
                    </Link>
                </div>

            </div>
        </section>
    );
}