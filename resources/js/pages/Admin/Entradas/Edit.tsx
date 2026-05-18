import { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { HiOutlineArrowLeft } from "react-icons/hi2";

interface Props {
    entrada: any;
    tipos: any[];
    zonas: any[];
}

export default function Edit({ entrada, tipos, zonas }: Props) {
    const { data, setData, patch, processing, errors, setError, clearErrors } = useForm({
        tipo_entrada_id: entrada.tipo_entrada_id || '',
        zona_id: entrada.zona_id || '',
        precio: entrada.precio || '',
        stock: entrada.stock || '',
    });

    const enviar = (e: React.FormEvent) => {
        e.preventDefault();
        
        clearErrors();
        let tieneErrores = false;

        if (!data.tipo_entrada_id) {
            setError('tipo_entrada_id', 'Debes seleccionar un tipo de entrada.');
            tieneErrores = true;
        }
        if (!data.zona_id) {
            setError('zona_id', 'Debes seleccionar una zona para la entrada.');
            tieneErrores = true;
        }

        const precioNumerico = Number(data.precio);
        const stockNumerico = Number(data.stock);

        if (!data.precio && data.precio !== 0) {
            setError('precio', 'El precio es obligatorio.');
            tieneErrores = true;
        } else if (isNaN(precioNumerico) || precioNumerico <= 0) {
            setError('precio', 'El precio debe ser un número mayor que 0.');
            tieneErrores = true;
        }

        if (!data.stock && data.stock !== 0) {
            setError('stock', 'El stock es obligatorio.');
            tieneErrores = true;
        } else if (isNaN(stockNumerico) || stockNumerico < 0 || !Number.isInteger(stockNumerico)) {
            setError('stock', 'El stock debe ser un número entero mayor o igual a 0.');
            tieneErrores = true;
        }

        if (tieneErrores) return;

        patch(`/admin/entradas/${entrada.id}`, {
            preserveScroll: true,
            onSuccess: () => console.log("Actualizado con éxito")
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title={`Editar - ${entrada.tipo_entrada?.nombre}`} />
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
                        Editar <span className="text-pink-500">Entrada</span>
                    </h1>

                    <div className="bg-white p-10 rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                        
                        <form onSubmit={enviar} className="space-y-6">

                            <div className="group">
                                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest text-gray-400 group-focus-within:text-pink-500 transition-colors">
                                    Tipo y fecha de la entrada
                                </label>
                                <select
                                    required
                                    className={`w-full border-2 rounded-2xl p-4 font-bold outline-none transition-all appearance-none bg-gray-50 focus:bg-white ${errors.tipo_entrada_id ? 'border-red-500' : 'border-black focus:border-pink-500'}`}
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
                                    <p className="text-red-500 text-xs mt-2 font-bold uppercase">{errors.tipo_entrada_id}</p>
                                )}
                            </div>

                            <div className="group">
                                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest text-gray-400 group-focus-within:text-pink-500 transition-colors">
                                    Zona de la entrada
                                </label>
                                <select
                                    required
                                    className={`w-full border-2 rounded-2xl p-4 font-bold outline-none transition-all appearance-none bg-gray-50 focus:bg-white ${errors.zona_id ? 'border-red-500' : 'border-black focus:border-pink-500'}`}
                                    value={data.zona_id}
                                    onChange={e => setData('zona_id', e.target.value)}
                                >
                                    <option value="">Selecciona una zona...</option>
                                    {zonas.map((z: any) => (
                                        <option key={z.id} value={z.id}>
                                            {z.nombre.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                                {errors.zona_id && (
                                    <p className="text-red-500 text-xs mt-2 font-bold uppercase">{errors.zona_id}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase mb-2 tracking-widest">Precio (€)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.precio}
                                        onChange={e => setData('precio', e.target.value)}
                                        className={`w-full border-2 border-black rounded-2xl p-4 font-black text-xl outline-none focus:ring-4 focus:ring-pink-500/20 transition-all ${errors.precio ? 'border-red-500' : 'focus:border-pink-500'}`}
                                    />
                                    {errors.precio && <p className="text-red-500 text-xs mt-2 font-bold uppercase">{errors.precio}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase mb-2 tracking-widest">Stock Disponible</label>
                                    <input
                                        type="number"
                                        step="1"
                                        value={data.stock}
                                        onChange={e => setData('stock', e.target.value)}
                                        className={`w-full border-2 border-black rounded-2xl p-4 font-black text-xl outline-none focus:ring-4 focus:ring-pink-500/20 transition-all ${errors.stock ? 'border-red-500' : 'focus:border-pink-500'}`}
                                    />
                                    {errors.stock && <p className="text-red-500 text-xs mt-2 font-bold uppercase">{errors.stock}</p>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-black text-white font-black uppercase py-5 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all disabled:opacity-50"
                            >
                                {processing ? 'Guardando cambios...' : 'Actualizar Entrada'}
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}