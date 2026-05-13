import { Head, router } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import NombreArtista from '@/components/festival/NombreArtista';
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlinePencil } from "react-icons/hi2";

export default function Cartel({ programacion, auth }: { programacion: any[], auth: any }) {
    const esAdmin = auth.user && auth.user.role_id === 1;

    const cambiarVisibilidad = (id: number) => {
        router.patch(`/admin/artistas/${id}/cambiar-visibilidad`, {}, { preserveScroll: true });
    };

    const irAEditar = (id: number) => {
        router.get(`/admin/artistas/${id}/edit`);
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Head title="Cartel - UrbanBeat" />
            <Header />

            <main className="flex-grow pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-24">
                        <h1 className="text-black text-6xl md:text-9xl font-black italic uppercase tracking-tighter mb-4">
                            CARTEL <span className="text-pink-500">2026</span>
                        </h1>
                    </div>

                    <div className="space-y-32">
                        {programacion.map((dia) => (
                            <section key={dia.id}>
                                <div className="flex flex-col mb-12">
                                    <div className="flex items-center gap-6">
                                        <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-black shrink-0">
                                            {new Date(dia.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                                        </h2>
                                        <div className="h-[4px] w-full bg-black"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                                    {dia.artistas.map((e: any) => (
                                        <div
                                            key={e.id}
                                            className={`group relative rounded-[2.5rem] bg-black border-[3px] overflow-hidden transition-all duration-500 ${e.es_headliner ? 'col-span-2 row-span-2' : 'col-span-1'
                                                } ${e.esta_oculto ? 'opacity-50 grayscale border-dashed border-gray-400' : 'border-black hover:-translate-y-2 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]'}`}
                                        >
                                            {esAdmin && (
                                                <div className="absolute top-4 right-4 flex flex-col gap-3 z-30">
                                                    <button
                                                        onClick={() => cambiarVisibilidad(e.id)}
                                                        className={`p-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-90 ${e.esta_oculta ? 'bg-black text-white' : 'bg-yellow-400 text-black'}`}
                                                    >
                                                        {e.esta_oculto ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
                                                    </button>
                                                    <button
                                                        onClick={(ev) => { ev.preventDefault(); irAEditar(e.id); }}
                                                        className="p-3 bg-pink-500 text-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-90 hover:bg-black"
                                                    >
                                                        <HiOutlinePencil size={22} />
                                                    </button>
                                                </div>
                                            )}

                                            <div className="aspect-[4/5] w-full h-full">
                                                <img
                                                    src={
                                                        e.imagen
                                                            ? (e.imagen.startsWith('http') ? e.imagen : `/storage/${e.imagen}`)
                                                            : '/storage/default-artist.jpg'
                                                    }
                                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                                                />
                                            </div>

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-10 pointer-events-none">
                                                <NombreArtista nombre={e.nombre} esHeadliner={e.es_headliner} />
                                                {e.esta_oculto && (
                                                    <span className="mt-3 text-[11px] bg-red-600 text-white font-black px-3 py-1 w-fit rounded-full uppercase italic border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                        Oculto/a para el público
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}