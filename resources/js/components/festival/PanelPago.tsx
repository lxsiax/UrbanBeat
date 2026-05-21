import { router } from '@inertiajs/react';

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

interface PanelPagoProps {
    total: number;
    comprador: CompradorData;
    asistentes: AsistenteData[];
    setErroresAsistentes: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export default function PanelPago({ total, comprador, asistentes, setErroresAsistentes }: PanelPagoProps) {
    
    const ejecutarCheckout = () => {
        const erroresLocalizados: Record<string, string> = {};
        let formularioCorrecto = true;

        const regexDniNie = /^[XYZ\d]\d{7}[A-Z]$/i;
        const regexEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regexTelefonoEspana = /^[679]\d{8}$/;

        if (comprador.nombre.trim().length <= 3) {
            erroresLocalizados['comprador.nombre'] = 'El nombre del comprador requiere más de 3 caracteres.';
            formularioCorrecto = false;
        }

        if (comprador.apellidos.trim().split(' ').filter(Boolean).length < 1) {
            erroresLocalizados['comprador.apellidos'] = 'Especifica al menos un apellido.';
            formularioCorrecto = false;
        }

        if (!regexDniNie.test(comprador.dni.trim())) {
            erroresLocalizados['comprador.dni'] = 'DNI/NIE inválido para territorio español.';
            formularioCorrecto = false;
        }

        if (!regexTelefonoEspana.test(comprador.telefono.trim())) {
            erroresLocalizados['comprador.telefono'] = 'El teléfono debe poseer los 9 dígitos oficiales de España.';
            formularioCorrecto = false;
        }

        if (!regexEmailValido.test(comprador.email.trim())) {
            erroresLocalizados['comprador.email'] = 'Formato de correo no admitido.';
            formularioCorrecto = false;
        }

        if (comprador.direccion.trim().length < 8) {
            erroresLocalizados['comprador.direccion'] = 'Es necesaria una dirección de entrega válida.';
            formularioCorrecto = false;
        }

        asistentes.forEach((asistente, index) => {
            if (!asistente.nombre.trim()) {
                erroresLocalizados[`asistentes.${index}.nombre`] = 'El nombre es obligatorio.';
                formularioCorrecto = false;
            }
            if (!regexDniNie.test(asistente.dni.trim())) {
                erroresLocalizados[`asistentes.${index}.dni`] = 'DNI/NIE no válido.';
                formularioCorrecto = false;
            }
            if (!regexEmailValido.test(asistente.email.trim())) {
                erroresLocalizados[`asistentes.${index}.email`] = 'Email inválido.';
                formularioCorrecto = false;
            }
            if (!asistente.numero.trim()) {
                erroresLocalizados[`asistentes.${index}.numero`] = 'Teléfono obligatorio.';
                formularioCorrecto = false;
            }
        });

        if (!formularioCorrecto) {
            setErroresAsistentes(erroresLocalizados);
            return;
        }

        router.post('/pago/iniciar', {
            total: total,
            telefono_comprador: comprador.telefono,
            direccion_comprador: comprador.direccion,
            asistentes: asistentes
        } as any);
    };

    // 👈 ¡ESTE RETURN ES EL QUE SE HABÍA IDO O CERRADO MAL!
    return (
        <div className="w-full lg:w-96 bg-white p-6 rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-32 space-y-4">
            <h3 className="text-xl font-black uppercase italic">Resumen del pedido</h3>
            <hr className="border-black" />
            <div className="flex justify-between font-black text-2xl uppercase">
                <span>Total</span>
                <span className="text-pink-500">{total}€</span>
            </div>
            <button
                onClick={ejecutarCheckout}
                className="w-full bg-pink-500 hover:bg-black text-white font-black py-4 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-center uppercase tracking-widest text-xs"
            >
                Proceder al pago seguro
            </button>
        </div>
    );
}