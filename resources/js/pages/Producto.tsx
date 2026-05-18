import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import BotonCarrito from '@/components/festival/BotonCarrito';
import { HiOutlineArrowLeft, HiMinus, HiPlus } from "react-icons/hi2";

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
    imagen_url: string;
    tallas: Talla[];
    descripcion: string;
}

interface Props {
    producto: Producto;
}

export default function Producto({ producto }: Props) {
    const [tallaSeleccionada, setTallaSeleccionada] = useState<number | null>(null);
    const [cantidad, setCantidad] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const [procesando, setProcesando] = useState<boolean>(false);

    const tallaActual = producto.tallas.find(t => t.id === tallaSeleccionada);
    const maxStock = tallaActual ? tallaActual.pivot.stock : 1;

    const añadirAlCarrito = () => {
        if (producto.tallas.length > 0 && !tallaSeleccionada) {
            setError('Selecciona una talla antes de añadir al carrito.');
            return;
        }
        
        setError(null);
        setProcesando(true);

        router.post('/carrito/agregar', {
            producto_id: producto.id,
            talla_id: tallaSeleccionada,
            cantidad: cantidad
        }, {
            
            onSuccess: () => {
                setProcesando(false);
                setCantidad(1);
            },
            onError: (errors) => {
                setProcesando(false);
                if (errors.error) {
                    setError(errors.error);
                } else if (errors.cantidad) {
                    setError(errors.cantidad);
                } else {
                    setError('Ocurrió un error al intentar añadir el producto.');
                }
            }
        });
    };

    return (
        <div className="bg-[#fcfcfc] min-h-screen flex flex-col font-sans antialiased text-black selection:bg-pink-500 selection:text-white">
            <Head title={`${producto.nombre} — UrbanBeat Shop`} />
            <Header />

            <main className="flex-grow pt-40 pb-20 px-4 md:px-10 max-w-7xl w-full mx-auto flex flex-col justify-center">
                
                <div className="mb-8 flex-shrink-0">
                    <button 
                        onClick={() => router.get('/merchandising')}
                        className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-pink-500 transition-colors duration-200"
                    >
                        <HiOutlineArrowLeft className="transform group-hover:-translate-x-1 transition-transform" size={16} />
                        Volver a la tienda
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-stretch bg-white border-3 border-black rounded-[36px] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    
                    <div className="w-full lg:w-1/2 bg-gray-50 rounded-[24px] overflow-hidden border-3 border-black relative group aspect-square md:aspect-[4/3] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                        <img 
                            src={producto.imagen_url ? `/storage/${producto.imagen_url}` : '/img/placeholder.jpg'} 
                            alt={producto.nombre}
                            className="w-full h-full object-cover block select-none transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-6 left-6 bg-black text-white px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest border border-black shadow-[3px_3px_0px_0px_rgba(219,39,119,1)]">
                            Official Merch
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col justify-between py-2 gap-8">
                        
                        <div className="flex flex-col gap-6">
                            <div>
                                <span className="text-xs font-black uppercase tracking-widest text-pink-500 block mb-2">
                                    UrbanBeat Festival 2026 // Merch
                                </span>
                                <h1 className="text-4xl md:text-5xl xl:text-6xl font-black italic uppercase tracking-tighter text-black leading-none mb-4 break-words">
                                    {producto.nombre}
                                </h1>
                                <div className="flex items-center gap-4">
                                    <span className="inline-block bg-pink-500 text-white font-black text-2xl px-6 py-2 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        {Number(producto.precio).toFixed(2)} €
                                    </span>
                                    <span className="text-xs text-gray-400 font-black uppercase tracking-wider">IVA Incluido</span>
                                </div>
                            </div>

                            <hr className="border-t-3 border-black border-dashed opacity-20" />

                            <p className="text-sm md:text-base text-gray-600 font-semibold leading-relaxed max-w-xl">
                                {producto.descripcion}
                            </p>

                            {producto.tallas.length > 0 && (
                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">
                                        Selecciona tu Talla
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {producto.tallas.map((tSummary) => {
                                            const sinStock = tSummary.pivot.stock === 0;
                                            const esSeleccionada = tallaSeleccionada === tSummary.id;

                                            return (
                                                <button
                                                    key={tSummary.id}
                                                    type="button"
                                                    disabled={sinStock}
                                                    onClick={() => {
                                                        setTallaSeleccionada(tSummary.id);
                                                        setCantidad(1);
                                                        setError(null);
                                                    }}
                                                    className={`h-12 min-w-[3.5rem] px-5 rounded-xl border-2 border-black font-black uppercase text-sm tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none ${
                                                        sinStock 
                                                            ? 'bg-gray-100 text-gray-400 border-gray-300 line-through shadow-none cursor-not-allowed pointer-events-none'
                                                            : esSeleccionada
                                                            ? 'bg-black text-white shadow-none translate-x-[4px] translate-y-[4px]'
                                                            : 'bg-white text-black hover:bg-gray-100'
                                                    }`}
                                                >
                                                    {tSummary.nombre}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-3">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center justify-between max-w-xs">
                                    <span>Cantidad</span>
                                    {tallaSeleccionada && (
                                        <span className={`font-black ${maxStock <= 3 ? 'text-amber-600' : 'text-emerald-600'}`}>
                                            {maxStock <= 3 ? `¡Solo quedan ${maxStock} unidades!` : `(${maxStock} disponibles)`}
                                        </span>
                                    )}
                                </label>
                                <div className={`flex items-center border-3 border-black rounded-2xl overflow-hidden bg-white w-fit shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all ${producto.tallas.length > 0 && !tallaSeleccionada ? 'opacity-25 pointer-events-none' : ''}`}>
                                    <button 
                                        type="button"
                                        onClick={() => setCantidad(prev => Math.max(1, prev - 1))}
                                        className="w-16 h-16 font-black text-2xl hover:bg-black hover:text-white transition-colors flex items-center justify-center border-r-3 border-black active:bg-gray-900"
                                    >
                                        <HiMinus size={20} />
                                    </button>
                                    <span className="w-20 text-center font-black text-xl select-none text-black">
                                        {cantidad}
                                    </span>
                                    <button 
                                        type="button"
                                        onClick={() => setCantidad(prev => Math.min(maxStock, prev + 1))}
                                        className="w-16 h-16 font-black text-2xl hover:bg-black hover:text-white transition-colors flex items-center justify-center border-l-3 border-black active:bg-gray-900"
                                    >
                                        <HiPlus size={20} />
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border-2 border-red-500 rounded-xl p-3 max-w-md shadow-[3px_3px_0px_0px_rgba(239,68,68,1)]">
                                    <p className="text-red-600 text-xs font-black uppercase tracking-wide flex items-center gap-2">
                                        {error}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Botón de Compra */}
                        <div className="pt-6 w-full max-w-md">
                            <BotonCarrito 
                                onClick={añadirAlCarrito}
                                disabled={procesando}
                                texto={procesando ? 'Procesando...' : 'Añadir al carrito'}
                                size="lg"
                                className="w-full rounded-2xl font-black uppercase tracking-widest text-sm py-4 border-3 border-black bg-pink-500 hover:bg-pink-600 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0 hover:translate-y-0 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all disabled:opacity-50 disabled:pointer-events-none"
                            />
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}