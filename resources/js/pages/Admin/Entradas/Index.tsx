import { Head, useForm } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';

interface Props {
    entradas: any[];
}

export default function Dashboard({ entradas = [] }: Props) {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title="Panel Admin - UrbanBeat" />
            <Header />

            <main className="flex-grow pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h1 className="text-5xl font-black italic uppercase tracking-tighter text-black">
                                Admin <span className="text-pink-500">Panel</span>
                            </h1>
                            <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-2">
                                Gestión de inventario y precios de entradas
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-black text-white uppercase text-[10px] tracking-[0.2em] font-black">
                                    <th className="p-6">Tipo</th>
                                    <th className="p-6">Zona</th>
                                    <th className="p-6">Fecha</th>
                                    <th className="p-6">Precio</th>
                                    <th className="p-6">Stock</th>
                                    <th className="p-6 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {entradas.length > 0 ? (
                                    entradas.map((entrada) => (
                                        <tr key={entrada.id} className="hover:bg-pink-50 transition-colors group">
                                            <td className="p-6 font-black uppercase italic text-sm">
                                                {entrada.tipo_entrada?.nombre}
                                            </td>
                                            <td className="p-6">
                                                <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                                                    {entrada.zona?.nombre}
                                                </span>
                                            </td>
                                            <td className="p-6 text-xs font-bold text-gray-500">
                                                {entrada.tipo_entrada?.dia?.fecha || 'ABONO COMPLETO'}
                                            </td>
                                            <td className="p-6 font-black text-lg">
                                                {entrada.precio}€
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full ${entrada.stock > 10 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                    <span className="font-mono font-bold">{entrada.stock}</span>
                                                </div>
                                            </td>
                                            <td className="p-6 text-right">
                                                <button className="bg-pink-500 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-md">
                                                    Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="p-20 text-center font-bold text-gray-400 uppercase tracking-widest">
                                            No hay entradas registradas en la base de datos
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}