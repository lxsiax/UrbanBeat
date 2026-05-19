import { useForm, Head } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { HiOutlineArrowLeft, HiChevronDown, HiArrowTopRightOnSquare } from "react-icons/hi2";

interface Props {
    artista: any;
    dias: any[];
}

export default function Edit({ artista, dias }: Props) {
    const { data, setData, post, processing } = useForm({
        nombre: artista.nombre || '',
        es_headliner: !!artista.es_headliner,
        dia_id: artista.dia_id || '',
        orden: artista.orden || 1,
        imagen: null as File | null,
        link_spotify: artista.link_spotify || '',
        _method: 'PATCH',
    });

    const [frontErrors, setFrontErrors] = useState<Record<string, string>>({});

    const enviar = (e: React.FormEvent) => {
        e.preventDefault();
        const errores: Record<string, string> = {};

        if (!data.nombre.trim()) {
            errores.nombre = 'El nombre del artista es obligatorio.';
        }

        if (!data.dia_id) {
            errores.dia_id = 'Debes asignar un día de festival para este artista.';
        }

        if (data.imagen) {
            if (!data.imagen.type.startsWith('image/')) {
                errores.imagen = 'El archivo seleccionado debe ser una imagen válida (jpg, png, webp).';
            }
            if (data.imagen.size > 2 * 1024 * 1024) {
                errores.imagen = 'La imagen es demasiado pesada. El límite son 2MB.';
            }
        }

        if (!data.link_spotify.trim()) {
            errores.link_spotify = 'El enlace de Spotify es obligatorio.';
        } else {
            const spotifyRegex = /^(https?:\/\/)?(open\.spotify\.com)\/[a-zA-Z0-9_\-\/]+(\?.*)?$/;
            if (!spotifyRegex.test(data.link_spotify)) {
                errores.link_spotify = 'El enlace debe ser una URL válida de Open Spotify.';
            }
        }

        if (Object.keys(errores).length > 0) {
            setFrontErrors(errores);
            const primerError = Object.keys(errores)[0];
            document.getElementsByName(primerError)[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setFrontErrors({});
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
                        type="button"
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-8 hover:text-pink-500 transition-colors"
                    >
                        <HiOutlineArrowLeft size={16} />
                        Volver atrás
                    </button>

                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-black mb-12">
                        Editar <span className="text-pink-500">Artista</span>
                    </h1>

                    <div className="bg-white p-10 rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">

                        <form onSubmit={enviar} className="space-y-6">

                            <div>
                                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest">Nombre del Artista</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={data.nombre}
                                    onChange={e => setData('nombre', e.target.value)}
                                    className={`w-full border-2 border-black rounded-2xl p-4 font-black text-xl outline-none focus:ring-4 focus:ring-pink-500/20 transition-all ${frontErrors.nombre ? 'border-red-500 bg-red-50/50' : 'focus:border-pink-500'}`}
                                />
                                {frontErrors.nombre && (
                                    <p className="mt-2 border-2 border-black bg-red-400 text-black text-xs font-black p-2.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
                                        {frontErrors.nombre}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest">Día de actuación</label>
                                <div className="relative">
                                    <select
                                        name="dia_id"
                                        value={data.dia_id}
                                        onChange={e => setData('dia_id', e.target.value)}
                                        className={`w-full border-2 border-black rounded-2xl p-4 font-black text-xl outline-none appearance-none bg-white cursor-pointer ${frontErrors.dia_id ? 'border-red-500 bg-red-50/50' : 'focus:border-pink-500'}`}
                                    >
                                        {dias.map((d) => (
                                            <option key={d.id} value={d.id}>
                                                {new Date(d.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' }).toUpperCase()}
                                            </option>
                                        ))}
                                    </select>
                                    <HiChevronDown className="absolute right-4 top-5 pointer-events-none" size={24} />
                                </div>
                                {frontErrors.dia_id && (
                                    <p className="mt-2 border-2 border-black bg-red-400 text-black text-xs font-black p-2.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
                                        {frontErrors.dia_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest">Perfil de Spotify</label>
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        name="link_spotify"
                                        value={data.link_spotify}
                                        onChange={e => setData('link_spotify', e.target.value)}
                                        placeholder="https://open.spotify.com/artist/..."
                                        className={`w-full border-2 border-black rounded-2xl p-4 pr-12 font-bold text-sm outline-none focus:ring-4 focus:ring-pink-500/20 transition-all ${frontErrors.link_spotify ? 'border-red-500 bg-red-50/50' : 'focus:border-pink-500'}`}
                                    />
                                    <HiArrowTopRightOnSquare className="absolute right-4 text-gray-400" size={20} />
                                </div>
                                {frontErrors.link_spotify && (
                                    <p className="mt-2 border-2 border-black bg-red-400 text-black text-xs font-black p-2.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
                                        {frontErrors.link_spotify}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest">Cambiar Imagen</label>
                                <input
                                    type="file"
                                    name="imagen"
                                    accept="image/*"
                                    onChange={e => setData('imagen', e.target.files ? e.target.files[0] : null)}
                                    className={`w-full border-2 border-black rounded-2xl p-4 font-bold text-sm outline-none bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:uppercase file:bg-black file:text-white hover:file:bg-pink-500 cursor-pointer ${frontErrors.imagen ? 'border-red-500 bg-red-50/50' : ''}`}
                                />
                                {frontErrors.imagen && (
                                    <p className="mt-2 border-2 border-black bg-red-400 text-black text-xs font-black p-2.5 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
                                        {frontErrors.imagen}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest">Orden en el Cartel</label>
                                <input
                                    type="number"
                                    value={data.orden}
                                    onChange={e => setData('orden', Number(e.target.value))}
                                    className="w-full border-2 border-black rounded-2xl p-4 font-black text-xl outline-none focus:border-pink-500"
                                />
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border-2 border-black border-dashed">
                                <input
                                    type="checkbox"
                                    id="headliner"
                                    checked={data.es_headliner}
                                    onChange={e => setData('es_headliner', e.target.checked)}
                                    className="w-5 h-5 border-2 border-black rounded text-pink-500 focus:ring-0 cursor-pointer accent-black"
                                />
                                <label htmlFor="headliner" className="font-black uppercase italic text-sm cursor-pointer select-none">
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