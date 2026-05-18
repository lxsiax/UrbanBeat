import React from 'react';
import EntradaTarjeta from './EntradaTarjeta';

interface EntradasSeccionProps {
    fecha: string;
    listaEntradas: any[];
    esAdmin: boolean;
    cantidades: Record<number, number>;
    procesandoId: number | null;
    onUpdateCant: (id: number, delta: number) => void;
    onAniadirAlCarrito: (id: number) => void;
    onCambiarVisibilidad: (id: number) => void;
    onIrAEditar: (id: number) => void;
}

export default function EntradasSeccion({
    fecha,
    listaEntradas,
    esAdmin,
    cantidades,
    procesandoId,
    onUpdateCant,
    onAniadirAlCarrito,
    onCambiarVisibilidad,
    onIrAEditar
}: EntradasSeccionProps) {
    return (
        <section>
            <div className="flex items-center gap-4 mb-10">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter whitespace-nowrap">
                    {fecha}
                </h2>
                <div className="h-[2px] w-full bg-black/10"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {listaEntradas.map((entrada) => (
                    <EntradaTarjeta
                        key={entrada.id}
                        entrada={entrada}
                        esAdmin={esAdmin}
                        cantidadActual={cantidades[entrada.id] || 1}
                        procesandoId={procesandoId}
                        onUpdateCant={onUpdateCant}
                        onAniadirAlCarrito={onAniadirAlCarrito}
                        onCambiarVisibilidad={onCambiarVisibilidad}
                        onIrAEditar={onIrAEditar}
                    />
                ))}
            </div>
        </section>
    );
}