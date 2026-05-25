import { router } from '@inertiajs/react';
import { HiOutlinePencil, HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

interface NoticiaListaProps {
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

export default function NoticiaLista({ n, esAdmin }: NoticiaListaProps) {
    const cambiarVisibilidad = (ev: React.MouseEvent, id: number) => {
        ev.preventDefault();
        router.post(`/admin/noticias/${id}/cambiar-visibilidad`);
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
}