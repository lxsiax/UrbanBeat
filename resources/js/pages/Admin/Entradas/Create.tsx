import Footer from '@/components/festival/Footer';
import Header from '@/components/festival/Header';
import { useForm, Link, router } from '@inertiajs/react';
import { HiOutlineArrowLeft } from 'react-icons/hi2';

export default function Create({ tipos, zonas }: any) {
    const { data, setData, post, processing, errors } = useForm({
        tipo_entrada_id: '',
        zona_id: '',
        precio: '',
        stock: '',
        esta_oculta: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/entradas');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-2xl mt-12 mx-auto pt-32 pb-20 px-6">
                <button
                    onClick={() => router.get('/admin/entradas')}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-8 hover:text-pink-500 transition-colors"
                >
                    <HiOutlineArrowLeft size={16} />
                    Volver a gestión
                </button>
                <div className="flex items-center gap-4 mb-8">
                    <h1 className="text-4xl font-black uppercase tracking-tighter italic text-black">
                        Añadir <span className="text-pink-500">Entrada</span>
                    </h1>
                </div>

                <form onSubmit={submit} className="space-y-6 bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">

                    <div className="group">
                        <label className="block text-[10px] font-black uppercase mb-2 ml-1 text-gray-400 group-focus-within:text-pink-500 transition-colors">
                            Tipo y fecha de la entrada
                        </label>
                        <select
                            required
                            className={`w-full border-2 rounded-2xl p-4 outline-none transition-all appearance-none bg-no-repeat bg-[right_1.5rem_center] ${errors.tipo_entrada_id ? 'border-red-500' : 'border-gray-100 focus:border-pink-500 bg-gray-50 focus:bg-white'}`}
                            value={data.tipo_entrada_id}
                            onChange={e => setData('tipo_entrada_id', e.target.value)}
                        >
                            <option value="">Selecciona entrada</option>
                            {tipos.map((t: any) => (
                                <option key={t.id} value={t.id}>
                                    {t.nombre.toUpperCase()}
                                </option>
                            ))}
                        </select>
                        {errors.tipo_entrada_id && (
                            <div className="text-red-500 text-[10px] font-black mt-2 ml-1 uppercase italic tracking-widest">
                                {errors.tipo_entrada_id}
                            </div>
                        )}
                    </div>

                    <div className="group">
                        <label className="block text-[10px] font-black uppercase mb-2 ml-1 text-gray-400 group-focus-within:text-pink-500 transition-colors">
                            Zona de la entrada
                        </label>
                        <select
                            required
                            className={`w-full border-2 rounded-2xl p-4 outline-none transition-all appearance-none ${errors.zona_id ? 'border-red-500' : 'border-gray-100 focus:border-pink-500 bg-gray-50 focus:bg-white'}`}
                            value={data.zona_id}
                            onChange={e => setData('zona_id', e.target.value)}
                        >
                            <option value="">Selecciona una zona...</option>
                            {zonas.map((z: any) => (
                                <option key={z.id} value={z.id}>{z.nombre.toUpperCase()}</option>
                            ))}
                        </select>
                        {errors.zona_id && (
                            <div className="text-red-500 text-[10px] font-black mt-2 ml-1 uppercase italic tracking-widest">
                                {errors.zona_id}
                            </div>
                        )}
                    </div>

                    {/* Precio y Stock */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="group">
                            <label className="block text-[10px] font-black uppercase mb-2 ml-1 text-gray-400 group-focus-within:text-pink-500 transition-colors">
                                Precio (€)
                            </label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                className="w-full border-2 border-gray-100 bg-gray-50 focus:bg-white rounded-2xl p-4 focus:border-pink-500 outline-none transition-all font-bold text-lg"
                                value={data.precio}
                                onChange={e => setData('precio', e.target.value)}
                            />
                            {errors.precio && <div className="text-red-500 text-[10px] font-black mt-2 ml-1 uppercase italic">{errors.precio}</div>}
                        </div>
                        <div className="group">
                            <label className="block text-[10px] font-black uppercase mb-2 ml-1 text-gray-400 group-focus-within:text-pink-500 transition-colors">
                                Stock disponible
                            </label>
                            <input
                                required
                                type="number"
                                min="0"
                                placeholder="0"
                                className="w-full border-2 border-gray-100 bg-gray-50 focus:bg-white rounded-2xl p-4 focus:border-pink-500 outline-none transition-all font-bold text-lg"
                                value={data.stock}
                                onChange={e => setData('stock', e.target.value)}
                            />
                            {errors.stock && <div className="text-red-500 text-[10px] font-black mt-2 ml-1 uppercase italic">{errors.stock}</div>}
                        </div>
                    </div>

                    {/* Visibilidad */}
                    <div className="flex items-center gap-4 p-4 bg-black rounded-2xl transition-all hover:bg-zinc-900 shadow-xl group">
                        <div className="relative flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                id="esta_oculta"
                                className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-white/20 transition-all checked:border-pink-500 checked:bg-pink-500"
                                checked={data.esta_oculta}
                                onChange={e => setData('esta_oculta', e.target.checked)}
                            />
                            <svg className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 top-1 left-1 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <label htmlFor="esta_oculta" className="text-[11px] font-black uppercase cursor-pointer select-none text-white tracking-widest">
                            Ocultar para el cliente
                        </label>
                    </div>

                    {/* Botones */}
                    <div className="pt-8 flex flex-col sm:flex-row items-center gap-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full sm:w-auto bg-pink-500 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-black transition-all shadow-[0_10px_30px_rgba(236,72,153,0.3)] active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {processing ? 'Procesando...' : 'Añadir entrada'}
                        </button>

                        <Link
                            href="/admin/entradas"
                            className="text-[11px] font-black uppercase text-gray-400 hover:text-black transition-colors tracking-widest py-2"
                        >
                            Volver
                        </Link>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}