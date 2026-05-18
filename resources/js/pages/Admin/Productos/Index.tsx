import { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlinePencil } from "react-icons/hi2";

interface Talla {
    id: number;
    nombre: string;
    pivot: {
        stock: number;
    };
}

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    esta_oculto: boolean;
    tallas: Talla[];
    stock_total?: number;
}

interface Props {
    productos: Producto[];
}

export default function Productos({ productos: productosIniciales = [] }: Props) {
    const [productos, setProductos] = useState<Producto[]>(productosIniciales);

    const cambiarVisibilidad = (id: number) => {
        setProductos(prev => prev.map(p =>
            p.id === id ? { ...p, esta_oculto: !p.esta_oculto } : p
        ));

        router.patch(`/admin/productos/${id}/cambiar-visibilidad`, {}, {
            preserveScroll: true
        });
    };

    const irAEditar = (id: number) => {
        router.get(`/admin/productos/${id}/edit`);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title="Gestión Merch - UrbanBeat" />
            <Header />

            <main className="flex-grow pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-black mb-8">
                        Gestión <span className="text-pink-500">Productos</span>
                    </h1>

                    <div className="flex justify-between items-center mb-6">
                        <Link
                            href="/admin/productos/create"
                            className="bg-green-600 hover:bg-green-800 text-white px-10 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-colors shadow-md"
                        >
                            Añadir producto
                        </Link>
                    </div>

                    <div className="bg-white rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-black text-white uppercase text-[10px] tracking-[0.2em] font-black">
                                    <th className="p-6">Nombre</th>
                                    <th className="p-6">Precio</th>
                                    <th className="p-6">Stock</th>
                                    <th className="p-6">Estado</th>
                                    <th className="p-6 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {productos.map((p) => {
                                    const totalCalculado = p.tallas.reduce((acc, t) => {
                                        const cantidad = t.pivot ? Number(t.pivot.stock) : 0;
                                        return acc + cantidad;
                                    }, 0);

                                    const esTallaUnica = p.tallas.length === 1;

                                    return (
                                        <tr
                                            key={p.id}
                                            className={`transition-all ${p.esta_oculto ? 'opacity-40 bg-gray-50' : 'bg-white'}`}
                                        >
                                            <td className="p-6 font-black uppercase italic text-sm">
                                                {p.nombre}
                                            </td>
                                            <td className="p-6 font-black text-lg">
                                                {Number(p.precio).toFixed(2)}€
                                            </td>

                                            <td className="p-6">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-2 h-2 rounded-full ${totalCalculado > 10 ? 'bg-green-500' :
                                                                totalCalculado <= 0 ? 'bg-red-500' : 'bg-yellow-500'
                                                            }`}></span>
                                                        <span className="font-mono font-bold text-sm">
                                                            {totalCalculado} {esTallaUnica ? 'uds.' : 'total'}
                                                        </span>
                                                    </div>

                                                    {!esTallaUnica && p.tallas.length > 0 && (
                                                        <div className="flex flex-wrap gap-x-2 text-[10px] font-bold text-gray-500 uppercase tracking-tight">
                                                            {p.tallas.map((t, index) => (
                                                                <span key={t.id}>
                                                                    {t.nombre}: {t.pivot?.stock || 0}
                                                                    {index < p.tallas.length - 1 && <span className="ml-2 text-gray-300">|</span>}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="p-6">
                                                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${p.esta_oculto ? 'text-red-500 bg-red-50' : 'text-green-600 bg-green-50'
                                                    }`}>
                                                    {p.esta_oculto ? 'Oculto' : 'Visible'}
                                                </span>
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <button
                                                        onClick={() => cambiarVisibilidad(p.id)}
                                                        className={`p-2 rounded-xl border-2 border-black transition-all active:scale-90 ${p.esta_oculto ? 'bg-black text-white' : 'bg-white hover:bg-pink-500 hover:text-white'
                                                            }`}
                                                    >
                                                        {p.esta_oculto ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
                                                    </button>

                                                    <Link
                                                        href={`/admin/productos/${p.id}/edit`}
                                                        className="p-2 bg-white border-2 border-black rounded-xl text-black hover:bg-black hover:text-white transition-all flex items-center justify-center active:scale-90"
                                                    >
                                                        <HiOutlinePencil size={20} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}