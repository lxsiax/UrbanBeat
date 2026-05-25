<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Http\Requests\StoreProductoRequest;
use App\Models\Talla;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

    public function index()
    {
        $productos = Producto::with('tallas')->get();
        return Inertia::render('Admin/Productos/Index', [
            'productos' => $productos
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Productos/Create', [
            'todaslasTallas' => Talla::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductoRequest $request)
    {
        $data = $request->validated();

        $data['imagen_url'] = $request->file('imagen')->store('productos', 'public');

        $producto = Producto::create($data);

        $syncData = [];
        foreach ($data['stocks'] as $tallaId => $stockCantidad) {
            $syncData[$tallaId] = ['stock' => max(0, intval($stockCantidad))];
        }
        $producto->tallas()->sync($syncData);

        return redirect()->route('admin.productos.index');
    }

    public function show($id)
    {
        $producto = Producto::with([
            'tallas' => function ($query) {
                $query->where('stock', '>', 0);
            }
        ])->findOrFail($id);

        return Inertia::render('Producto', [
            'producto' => $producto
        ]);
    }

    public function edit(Producto $producto)
    {
        $producto->load('tallas');

        return Inertia::render('Admin/Productos/Edit', [
            'producto' => $producto,
            'todaslasTallas' => Talla::all()
        ]);
    }

    public function update(Request $request, Producto $producto)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|min:3|max:255',
            'descripcion' => 'required|string', // Añadido
            'precio' => 'required|numeric|gt:0',
            'categoria' => 'required|string|in:ropa,accesorio', // Añadido
            'esta_oculto' => 'required|boolean',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'stocks' => 'required|array',
        ]);

        if ($request->hasFile('imagen')) {
            if ($producto->imagen_url && Storage::disk('public')->exists($producto->imagen_url)) {
                Storage::disk('public')->delete($producto->imagen_url);
            }

            $path = $request->file('imagen')->store('productos', 'public');
            $producto->imagen_url = $path;
        }

        $producto->update([
            'nombre' => $validated['nombre'],
            'descripcion' => $validated['descripcion'], // Añadido
            'precio' => $validated['precio'],
            'categoria' => $validated['categoria'],     // Añadido
            'esta_oculto' => $validated['esta_oculto'],
            'imagen_url' => $producto->imagen_url
        ]);

        $syncData = [];
        foreach ($validated['stocks'] as $tallaId => $stockCantidad) {
            $syncData[$tallaId] = ['stock' => max(0, intval($stockCantidad))];
        }

        $producto->tallas()->sync($syncData);

        return redirect()->route('admin.productos.index');
    }

    public function destroy(Producto $producto)
    {
        //
    }
}