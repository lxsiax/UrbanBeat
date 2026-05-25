import { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { HiOutlinePencil, HiOutlineTrash, HiPlus, HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

interface Noticia {
    id: number;
    titulo: string;
    created_at: string;
    esta_oculta: boolean;
}

interface Props {
    noticias: Noticia[];
}

export default function GestionNoticias({ noticias: noticiasIniciales = [] }: Props) {
    const [noticias, setNoticias] = useState(noticiasIniciales);
    const [filtroFecha, setFiltroFecha] = useState('');

    const eliminarNoticia = (id: number) => {
        if (confirm('¿Estás seguro de eliminar esta noticia?')) {
            router.delete(`/admin/noticias/${id}`, {
                preserveScroll: true,
                onSuccess: () => setNoticias(prev => prev.filter(n => n.id !== id))
            });
        }
    };

    const cambiarVisibilidad = (id: number) => {
        router.post(`/admin/noticias/${id}/cambiar-visibilidad`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                setNoticias(prev => prev.map(n => 
                    n.id === id ? { ...n, esta_oculta: !n.esta_oculta } : n
                ));
            }
        });
    };

    const irAEditar = (id: number) => {
        router.get(`/admin/noticias/${id}/edit`);
    };

    const noticiasProcesadas = [...noticias].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const noticiasFiltradas = noticiasProcesadas.filter((n) => {
        return filtroFecha
            ? n.created_at.startsWith(filtroFecha)
            : true;
    });

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title="Gestión Noticias - UrbanBeat" />
            <Header />

            <main className="flex-grow pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-black mb-8">
                        Gestión <span className="text-pink-500">Noticias</span>
                    </h1>

                    <div className="flex flex-col sm:flex-row justify-between items-end gap-4 mb-6 max-w-7xl mx-auto">
                        <div className="w-full sm:w-1/2 md:w-1/3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Filtrar por fecha</label>
                            <input
                                type="date"
                                value={filtroFecha}
                                className="w-full rounded-xl border-2 border-black text-xs font-black uppercase p-3 tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:ring-0 focus:border-pink-500 bg-white cursor-pointer"
                                onChange={(e) => setFiltroFecha(e.target.value)}
                            />
                        </div>

                        <Link
                            href="/admin/noticias/create"
                            className="bg-green-600 hover:bg-green-800 text-white px-10 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-colors shadow-md text-center flex items-center justify-center border border-black/10 flex-shrink-0 whitespace-nowrap"
                        >
                            <HiPlus className="mr-2" size={18} /> Añadir noticia
                        </Link>
                    </div>

                    <div className="bg-white rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-left min-w-[700px]">
                                <thead>
                                    <tr className="bg-black text-white uppercase text-[10px] tracking-[0.2em] font-black">
                                        <th className="p-6">Título</th>
                                        <th className="p-6">Fecha de publicación</th>
                                        <th className="p-6 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {noticiasFiltradas.map((n) => (
                                        <tr key={n.id} className={`transition-all ${n.esta_oculta ? 'bg-gray-50 opacity-60' : 'hover:bg-pink-50/30'}`}>
                                            <td className="p-6 font-black uppercase italic text-sm text-black">{n.titulo}</td>
                                            <td className="p-6">
                                                <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                                                    {new Date(n.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </span>
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <button
                                                        onClick={() => cambiarVisibilidad(n.id)}
                                                        className={`p-2 border-2 border-black rounded-xl transition-all active:scale-90 ${n.esta_oculta ? 'bg-black text-white' : 'bg-white text-black hover:bg-yellow-400'}`}
                                                    >
                                                        {n.esta_oculta ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
                                                    </button>
                                                    <button
                                                        onClick={() => irAEditar(n.id)}
                                                        className="p-2 bg-white border-2 border-black rounded-xl text-black hover:bg-black hover:text-white transition-all active:scale-90"
                                                    >
                                                        <HiOutlinePencil size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => eliminarNoticia(n.id)}
                                                        className="p-2 bg-white border-2 border-red-500 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90"
                                                    >
                                                        <HiOutlineTrash size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {noticiasFiltradas.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="p-10 text-center font-black uppercase text-xs text-gray-400 italic">
                                                No se encontraron noticias en esta fecha
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}