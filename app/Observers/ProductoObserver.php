<?php

namespace App\Observers;

use App\Models\Producto;
use App\Models\Noticia;

class ProductoObserver
{
    public function created(Producto $producto): void
    {
        if ($producto->esta_oculto)
            return;

        Noticia::create([
            'titulo' => '¡NUEVO MERCH DISPONIBLE: ' . strtoupper($producto->nombre) . '!',
            'contenido' => 'Ya puedes conseguir el nuevo producto oficial: ' . $producto->nombre,
            'imagen' => $producto->imagen_url,
            'tipo' => 'producto',
            'created_at' => $producto->created_at,
            'updated_at' => $producto->created_at,
        ]);
    }

    public function updated(Producto $producto): void
    {
        $noticia = Noticia::where('tipo', 'producto')
            ->where('titulo', 'LIKE', '%' . strtoupper($producto->getOriginal('nombre')) . '%')
            ->first();

        if ($noticia) {
            if ($producto->esta_oculto) {
                $noticia->delete();
                return;
            }

            $noticia->update([
                'titulo' => '¡NUEVO MERCH DISPONIBLE: ' . strtoupper($producto->nombre) . '!',
                'contenido' => 'Ya puedes conseguir el nuevo producto oficial: ' . $producto->nombre,
                'imagen' => $producto->imagen_url,
            ]);
        } elseif (!$producto->esta_oculto) {
            $this->created($producto);
        }
    }
}