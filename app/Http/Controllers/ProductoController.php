<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Http\Requests\StoreProductoRequest;
use App\Http\Requests\UpdateProductoRequest;
use Inertia\Inertia;

class ProductoController extends Controller
{
    public function cambiarVisibilidad($id)
    {
        $producto = Producto::findOrFail($id);

        $producto->esta_oculto = !$producto->esta_oculto;
        $producto->save();

        return back();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productos = Producto::with('tallas')->get();
        return Inertia::render('Admin/Productos/Index', [
            'productos' => $productos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Producto $producto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Producto $producto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductoRequest $request, Producto $producto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto)
    {
        //
    }
}
