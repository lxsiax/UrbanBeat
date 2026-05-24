import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlinePencil } from "react-icons/hi2";
import { Link } from '@inertiajs/react';

interface Props {
    entradas: any[];
}

export default function GestionEntradas({ entradas: entradasIniciales = [] }: Props) {
    const [entradas, setEntradas] = useState(entradasIniciales);
    const [tipoSeleccionado, setTipoSeleccionado] = useState('');
    const [zonaSeleccionada, setZonaSeleccionada] = useState('');

    const tiposDeAbonoUnicos = Array.from(
        new Set(entradasIniciales.map(e => e.tipo_entrada?.nombre).filter(Boolean))
    );

    const zonasUnicas = Array.from(
        new Set(entradasIniciales.map(e => e.zona?.nombre).filter(Boolean))
    );

    const cambiarVisibilidad = (id: number) => {
        setEntradas(prev => prev.map(e =>
            e.id === id ? { ...e, esta_oculta: !e.esta_oculta } : e
        ));

        router.patch(`/admin/entradas/${id}/cambiar-visibilidad`, {}, {
            preserveScroll: true
        });
    };

    const irAEditar = (id: number) => {
        router.get(`/admin/entradas/${id}/edit`);
    };

    const entradasFiltradas = entradas.filter((e) => {
        const coincideTipo = tipoSeleccionado ? e.tipo_entrada?.nombre === tipoSeleccionado : true;
        const coincideZona = zonaSeleccionada ? e.zona?.nombre === zonaSeleccionada : true;

        return coincideTipo && coincideZona;
    });

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title="Gestión - UrbanBeat" />
            <Header />

            <main className="flex-grow pt-40 pb-20 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter text-black mb-8">
                        Gestión <span className="text-pink-500">Entradas</span>
                    </h1>
                    
                    <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
                        <div className="flex flex-col sm:flex-row gap-4 flex-grow max-w-3xl">
                            <select
                                value={tipoSeleccionado}
                                onChange={(e) => setTipoSeleccionado(e.target.value)}
                                className="rounded-xl border-2 border-black text-xs font-black uppercase p-3 tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:ring-0 focus:border-pink-500 bg-white cursor-pointer flex-1"
                            >
                                <option value="">Todos los abonos</option>
                                {tiposDeAbonoUnicos.map((tipo: any) => (
                                    <option key={tipo} value={tipo}>
                                        {tipo}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={zonaSeleccionada}
                                onChange={(e) => setZonaSeleccionada(e.target.value)}
                                className="rounded-xl border-2 border-black text-xs font-black uppercase p-3 tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:ring-0 focus:border-pink-500 bg-white cursor-pointer flex-1"
                            >
                                <option value="">Todas las zonas</option>
                                {zonasUnicas.map((zona: any) => (
                                    <option key={zona} value={zona}>
                                        {zona}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Link
                            href="/admin/entradas/create"
                            className="bg-green-600 hover:bg-green-800 text-white px-10 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-colors shadow-md text-center flex items-center justify-center border border-black/10 self-stretch sm:self-start md:self-auto"
                        >
                            Añadir entrada
                        </Link>
                    </div>

                    <div className="bg-white rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-left min-w-[600px]">
                                <thead>
                                    <tr className="bg-black text-white uppercase text-[10px] tracking-[0.2em] font-black">
                                        <th className="p-6">Tipo</th>
                                        <th className="p-6">Zona</th>
                                        <th className="p-6">Precio</th>
                                        <th className="p-6">Stock</th>
                                        <th className="p-6">Estado</th>
                                        <th className="p-6 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {entradasFiltradas.map((e) => (
                                        <tr key={e.id} className={`transition-all ${e.esta_oculta ? 'opacity-40 bg-gray-50' : 'bg-white'}`}>
                                            <td className="p-6 font-black uppercase italic text-sm">{e.tipo_entrada?.nombre}</td>
                                            <td className="p-6">
                                                <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                                                    {e.zona?.nombre}
                                                </span>
                                            </td>
                                            <td className="p-6 font-black text-lg">{e.precio}€</td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full ${e.stock > 10 ? 'bg-green-500' : e.stock == 0 ? 'bg-red-500' : 'bg-yellow-500' }`}></span>
                                                    <span className="font-mono font-bold text-sm">{e.stock}</span>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${e.esta_oculta ? 'text-red-500 bg-red-50' : 'text-green-600 bg-green-50'}`}>
                                                    {e.esta_oculta ? 'Oculta' : 'Visible'}
                                                </span>
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <button
                                                        onClick={() => cambiarVisibilidad(e.id)}
                                                        title={e.esta_oculta ? "Mostrar entrada" : "Ocultar entrada"}
                                                        className={`p-2 rounded-xl border-2 border-black transition-all active:scale-90 ${e.esta_oculta ? 'bg-black text-white' : 'bg-white hover:bg-pink-500 hover:text-white'}`}
                                                    >
                                                        {e.esta_oculta ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
                                                    </button>

                                                    <button
                                                        onClick={() => irAEditar(e.id)}
                                                        title="Editar entrada"
                                                        className="p-2 bg-white border-2 border-black rounded-xl text-black hover:bg-black hover:text-white transition-all active:scale-90"
                                                    >
                                                        <HiOutlinePencil size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {entradasFiltradas.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="p-10 text-center font-black uppercase text-xs text-gray-400 italic">
                                                No quedan entradas con esta combinación de abono y zona
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