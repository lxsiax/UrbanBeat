import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { HiOutlineEye, HiOutlineArrowDownTray } from "react-icons/hi2";

interface Props {
    compras: {
        data: any[];
    };
}

export default function GestionFacturas({ compras }: Props) {
    // Estado para el modal de detalles y término de búsqueda
    const [compraSeleccionada, setCompraSeleccionada] = useState<any | null>(null);
    const [busqueda, setBusqueda] = useState('');
    const [filtroFecha, setFiltroFecha] = useState('');

    // Función auxiliar para eliminar tildes, mayúsculas y espacios extra
    const normalizarTexto = (texto: string) => {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Elimina acentos/tildes
            .trim();
    };

    // Filtrado interactivo en el cliente (insensible a mayúsculas/minúsculas/tildes)
    const comprasFiltradas = compras.data.filter((compra) => {
        const nombreUsuario = compra.user?.name || 'usuario desconocido';
        const textoNormalizado = normalizarTexto(nombreUsuario);
        const busquedaNormalizada = normalizarTexto(busqueda);

        // Validar coincidencia de nombre
        const coincideUsuario = textoNormalizado.includes(busquedaNormalizada);
        
        // Validar coincidencia de fecha si está seleccionada
        const coincideFecha = filtroFecha 
            ? compra.created_at.startsWith(filtroFecha) 
            : true;

        return coincideUsuario && coincideFecha;
    });

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title="Gestión Facturas - UrbanBeat" />
            <Header />

            <main className="flex-grow pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-black mb-8">
                        Gestión <span className="text-pink-500">Facturas</span>
                    </h1>

                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <input 
                            type="text" 
                            placeholder="Filtrar por nombre de usuario" 
                            value={busqueda}
                            className="rounded-xl border-2 border-black text-xs font-black uppercase p-3 flex-grow tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:ring-0 focus:border-pink-500"
                            onChange={(e) => setBusqueda(e.target.value)} 
                        />
                        <input 
                            type="date" 
                            value={filtroFecha}
                            className="rounded-xl border-2 border-black text-xs font-black uppercase p-3 tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:ring-0 focus:border-pink-500"
                            onChange={(e) => setFiltroFecha(e.target.value)} 
                        />
                    </div>

                    <div className="bg-white rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-black text-white uppercase text-[10px] tracking-[0.2em] font-black">
                                        <th className="p-6">ID</th>
                                        <th className="p-6">Usuario</th>
                                        <th className="p-6">Total Pagado</th>
                                        <th className="p-6">Fecha Compra</th>
                                        <th className="p-6 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {comprasFiltradas.map((compra) => (
                                        <tr key={compra.id} className="bg-white hover:bg-gray-50 transition-all">
                                            <td className="p-6 font-mono font-bold text-sm text-gray-500">#{compra.id}</td>
                                            <td className="p-6 font-black uppercase italic text-sm">{compra.user?.name || 'Usuario desconocido'}</td>
                                            <td className="p-6 font-black text-lg text-black">{Number(compra.total).toFixed(2)}€</td>
                                            <td className="p-6">
                                                <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                                                    {new Date(compra.created_at).toLocaleDateString()}
                                                </span>
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <button
                                                        onClick={() => setCompraSeleccionada(compra)}
                                                        title="Ver detalles de los artículos"
                                                        className="p-2 bg-white border-2 border-black rounded-xl text-black hover:bg-pink-500 hover:text-white transition-all active:scale-90 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                                                    >
                                                        <HiOutlineEye size={20} />
                                                    </button>

                                                    <a
                                                        href={`/admin/facturas/descargar-pdf/${compra.id}`}
                                                        title="Descargar Factura Oficial PDF"
                                                        className="p-2 bg-white border-2 border-black rounded-xl text-black hover:bg-black hover:text-white transition-all inline-block active:scale-90 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                                                    >
                                                        <HiOutlineArrowDownTray size={20} />
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {comprasFiltradas.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="p-10 text-center font-black uppercase text-xs text-gray-400 italic">
                                                No se encontraron facturas con los filtros aplicados
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

            {compraSeleccionada && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-[30px] border-4 border-black p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                        
                        <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-black/10">
                            <div>
                                <h2 className="text-3xl font-black uppercase italic tracking-tighter">Compra #{compraSeleccionada.id}</h2>
                                <p className="text-[10px] bg-black text-white px-3 py-0.5 rounded-full font-black uppercase tracking-widest inline-block mt-2">
                                    Cliente: {compraSeleccionada.user?.name}
                                </p>
                            </div>
                            <button 
                                onClick={() => setCompraSeleccionada(null)}
                                className="bg-black hover:bg-pink-500 text-white text-xs px-4 py-2 rounded-full font-black transition-colors uppercase tracking-widest border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]"
                            >
                                Cerrar
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-gray-900 text-white p-4 rounded-xl grid grid-cols-3 text-[10px] font-black uppercase tracking-widest">
                                <span>Artículo</span>
                                <span className="text-center">Cant.</span>
                                <span className="text-right">Precio</span>
                            </div>

                            {compraSeleccionada.facturas?.map((item: any) => (
                                <div key={item.id} className="bg-gray-50 border-2 border-black/5 p-4 rounded-xl grid grid-cols-3 items-center text-xs font-black uppercase tracking-tight">
                                    <div className="flex flex-col">
                                        <span className="text-black italic">
                                            {item.producto 
                                                ? item.producto.nombre 
                                                : (item.entrada?.tipo_entrada?.nombre || 'Entrada Festival')
                                            }
                                        </span>
                                        {item.talla_id && (
                                            <span className="text-[9px] text-pink-500 font-bold tracking-wider mt-0.5">TALLA ID: {item.talla_id}</span>
                                        )}
                                    </div>
                                    <div className="text-center font-mono text-sm bg-gray-200/60 inline-block mx-auto px-3 py-0.5 rounded-md border border-black/10">
                                        x{item.quantity || item.cantidad}
                                    </div>
                                    <div className="text-right text-sm">
                                        {Number(item.precio_unitario).toFixed(2)}€
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t-4 border-black flex flex-col sm:flex-row justify-between items-center gap-4">
                            <a 
                                href={`/admin/facturas/descargar-pdf/${compraSeleccionada.id}`}
                                className="w-full sm:w-auto bg-green-600 hover:bg-green-800 text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest text-center transition-colors shadow-md border-2 border-black"
                            >
                                Descargar Factura PDF
                            </a>
                            <div className="text-right w-full sm:w-auto">
                                <span className="text-[10px] text-gray-400 block font-black uppercase tracking-widest">Total</span>
                                <span className="text-3xl font-black italic tracking-tighter text-black">
                                    {Number(compraSeleccionada.total).toFixed(2)}€
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}