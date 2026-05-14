interface Props {
    producto: any;
    onVerDetalle: () => void;
    children?: React.ReactNode;
}

export default function ProductoMerch({ producto, onVerDetalle, children }: Props) {
    const rutaImagen = producto.imagen_url
        ? (producto.imagen_url.startsWith('http') ? producto.imagen_url : `/storage/${producto.imagen_url}`)
        : '/storage/default-merch.jpg';

    return (
        <div
            onClick={onVerDetalle}

            className={`group relative bg-white border-[3px] border-black rounded-[2.5rem] overflow-hidden flex flex-col w-full cursor-pointer transition-all 
                ${producto.esta_oculto
                    ? 'opacity-60 grayscale shadow-none'
                    : 'hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1'
                }`}
        >
            {children}

            <div className="w-full h-64 border-b-[3px] border-black overflow-hidden bg-gray-50">
                <img
                    src={rutaImagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="p-6 flex flex-col gap-2 bg-white">
                <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${producto.esta_oculto ? 'bg-gray-400 text-white' : 'bg-[#FF2D8C] text-white'}`}>
                        {producto.esta_oculto ? 'OCULTO' : 'MERCH OFICIAL'}
                    </span>
                </div>

                <h2 className="text-xl font-black uppercase italic leading-tight truncate mt-1">
                    {producto.nombre}
                </h2>

                <div className="flex justify-between items-center mt-2">
                    <span className="text-3xl font-black italic">{Math.floor(producto.precio)}€</span>
                    {!producto.esta_oculto && (
                        <span className="text-pink-500 font-black text-xs uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                            Ver detalles +
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}