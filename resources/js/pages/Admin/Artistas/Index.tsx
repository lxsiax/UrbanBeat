import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlinePencil } from "react-icons/hi2";
import { Link } from '@inertiajs/react';

interface Props {
    artistas: any[];
}

export default function GestionArtistas({ artistas: artistasIniciales = [] }: Props) {
    const [artistas, setArtistas] = useState(artistasIniciales);

    const cambiarVisibilidad = (id: number) => {
        setArtistas(prev => prev.map(a =>
            a.id === id ? { ...a, esta_oculto: !a.esta_oculto } : a
        ));

        router.patch(`/admin/artistas/${id}/cambiar-visibilidad`, {}, {
            preserveScroll: true
        });
    };

    const irAEditar = (id: number) => {
        router.get(`/admin/artistas/${id}/edit`);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title="Gestión Artistas - UrbanBeat" />
            <Header />

            <main className="flex-grow pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Título con "Artistas" en Rosa */}
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-black mb-8">
                        Gestión <span className="text-pink-500">Artistas</span>
                    </h1>

                    <div className="flex justify-between items-center mb-6">
                        <Link
                            href="/admin/artistas/create"
                            className="bg-green-600 hover:bg-green-800 text-white px-10 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-colors shadow-md"
                        >
                            Añadir artista
                        </Link>
                    </div>

                    <div className="bg-white rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-black text-white uppercase text-[10px] tracking-[0.2em] font-black">
                                    <th className="p-6">Artista</th>
                                    <th className="p-6">Día</th>
                                    <th className="p-6">Tipo</th>
                                    <th className="p-6">Estado</th>
                                    <th className="p-6 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {artistas.map((a) => (
                                    <tr key={a.id} className={`transition-all ${a.esta_oculto ? 'opacity-40 bg-gray-50' : 'bg-white'}`}>
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={
                                                        a.imagen
                                                            ? (a.imagen.startsWith('http') ? a.imagen : `/storage/${a.imagen}`)
                                                            : '/storage/default-artist.jpg'
                                                    }
                                                    className="w-10 h-10 rounded-lg object-cover border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                                    alt={a.nombre}
                                                />
                                                <span className="font-black uppercase italic text-sm">{a.nombre}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                                                {new Date(a.dia.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            {a.es_headliner ? (
                                                <span className="text-pink-500 font-black text-[10px] uppercase italic">★ Headliner</span>
                                            ) : (
                                                <span className="text-gray-400 font-black text-[10px] uppercase italic">Normal</span>
                                            )}
                                        </td>
                                        <td className="p-6">
                                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${a.esta_oculto ? 'text-red-500 bg-red-50' : 'text-green-600 bg-green-50'}`}>
                                                {a.esta_oculto ? 'Oculto' : 'Visible'}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    onClick={() => cambiarVisibilidad(a.id)}
                                                    title={a.esta_oculto ? "Mostrar entrada" : "Ocultar entrada"}
                                                    className={`p-2 rounded-xl border-2 border-black transition-all active:scale-90 ${a.esta_oculto ? 'bg-black text-white' : 'bg-white hover:bg-pink-500 hover:text-white'}`}
                                                >
                                                    {a.esta_oculto ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
                                                </button>

                                                <button
                                                    onClick={() => irAEditar(a.id)}
                                                    title="Editar artista"
                                                    className="p-2 bg-white border-2 border-black rounded-xl text-black hover:bg-black hover:text-white transition-all active:scale-90"
                                                >
                                                    <HiOutlinePencil size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}