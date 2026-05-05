<?php

namespace App\Http\Controllers;

use App\Models\Entrada;
use App\Http\Requests\StoreEntradaRequest;
use App\Http\Requests\UpdateEntradaRequest;
use Illuminate\Support\Facades\Request;
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEntradaRequest $request)
    {
        //
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

    public function update(\Illuminate\Http\Request $request, $id)
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
