<?php

namespace App\Observers;

use App\Models\Producto;
use App\Models\Noticia;

class ProductoObserver
{
    /**
     * Handle the Producto "created" event.
     */
    public function created(Producto $producto): void
    {
        if ($producto->esta_oculto) {
            return;
        }

        Noticia::create([
            'titulo' => '¡NUEVO MERCH DISPONIBLE: ' . strtoupper($producto->nombre) . '!',
            'contenido' => 'Ya puedes conseguir el nuevo producto oficial del festival: ' . $producto->nombre . '. ' . $producto->descripcion . ' ¡Unidades limitadas!',
            'imagen' => $producto->imagen_url, 
            'tipo' => 'producto',
            'created_at' => $producto->created_at,
        ]);
    }
}