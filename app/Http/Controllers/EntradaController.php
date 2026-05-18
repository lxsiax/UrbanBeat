<?php

namespace App\Http\Controllers;

use App\Models\Entrada;
use App\Models\TipoEntrada;
use App\Models\Zona;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EntradaController extends Controller
{

    public function cambiarVisibilidad($id)
    {
        $entrada = Entrada::findOrFail($id);

        $entrada->esta_oculta = !$entrada->esta_oculta;
        $entrada->save();

        return back();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $entradas = Entrada::with(['tipoEntrada.dia', 'zona'])->get();
        return Inertia::render('Admin/Entradas/Index', [
            'entradas' => $entradas
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Entradas/Create', [
            'tipos' => TipoEntrada::with('dia')->get(),
            'zonas' => Zona::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tipo_entrada_id' => 'required|exists:tipo_entradas,id',
            'zona_id' => 'required|exists:zonas,id',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'esta_oculta' => 'boolean',
        ]);

        Entrada::create($validated);

        return redirect()->route('admin.entradas.index')->with('success', 'Entrada creada correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Entrada $entrada)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Entrada $entrada)
    {
        $tipos = TipoEntrada::all();
        $zonas = Zona::all();

        return Inertia::render('Admin/Entradas/Edit', [
            'entrada' => $entrada,
            'tipos' => $tipos,
            'zonas' => $zonas,
        ]);
    }

    public function update(Request $request, Entrada $entrada)
    {
        $validated = $request->validate([
            'tipo_entrada_id' => 'required|exists:tipo_entradas,id',
            'zona_id' => 'required|exists:zonas,id',
            'precio' => 'required|numeric|min:0.01',
            'stock' => 'required|integer|min:0',
        ]);

        $entrada->update($validated);

        return redirect()->route('admin.entradas.index')
            ->with('success', 'Entrada actualizada con éxito.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entrada $entrada)
    {
        //
    }
}
