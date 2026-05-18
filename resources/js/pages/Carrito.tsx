import Footer from '@/components/festival/Footer';
import Header from '@/components/festival/Header';
import ArticuloCarritoFila from '@/components/festival/ArticuloCarritoFila';
import PanelPago from '@/components/festival/PanelPago'; // 👈 Importamos el nuevo componente
import { Head, Link, useForm, router } from '@inertiajs/react';

interface ArticuloCarrito {
    id: number;
    carrito_id: string;
    tipo: 'entrada' | 'merchandising';
    nombre: string;
    detalle: string;
    precio: number;
    cantidad: number;
    imagen: string | null;
}

interface Props {
    articulos: ArticuloCarrito[];
    total: number;
}

export default function Carrito({ articulos = [], total = 0 }: Props) {
    const { delete: destroy } = useForm();

    const actualizarCantidad = (carritoId: string, nuevaCantidad: number) => {
        if (nuevaCantidad < 1) return;
        router.post(`/carrito/actualizar/${carritoId}`,
            { cantidad: nuevaCantidad },
            { preserveScroll: true }
        );
    };

    const eliminarArticulo = (carritoId: string) => {
        destroy(`/carrito/eliminar/${carritoId}`, {
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
                        
                        <div className="flex-[1.5] w-full space-y-0 divide-y-2 divide-black">
                            {articulos.map((articulo) => (
                                <ArticuloCarritoFila 
                                    key={articulo.carrito_id}
                                    articulo={articulo}
                                    onActualizarCantidad={actualizarCantidad}
                                    onEliminarArticulo={eliminarArticulo}
                                />
                            ))}
                        </div>

                        <PanelPago total={total} />
                        
                    </div>
                ) : (
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