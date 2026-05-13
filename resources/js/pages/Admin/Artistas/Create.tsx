import { useForm, Head, router } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { HiOutlineArrowLeft, HiChevronDown } from "react-icons/hi2";

export default function Create({ dias }: { dias: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        es_headliner: false,
        dia_id: dias[0]?.id || '',
        orden: 1,
        imagen: null as File | null,
    });

    const enviar = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/artistas', { forceFormData: true });
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Head title="Nuevo Artista" />
            <Header />
            <main className="pt-40 pb-20 px-6 max-w-2xl mx-auto">
                <button onClick={() => router.get('/admin/artistas')} className="flex items-center gap-2 text-[10px] font-black uppercase mb-8"><HiOutlineArrowLeft /> Volver</button>

                <div className="bg-white p-10 rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                    <form onSubmit={enviar} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase mb-2">Nombre</label>
                            <input type="text" value={data.nombre} onChange={e => setData('nombre', e.target.value)} className="w-full border-2 border-black rounded-2xl p-4 font-black outline-none focus:border-pink-500" />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase mb-2">Día</label>
                            <div className="relative">
                                <select value={data.dia_id} onChange={e => setData('dia_id', e.target.value)} className="w-full border-2 border-black rounded-2xl p-4 font-black appearance-none bg-white">
                                    {dias.map(d => <option key={d.id} value={d.id}>{new Date(d.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' }).toUpperCase()}</option>)}
                                </select>
                                <HiChevronDown className="absolute right-4 top-5" size={24} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase mb-2">Imagen</label>
                            <input type="file" onChange={e => setData('imagen', e.target.files ? e.target.files[0] : null)} className="w-full border-2 border-black rounded-2xl p-4 font-bold text-xs bg-gray-50 file:bg-black file:text-white file:rounded-lg" />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase mb-2 tracking-widest text-gray-500">
                                Orden en el cartel (Opcional)
                            </label>
                            <input
                                type="number"
                                value={data.orden}
                                onChange={e => setData('orden', e.target.value)}
                                placeholder="Ej: 1"
                                className="w-full border-2 border-black rounded-2xl p-4 font-black text-xl outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all"
                            />
                            <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase">
                                Si lo dejas vacío, se añadirá al final automáticamente.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border-2 border-black border-dashed">
                            <input type="checkbox" id="hl" checked={data.es_headliner} onChange={e => setData('es_headliner', e.target.checked)} className="w-6 h-6 border-2 border-black text-pink-500 rounded" />
                            <label htmlFor="hl" className="font-black uppercase italic text-sm">¿Es Headliner?</label>
                        </div>

                        <button disabled={processing} className="w-full bg-black text-white font-black uppercase py-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 transition-all">
                            {processing ? 'Guardando...' : 'Crear Artista'}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}