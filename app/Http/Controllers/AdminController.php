<?php

namespace App\Http\Controllers;

use App\Models\Entrada;
use App\Models\Producto;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    public function dashboard()
    {
        if (Auth::user()->role_id !== 1) abort(403);

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_entradas' => Entrada::sum('stock'),
                'total_productos' => Producto::count(),
            ]
        ]);
    }

    public function entradas()
    {
        if (Auth::user()->role_id !== 1) abort(403);

        return Inertia::render('Admin/Entradas/Index', [
            'entradas' => Entrada::with(['tipoEntrada.dia', 'zona'])->get()
        ]);
    }
}