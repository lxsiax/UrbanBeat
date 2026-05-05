import { useForm, Head, router } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { HiOutlineArrowLeft } from "react-icons/hi2";

interface Props {
    entrada: any;
}

export default function Edit({ entrada }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        precio: entrada.precio,
        stock: entrada.stock,
    });

    const enviar = (e: React.FormEvent) => {
        e.preventDefault();
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
                        onClick={() => router.get('/admin/entradas')}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-8 hover:text-pink-500 transition-colors"
                    >
                        <HiOutlineArrowLeft size={16} />
                        Volver a gestión
                    </button>

                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-black mb-12">
                        Editar <span className="text-pink-500">Entrada</span>
                    </h1>

                    <div className="bg-white p-10 rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                        <div className="mb-8">
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Tipo de entrada</p>
                            <p className="text-2xl font-black uppercase italic">{entrada.tipo_entrada?.nombre}</p>
                            <p className="text-sm font-bold text-pink-500 uppercase">{entrada.zona?.nombre}</p>
                        </div>

                        <form onSubmit={enviar} className="space-y-6">

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
                                    value={data.stock} 
                                    onChange={e => setData('stock', e.target.value)}
                                    className={`w-full border-2 border-black rounded-2xl p-4 font-black text-xl outline-none focus:ring-4 focus:ring-pink-500/20 transition-all ${errors.stock ? 'border-red-500' : 'focus:border-pink-500'}`}
                                />
                                {errors.stock && <p className="text-red-500 text-xs mt-2 font-bold uppercase">{errors.stock}</p>}
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