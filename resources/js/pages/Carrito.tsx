import { useEffect, useState } from 'react';
import Footer from '@/components/festival/Footer';
import Header from '@/components/festival/Header';
import ArticuloCarritoFila from '@/components/festival/ArticuloCarritoFila';
import PanelPago from '@/components/festival/PanelPago';
import FormularioAsistentes from '@/components/festival/FormularioAsistentes';
import { Head, Link, useForm, router } from '@inertiajs/react';

interface ArticuloCarrito {
    id: number;
    carrito_id: string;
    tipo: 'entrada' | 'merchandising';
    nombre: string;
    detalle: string;
    precio: number;
    cantidad: number;
    imagen: string | null;
}

interface AsistenteData {
    entrada_id: number;
    nombre: string;
    dni: string;
    email: string;
    numero: string; 
}

interface CompradorData {
    nombre: string;
    apellidos: string;
    dni: string;
    telefono: string;
    email: string;
    direccion: string;
}

interface Props {
    usuario: any;
    articulos: ArticuloCarrito[];
    total: number;
}

export default function Carrito({ usuario, articulos = [], total = 0 }: Props) {
    const { delete: destroy } = useForm();
    
    const [asistentes, setAsistentes] = useState<AsistenteData[]>([]);
    const [erroresAsistentes, setErroresAsistentes] = useState<Record<string, string>>({});

    const userId = usuario?.id || 'guest';
    const SESSION_KEY = `urbanbeat_comprador_user_${userId}`;

    const [comprador, setComprador] = useState<CompradorData>(() => {
        const guardado = sessionStorage.getItem(SESSION_KEY);
        return guardado ? JSON.parse(guardado) : { 
            nombre: usuario?.name || '', 
            apellidos: usuario?.apellidos || '', 
            dni: usuario?.dni || '', 
            telefono: usuario?.telefono || '', 
            email: usuario?.email || '', 
            direccion: usuario?.direccion || '' 
        };
    });

    useEffect(() => {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(comprador));
    }, [comprador, SESSION_KEY]);

    useEffect(() => {
        const nuevosAsistentes: AsistenteData[] = [];
        
        articulos.forEach(articulo => {
            if (articulo.tipo === 'entrada') {
                for (let i = 0; i < articulo.cantidad; i++) {
                    nuevosAsistentes.push({
                        entrada_id: articulo.id,
                        nombre: '',
                        dni: '',
                        email: '',
                        numero: '' 
                    });
                }
            }
        });

        setAsistentes(nuevosAsistentes);
        setErroresAsistentes({});
    }, [articulos]);

    const handleCcangeAsistente = (index: number, campo: keyof AsistenteData, valor: string) => {
        const copia = [...asistentes];
        copia[index] = {
            ...copia[index],
            [campo]: valor
        };
        setAsistentes(copia);
        
        if (erroresAsistentes[`asistentes.${index}.${campo}`]) {
            const nuevosErrores = { ...erroresAsistentes };
            delete nuevosErrores[`asistentes.${index}.${campo}`];
            setErroresAsistentes(nuevosErrores);
        }
    };

    const actualizarCantidad = (carritoId: string, nuevaCantidad: number) => {
        if (nuevaCantidad < 1) return;
        router.post(`/carrito/actualizar/${carritoId}`,
            { cantidad: nuevaCantidad },
            { preserveScroll: true }
        );
    };

    const eliminarArticulo = (carritoId: string) => {
        destroy(`/carrito/eliminar/${carritoId}`, {
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen bg-[#fcfcfc] text-black font-sans antialiased">
            <Head title="Tu Carrito — UrbanBeat" />
            <Header />

            <main className="max-w-6xl mx-auto pt-44 pb-32 px-8">
                <header className="relative mb-13">
                    <span className="absolute -top-8 left-0 text-pink-500 font-black text-6xl opacity-9 italic select-none tracking-tighter uppercase">
                        Tu carrito
                    </span>
                    <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter italic leading-none relative z-10">
                        TU <span className="text-pink-500">CARRITO</span>
                    </h1>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mt-6 ml-1">
                        Artículos que has añadido al carrito
                    </p>
                </header>

                {articulos.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        
                        <div className="flex-[1.5] w-full space-y-12">
                            <div className="divide-y-2 divide-black">
                                {articulos.map((articulo) => (
                                    <ArticuloCarritoFila 
                                        key={articulo.carrito_id}
                                        articulo={articulo}
                                        onActualizarCantidad={actualizarCantidad}
                                        onEliminarArticulo={eliminarArticulo}
                                    />
                                ))}
                            </div>

                            <div className="bg-white p-6 rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
                                <h3 className="text-xl font-black uppercase italic text-pink-500">Datos de Envío y Comprador</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase mb-1">Nombre</label>
                                        <input type="text" value={comprador.nombre} onChange={e => setComprador({...comprador, nombre: e.target.value})} className="w-full p-3 border-2 border-black rounded-xl" />
                                        {erroresAsistentes['comprador.nombre'] && <p className="text-red-600 text-xs mt-1 font-bold">{erroresAsistentes['comprador.nombre']}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase mb-1">Apellidos (Mínimo un apellido)</label>
                                        <input type="text" value={comprador.apellidos} onChange={e => setComprador({...comprador, apellidos: e.target.value})} className="w-full p-3 border-2 border-black rounded-xl" />
                                        {erroresAsistentes['comprador.apellidos'] && <p className="text-red-600 text-xs mt-1 font-bold">{erroresAsistentes['comprador.apellidos']}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase mb-1">DNI / NIE España</label>
                                        <input type="text" value={comprador.dni} onChange={e => setComprador({...comprador, dni: e.target.value.toUpperCase()})} className="w-full p-3 border-2 border-black rounded-xl uppercase" />
                                        {erroresAsistentes['comprador.dni'] && <p className="text-red-600 text-xs mt-1 font-bold">{erroresAsistentes['comprador.dni']}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase mb-1">Teléfono España</label>
                                        <input type="text" value={comprador.telefono} onChange={e => setComprador({...comprador, telefono: e.target.value})} className="w-full p-3 border-2 border-black rounded-xl" placeholder="Ej: 600123456" />
                                        {erroresAsistentes['comprador.telefono'] && <p className="text-red-600 text-xs mt-1 font-bold">{erroresAsistentes['comprador.telefono']}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase mb-1">Correo Electrónico</label>
                                        <input type="email" value={comprador.email} onChange={e => setComprador({...comprador, email: e.target.value})} className="w-full p-3 border-2 border-black rounded-xl" />
                                        {erroresAsistentes['comprador.email'] && <p className="text-red-600 text-xs mt-1 font-bold">{erroresAsistentes['comprador.email']}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase mb-1">Dirección de Envío (Uso exclusivo para reposiciones de material)</label>
                                    <input type="text" value={comprador.direccion} onChange={e => setComprador({...comprador, direccion: e.target.value})} className="w-full p-3 border-2 border-black rounded-xl" placeholder="Calle, Número, Piso, Código Postal, Localidad" />
                                    {erroresAsistentes['comprador.direccion'] && <p className="text-red-600 text-xs mt-1 font-bold">{erroresAsistentes['comprador.direccion']}</p>}
                                </div>
                            </div>

                            <FormularioAsistentes 
                                articulos={articulos}
                                asistentes={asistentes}
                                onChangeAsistente={handleCcangeAsistente}
                                errores={erroresAsistentes}
                            />
                        </div>

                        <PanelPago 
                            total={total} 
                            comprador={comprador}
                            asistentes={asistentes} 
                            setErroresAsistentes={setErroresAsistentes} 
                        />
                        
                    </div>
                ) : (
                    <div className="py-32 text-center border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-3xl font-black uppercase italic mb-8 tracking-tighter text-gray-200">
                            Tu carrito está vacío
                        </h2>
                        <Link 
                            href="/entradas" 
                            className="inline-block bg-pink-500 text-white px-10 py-4 font-black uppercase tracking-widest text-[10px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                        >
                            Ver entradas
                        </Link>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}