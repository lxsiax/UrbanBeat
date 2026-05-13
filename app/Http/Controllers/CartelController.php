<?php

namespace App\Http\Controllers;

use App\Models\Dia;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CartelController extends Controller
{
    public function index()
    {
        $esAdmin = auth()->check();

        $programacion = Dia::with([
            'artistas' => function ($query) use ($esAdmin) {
                if (!$esAdmin) {
                    $query->where('esta_oculto', false);
                }
                $query->orderBy('orden', 'asc');
            }
        ])->get();

        return Inertia::render('Cartel', [
            'programacion' => $programacion
        ]);
    }
}