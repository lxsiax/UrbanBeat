import { useForm, Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { HiOutlineArrowLeft, HiChevronDown } from "react-icons/hi2";

export default function Create({ dias }: { dias: any[] }) {
    const { data, setData, post, processing } = useForm({
        nombre: '',
        es_headliner: false,
        dia_id: dias[0]?.id || '',
        orden: 1,
        imagen: null as File | null,
        link_spotify: '', 
    });

    const [ErroresForm, setErroresForm] = useState<Record<string, string>>({});

    const enviar = (e: React.FormEvent) => {
        e.preventDefault();
        const errores: Record<string, string> = {};

        if (!data.nombre.trim()) {
            errores.nombre = 'El nombre del artista es obligatorio.';
        }

        if (!data.dia_id) {
            errores.dia_id = 'Debes asignar un día de festival para este artista.';
        }

        if (!data.link_spotify.trim()) {
            errores.link_spotify = 'El enlace de Spotify es obligatorio.';
        } else {
            const spotifyRegex = /^(https?:\/\/)?(open\.spotify\.com)\/[a-zA-Z0-9_\-\/]+(\?.*)?$/;
            if (!spotifyRegex.test(data.link_spotify)) {
                errores.link_spotify = 'El enlace debe ser una URL válida de Open Spotify.';
            }
        }

        if (!data.imagen) {
            errores.imagen = 'La imagen del artista es obligatoria.';
        } else {
            if (!data.imagen.type.startsWith('image/')) {
                errores.imagen = 'El archivo seleccionado debe ser una imagen válida (jpg, png, webp).';
            }
            if (data.imagen.size > 2 * 1024 * 1024) {
                errores.imagen = 'La imagen es demasiado pesada. El límite son 2MB.';
            }
        }

        if (Object.keys(errores).length > 0) {
            setErroresForm(errores);
            const primerError = Object.keys(errores)[0];
            document.getElementsByName(primerError)[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setErroresForm({});
        post('/admin/artistas', { forceFormData: true });
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Head title="Nuevo Artista" />
            <Header />
            <main className="pt-40 pb-20 px-6 max-w-2xl mx-auto">
                <button 
                    onClick={() => router.get('/admin/artistas')}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-8 hover:text-pink-500 transition-colors"
                >
                    <HiOutlineArrowLeft size={16} />
                    Ir a gestión
                </button>
                <div className="flex items-center gap-4 mb-8">
                    <h1 className="text-4xl font-black uppercase tracking-tighter italic text-black">
                        Añadir <span className="text-pink-500">Artista</span>
                    </h1>
                </div>

                <div className="bg-white p-10 rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                    <form onSubmit={enviar} className="space-y-6">
                        
                        <div>
                            <label className="block text-[10px] font-black uppercase mb-2">Nombre</label>
                            <input 
                                type="text" 
                                name="nombre"
                                value={data.nombre} 
                                onChange={e => setData('nombre', e.target.value)} 
                                className={`w-full border-2 border-black rounded-2xl p-4 font-black outline-none transition-colors focus:border-pink-500 ${ErroresForm.nombre ? 'border-red-500 bg-red-50/50' : ''}`} 
                            />
                            {ErroresForm.nombre && (
                                <p className="mt-2 border-2 border-black bg-red-400 text-black text-xs font-black p-2.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
                                    {ErroresForm.nombre}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase mb-2">Día</label>
                            <div className="relative">
                                <select 
                                    name="dia_id"
                                    value={data.dia_id} 
                                    onChange={e => setData('dia_id', e.target.value)} 
                                    className={`w-full border-2 border-black rounded-2xl p-4 font-black appearance-none bg-white outline-none focus:border-pink-500 ${ErroresForm.dia_id ? 'border-red-500 bg-red-50/50' : ''}`}
                                >
                                    {dias.map(d => (
                                        <option key={d.id} value={d.id}>
                                            {new Date(d.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' }).toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                                <HiChevronDown className="absolute right-4 top-5 pointer-events-none" size={24} />
                            </div>
                            {ErroresForm.dia_id && (
                                <p className="mt-2 border-2 border-black bg-red-400 text-black text-xs font-black p-2.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
                                    {ErroresForm.dia_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase mb-2 tracking-widest text-black">
                                Perfil de Spotify
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    name="link_spotify"
                                    value={data.link_spotify}
                                    onChange={e => setData('link_spotify', e.target.value)}
                                    placeholder="https://open.spotify.com/artist/..."
                                    className={`w-full border-2 border-black rounded-2xl p-4 font-bold text-sm outline-none focus:border-pink-500 ${ErroresForm.link_spotify ? 'border-red-500 bg-red-50/50' : ''}`}
                                />
                            </div>
                            {ErroresForm.link_spotify && (
                                <p className="mt-2 border-2 border-black bg-red-400 text-black text-xs font-black p-2.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
                                    {ErroresForm.link_spotify}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase mb-2">Imagen</label>
                            <input 
                                type="file" 
                                name="imagen"
                                accept="image/*"
                                onChange={e => setData('imagen', e.target.files ? e.target.files[0] : null)} 
                                className={`w-full border-2 border-black rounded-2xl p-4 font-bold text-xs bg-gray-50 file:bg-black file:text-white file:rounded-lg file:font-black file:uppercase file:px-3 file:py-1.5 file:border-none file:mr-4 cursor-pointer file:cursor-pointer ${ErroresForm.imagen ? 'border-red-500 bg-red-50/50' : ''}`} 
                            />
                            {ErroresForm.imagen && (
                                <p className="mt-2 border-2 border-black bg-red-400 text-black text-xs font-black p-2.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
                                    {ErroresForm.imagen}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase mb-2 tracking-widest text-gray-500">
                                Orden en el cartel (Opcional)
                            </label>
                            <input
                                type="number"
                                value={data.orden}
                                onChange={e => setData('orden', Number(e.target.value))}
                                placeholder="Ej: 1"
                                className="w-full border-2 border-black rounded-2xl p-4 font-black text-xl outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all"
                            />
                            <p className="text-[9px] font-bold text-gray-400 mt-2 uppercase">
                                Por defecto se añade al final
                            </p>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border-2 border-black border-dashed">
                            <input 
                                type="checkbox" 
                                id="hl" 
                                checked={data.es_headliner} 
                                onChange={e => setData('es_headliner', e.target.checked)} 
                                className="w-6 h-6 border-2 border-black text-pink-500 rounded cursor-pointer accent-black" 
                            />
                            <label htmlFor="hl" className="font-black uppercase italic text-sm cursor-pointer select-none">¿Es Headliner?</label>
                        </div>

                        <button 
                            disabled={processing} 
                            className="w-full bg-black text-white font-black uppercase py-5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:bg-gray-400 disabled:shadow-none transition-all"
                        >
                            {processing ? 'Guardando...' : 'Crear Artista'}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}