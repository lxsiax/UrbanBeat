import { Head, Link } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import {
    HiOutlineArrowLeft,
    HiOutlineShoppingBag,
    HiOutlineArrowDownTray,
    HiOutlineCalendar,
    HiOutlineTag
} from "react-icons/hi2";

interface UsuarioSeleccionado {
    id: number;
    name: string;
    apellidos: string | null;
    email: string;
    created_at: string;
}

interface LineaFactura {
    id: number;
    cantidad: number;
    precio_unitario: number;
    entrada?: {
        id: number;
        tipo_entrada?: {
            nombre: string;
            dia?: { fecha: string } | null;
        } | null;
        zona?: { nombre: string } | null;
    } | null;
    producto?: { nombre: string } | null;
    talla?: { nombre: string } | null;
}

interface Compra {
    id: number;
    total: number;
    estado: string;
    created_at: string;
    facturas: LineaFactura[];
}

interface Props {
    usuarioSeleccionado: UsuarioSeleccionado;
    compras: Compra[];
}

export default function Pedidos({ usuarioSeleccionado, compras = [] }: Props) {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title={`Pedidos de ${usuarioSeleccionado.name} - UrbanBeat`} />
            <Header />

            <main className="flex-grow pt-44 pb-20 px-6 max-w-4xl mx-auto w-full space-y-8">

                {/* Botón Volver */}
                <div>
                    <Link
                        href="/admin/usuarios"
                        className="inline-flex items-center gap-2 bg-white border-2 border-black px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all active:translate-y-0.5"
                    >
                        <HiOutlineArrowLeft size={16} /> Volver a usuarios
                    </Link>
                </div>

                {/* Cabecera del Cliente */}
                <div className="bg-black text-white p-8 rounded-[30px] border-4 border-black shadow-[8px_8px_0px_0px_#ec4899]">
                    <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                        Historial de Compras
                    </span>
                    <h1 className="text-4xl font-black italic uppercase tracking-tighter mt-3">
                        {usuarioSeleccionado.name} {usuarioSeleccionado.apellidos || ''}
                    </h1>
                    <p className="text-gray-400 font-medium text-sm mt-1">{usuarioSeleccionado.email}</p>
                </div>

                <div className="space-y-6">
                    <h2 className="text-2xl font-black uppercase italic tracking-tight text-black flex items-center gap-2">
                        <HiOutlineShoppingBag size={24} className="text-pink-500" />
                        Pedidos del usuario ({compras.length})
                    </h2>

                    {compras.length === 0 ? (
                        <div className="bg-white border-2 border-black border-dashed rounded-3xl p-12 text-center text-gray-400 font-black text-sm uppercase">
                            Este usuario no ha comprado nada en la plataforma.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {compras.map((compra) => (
                                <div key={compra.id} className="bg-white border-2 border-black rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="space-y-3 flex-grow">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-black text-xs uppercase bg-black text-white px-2.5 py-1 rounded-lg">
                                                Pedido #UB2026-10{compra.id}
                                            </span>
                                            <span className="text-xs text-gray-500 font-black flex items-center gap-1">
                                                <HiOutlineCalendar size={14} />
                                                {new Date(compra.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </span>
                                            <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${compra.estado === 'Pagado' ? 'bg-green-300' : 'bg-amber-300'
                                                }`}>
                                                {compra.estado}
                                            </span>
                                        </div>

                                        {/* Productos y Entradas del Pedido */}
                                        <div className="space-y-2 border-t border-black/10 pt-3">
                                            {compra.facturas.map((linea) => {
                                                let detalle = '';
                                                if (linea.entrada) {
                                                    const tipo = linea.entrada.tipo_entrada?.nombre || 'Entrada';
                                                    const zona = linea.entrada.zona?.nombre || 'General';

                                                    const rawFecha = linea.entrada.tipo_entrada?.dia?.fecha;
                                                    const fecha = rawFecha
                                                        ? new Date(rawFecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
                                                        : '';

                                                    detalle = `${tipo} [${zona}] ${fecha ? `(${fecha})` : ''}`;
                                                } else {
                                                    detalle = `${linea.producto?.nombre || 'Producto'}${linea.talla ? ` (${linea.talla.nombre})` : ''}`;
                                                }

                                                return (
                                                    <p key={linea.id} className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                                        <HiOutlineTag size={14} className="text-gray-400" />
                                                        <span>{linea.cantidad}x {detalle}</span>
                                                    </p>
                                                );
                                            })}
                                        </div>

                                        <p className="text-sm font-black pt-1">
                                            Total: <span className="text-pink-500 text-base">{Number(compra.total).toFixed(2)}€</span>
                                        </p>
                                    </div>

                                    <a
                                        href={`/pago/factura/${compra.id}/pdf`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full md:w-auto bg-yellow-300 hover:bg-yellow-400 text-black font-black text-xs uppercase tracking-wider py-3 px-5 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 transition-all active:translate-y-0.5 active:shadow-none"
                                    >
                                        <HiOutlineArrowDownTray size={16} /> Descargar Factura PDF
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}