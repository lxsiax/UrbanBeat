import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

interface ContadorProps {
    fechaObjetivo: string;
}

export default function Contador({ fechaObjetivo }: ContadorProps) {
    const { props } = usePage<any>();
    
    const user = props.auth?.user || props.user;
    const esAdmin = user?.role === 'admin' || user?.is_admin === true || user?.role_id === 1;

    const [tiempo, setTiempo] = useState({
        meses: 0,
        dias: 0,
        hours: 0,
        minutos: 0,
        segundos: 0
    });

    useEffect(() => {
        const fechaFestival = new Date(`${fechaObjetivo}T00:00:00`).getTime();

        const intervalo = setInterval(() => {
            const ahora = new Date().getTime();
            const distancia = fechaFestival - ahora;

            if (distancia < 0) {
                clearInterval(intervalo);
                setTiempo({ meses: 0, dias: 0, hours: 0, minutos: 0, segundos: 0 });
            } else {
                setTiempo({
                    meses: Math.floor(distancia / (1000 * 60 * 60 * 24 * 30.44)),
                    dias: Math.floor((distancia % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),   
                    minutos: Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60)),
                    segundos: Math.floor((distancia % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(intervalo);
    }, [fechaObjetivo]);

    return (
        <div className="flex flex-row flex-nowrap justify-center items-center gap-2.5 xs:gap-4 sm:gap-6 md:gap-8 mt-6 md:mt-8 px-2 w-full overflow-visible">
            <BloqueTiempo valor={tiempo.meses} etiqueta="Meses" />
            <BloqueTiempo valor={tiempo.dias} etiqueta="Días" />
            <BloqueTiempo valor={tiempo.hours} etiqueta="Horas" />
            <BloqueTiempo valor={tiempo.minutos} etiqueta="Min" />
            <BloqueTiempo valor={tiempo.segundos} etiqueta="Seg" />
            
            {esAdmin && (
                <Link 
                    href="/admin/evento" 
                    className="flex flex-col items-center justify-center p-2.5 ml-2 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl shadow-lg transition-all duration-300 hover:scale-110"
                    title="Administrar fecha del evento"
                >
                    <span className="text-xl sm:text-2xl">
                        ⚙️
                    </span>
                    <span className="text-[7px] sm:text-[9px] uppercase font-black tracking-wider mt-1 text-white">
                        Gestionar
                    </span>
                </Link>
            )}
        </div>
    );
}

function BloqueTiempo({ valor, etiqueta }: { valor: number, etiqueta: string }) {
    const valorFormateado = (valor ?? 0).toString().padStart(2, '0');

    return (
        <div className="flex flex-col items-center justify-center text-center">
            <span className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-black text-white leading-none tracking-tight">
                {valorFormateado}
            </span>
            <span className="text-[8px] xs:text-[10px] md:text-xs uppercase font-bold text-pink-500 mt-1 sm:mt-2 tracking-widest">
                {etiqueta}
            </span>
        </div>
    );
}