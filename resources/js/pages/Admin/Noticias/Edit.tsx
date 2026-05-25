import { useForm, Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { HiOutlineArrowLeft } from "react-icons/hi2";

export default function EditNoticia({ noticia }: { noticia: any }) {
    const { data, setData, post, processing } = useForm({
        titulo: noticia.titulo || '',
        contenido: noticia.contenido || '',
        imagen: null as File | null,
        _method: 'PUT',
    });

    const [ErroresForm, setErroresForm] = useState<Record<string, string>>({});

    const enviar = (e: React.FormEvent) => {
        e.preventDefault();
        const errores: Record<string, string> = {};

        if (!data.titulo.trim()) errores.titulo = 'El título es obligatorio.';
        if (!data.contenido.trim()) errores.contenido = 'El contenido es obligatorio.';
        
        if (data.imagen && !data.imagen.type.startsWith('image/')) {
            errores.imagen = 'El archivo debe ser una imagen válida.';
        }

        if (Object.keys(errores).length > 0) {
            setErroresForm(errores);
            return;
        }

        post(`/admin/noticias/${noticia.id}`, { forceFormData: true });
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Head title={`Editar ${noticia.titulo}`} />
            <Header />
            <main className="pt-40 pb-20 px-6 max-w-2xl mx-auto">
                <button 
                    onClick={() => router.get('/admin/noticias')}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-8 hover:text-pink-500 transition-colors"
                >
                    <HiOutlineArrowLeft size={16} /> Ir a gestión
                </button>

                <h1 className="text-4xl font-black uppercase tracking-tighter italic text-black mb-8">
                    Editar <span className="text-pink-500">Noticia</span>
                </h1>

                <div className="bg-white p-10 rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                    <form onSubmit={enviar} className="space-y-6">
                        {/* TÍTULO */}
                        <div>
                            <label className="block text-[10px] font-black uppercase mb-2">Título</label>
                            <input 
                                type="text" 
                                value={data.titulo} 
                                onChange={e => setData('titulo', e.target.value)} 
                                className={`w-full border-2 border-black rounded-2xl p-4 font-black outline-none focus:border-pink-500 ${ErroresForm.titulo ? 'border-red-500' : ''}`} 
                            />
                        </div>

                        {/* CONTENIDO */}
                        <div>
                            <label className="block text-[10px] font-black uppercase mb-2">Contenido</label>
                            <textarea 
                                value={data.contenido} 
                                onChange={e => setData('contenido', e.target.value)} 
                                rows={6}
                                className={`w-full border-2 border-black rounded-2xl p-4 font-bold text-sm outline-none focus:border-pink-500 ${ErroresForm.contenido ? 'border-red-500' : ''}`} 
                            />
                        </div>

                        {/* IMAGEN */}
                        <div>
                            <label className="block text-[10px] font-black uppercase mb-2">Imagen (Opcional)</label>
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={e => setData('imagen', e.target.files ? e.target.files[0] : null)} 
                                className="w-full border-2 border-black rounded-2xl p-4 font-bold text-xs bg-gray-50 file:bg-black file:text-white file:rounded-lg file:px-3 file:py-1.5 cursor-pointer" 
                            />
                            <p className="text-[9px] text-gray-400 mt-2">Deja en blanco para mantener la actual.</p>
                        </div>

                        <button 
                            disabled={processing} 
                            className="w-full bg-black text-white font-black uppercase py-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 transition-all disabled:bg-gray-400"
                        >
                            {processing ? 'Actualizando...' : 'Guardar Cambios'}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}