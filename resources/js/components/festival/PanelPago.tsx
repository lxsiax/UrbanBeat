import { useForm } from '@inertiajs/react';
import React from 'react';

// 1. Declaramos la estructura exacta que tiene cada asistente (incluyendo numero)
interface AsistenteData {
    entrada_id: number;
    nombre: string;
    dni: string;
    email: string;
    numero: string; 
}

// 2. Corregimos la interfaz para recibir los datos del padre (Carrito.tsx)
interface PanelPagoProps {
    total: number;
    asistentes: AsistenteData[];
    setErroresAsistentes: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export default function PanelPago({ total, asistentes, setErroresAsistentes }: PanelPagoProps) {
    // 3. Inicializamos useForm pasando tanto el total como el array de asistentes
    const { setData, post, processing } = useForm({
        total: total,
        asistentes: asistentes
    });

    // 4. Mantenemos el estado de useForm sincronizado automáticamente cuando cambien los datos en el padre
    React.useEffect(() => {
        setData('asistentes', asistentes);
    }, [asistentes]);

    const handlePagar = (e: React.FormEvent) => {
        e.preventDefault();
        
        // --- VALIDACIÓN LOCAL ANTES DE IR A STRIPE ---
        const nuevosErrores: Record<string, string> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        asistentes.forEach((asistente, index) => {
            if (!asistente.nombre.trim()) {
                nuevosErrores[`asistentes.${index}.nombre`] = 'El nombre es obligatorio.';
            }
            if (!asistente.dni.trim()) {
                nuevosErrores[`asistentes.${index}.dni`] = 'El DNI es obligatorio.';
            }
            if (!asistente.numero.trim()) {
                nuevosErrores[`asistentes.${index}.numero`] = 'El número de teléfono es obligatorio.';
            }
            if (!asistente.email.trim()) {
                nuevosErrores[`asistentes.${index}.email`] = 'El correo es obligatorio.';
            } else if (!emailRegex.test(asistente.email)) {
                nuevosErrores[`asistentes.${index}.email`] = 'Introduce un email válido.';
            }
        });

        // Si hay algún campo vacío, inyectamos los errores al padre para que los pinte en rojo y frenamos
        if (Object.keys(nuevosErrores).length > 0) {
            setErroresAsistentes(nuevosErrores);
            return;
        }

        // Si todo está ok, limpiamos fallos del frontend y disparamos la petición POST hacia Laravel
        setErroresAsistentes({});
        post('/pago/iniciar');
    };

    return (
        <div className="flex-1 w-full bg-white p-8 rounded-[30px] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-44">
            <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-6">
                Resumen de <span className="text-pink-500">Compra</span>
            </h2>
            
            <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <span className="text-xs font-black uppercase tracking-wider text-gray-400">Subtotal</span>
                    <span className="font-bold">{total.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <span className="text-xs font-black uppercase tracking-wider text-gray-400">Gastos de gestión</span>
                    <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest bg-green-50 px-2 py-1 rounded">Gratis</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-black uppercase tracking-wider">Total</span>
                    <span className="text-3xl font-black text-pink-500 italic">{total.toFixed(2)}€</span>
                </div>
            </div>

            <form onSubmit={handlePagar}>
                <button
                    type="submit"
                    disabled={processing || total <= 0}
                    className="w-full bg-black text-white font-black uppercase py-5 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? 'Conectando...' : 'Proceder al pago de prueba'}
                </button>
            </form>

            <p className="text-[9px] text-gray-400 text-center font-bold uppercase tracking-wider mt-4">
                🔒 Se solicitarán los datos de los asistentes antes de proceder
            </p>
        </div>
    );
}