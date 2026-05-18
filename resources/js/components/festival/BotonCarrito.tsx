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
    
    const paddingEstilos = {
        sm: 'py-3 px-6 text-sm rounded-xl shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:translate-x-[4px] hover:translate-y-[4px]',
        md: 'py-4 px-8 text-base rounded-2xl shadow-[5px_5px_0px_0px_rgba(236,72,153,1)] hover:translate-x-[5px] hover:translate-y-[5px]',
        lg: 'py-5 px-10 text-lg rounded-2xl shadow-[6px_6px_0px_0px_rgba(236,72,153,1)] hover:translate-x-[6px] hover:translate-y-[6px]'
    };

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`w-full font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all border-2 border-black
                ${disabled 
                    ? 'bg-gray-400 text-white cursor-not-allowed shadow-none translate-x-0 translate-y-0' 
                    : 'bg-pink-500 text-white hover:bg-black hover:shadow-none'
                } 
                ${paddingEstilos[size]} 
                ${className}`}
        >
            <HiOutlineShoppingBag size={size === 'sm' ? 20 : 24} />
            {texto}
        </button>
    );
}