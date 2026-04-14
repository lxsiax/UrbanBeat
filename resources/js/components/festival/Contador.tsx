import { useState, useEffect } from 'react';

export default function Contador() {
    const [tiempo, setTiempo] = useState({
        meses: 0,
        dias: 0,
        horas: 0,
        minutos: 0,
        segundos: 0
    });

    useEffect(() => {
        const fechaFestival = new Date('2026-07-23T00:00:00').getTime();

        const intervalo = setInterval(() => {
            const ahora = new Date().getTime();
            const distancia = fechaFestival - ahora;

            if (distancia < 0) {
                clearInterval(intervalo);
            } else {
                setTiempo({
                    meses: Math.floor(distancia / (1000 * 60 * 60 * 24 * 30.44)),
                    dias: Math.floor((distancia % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24)),
                    horas: Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutos: Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60)),
                    segundos: Math.floor((distancia % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(intervalo);
    }, []);

    return (
        <div className="flex gap-4 md:gap-8 mt-8">
            <BloqueTiempo valor={tiempo.meses} etiqueta="Meses" />
            <BloqueTiempo valor={tiempo.dias} etiqueta="Días" />
            <BloqueTiempo valor={tiempo.horas} etiqueta="Horas" />
            <BloqueTiempo valor={tiempo.minutos} etiqueta="Min" />
            <BloqueTiempo valor={tiempo.segundos} etiqueta="Seg" />
        </div>
    );
}

function BloqueTiempo({ valor, etiqueta }: { valor: number, etiqueta: string }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-black text-white leading-none">
                {valor.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] md:text-xs uppercase font-bold text-pink-500 mt-1 tracking-widest">
                {etiqueta}
            </span>
        </div>
    );
}