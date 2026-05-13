import Footer from '@/components/festival/Footer';
import Header from '@/components/festival/Header';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { HiOutlineTrash, HiMinusSmall, HiPlusSmall, HiArrowRight } from "react-icons/hi2";

interface ArticuloCarrito {
    id: number;
    nombre: string;
    zona: string;
    precio: number;
    cantidad: number;
}

interface Props {
    articulos: ArticuloCarrito[];
    total: number;
}

export default function Carrito({ articulos = [], total = 0 }: Props) {
    const { delete: destroy } = useForm();

    const actualizarCantidad = (id: number, nuevaCantidad: number) => {
        if (nuevaCantidad < 1) return;
        router.post(`/carrito/actualizar/${id}`,
            { cantidad: nuevaCantidad },
            { preserveScroll: true }
        );
    };

    const eliminarArticulo = (id: number) => {
        destroy(`/carrito/eliminar/${id}`, {
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen bg-[#fcfcfc] text-black font-sans antialiased">
            <Head title="Tu Carrito — UrbanBeat" />
            <Header />

            <main className="max-w-6xl mx-auto pt-44 pb-32 px-8">
                <header className="relative mb-13">
                    <span className="absolute -top-8 left-0 text-pink-500 font-black text-6xl opacity-9 italic select-none tracking-tighter uppercase">
                        Tu carrito
                    </span>
                    <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter italic leading-none relative z-10">
                        TU <span className="text-pink-500">CARRITO</span>
                    </h1>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mt-6 ml-1">
                        Artículos que has añadido al carrito
                    </p>
                </header>

                {articulos.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        
                        {/* Columna de Productos - Más equilibrada */}
                        <div className="flex-[1.5] w-full space-y-0 divide-y-2 divide-black">
                            {articulos.map((articulo) => (
                                <div key={articulo.id} className="group py-10 first:pt-0 flex flex-col md:flex-row md:items-center gap-8">
                                    <div className="flex-1">
                                        <div className="inline-block bg-black text-white px-2 py-0.5 mb-3">
                                            <span className="text-[11px] font-black uppercase tracking-widest">
                                                {articulo.zona}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight leading-none group-hover:text-pink-500 transition-colors">
                                            {articulo.nombre}
                                        </h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                                            Ref: 00{articulo.id} — {articulo.precio}€ / ud
                                        </p>
                                    </div>

                                    {/* Controles y Precio */}
                                    <div className="flex items-center justify-between md:justify-end gap-10">
                                        <div className="flex items-center border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                            <button 
                                                onClick={() => actualizarCantidad(articulo.id, articulo.cantidad - 1)}
                                                className="w-9 h-9 flex items-center justify-center hover:bg-black hover:text-white transition-colors border-r-2 border-black"
                                            >
                                                <HiMinusSmall />
                                            </button>
                                            <span className="w-10 text-center font-black text-base italic">{articulo.cantidad}</span>
                                            <button 
                                                onClick={() => actualizarCantidad(articulo.id, articulo.cantidad + 1)}
                                                className="w-9 h-9 flex items-center justify-center hover:bg-black hover:text-white transition-colors border-l-2 border-black"
                                            >
                                                <HiPlusSmall />
                                            </button>
                                        </div>
                                        
                                        <div className="text-right min-w-[100px]">
                                            <p className="text-2xl font-black italic tracking-tighter">
                                                {(articulo.precio * articulo.cantidad).toFixed(2)}€
                                            </p>
                                        </div>

                                        <button 
                                            onClick={() => eliminarArticulo(articulo.id)}
                                            className="text-gray-300 hover:text-red-600 transition-colors"
                                        >
                                            <HiOutlineTrash size={22} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Panel de Pago */}
                        <aside className="w-full lg:w-[400px] sticky top-40">
                            <div className="bg-white border-2 border-black p-8 shadow-[10px_10px_0px_0px_rgba(236,72,153,1)] relative">
                                
                                <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-8 pb-3 border-b-2 border-black">
                                    Resumen de <span className="text-pink-500"> pago</span>
                                </h2>

                                <div className="space-y-4 mb-10">
                                    <div className="flex justify-between text-[12px] font-black uppercase tracking-widest text-gray-500">
                                        <span>Subtotal</span>
                                        <span className="text-black">{total.toFixed(2)}€</span>
                                    </div>
                                    <div className="flex justify-between text-[12px] font-black uppercase tracking-widest text-gray-400 italic">
                                        <span>Gastos gestión</span>
                                        <span className="text-emerald-500 font-black">Gratis</span>
                                    </div>
                                    
                                    <div className="pt-8 mt-8 border-t-2 border-dashed border-gray-200 flex justify-between items-end">
                                        <div className="flex flex-col">
                                            <span className="text-[12px] font-black uppercase text-pink-500 tracking-widest">Total Final</span>
                                        </div>
                                        <span className="text-5xl font-black italic tracking-tighter leading-none">
                                            {total.toFixed(2)}€
                                        </span>
                                    </div>
                                </div>

                                <button className="group w-full bg-black text-white py-5 font-black uppercase tracking-[0.25em] text-[12px] flex items-center justify-center gap-3 hover:bg-pink-500 transition-all active:translate-y-1">
                                    Finalizar Pedido
                                    <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <p className="text-[8px] text-center text-gray-400 font-bold mt-8 uppercase tracking-[0.15em] leading-relaxed italic">
                                    Al continuar aceptas nuestras condiciones de pago y acceso al festival. 
                                </p>
                            </div>
                        </aside>
                    </div>
                ) : (
                    /* Cuando está vacío */
                    <div className="py-32 text-center border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-3xl font-black uppercase italic mb-8 tracking-tighter text-gray-200">
                            Tu carrito está vacío
                        </h2>
                        <Link 
                            href="/entradas" 
                            className="inline-block bg-pink-500 text-white px-10 py-4 font-black uppercase tracking-widest text-[10px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                        >
                            Ver entradas
                        </Link>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}