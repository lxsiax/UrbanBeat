import { HiOutlineShoppingBag } from "react-icons/hi2";

interface BotonCarritoProps {
    onClick: () => void;
    texto?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    disabled?: boolean;
}

export default function BotonCarrito({ 
    onClick, 
    texto = "Añadir al carrito", 
    size = "md", 
    className = "",
    disabled = false
}: BotonCarritoProps) {
    

    const variacionesEstilos = {
        sm: 'py-3 px-6 text-[11px] rounded-xl shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none',
        md: 'py-4 px-8 text-xs rounded-2xl shadow-[5px_5px_0px_0px_rgba(236,72,153,1)] hover:translate-x-[5px] hover:translate-y-[5px] hover:shadow-none',
        lg: 'py-5 px-10 text-sm rounded-2xl shadow-[6px_6px_0px_0px_rgba(236,72,153,1)] hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-none'
    };

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`w-full font-black uppercase tracking-[0.15em] italic flex items-center justify-center gap-3 transition-all border-2 border-black
                ${disabled 
                    ? 'bg-gray-200 text-gray-400 border-gray-400 cursor-not-allowed shadow-none translate-x-0 translate-y-0 opacity-70' 
                    : 'bg-black text-white hover:bg-pink-500 hover:text-white'
                } 
                ${disabled ? 'py-4 px-8 text-xs rounded-2xl' : variacionesEstilos[size]} 
                ${className}`}
        >
            <HiOutlineShoppingBag 
                size={size === 'sm' ? 18 : 22} 
                className={`transition-transform ${!disabled && 'group-hover:scale-110'}`} 
            />
            <span>{texto}</span>
        </button>
    );
}