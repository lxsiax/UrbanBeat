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
    const [diaSeleccionado, setDiaSeleccionado] = useState('');
    const [tipoArtista, setTipoArtista] = useState('');

    const diasUnicos = Array.from(
        new Set(artistasIniciales.map(a => a.dia?.fecha).filter(Boolean))
    ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

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

    const artistasFiltrados = artistas.filter((a) => {
        const coincideDia = diaSeleccionado ? a.dia?.fecha === diaSeleccionado : true;
        
        let coincideTipo = true;
        if (tipoArtista === 'headliner') {
            coincideTipo = a.es_headliner === true || a.es_headliner === 1;
        } else if (tipoArtista === 'normal') {
            coincideTipo = a.es_headliner === false || a.es_headliner === 0;
        }

        return coincideDia && coincideTipo;
    });

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title="Gestión Artistas - UrbanBeat" />
            <Header />

            <main className="flex-grow pt-40 pb-20 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter text-black mb-8">
                        Gestión <span className="text-pink-500">Artistas</span>
                    </h1>

                    <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
                        <div className="flex flex-col sm:flex-row gap-4 flex-grow max-w-3xl">
                            <select
                                value={diaSeleccionado}
                                onChange={(e) => setDiaSeleccionado(e.target.value)}
                                className="rounded-xl border-2 border-black text-xs font-black uppercase p-3 tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:ring-0 focus:border-pink-500 bg-white cursor-pointer flex-1"
                            >
                                <option value="">Todos los días</option>
                                {diasUnicos.map((fecha: any) => (
                                    <option key={fecha} value={fecha}>
                                        {new Date(fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={tipoArtista}
                                onChange={(e) => setTipoArtista(e.target.value)}
                                className="rounded-xl border-2 border-black text-xs font-black uppercase p-3 tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:ring-0 focus:border-pink-500 bg-white cursor-pointer flex-1"
                            >
                                <option value="">Todos los tipos</option>
                                <option value="headliner">Headliner</option>
                                <option value="normal">Normal</option>
                            </select>
                        </div>

                        <Link
                            href="/admin/artistas/create"
                            className="bg-green-600 hover:bg-green-800 text-white px-10 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-colors shadow-md text-center flex items-center justify-center border border-black/10 self-stretch sm:self-start md:self-auto"
                        >
                            Añadir artista
                        </Link>
                    </div>

                    <div className="bg-white rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-left min-w-[700px]">
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
                                    {artistasFiltrados.map((a) => (
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
                                                    <span className="text-pink-500 font-black text-[10px] uppercase italic">Headliner</span>
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
                                                        title={a.esta_oculto ? "Mostrar artista" : "Ocultar artista"}
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
                                    {artistasFiltrados.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="p-10 text-center font-black uppercase text-xs text-gray-400 italic">
                                                No se encontraron artistas con los criterios seleccionados
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