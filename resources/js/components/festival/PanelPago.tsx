import React from 'react';
import { HiArrowRight } from "react-icons/hi2";

interface PanelPagoProps {
    total: number;
}

export default function PanelPago({ total }: PanelPagoProps) {
    const finalizar = () => {
        console.log("Procesando pedido de:", total); 
    };

    return (
        <aside className="w-full lg:w-[400px] sticky top-40">
            <div className="bg-white border-2 border-black p-8 shadow-[10px_10px_0px_0px_rgba(236,72,153,1)] relative">
                
                <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-8 pb-3 border-b-2 border-black">
                    Resumen de <span className="text-pink-500"> pago</span>
                </h2>

                <div className="space-y-4 mb-10">
                    <div className="flex justify-between text-[12px] font-black uppercase tracking-widest text-gray-500">
                        <span>Subtotal</span>
                        <span className="text-black">{total.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-[12px] font-black uppercase tracking-widest text-gray-400 italic">
                        <span>Gastos gestión</span>
                        <span className="text-emerald-500 font-black">Gratis</span>
                    </div>
                    
                    <div className="pt-8 mt-8 border-t-2 border-dashed border-gray-200 flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className="text-[12px] font-black uppercase text-pink-500 tracking-widest">Total Final</span>
                        </div>
                        <span className="text-5xl font-black italic tracking-tighter leading-none">
                            {total.toFixed(2)}€
                        </span>
                    </div>
                </div>

                <button 
                    onClick={finalizar}
                    className="group w-full bg-black text-white py-5 font-black uppercase tracking-[0.25em] text-[12px] flex items-center justify-center gap-3 hover:bg-pink-500 transition-all active:translate-y-1"
                >
                    Finalizar Pedido
                    <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[8px] text-center text-gray-400 font-bold mt-8 uppercase tracking-[0.15em] leading-relaxed italic">
                    Al continuar aceptas nuestras condiciones de pago y acceso al festival. 
                </p>
            </div>
        </aside>
    );
}