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

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title="Gestión - UrbanBeat" />
            <Header />

            <main className="flex-grow pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-black mb-8">
                        Gestión <span className="text-pink-500">Entradas</span>
                    </h1>
                    <div className="flex justify-between items-center mb-6">

                        <Link
                            href="/admin/entradas/create"
                            className="bg-green-600 hover:bg-green-800 text-white px-10 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-colors shadow-md"
                        >
                            Añadir entrada
                        </Link>
                    </div>

                    <div className="bg-white rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <table className="w-full text-left">
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
                                {entradas.map((e) => (
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}