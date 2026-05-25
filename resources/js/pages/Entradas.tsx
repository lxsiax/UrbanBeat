import { useState } from 'react';
import { Head, usePage, router, Link } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import MapaRecinto from '@/components/festival/MapaRecinto';
import EntradasSeccion from '@/components/festival/EntradaSeccion'; 
import WidgetChat from '@/components/festival/WidgetChat';

interface Props {
    entradas: any[];
    titulo: string;
}

export default function Entradas({ entradas, titulo }: Props) {
    const { auth } = usePage().props as any;
    const esAdmin = auth.user && auth.user.role_id === 1;

    const [zona, setZona] = useState<string | null>(null);
    const [cantidades, setCantidades] = useState<Record<number, number>>({});
    const [procesando, setProcesando] = useState<number | null>(null);

    const entradasVisibles = esAdmin ? entradas : entradas.filter(e => !e.esta_oculta);
    const filtradas = zona
        ? entradasVisibles.filter(e => e.zona.nombre === zona)
        : entradasVisibles;

    const zonasMapa: Record<string, any[]> = {};
    filtradas.forEach(e => {
        const etiqueta = e.tipo_entrada.dia
            ? new Date(e.tipo_entrada.dia.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
            : 'Abonos Full Festival';

        if (!zonasMapa[etiqueta]) zonasMapa[etiqueta] = [];
        zonasMapa[etiqueta].push(e);
    });

    const diasOrdenados = Object.entries(zonasMapa).sort(([etiqueta1], [etiqueta2]) => {
        if (etiqueta1 === 'Abonos Full Festival') return -1;
        if (etiqueta2 === 'Abonos Full Festival') return 1;
        const diaA = parseInt(etiqueta1.split(' ')[0]);
        const diaB = parseInt(etiqueta2.split(' ')[0]);
        return diaA - diaB;
    });

    const updateCant = (id: number, delta: number) => {
        setCantidades(prev => ({
            ...prev,
            [id]: Math.max(1, Math.min((prev[id] || 1) + delta, 10))
        }));
    };

    const aniadirAlCarrito = (entradaId: number) => {
        if (!auth.user) return router.get('/login');
        const cantidad = cantidades[entradaId] || 1;
        setProcesando(entradaId);
        router.post('/carrito/aniadir', { entrada_id: entradaId, cantidad }, {
            preserveScroll: true,
            onFinish: () => setProcesando(null),
        });
    };

    const cambiarVisibilidad = (id: number) => {
        router.patch(`/admin/entradas/${id}/cambiar-visibilidad`, {}, { preserveScroll: true });
    };

    const irAEditar = (id: number) => {
        router.get(`/admin/entradas/${id}/edit`);
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Head title={`${titulo} - UrbanBeat`} />
            <Header />

            <main className="flex-grow pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="text-center mb-10">
                        <h1 className="text-black text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-4">
                            {titulo} <span className="text-pink-500">2026</span>
                        </h1>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">
                            Selecciona tu zona en el mapa y añade tus entradas
                        </p>
                        {esAdmin && (
                            <div className="flex justify-between items-center mb-6">
                                <Link
                                    href="/admin/entradas/create"
                                    className="bg-green-600 hover:bg-green-800 text-white px-10 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-colors shadow-md"
                                >
                                    Añadir entrada
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="mb-20 bg-gray-50 p-10 rounded-[40px] border-2 border-black/5 shadow-inner">
                        <MapaRecinto
                            onZonaSelect={(z) => setZona(z === zona ? null : z)}
                            zonaActiva={zona}
                        />
                    </div>

                    <div className="space-y-20">
                        {diasOrdenados.length > 0 ? (
                            diasOrdenados.map(([fecha, listaEntradas]) => (
                                <EntradasSeccion 
                                    key={fecha}
                                    fecha={fecha}
                                    listaEntradas={listaEntradas}
                                    esAdmin={esAdmin}
                                    cantidades={cantidades}
                                    procesandoId={procesando}
                                    onUpdateCant={updateCant}
                                    onAniadirAlCarrito={aniadirAlCarrito}
                                    onCambiarVisibilidad={cambiarVisibilidad}
                                    onIrAEditar={irAEditar}
                                />
                            ))
                        ) : (
                            <div className="py-20 text-center">
                                <p className="text-gray-300 font-black uppercase tracking-[0.5em] text-xl">
                                    No hay tickets disponibles
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </main>
            <WidgetChat />

            <Footer />
        </div>
    );
}