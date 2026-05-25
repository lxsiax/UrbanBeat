<?php

namespace App\Observers;

use App\Models\Entrada;
use App\Models\Noticia;

class EntradaObserver
{
    /**
     * Escuchar el evento cuando una entrada se actualiza.
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
                    'contenido' => "¡El ritmo de venta está siendo espectacular! Se acaban de agotar casi todos los pases de tipo {$textoIdentificador}. Actualmente quedan exactamente {$nuevoStock} entradas disponibles en nuestra wb. ¡Asegura tu sitio antes de que se agoten por completo!",
                    'tipo' => 'novedad',
                    'esta_oculta' => false,
                    // 'imagen' => 'noticias/entradas-warning.jpg' // Por si quieres subir un banner genérico
                ]);
            }
        }
    }
}