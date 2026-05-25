import Footer from '@/components/festival/Footer';
import Header from '@/components/festival/Header';
import { useForm, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { HiOutlineArrowLeft, HiChevronDown } from 'react-icons/hi2';

interface TipoEntrada {
    id: number | string;
    nombre: string;
}

interface Zona {
    id: number | string;
    nombre: string;
}

interface CreateProps {
    tipos: TipoEntrada[];
    zonas: Zona[];
}

type FormFields = {
    tipo_entrada_id: string;
    zona_id: string;
    precio: string;
    stock: string;
    esta_oculta: boolean;
};

export default function Create({ tipos, zonas }: CreateProps) {
    const { data, setData, post, processing, errors: serverErrors, setError, clearErrors } = useForm<FormFields>({
        tipo_entrada_id: '',
        zona_id: '',
        precio: '',
        stock: '',
        esta_oculta: false,
    });

    const [clientErrors, setClientErrors] = useState<Partial<Record<keyof FormFields, string>>>({});

    const validarFormulario = (): boolean => {
        const nuevosErrores: Partial<Record<keyof FormFields, string>> = {};
        clearErrors();

        if (!data.tipo_entrada_id) {
            nuevosErrores.tipo_entrada_id = 'El tipo de entrada es obligatorio.';
        }
        if (!data.zona_id) {
            nuevosErrores.zona_id = 'La zona de la entrada es obligatoria.';
        }
        if (!data.precio || parseFloat(data.precio) <= 0) {
            nuevosErrores.precio = 'El precio debe ser un número mayor que 0.';
        }
        if (!data.stock || parseInt(data.stock, 10) < 0) {
            nuevosErrores.stock = 'El stock debe ser un número.';
        }

        setClientErrors(nuevosErrores);

        const keys = Object.keys(nuevosErrores) as Array<keyof FormFields>;
        if (keys.length > 0) {
            keys.forEach((key) => {
                const mensaje = nuevosErrores[key];
                if (mensaje) {
                    setError(key, mensaje);
                }
            });
            return false;
        }

        return true;
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validarFormulario()) {
            post('/admin/entradas');
        }
    };

    const handleCambio = (campo: keyof FormFields, valor: any) => {
        setData(campo, valor);
        if (clientErrors[campo] || serverErrors[campo]) {
            setClientErrors(prev => {
                const copia = { ...prev };
                delete copia[campo];
                return copia;
            });
            clearErrors(campo);
        }
    };

    const errorTipo = clientErrors.tipo_entrada_id || serverErrors.tipo_entrada_id;
    const errorZona = clientErrors.zona_id || serverErrors.zona_id;
    const errorPrecio = clientErrors.precio || serverErrors.precio;
    const errorStock = clientErrors.stock || serverErrors.stock;

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

                <form 
                    onSubmit={submit} 
                    noValidate 
                    className="space-y-6 bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
                >
                    <div className="group">
                        <label className="block text-[10px] font-black uppercase mb-2 ml-1 text-gray-400 group-focus-within:text-pink-500 transition-colors">
                            Tipo y fecha de la entrada
                        </label>
                        <div className="relative">
                            <select
                                className={`w-full border-2 rounded-2xl p-4 pr-12 outline-none transition-all appearance-none bg-no-repeat bg-[right_1.5rem_center] font-medium ${errorTipo ? 'border-red-500' : 'border-gray-100 focus:border-pink-500 bg-gray-50 focus:bg-white'}`}
                                value={data.tipo_entrada_id}
                                onChange={e => handleCambio('tipo_entrada_id', e.target.value)}
                            >
                                <option value="">Selecciona entrada</option>
                                {tipos && tipos.length > 0 ? (
                                    tipos.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.nombre.toUpperCase()}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>No hay tipos de entrada disponibles</option>
                                )}
                            </select>
                            <HiChevronDown className="absolute right-4 top-5 pointer-events-none text-gray-400 group-focus-within:text-pink-500 transition-colors" size={20} />
                        </div>
                        {errorTipo && (
                            <div className="text-red-500 text-[10px] font-black mt-2 ml-1 uppercase italic tracking-wildest">
                                {errorTipo}
                            </div>
                        )}
                    </div>

                    <div className="group">
                        <label className="block text-[10px] font-black uppercase mb-2 ml-1 text-gray-400 group-focus-within:text-pink-500 transition-colors">
                            Zona de la entrada
                        </label>
                        <div className="relative">
                            <select
                                className={`w-full border-2 rounded-2xl p-4 pr-12 outline-none transition-all appearance-none font-medium ${errorZona ? 'border-red-500' : 'border-gray-100 focus:border-pink-500 bg-gray-50 focus:bg-white'}`}
                                value={data.zona_id}
                                onChange={e => handleCambio('zona_id', e.target.value)}
                            >
                                <option value="">Selecciona una zona...</option>
                                {zonas.map((z) => (
                                    <option key={z.id} value={z.id}>{z.nombre.toUpperCase()}</option>
                                ))}
                            </select>
                            <HiChevronDown className="absolute right-4 top-5 pointer-events-none text-gray-400 group-focus-within:text-pink-500 transition-colors" size={20} />
                        </div>
                        {errorZona && (
                            <div className="text-red-500 text-[10px] font-black mt-2 ml-1 uppercase italic tracking-wildest">
                                {errorZona}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="group">
                            <label className="block text-[10px] font-black uppercase mb-2 ml-1 text-gray-400 group-focus-within:text-pink-500 transition-colors">
                                Precio (€)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className={`w-full border-2 bg-gray-50 focus:bg-white rounded-2xl p-4 focus:border-pink-500 outline-none transition-all font-bold text-lg ${errorPrecio ? 'border-red-500' : 'border-gray-100'}`}
                                value={data.precio}
                                onChange={e => handleCambio('precio', e.target.value)}
                            />
                            {errorPrecio && <div className="text-red-500 text-[10px] font-black mt-2 ml-1 uppercase italic">{errorPrecio}</div>}
                        </div>
                        
                        <div className="group">
                            <label className="block text-[10px] font-black uppercase mb-2 ml-1 text-gray-400 group-focus-within:text-pink-500 transition-colors">
                                Stock disponible
                            </label>
                            <input
                                type="number"
                                placeholder="0"
                                className={`w-full border-2 bg-gray-50 focus:bg-white rounded-2xl p-4 focus:border-pink-500 outline-none transition-all font-bold text-lg ${errorStock ? 'border-red-500' : 'border-gray-100'}`}
                                value={data.stock}
                                onChange={e => handleCambio('stock', e.target.value)}
                            />
                            {errorStock && <div className="text-red-500 text-[10px] font-black mt-2 ml-1 uppercase italic">{errorStock}</div>}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-black rounded-2xl transition-all hover:bg-zinc-900 shadow-xl group">
                        <div className="relative flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                id="esta_oculta"
                                className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-white/20 transition-all checked:border-pink-500 checked:bg-pink-500"
                                checked={data.esta_oculta}
                                onChange={e => handleCambio('esta_oculta', e.target.checked)}
                            />
                            <svg className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 top-1 left-1 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                        <label htmlFor="esta_oculta" className="text-[11px] font-black uppercase cursor-pointer select-none text-white tracking-widest">
                            Ocultar para el cliente
                        </label>
                    </div>

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