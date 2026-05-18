import { Head, usePage, router, Link } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import ProductoMerch from '@/components/festival/ProductoMerch';
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlinePencil } from "react-icons/hi2";
import { HiOutlinePlus } from "react-icons/hi2";

interface Props {
    productos: any[];
}

export default function Merchandising({ productos }: Props) {
    const { auth } = usePage().props as any;
    const esAdmin = auth.user && auth.user.role_id === 1;

    const productosAMostrar = productos;

    const cambiarVisibilidad = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        e.stopPropagation();
        router.patch(`/admin/productos/${id}/cambiar-visibilidad`, {}, {
            preserveScroll: true
        });
    };

    const irAEditar = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        e.stopPropagation();
        router.get(`/admin/productos/${id}/edit`);
    };

    const irADetalle = (id: number) => {
        router.get(`/merchandising/${id}`);
    };

    return (
        <div className="bg-white min-h-screen flex flex-col font-sans">
            <Head title="Merchandising - UrbanBeat" />
            <Header />

            <main className="flex-grow pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-20">
                        <h1 className="text-black text-6xl md:text-9xl font-black italic uppercase tracking-tighter mb-4">
                            MERCH <span className="text-pink-500">2026</span>
                        </h1>
                    </div>
                    {esAdmin && (
                        <div className="flex justify-between items-center mb-6">
                            <Link
                                href="/admin/productos/create"
                                className="bg-green-600 hover:bg-green-800 text-white px-10 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-colors shadow-md"
                            >
                                Añadir producto
                            </Link>
                        </div>
                    )}

                    {productosAMostrar.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                            {productosAMostrar.map((prod) => (
                                <div
                                    key={prod.id}
                                    className={`relative transition-all ${prod.esta_oculto
                                        ? 'opacity-60 grayscale-[0.7] border-2 border-dashed border-gray-400 rounded-[2.5rem] bg-gray-50'
                                        : ''
                                        }`}
                                >
                                    <ProductoMerch
                                        producto={prod}
                                        onVerDetalle={() => irADetalle(prod.id)}
                                    >
                                        {esAdmin && (
                                            <div className="absolute top-4 right-4 flex flex-col gap-3 z-40">
                                                <button
                                                    onClick={(e) => cambiarVisibilidad(e, prod.id)}
                                                    className={`p-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-90 active:shadow-none hover:-translate-y-1 ${prod.esta_oculto ? 'bg-black text-white' : 'bg-yellow-400 text-black'
                                                        }`}
                                                >
                                                    {prod.esta_oculto ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
                                                </button>

                                                <button
                                                    onClick={(e) => irAEditar(e, prod.id)}
                                                    className="p-3 bg-pink-500 text-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-90 active:shadow-none hover:bg-black hover:-translate-y-1"
                                                >
                                                    <HiOutlinePencil size={20} />
                                                </button>
                                            </div>
                                        )}
                                    </ProductoMerch>

                                    {esAdmin && prod.esta_oculto && (
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                                            <span className="bg-black text-white text-[10px] font-black uppercase px-4 py-1 rounded-full tracking-widest border border-white/20">
                                                Oculto
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-40 text-center border-4 border-dashed border-gray-100 rounded-[4rem]">
                            <p className="text-gray-300 font-black uppercase tracking-[0.5em] text-xl">Stock no disponible</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}