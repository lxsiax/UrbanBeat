import { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react'; 
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import MapaRecinto from '@/components/festival/MapaRecinto';
import { 
    HiOutlineShoppingBag, 
    HiPlus, 
    HiMinus, 
    HiOutlinePencil, 
    HiOutlineEye, 
    HiOutlineEyeSlash 
} from "react-icons/hi2"; 

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

    
    const entradasDia: Record<string, any[]> = {};
    
    filtradas.forEach(e => {
        const etiqueta = e.tipo_entrada.dia
            ? new Date(e.tipo_entrada.dia.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
            : 'Abonos Full Festival';
        
        if (!entradasDia[etiqueta]) entradasDia[etiqueta] = [];
        entradasDia[etiqueta].push(e);
    });

    const cambiarCantidad = (id: number, delta: number) => {
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
                    </div>

                    <div className="mb-20 bg-gray-50 p-10 rounded-[40px] border-2 border-black/5 shadow-inner">
                        <MapaRecinto
                            onZonaSelect={(z) => setZona(z === zona ? null : z)}
                            zonaActiva={zona}
                        />
                    </div>

                    <div className="space-y-20">
                        {Object.keys(entradasDia).length > 0 ? (
                            Object.entries(entradasDia).map(([fecha, listaEntradas]) => (
                                <section key={fecha}>
                                    <div className="flex items-center gap-4 mb-10">
                                        <h2 className="text-4xl font-black uppercase italic tracking-tighter whitespace-nowrap">
                                            {fecha}
                                        </h2>
                                        <div className="h-[2px] w-full bg-black/10"></div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {listaEntradas.map((e) => (
                                            <div 
                                                key={e.id} 
                                                className={`relative p-8 rounded-3xl border-2 border-black flex flex-col h-full bg-white shadow-xl transition-all hover:-translate-y-2 ${e.esta_oculta ? 'opacity-70 grayscale-[0.5] border-dashed bg-gray-50' : ''}`}
                                            >
                                                {esAdmin && (
                                                    <div className="absolute -top-4 -right-4 flex flex-col gap-2 z-30">
                                                        <button
                                                            onClick={() => cambiarVisibilidad(e.id)}
                                                            className={`p-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-90 ${e.esta_oculta ? 'bg-black text-white' : 'bg-yellow-400 text-black'}`}
                                                        >
                                                            {e.esta_oculta ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
                                                        </button>
                                                        <button
                                                            onClick={() => irAEditar(e.id)}
                                                            className="p-3 bg-pink-500 text-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-90 hover:bg-black"
                                                        >
                                                            <HiOutlinePencil size={20} />
                                                        </button>
                                                    </div>
                                                )}

                                                <div className="mb-4">
                                                    <span className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                        {e.zona.nombre}
                                                    </span>
                                                </div>

                                                <h2 className="text-3xl font-black uppercase italic mb-1 leading-none">
                                                    {e.tipo_entrada.nombre}
                                                </h2>

                                                <div className="text-5xl font-black text-black mb-5 mt-2">
                                                    {Math.floor(e.precio)}€
                                                </div>

                                                {e.stock > 0 ? (
                                                    <div className="mt-auto">
                                                        <div className="flex items-center justify-between bg-gray-100 rounded-full p-2 mb-4">
                                                            <button
                                                                type="button"
                                                                onClick={() => cambiarCantidad(e.id, -1)}
                                                                className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-pink-500 transition-all active:scale-90"
                                                            >
                                                                <HiMinus />
                                                            </button>
                                                            <span className="font-black text-lg">{cantidades[e.id] || 1}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => cambiarCantidad(e.id, 1)}
                                                                className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-pink-500 transition-all active:scale-90"
                                                            >
                                                                <HiPlus />
                                                            </button>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            disabled={procesando === e.id}
                                                            onClick={() => aniadirAlCarrito(e.id)}
                                                            className={`w-full py-4 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 ${procesando === e.id ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-500 text-white hover:bg-black'}`}
                                                        >
                                                            <HiOutlineShoppingBag className="text-xl" />
                                                            {procesando === e.id ? 'Añadiendo...' : 'Añadir al carrito'}
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="mt-auto relative overflow-hidden rounded-2xl border-2 border-dashed border-red-600 bg-gray-50 p-6 flex items-center justify-center">
                                                        <h2 className="text-red-600 text-4xl font-black uppercase italic tracking-tighter transform -rotate-6 select-none">
                                                            Agotada
                                                        </h2>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
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

            <Footer />
        </div>
    );
}