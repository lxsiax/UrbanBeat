import { useState, useMemo, useEffect } from 'react';
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

    useEffect(() => {
        setEntradas(entradasIniciales);
    }, [entradasIniciales]);

    const tiposDeAbonoUnicos = useMemo(() =>
        Array.from(new Set(entradas.map(e => e.tipo_entrada?.nombre).filter(Boolean))),
        [entradas]);

    const zonasUnicas = useMemo(() =>
        Array.from(new Set(entradas.map(e => e.zona?.nombre).filter(Boolean))),
        [entradas]);

    const resumen = useMemo(() => {
        return entradas.reduce((acc: any, e: any) => {
            const esAbono = !e.tipo_entrada?.dia;
            const tituloDia = esAbono ? 'Abono General' : e.tipo_entrada.dia.fecha;
            const zona = e.zona?.nombre || 'Sin zona';
            const key = `${tituloDia}-${zona}`;

            if (!acc[key]) {
                acc[key] = {
                    dia: tituloDia,
                    zona,
                    vendidas: 0,
                    totalAforoZona: e.zona?.aforo || 0,
                    stockTotalEntrada: 0,
                    disponibles: 0
                };
            }

            const inicial = parseInt(e.stock_inicial) || 0;
            const actual = parseInt(e.stock) || 0;
            acc[key].stockTotalEntrada += inicial;
            acc[key].vendidas += Math.max(0, inicial - actual);
            acc[key].disponibles += actual;
            return acc;
        }, {});
    }, [entradas]);

    const fechasUnicas = useMemo(() => {
        const fechas = Array.from(new Set(Object.values(resumen).map((item: any) => item.dia)));
        return fechas.sort((a: any, b: any) => {
            if (a === 'Abono General') return -1;
            if (b === 'Abono General') return 1;
            return a.localeCompare(b);
        });
    }, [resumen]);

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

    const formatearFecha = (fechaStr: string) => {
        if (fechaStr === 'Abono General') return 'Abono General';
        const date = new Date(fechaStr);
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    };

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
                            <select value={tipoSeleccionado} onChange={(e) => setTipoSeleccionado(e.target.value)} className="rounded-xl border-2 border-black text-xs font-black uppercase p-3 tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:ring-0 focus:border-pink-500 bg-white cursor-pointer flex-1">
                                <option value="">Todos los abonos</option>
                                {tiposDeAbonoUnicos.map((tipo: any) => <option key={tipo} value={tipo}>{tipo}</option>)}
                            </select>
                            <select value={zonaSeleccionada} onChange={(e) => setZonaSeleccionada(e.target.value)} className="rounded-xl border-2 border-black text-xs font-black uppercase p-3 tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:ring-0 focus:border-pink-500 bg-white cursor-pointer flex-1">
                                <option value="">Todas las zonas</option>
                                {zonasUnicas.map((zona: any) => <option key={zona} value={zona}>{zona}</option>)}
                            </select>
                        </div>
                        <Link href="/admin/entradas/create" className="bg-green-600 hover:bg-green-800 text-white px-10 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-colors shadow-md text-center flex items-center justify-center border border-black/10 self-stretch sm:self-start md:self-auto">
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
                                <tbody>
                                    {entradasFiltradas.map((e) => (
                                        <tr key={e.id} className="border-t border-gray-100">
                                            <td className="p-6 font-black uppercase italic text-sm">{e.tipo_entrada?.nombre}</td>
                                            <td className="p-6"><span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-black uppercase">{e.zona?.nombre}</span></td>
                                            <td className="p-6 font-black text-lg">{e.precio}€</td>
                                            <td className="p-6"><span className="font-mono font-bold text-sm">{e.stock}</span></td>
                                            <td className="p-6"><span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${e.esta_oculta ? 'text-red-500 bg-red-50' : 'text-green-600 bg-green-50'}`}>{e.esta_oculta ? 'Oculta' : 'Visible'}</span></td>
                                            <td className="p-6 text-right">
                                                <div className="flex justify-end gap-3">
                                                    <button onClick={() => cambiarVisibilidad(e.id)} className="p-2 border-2 border-black rounded-xl hover:bg-pink-500 hover:text-white transition-all"><HiOutlineEye size={20} /></button>
                                                    <button onClick={() => irAEditar(e.id)} className="p-2 bg-white border-2 border-black rounded-xl hover:bg-black hover:text-white transition-all"><HiOutlinePencil size={20} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <h2 className="text-3xl font-black uppercase italic mt-20 mb-6">Resumen de Ventas</h2>

                    <div className="space-y-12">
                        {fechasUnicas.map((fecha) => (
                            <div key={fecha}>
                                <h3 className="text-xl font-black uppercase text-pink-500 mb-6 tracking-wider border-b-2 border-pink-500 inline-block">
                                    {formatearFecha(fecha)}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {Object.values(resumen).filter((item: any) => item.dia === fecha).map((item: any, i: number) => {
                                        const pctEntrada = isFinite(item.vendidas / item.stockTotalEntrada)
                                            ? Math.round((item.vendidas / item.stockTotalEntrada) * 100) : 0;
                                        const pctZona = isFinite(item.vendidas / item.totalAforoZona)
                                            ? Math.round((item.vendidas / item.totalAforoZona) * 100) : 0;

                                        return (
                                            <div key={i} className="bg-white p-6 rounded-[20px] border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div>
                                                        <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Zona</div>
                                                        <div className="text-2xl font-black uppercase">{item.zona}</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-3xl font-black">{item.vendidas}</div>
                                                        <div className="text-[10px] font-bold uppercase text-gray-400">vendidas</div>
                                                    </div>
                                                </div>

                                                <div className="space-y-5">
                                                    <div>
                                                        <div className="flex justify-between text-[10px] font-black uppercase mb-1.5">
                                                            <span className="text-gray-600">Stock Entrada</span>
                                                            <span className="text-pink-600">{pctEntrada}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-100 h-3 rounded-full border border-black overflow-hidden">
                                                            <div className="bg-pink-500 h-full transition-all duration-500" style={{ width: `${pctEntrada}%` }}></div>
                                                        </div>
                                                    </div>

                                                    {/* Barra Zona */}
                                                    <div className="pt-2 border-t border-dashed border-gray-200">
                                                        <div className="flex justify-between text-[10px] font-black uppercase mb-1.5">
                                                            <span className="text-gray-400">Ocupación Total Zona</span>
                                                            <span className="text-black">{pctZona}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-100 h-2 rounded-full border border-black overflow-hidden">
                                                            <div className="bg-black h-full transition-all duration-500" style={{ width: `${pctZona}%` }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}