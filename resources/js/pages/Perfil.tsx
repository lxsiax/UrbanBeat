import { Head } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineCalendar, HiOutlineArrowDownTray, HiOutlineTicket, HiOutlineShoppingBag, HiQrCode, HiOutlineMapPin } from "react-icons/hi2";

interface LineaFactura {
    id: number;
    cantidad: number;
    precio_unitario: number;
    entrada?: {
        id: number;
        tipo_entrada?: {
            nombre: string;
            dia?: {
                fecha: string;
            } | null;
        } | null;
        zona?: {
            nombre: string;
        } | null;
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

interface Asistente {
    id: number;
    nombre: string;
    dni: string;
    entrada?: {
        tipo_entrada?: {
            nombre: string;
            dia?: {
                fecha: string;
            } | null;
        } | null;
        zona?: {
            nombre: string;
        } | null;
    } | null;
}

interface Props {
    usuario: any;
    compras: Compra[];
    entradas: Asistente[];
}

export default function Perfil({ usuario, compras = [], entradas = [] }: Props) {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title={`Mi Perfil - ${usuario.name}`} />
            <Header />

            <main className="flex-grow pt-40 pb-20 px-6">
                <div className="max-w-3xl mx-auto space-y-12">

                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-black">
                        Mi <span className="text-pink-500">Cuenta</span>
                    </h1>

                    <div className="bg-white p-8 rounded-[30px] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
                        <div className="flex items-center gap-4 border-b-2 border-black pb-6">
                            <div className="bg-pink-500 text-white p-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <HiOutlineUser size={28} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Festivaler@ Oficial</p>
                                <h2 className="text-2xl font-black uppercase italic break-words">{usuario.name} {usuario.apellidos || ''}</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
                                    <HiOutlineEnvelope size={12} /> Correo
                                </div>
                                <p className="font-bold text-sm text-black break-words">{usuario.email}</p>
                            </div>
                            <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">
                                    <HiOutlineCalendar size={12} /> Fecha de registro
                                </div>
                                <p className="font-bold text-sm text-black">
                                    {new Date(usuario.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[30px] border-2 border-black shadow-[8px_8px_0px_0px_#ec4899] space-y-6">
                        <div className="flex items-center gap-2">
                            <HiQrCode size={24} className="text-pink-500" />
                            <h3 className="text-xl font-black uppercase tracking-tight text-black">Mis Pases de Acceso (Puerta)</h3>
                        </div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Muestra estas entradas en la puerta del festival para acceder.</p>

                        {entradas.length === 0 ? (
                            <div className="border-2 border-dashed border-black/20 rounded-2xl p-6 text-center text-gray-400 font-black text-xs uppercase bg-gray-50/50">
                                No tienes pases de acceso activos.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {entradas.map((asistente) => {
                                    console.log("Datos del asistente:", asistente);

                                    const tipo = asistente.entrada?.tipo_entrada?.nombre || 'Entrada Festival';
                                    const zona = asistente.entrada?.zona?.nombre || 'Zona General';

                                    const rawFecha = asistente.entrada?.tipo_entrada?.dia?.fecha;

                                    let fecha = '23-25 Julio de 2026';
                                    if (rawFecha) {
                                        try {
                                            fecha = new Date(rawFecha).toLocaleDateString('es-ES', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long'
                                            });
                                        } catch (e) {
                                            fecha = rawFecha;
                                        }
                                    }

                                    return (
                                        <div key={asistente.id} className="bg-yellow-50 border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between gap-4">
                                            <div className="space-y-2">
                                                <div className="text-pink-500 font-black text-xs uppercase flex flex-col gap-0.5">
                                                    <span className="flex items-center gap-1"><HiOutlineTicket size={14} /> {tipo}</span>
                                                    <span className="flex items-center gap-1 text-black/60"><HiOutlineMapPin size={14} /> {zona}</span>
                                                    <span className="flex items-center gap-1 text-black/60 capitalize"><HiOutlineCalendar size={14} /> {fecha}</span>
                                                </div>
                                                <div className="border-t border-black/10 pt-2">
                                                    <p className="font-black text-lg uppercase text-black">{asistente.nombre}</p>
                                                    <p className="text-xs font-bold text-gray-600">DNI: {asistente.dni.toUpperCase()}</p>
                                                </div>
                                            </div>

                                            <a
                                                href={`/perfil/entrada/${asistente.id}/pdf`}
                                                className="w-full bg-black hover:bg-pink-500 text-white font-black text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(236,72,153,1)]"
                                            >
                                                <HiQrCode size={16} />
                                                Descargar Entrada
                                            </a>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>


                    <div className="bg-white p-8 rounded-[30px] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
                        <div className="flex items-center gap-2">
                            <HiOutlineShoppingBag size={24} className="text-black" />
                            <h3 className="text-xl font-black uppercase tracking-tight text-black">Historial de Pedidos</h3>
                        </div>

                        {compras.length === 0 ? (
                            <div className="border-2 border-dashed border-black/20 rounded-2xl p-6 text-center text-gray-400 font-black text-xs uppercase bg-gray-50/50">
                                Historial de pedidos vacío.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {compras.map((compra) => (
                                    <div key={compra.id} className="bg-gray-50 border-2 border-black rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="font-black text-xs uppercase bg-black text-white px-2 py-0.5 rounded">Pedido #UB2026-10{compra.id}</span>
                                                <span className="text-xs text-gray-500 font-bold">{new Date(compra.created_at).toLocaleDateString('es-ES')}</span>
                                            </div>
                                            <div className="space-y-1">
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
                                                        <p key={linea.id} className="text-xs font-bold text-gray-700">
                                                            • {linea.cantidad}x {detalle}
                                                        </p>
                                                    );
                                                })}
                                            </div>
                                            <p className="text-xs font-black">Total: <span className="text-pink-500">{Number(compra.total).toFixed(2)}€</span></p>
                                        </div>

                                        <a
                                            href={`/pago/factura/${compra.id}/pdf`}
                                            className="w-full md:w-auto bg-yellow-300 hover:bg-yellow-400 text-black font-black text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 transition-transform active:translate-x-0.5 active:translate-y-0.5"
                                        >
                                            <HiOutlineArrowDownTray size={14} /> Factura PDF
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}