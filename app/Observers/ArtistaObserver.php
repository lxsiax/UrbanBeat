<?php
namespace App\Observers;

use App\Models\Artista;
use App\Models\Noticia;

class ArtistaObserver
{

    private function generarTitulo(string $nombre): string
    {
        return '¡NUEVO ARTISTA CONFIRMADO: ' . strtoupper($nombre) . '!';
    }

    public function created(Artista $artista): void
    {
        if ($artista->esta_oculto) {
            return;
        }

        Noticia::create([
            'titulo' => $this->generarTitulo($artista->nombre),
            'contenido' => 'El festival Urban Beat 2026 anuncia la confirmación de ' . $artista->nombre . '. ¡Prepárate para el show!',
            'imagen' => $artista->imagen,
            'tipo' => 'artista',
            'created_at' => $artista->created_at,
            'updated_at' => $artista->created_at,
        ]);
    }

    public function updated(Artista $artista): void
    {

        $noticia = Noticia::where('tipo', 'artista')
            ->where('titulo', $this->generarTitulo($artista->getOriginal('nombre')))
            ->first();

        if ($artista->esta_oculto) {
            if ($noticia) {
                $noticia->delete();
            }
            return;
        }

        if (!$noticia) {
            $this->created($artista);
            return;
        }

        if ($artista->isDirty(['imagen', 'nombre'])) {
            $noticia->update([
                'titulo' => $this->generarTitulo($artista->nombre),
                'imagen' => $artista->imagen,
            ]);
        }
    }
}