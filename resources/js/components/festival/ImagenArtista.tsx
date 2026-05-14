import { FaSpotify } from "react-icons/fa";

interface Props {
    artista: {
        id: number;
        nombre: string;
        imagen: string | null;
        es_headliner: boolean;
        esta_oculto: boolean;
        link_spotify: string | null;
    };
    children?: React.ReactNode; 
}

export default function ImagenArtista({ artista, children }: Props) {
    const { nombre, imagen, es_headliner, esta_oculto, link_spotify } = artista;

    const rutaImagen = imagen 
        ? (imagen.startsWith('http') ? imagen : `/storage/${imagen}`) 
        : '/storage/default-artist.jpg';

    return (
        <a
            href={link_spotify || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative rounded-[2.5rem] bg-black border-[3px] overflow-hidden transition-all duration-500 block 
                ${es_headliner ? 'col-span-2 row-span-2' : 'col-span-1'} 
                ${esta_oculto 
                    ? 'opacity-50 grayscale border-dashed border-gray-400' 
                    : 'border-black hover:-translate-y-2 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]'
                }`}
        >
            {children}

            <div className="aspect-[4/5] w-full h-full">
                <img
                    src={rutaImagen}
                    alt={nombre}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6 md:p-10">
                
                {!esta_oculto && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150 text-[#1DB954]">
                        <FaSpotify size={50} className="drop-shadow-[0_0_15px_rgba(29,185,84,0.5)]" />
                    </div>
                )}

                <h3 className={`font-black uppercase italic leading-none transition-all text-white group-hover:text-pink-400 
                    ${es_headliner ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'}`}>
                    {nombre}
                </h3>

                {esta_oculto ? (
                    <span className="mt-3 text-[10px] bg-red-600 text-white font-black px-3 py-1 w-fit rounded-full uppercase italic border-2 border-black">
                        Oculto/a
                    </span>
                ) : (
                    <span className="mt-2 text-[10px] text-white/50 font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                        Escuchar en Spotify
                    </span>
                )}
            </div>
        </a>
    );
}