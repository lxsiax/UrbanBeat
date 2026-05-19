import React from 'react';

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

interface Props {
    articulos: ArticuloCarrito[];
    asistentes: AsistenteData[];
    onChangeAsistente: (index: number, campo: keyof AsistenteData, valor: string) => void;
    errores: Record<string, string>;
}

export default function FormularioAsistentes({ articulos, asistentes, onChangeAsistente, errores }: Props) {
    const entradasEnElCarrito = articulos.filter(art => art.tipo === 'entrada');

    if (entradasEnElCarrito.length === 0) return null;

    return (
        <div className="w-full bg-white p-8 rounded-[30px] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-2">
                Datos de los <span className="text-pink-500">Asistentes</span>
            </h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-8">
                Por normativa del festival, las entradas deben ser nominativas. Introduce los datos de todos los asistentes.
            </p>

            <div className="space-y-8 divide-y-2 divide-dashed divide-black/20">
                {asistentes.map((asistente, index) => {
                    const articuloAsociado = articulos.find(art => art.id === asistente.entrada_id);
                    
                    return (
                        <div key={index} className={index > 0 ? "pt-8" : ""}>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-pink-500 text-white font-black text-xs px-2.5 py-1 rounded-md border border-black uppercase">
                                    Asistente {index + 1}
                                </span>
                                <span className="text-xs font-black uppercase text-gray-500 italic">
                                    — Para: {articuloAsociado?.nombre || 'Entrada'} ({articuloAsociado?.detalle})
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase mb-1.5 text-black">Nombre Completo</label>
                                    <input
                                        type="text"
                                        value={asistente.nombre}
                                        onChange={(e) => onChangeAsistente(index, 'nombre', e.target.value)}
                                        placeholder="Ej: Juan Pérez"
                                        className={`w-full border-2 border-black rounded-xl p-3 font-bold text-sm outline-none focus:border-pink-500 ${errores[`asistentes.${index}.nombre`] ? 'border-red-500 bg-red-50' : ''}`}
                                    />
                                    {errores[`asistentes.${index}.nombre`] && (
                                        <p className="text-[10px] text-red-500 font-black uppercase mt-1">{errores[`asistentes.${index}.nombre`]}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase mb-1.5 text-black">DNI / Pasaporte</label>
                                    <input
                                        type="text"
                                        value={asistente.dni}
                                        onChange={(e) => onChangeAsistente(index, 'dni', e.target.value)}
                                        placeholder="Ej: 12345678X"
                                        className={`w-full border-2 border-black rounded-xl p-3 font-bold text-sm outline-none focus:border-pink-500 ${errores[`asistentes.${index}.dni`] ? 'border-red-500 bg-red-50' : ''}`}
                                    />
                                    {errores[`asistentes.${index}.dni`] && (
                                        <p className="text-[10px] text-red-500 font-black uppercase mt-1">{errores[`asistentes.${index}.dni`]}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase mb-1.5 text-black">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        value={asistente.email}
                                        onChange={(e) => onChangeAsistente(index, 'email', e.target.value)}
                                        placeholder="juan@email.com"
                                        className={`w-full border-2 border-black rounded-xl p-3 font-bold text-sm outline-none focus:border-pink-500 ${errores[`asistentes.${index}.email`] ? 'border-red-500 bg-red-50' : ''}`}
                                    />
                                    {errores[`asistentes.${index}.email`] && (
                                        <p className="text-[10px] text-red-500 font-black uppercase mt-1">{errores[`asistentes.${index}.email`]}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase mb-1.5 text-black">Número de Teléfono</label>
                                    <input
                                        type="text"
                                        value={asistente.numero}
                                        onChange={(e) => onChangeAsistente(index, 'numero', e.target.value)}
                                        placeholder="Ej: +34 600123456"
                                        className={`w-full border-2 border-black rounded-xl p-3 font-bold text-sm outline-none focus:border-pink-500 ${errores[`asistentes.${index}.numero`] ? 'border-red-500 bg-red-50' : ''}`}
                                    />
                                    {errores[`asistentes.${index}.numero`] && (
                                        <p className="text-[10px] text-red-500 font-black uppercase mt-1">{errores[`asistentes.${index}.numero`]}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}