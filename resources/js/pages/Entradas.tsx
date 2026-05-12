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
    // 1. Extraemos auth de las props globales de Inertia
    const { auth } = usePage().props as any;
    
    // Verificamos si es admin (comprueba si tu columna se llama 'role' o 'is_admin')
    const esAdmin = auth.user && auth.user.role_id === 1;

    const [zona, setZona] = useState<string | null>(null);
    const [cantidades, setCantidades] = useState<Record<number, number>>({});

    // 2. Lógica de filtrado: El admin ve TODO (incluso las ocultas)
    const entradasVisibles = esAdmin ? entradas : entradas.filter(e => !e.esta_oculta);

    const filtradas = zona
        ? entradasVisibles.filter(e => e.zona.nombre === zona)
        : entradasVisibles;


    const updateCant = (id: number, delta: number) => {
        setCantidades(prev => ({
            ...prev,
            [id]: Math.max(1, Math.min((prev[id] || 1) + delta, 10))
        }));
    };

    // 3. Acciones de Administración
    const cambiarVisibilidad = (id: number) => {
        router.patch(`/admin/entradas/${id}/cambiar-visibilidad`, {}, {
            preserveScroll: true,
        });
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


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {filtradas.length > 0 ? (
                            filtradas.map((e) => (
                                <div 
                                    key={e.id} 
                                    className={`relative p-8 rounded-3xl border-2 border-black flex flex-col h-full bg-white shadow-2xl transition-all hover:-translate-y-2 ${e.esta_oculta ? 'opacity-70 grayscale-[0.5] border-dashed bg-gray-50' : ''}`}
                                >
                                    
                                    {/* --- BLOQUE DE BOTONES ADMIN --- */}
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


                                    <div className="mb-4 flex justify-between items-start">
                                        <span className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                            {e.zona.nombre}
                                        </span>
                                        {esAdmin && e.esta_oculta && (
                                            <span className="text-[10px] font-black text-red-600 uppercase italic bg-white px-2 py-1 border border-red-600 rounded-lg">Oculta para público</span>
                                        )}
                                    </div>


                                    <h2 className="text-3xl font-black uppercase italic mb-1 leading-none">
                                        {e.tipo_entrada.nombre}
                                    </h2>


                                    <p className="text-pink-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-6">
                                        {e.tipo_entrada.dia
                                            ? new Date(e.tipo_entrada.dia.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
                                            : 'Abono Full Festival'
                                        }
                                    </p>


                                    <div className="text-5xl font-black text-black mb-5">
                                        {Math.floor(e.precio)}€
                                    </div>

                                    {/* Info extra para el admin */}
                                    {esAdmin && (
                                        <div className="mb-6 p-3 bg-gray-100 rounded-xl border-l-4 border-black">
                                            <p className="text-[10px] font-black uppercase">Stock: {e.stock}</p>
                                        </div>
                                    )}


                                    {e.stock > 0 ?
                                        <div className="mt-auto">
                                            <div className="flex items-center justify-between bg-gray-100 rounded-full p-2 mb-4">
                                                <button
                                                    type="button"
                                                    onClick={() => updateCant(e.id, -1)}
                                                    className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-pink-500 transition-all active:scale-90"
                                                >
                                                    <HiMinus />
                                                </button>
                                                <span className="font-black text-lg">{cantidades[e.id] || 1}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => updateCant(e.id, 1)}
                                                    className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm hover:text-pink-500 transition-all active:scale-90"
                                                >
                                                    <HiPlus />
                                                </button>
                                            </div>


                                            <button
                                                type="button"
                                                onClick={() => console.log("Añadido al carrito:", e.id, "Cantidad:", cantidades[e.id] || 1)}
                                                className="w-full py-4 bg-pink-500 text-white rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-all shadow-lg"
                                            >
                                                <HiOutlineShoppingBag className="text-xl" />
                                                Añadir al carrito
                                            </button>
                                        </div> :
                                        <div className="mt-auto relative overflow-hidden rounded-2xl border-2 border-dashed border-red-600 bg-gray-50 p-6 flex items-center justify-center">
                                            <h2 className="text-red-600 text-4xl font-black uppercase italic tracking-tighter transform -rotate-6 select-none">
                                                Agotada
                                            </h2>
                                        </div>}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
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