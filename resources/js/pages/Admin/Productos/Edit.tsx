import { useForm, Head, router } from '@inertiajs/react';
import Header from '@/components/festival/Header';
import Footer from '@/components/festival/Footer';
import { HiOutlineArrowLeft } from "react-icons/hi2";

interface Talla {
    id: number;
    nombre: string;
    pivot?: {
        stock: number;
    };
}

interface Producto {
    id: number;
    nombre: string;
    descripcion: string; // Añadido
    precio: number;
    categoria: string;   // Añadido
    esta_oculto: boolean;
    imagen_url: string | null;
    tallas: Talla[];
}

interface Props {
    producto: Producto;
    todaslasTallas: Talla[];
}

export default function Edit({ producto, todaslasTallas }: Props) {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        nombre: producto.nombre,
        descripcion: producto.descripcion ?? '', // Añadido
        precio: producto.precio,
        categoria: producto.categoria ?? 'ropa', // Añadido
        esta_oculto: !!producto.esta_oculto,
        imagen: null as File | null,
        _method: 'PATCH',
        stocks: todaslasTallas.reduce((acc, t) => {
            const tallaDelProducto = producto.tallas.find(pt => pt.id === t.id);
            acc[t.id] = tallaDelProducto?.pivot?.stock ?? 0;
            return acc;
        }, {} as Record<number, number>)
    });

    const validarFormulario = (): boolean => {
        let valido = true;
        clearErrors();

        if (!data.nombre.trim()) {
            setError('nombre', 'El nombre del producto es obligatorio.');
            valido = false;
        } else if (data.nombre.length < 3) {
            setError('nombre', 'El nombre debe tener al menos 3 caracteres.');
            valido = false;
        }

        if (!data.descripcion.trim()) {
            setError('descripcion', 'La descripción es obligatoria.');
            valido = false;
        }

        if (!data.precio && data.precio !== 0) {
            setError('precio', 'El precio es obligatorio.');
            valido = false;
        } else if (data.precio <= 0) {
            setError('precio', 'El precio debe ser un número mayor que 0.');
            valido = false;
        }

        if (!data.categoria) {
            setError('categoria', 'La categoría es obligatoria.');
            valido = false;
        }

        if (data.imagen) {
            const formatosPermitidos = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
            if (!formatosPermitidos.includes(data.imagen.type)) {
                setError('imagen', 'La imagen debe ser un formató válido (JPG, PNG, JPEG, WEBP).');
                valido = false;
            } else if (data.imagen.size > 2 * 1024 * 1024) {
                setError('imagen', 'La imagen no puede pesar más de 2MB.');
                valido = false;
            }
        }

        return valido;
    };

    const enviar = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        post(`/admin/productos/${producto.id}`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Head title={`Editar - ${producto.nombre}`} />
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
                        Editar <span className="text-pink-500">Producto</span>
                    </h1>

                    <div className="bg-white p-10 rounded-[30px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                        <form onSubmit={enviar} className="space-y-6" noValidate>
                            <div>
                                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest">Nombre del Producto</label>
                                <input
                                    type="text"
                                    value={data.nombre}
                                    onChange={e => setData('nombre', e.target.value)}
                                    className={`w-full border-2 border-black rounded-2xl p-4 font-black text-xl outline-none focus:ring-4 focus:ring-pink-500/20 transition-all ${errors.nombre ? 'border-red-500 bg-red-50' : 'focus:border-pink-500'}`}
                                    required
                                />
                                {errors.nombre && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-wider">{errors.nombre}</p>}
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest">Categoría</label>
                                <select
                                    value={data.categoria}
                                    onChange={e => setData('categoria', e.target.value)}
                                    className={`w-full border-2 border-black rounded-2xl p-4 font-black text-xl outline-none bg-white cursor-pointer focus:ring-4 focus:ring-pink-500/20 transition-all ${errors.categoria ? 'border-red-500 bg-red-50' : 'focus:border-pink-500'}`}
                                    required
                                >
                                    <option value="ropa">Ropa</option>
                                    <option value="accesorio">Accesorio</option>
                                </select>
                                {errors.categoria && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-wider">{errors.categoria}</p>}
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest">Descripción</label>
                                <textarea
                                    value={data.descripcion}
                                    onChange={e => setData('descripcion', e.target.value)}
                                    rows={4}
                                    className={`w-full border-2 border-black rounded-2xl p-4 font-bold text-lg outline-none resize-none focus:ring-4 focus:ring-pink-500/20 transition-all ${errors.descripcion ? 'border-red-500 bg-red-50' : 'focus:border-pink-500'}`}
                                    required
                                />
                                {errors.descripcion && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-wider">{errors.descripcion}</p>}
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest">Precio (€)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    value={data.precio}
                                    onChange={e => setData('precio', parseFloat(e.target.value) || 0)}
                                    className={`w-full border-2 border-black rounded-2xl p-4 font-black text-xl outline-none focus:ring-4 focus:ring-pink-500/20 transition-all ${errors.precio ? 'border-red-500 bg-red-50' : 'focus:border-pink-500'}`}
                                    required
                                />
                                {errors.precio && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-wider">{errors.precio}</p>}
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase mb-2 tracking-widest">Cambiar Imagen</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setData('imagen', e.target.files ? e.target.files[0] : null)}
                                    className={`w-full border-2 border-black rounded-2xl p-4 font-bold text-sm outline-none bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:uppercase file:bg-black file:text-white hover:file:bg-pink-500 cursor-pointer ${errors.imagen ? 'border-red-500 bg-red-50' : ''}`}
                                />
                                {errors.imagen && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-wider">{errors.imagen}</p>}
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase mb-3 tracking-widest">Control de Stock por Tallas</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {todaslasTallas.map((talla) => (
                                        <div key={talla.id} className="border-2 border-black rounded-2xl p-3 bg-gray-50 text-center">
                                            <span className="block font-black text-xs uppercase text-gray-400 mb-1">{talla.nombre}</span>
                                            <input
                                                type="number"
                                                min="0"
                                                value={data.stocks[talla.id] ?? 0}
                                                onChange={e => setData('stocks', { ...data.stocks, [talla.id]: Math.max(0, parseInt(e.target.value) || 0) })}
                                                className="w-full border-2 border-black rounded-xl p-2 font-black text-center text-lg outline-none focus:border-pink-500 bg-white"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border-2 border-black border-dashed">
                                <input
                                    type="checkbox"
                                    id="esta_oculto"
                                    checked={data.esta_oculto}
                                    onChange={e => setData('esta_oculto', e.target.checked)}
                                    className="w-5 h-5 border-2 border-black rounded text-pink-500 focus:ring-0 cursor-pointer"
                                />
                                <label htmlFor="esta_oculto" className="font-black uppercase italic text-sm cursor-pointer">
                                    Ocultar este producto al público
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-black text-white font-black uppercase py-5 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all disabled:opacity-50"
                            >
                                {processing ? 'Guardando...' : 'Actualizar Producto'}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}