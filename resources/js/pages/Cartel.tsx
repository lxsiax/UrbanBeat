import { Head, router } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import ImagenArtista from '@/components/festival/ImagenArtista';
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlinePencil } from "react-icons/hi2";

interface Props {
    programacion: any[];
    auth: any;
}

export default function Cartel({ programacion, auth }: Props) {
    const esAdmin = auth.user && auth.user.role_id === 1;

    const cambiarVisibilidad = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        e.stopPropagation();
        router.patch(`/admin/artistas/${id}/cambiar-visibilidad`, {}, { preserveScroll: true });
    };

    const irAEditar = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        e.stopPropagation(); 
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
                            CARTEL URBAN<span className="text-pink-500">BEAT</span>
                        </h1>
                    </div>

                    <div className="space-y-32">
                        {programacion.map((dia) => (
                            <section key={dia.id}>
                                <div className="flex flex-col mb-12">
                                    <div className="flex items-center gap-6">
                                        <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-black shrink-0">
                                            {new Date(dia.fecha).toLocaleDateString('es-ES', { 
                                                day: 'numeric', 
                                                month: 'long' 
                                            })}
                                        </h2>
                                        <div className="h-[4px] w-full bg-black"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                                    {dia.artistas.map((artista: any) => (
                                        <ImagenArtista key={artista.id} artista={artista}>
                                            
                                            {esAdmin && (
                                                <div className="absolute top-4 right-4 flex flex-col gap-3 z-30">
                                                    <button
                                                        onClick={(ev) => cambiarVisibilidad(ev, artista.id)}
                                                        title={artista.esta_oculto ? "Mostrar artista" : "Ocultar artista"}
                                                        className={`p-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-90 active:shadow-none hover:-translate-y-1 ${
                                                            artista.esta_oculto ? 'bg-black text-white' : 'bg-yellow-400 text-black'
                                                        }`}
                                                    >
                                                        {artista.esta_oculto ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
                                                    </button>
                                                    
                                                    <button
                                                        onClick={(ev) => irAEditar(ev, artista.id)}
                                                        title="Editar artista"
                                                        className="p-3 bg-pink-500 text-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-90 active:shadow-none hover:bg-black hover:-translate-y-1"
                                                    >
                                                        <HiOutlinePencil size={22} />
                                                    </button>
                                                </div>
                                            )}

                                        </ImagenArtista>
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