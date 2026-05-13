<?php

namespace App\Http\Controllers;

use App\Models\Dia;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CartelController extends Controller
{
    public function index()
    {
        $programacion = Dia::with([
            'artistas' => function ($query) {
                $query->orderBy('orden', 'asc');
            }
        ])->get();

        return Inertia::render('Cartel', [
            'programacion' => $programacion
        ]);
    }
}