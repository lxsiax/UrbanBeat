<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MerchandisingController extends Controller
{
    public function index()
    {
        $esAdmin = auth()->user() && auth()->user()->role_id === 1;
        $query = Producto::with('tallas');
        if (!$esAdmin) {
            $query->where('esta_oculto', false);
        }

        $productos = $query->get();

        return Inertia::render('Merchandising', [
            'productos' => $productos,
            'auth' => [
                'user' => auth()->user(),
                'esAdmin' => $esAdmin
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'producto_id' => 'required|exists:productos,id',
            'talla_id' => 'required|exists:tallas,id',
            'cantidad' => 'required|integer|min:1'
        ]);

        return back()->with('success', 'Producto añadido al carrito');
    }
}