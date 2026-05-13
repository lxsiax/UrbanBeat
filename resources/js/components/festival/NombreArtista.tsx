interface Props {
    nombre: string;
    esHeadliner?: boolean;
    className?: string;
}

export default function NombreArtista({ nombre, esHeadliner = false, className = "" }: Props) {
    return (
        <h3 className={`
            text-white font-black uppercase italic leading-none tracking-tighter
            ${esHeadliner ? 'text-4xl md:text-6xl' : 'text-xl md:text-2xl'}
            ${className}
        `}>
            {nombre}
        </h3>
    );
}