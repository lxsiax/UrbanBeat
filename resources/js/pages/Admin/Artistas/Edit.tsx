import { useForm, Head, router } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { HiOutlineArrowLeft } from "react-icons/hi2";

interface Props {
    artista: any;
    dias: any[];
}

export default function Edit({ artista, dias }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nombre: artista.nombre,
        es_headliner: !!artista.es_headliner, // Forzamos booleano
        dia_id: artista.dia_id,
        orden: artista.orden,
        imagen: null as File | null,
        _method: 'PATCH',
    });

    const enviar = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/artistas/${artista.id}`, {
            forceFormData: true, 
            preserveScroll: true,
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title={`Editar - ${artista.nombre}`} />
            <Header />

            <main className="flex-grow pt-40 pb-20 px-6">
                <div className="max-w-2xl mx-auto">

                    <button 
                        onClick={() => router.get('/admin/artistas')}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-8 hover:text-pink-500 transition-colors"
                    >
                        <HiOutlineArrowLeft size={16} />
                        Volver a gestión
                    </button>

                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-black mb-12">
                        Editar <span className="text-pink-500">Artista</span>
                    </h1>

                    <div className="bg-white p-10 rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                        
                        <form onSubmit={enviar} className="space-y-6">

                            {/* Nombre */}
                            <div>
                                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest">Nombre del Artista</label>
                                <input 
                                    type="text" 
                                    value={data.nombre} 
                                    onChange={e => setData('nombre', e.target.value)}
                                    className={`w-full border-2 border-black rounded-2xl p-4 font-black text-xl outline-none focus:ring-4 focus:ring-pink-500/20 transition-all ${errors.nombre ? 'border-red-500' : 'focus:border-pink-500'}`}
                                />
                                {errors.nombre && <p className="text-red-500 text-xs mt-2 font-bold uppercase">{errors.nombre}</p>}
                            </div>

                            {/* Día */}
                            <div>
                                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest">Día de actuación</label>
                                <select 
                                    value={data.dia_id} 
                                    onChange={e => setData('dia_id', e.target.value)}
                                    className="w-full border-2 border-black rounded-2xl p-4 font-black text-xl outline-none focus:border-pink-500 bg-white cursor-pointer"
                                >
                                    {dias.map((d) => (
                                        <option key={d.id} value={d.id}> {new Date(d.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest">Orden en el Cartel</label>
                                <input 
                                    type="number" 
                                    value={data.orden} 
                                    onChange={e => setData('orden', e.target.value)}
                                    className="w-full border-2 border-black rounded-2xl p-4 font-black text-xl outline-none focus:border-pink-500"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest">Cambiar Imagen</label>
                                <input 
                                    type="file" 
                                    onChange={e => setData('imagen', e.target.files ? e.target.files[0] : null)}
                                    className="w-full border-2 border-black rounded-2xl p-4 font-bold text-sm outline-none bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:uppercase file:bg-black file:text-white hover:file:bg-pink-500 cursor-pointer"
                                />
                                {errors.imagen && <p className="text-red-500 text-xs mt-2 font-bold uppercase">{errors.imagen}</p>}
                            </div>

                            {/* Checkbox Headliner */}
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border-2 border-black border-dashed">
                                <input 
                                    type="checkbox"
                                    id="headliner"
                                    checked={data.es_headliner}
                                    onChange={e => setData('es_headliner', e.target.checked)}
                                    className="w-5 h-5 border-2 border-black rounded text-pink-500 focus:ring-0 cursor-pointer"
                                />
                                <label htmlFor="headliner" className="font-black uppercase italic text-sm cursor-pointer">
                                    ¿Es <span className="text-pink-500">Headliner</span>?
                                </label>
                            </div>

                            <button 
                                type="submit"
                                disabled={processing}
                                className="w-full bg-black text-white font-black uppercase py-5 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all disabled:opacity-50"
                            >
                                {processing ? 'Guardando...' : 'Actualizar Artista'}
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}