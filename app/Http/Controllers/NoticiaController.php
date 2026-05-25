<?php

namespace App\Http\Controllers;

use App\Models\AjusteFestival;
use App\Models\Noticia;
use Inertia\Inertia;

class NoticiaController extends Controller
{
    public function home()
    {
        $ajuste = AjusteFestival::where('clave', 'fecha_inicio')->first();
        $fechaFestival = $ajuste ? $ajuste->valor : '2026-07-23';

        return Inertia::render('home', [
            'fechaFestival' => $fechaFestival,
            'ultimasNoticias' => Noticia::where('tipo', 'novedad')
                                    ->latest()
                                    ->take(3)
                                    ->get()
        ]);
    }

    public function informacion()
    {
        return Inertia::render('Informacion', [ 
            'novedades' => Noticia::where('tipo', 'novedad')->latest()->get(),
            'horario' => Noticia::where('tipo', 'horario')->first(),
            'ubicacion' => Noticia::where('tipo', 'ubicacion')->first(),
            'general' => Noticia::where('tipo', 'info_general')->first(),
        ]);
    }
}