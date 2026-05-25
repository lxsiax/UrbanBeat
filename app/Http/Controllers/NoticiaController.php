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
            'horario' => AjusteFestival::where('clave', 'horario')->value('valor'),
            'ubicacion' => AjusteFestival::where('clave', 'ubicacion')->value('valor'), 
            'normas' => AjusteFestival::where('clave', 'normas')->value('valor'),
            'mapa_src' => AjusteFestival::where('clave', 'mapa_src')->value('valor'),
        ]);
    }
}