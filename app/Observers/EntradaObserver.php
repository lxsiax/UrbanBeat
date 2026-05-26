<?php
namespace App\Observers;

use App\Models\Entrada;
use App\Models\Noticia;

class EntradaObserver
{
    /**
     * Handle the Entrada "created" event.
     */
    public function created(Entrada $entrada): void
    {
        $entrada->load(['tipoEntrada', 'zona']);

        $nombreEntrada = $entrada->tipoEntrada ? $entrada->tipoEntrada->nombre : 'Pase Festival';
        $nombreZona = $entrada->zona ? " ({$entrada->zona->nombre})" : '';

        Noticia::create([
            'titulo' => "¡NUEVA ENTRADA DISPONIBLE: {$nombreEntrada}{$nombreZona}!",
            'contenido' => "¡Ya está disponible la venta de entradas para {$nombreEntrada}{$nombreZona}! Corre a por la tuya antes de que se agoten.",
            'tipo' => 'producto',
            'esta_oculta' => false,

            'created_at' => $entrada->created_at,
            'updated_at' => $entrada->created_at,
        ]);
    }

    /**
     * Handle the Entrada "updated" event.
     */
    public function updated(Entrada $entrada): void
    {
        if ($entrada->isDirty('stock')) {
            $nuevoStock = $entrada->stock;
            $stockAnterior = $entrada->getOriginal('stock');

            if ($nuevoStock < 50 && $stockAnterior >= 50) {

                $entrada->load(['tipoEntrada', 'zona']);

                $nombreEntrada = $entrada->tipoEntrada ? $entrada->tipoEntrada->nombre : 'Pase Festival';
                $nombreZona = $entrada->zona ? " ({$entrada->zona->nombre})" : '';

                $textoIdentificador = $nombreEntrada . $nombreZona;

                Noticia::create([
                    'titulo' => "¡ÚLTIMAS ENTRADAS! Quedan muy pocas unidades para {$textoIdentificador}",
                    'contenido' => "¡El ritmo de venta está siendo espectacular! Quedan menos de 50 entradas para {$textoIdentificador}. ¡Asegura tu sitio ya!",
                    'tipo' => 'producto',
                    'esta_oculta' => false,

                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}