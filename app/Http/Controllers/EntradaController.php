<?php

namespace App\Http\Controllers;

use App\Models\Entrada;
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
        'tipos' => \App\Models\TipoEntrada::with('dia')->get(),
        'zonas' => \App\Models\Zona::all(),
    ]);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validated = $request->validate([
        'tipo_entrada_id' => 'required|exists:tipo_entradas,id',
        'zona_id'         => 'required|exists:zonas,id',
        'precio'          => 'required|numeric|min:0',
        'stock'           => 'required|integer|min:0',
        'esta_oculta'     => 'boolean',
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
    public function edit($id)
    {
        $entrada = Entrada::with(['tipoEntrada', 'zona'])->findOrFail($id);
        return Inertia::render('Admin/Entradas/Edit', [
            'entrada' => $entrada
        ]);
    }

    public function update(Request $request, $id)
    {
        $entrada = Entrada::findOrFail($id);

        $validado = $request->validate([
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $entrada->update($validado);

        return redirect()->route('admin.entradas.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entrada $entrada)
    {
        //
    }
}
