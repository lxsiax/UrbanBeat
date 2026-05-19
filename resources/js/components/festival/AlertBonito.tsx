import React from 'react';

interface AlertBonitoProps {
    isOpen: boolean;
    titulo: string;
    mensaje: string;
    onConfirm: () => void;
    onCancel: () => void;
    textoConfirmar?: string;
    colorConfirmar?: string;
}

export default function AlertBonito({
    isOpen,
    titulo,
    mensaje,
    onConfirm,
    onCancel,
    textoConfirmar = "Confirmar",
    colorConfirmar = "bg-pink-500 text-white"
}: AlertBonitoProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel}></div>
            
            <div className="bg-white border-4 border-black p-6 rounded-[24px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full z-10 animate-in fade-in zoom-in-95 duration-150">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-black mb-2">
                    {titulo}
                </h3>
                <p className="text-sm font-bold text-gray-700 mb-6 leading-relaxed">
                    {mensaje}
                </p>
                
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 bg-gray-200 text-black border-2 border-black rounded-xl font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className={`px-5 py-2.5 border-2 border-black rounded-xl font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all ${colorConfirmar}`}
                    >
                        {textoConfirmar}
                    </button>
                </div>
            </div>
        </div>
    );
}