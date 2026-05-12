import Footer from '@/components/festival/Footer';
import Header from '@/components/festival/Header';
import { Head, Link, useForm, router } from '@inertiajs/react';

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
    const { post, delete: destroy } = useForm();

    // Función para actualizar la cantidad (Inertia post)
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
        <div className="min-h-screen bg-gray-50 text-black">
            <Head title="Tu Carrito - Festival" />

            <Header />

            <main className="max-w-5xl mx-auto pt-40 pb-20 px-6">
                <header className="mb-12">
                    <h1 className="text-7xl font-black uppercase tracking-tighter italic leading-none">
                        Tu <span className="text-pink-500 text-7xl block sm:inline">Carrito</span>
                    </h1>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mt-4 ml-1">
                        Artículos que has añadido al carrito
                    </p>
                </header>

                {articulos.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* Lista de Artículos */}
                        <div className="flex-1 space-y-4">
                            {articulos.map((articulo) => (
                                <div
                                    key={articulo.id}
                                    className="group bg-white rounded-[2rem] p-6 flex flex-col sm:flex-row items-center gap-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                    {/* Info de la Entrada */}
                                    <div className="flex-1 text-center sm:text-left">
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-pink-500 bg-pink-50 px-3 py-1 rounded-full mb-2 inline-block">
                                            {articulo.zona}
                                        </span>
                                        <h3 className="text-xl font-black uppercase italic leading-none tracking-tighter">
                                            {articulo.nombre}
                                        </h3>
                                    </div>

                                    {/* Controles de Cantidad */}
                                    <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                                        <button
                                            type="button"
                                            onClick={() => actualizarCantidad(articulo.id, articulo.cantidad - 1)}
                                            className="w-10 h-10 flex items-center justify-center font-black hover:text-pink-500 transition-colors"
                                        >
                                            —
                                        </button>
                                        <span className="w-8 text-center font-black text-sm">
                                            {articulo.cantidad}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => actualizarCantidad(articulo.id, articulo.cantidad + 1)}
                                            className="w-10 h-10 flex items-center justify-center font-black hover:text-pink-500 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Precio Unitario y Total Artículo */}
                                    <div className="text-right min-w-[100px]">
                                        <p className="text-xl font-black tracking-tighter">
                                            {(articulo.precio * articulo.cantidad).toFixed(2)}€
                                        </p>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                            {articulo.precio}€ / ud
                                        </p>
                                    </div>

                                    {/* Botón Eliminar */}
                                    <button
                                        type="button"
                                        onClick={() => eliminarArticulo(articulo.id)}
                                        className="p-2 text-gray-200 hover:text-red-500 transition-colors"
                                        title="Eliminar del carrito"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Columna Lateral de Pago (Resumen) */}
                        <aside className="w-full lg:w-[380px]">
                            <div className="bg-black rounded-[2.5rem] p-8 text-white sticky top-32 shadow-2xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-[50px] rounded-full -mr-10 -mt-10"></div>

                                <h2 className="text-sm font-black uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
                                    Resumen de compra
                                </h2>

                                <div className="space-y-4 mb-10">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Subtotal</span>
                                        <span className="font-bold text-lg">{total.toFixed(2)}€</span>
                                    </div>
                                    <div className="flex justify-between items-end pb-4 border-b border-white/5">
                                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Gastos Gestión</span>
                                        <span className="font-bold text-lg">0.00€</span>
                                    </div>
                                    <div className="flex justify-between items-end pt-2">
                                        <span className="text-xs font-black uppercase text-pink-500 tracking-tighter">Total a pagar</span>
                                        <span className="text-4xl font-black italic">{total.toFixed(2)}€</span>
                                    </div>
                                </div>

                                <button className="w-full bg-pink-500 hover:bg-white hover:text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-lg shadow-pink-500/20 active:scale-95">
                                    Finalizar Pedido
                                </button>

                                <p className="text-[9px] text-center text-gray-500 uppercase font-bold mt-6 tracking-widest leading-relaxed px-4">
                                    Al continuar, aceptas las condiciones de venta y acceso al recinto.
                                </p>
                            </div>
                        </aside>
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black uppercase italic text-gray-300 mb-6 tracking-tighter">Tu carrito está vacío</h2>
                        <Link href="/" className="inline-block bg-black text-white px-10 py-4 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-pink-500 transition-colors">
                            Ver Cartelera
                        </Link>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}