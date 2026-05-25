<?php

namespace App\Observers;

use App\Models\Artista;
use App\Models\Noticia;

class ArtistaObserver
{
    public function created(Artista $artista): void
    {
        Noticia::create([
            'titulo' => '¡NUEVO ARTISTA CONFIRMADO: ' . strtoupper($artista->nombre) . '!',
            'contenido' => 'El festival Urban Beat 2026 anuncia la confirmación de ' . $artista->nombre . '. ¡Prepárate para el show!',
            'imagen' => $artista->imagen,
            'tipo' => 'novedad'
        ]);
    }
}