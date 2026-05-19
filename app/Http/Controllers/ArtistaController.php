<?php

namespace App\Http\Controllers;

use App\Models\Artista;
use App\Models\Dia;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ArtistaController extends Controller
{
    /**
     * Muestra la tabla de gestión de artistas
     */
    public function index()
    {
        return Inertia::render('Admin/Artistas/Index', [
            'artistas' => Artista::with('dia')->orderBy('orden', 'asc')->get()
        ]);
    }

    /**
     * Formulario de creación
     */
    public function create()
    {
        return Inertia::render('Admin/Artistas/Create', [
            'dias' => Dia::all()
        ]);
    }

    /**
     * Guarda un nuevo artista
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'dia_id' => 'required',
            'imagen' => 'nullable|image|max:2048',
            'link_spotify' => 'nullable|url|max:255',
        ]);

        $artista = new Artista();
        $artista->nombre = $request->nombre;
        $artista->dia_id = $request->dia_id;
        $artista->link_spotify = $request->link_spotify;

        $artista->orden = $request->orden ?? (Artista::max('orden') + 1);

        $artista->es_headliner = filter_var($request->es_headliner, FILTER_VALIDATE_BOOLEAN);

        if ($request->hasFile('imagen')) {
            $artista->imagen = $request->file('imagen')->store('artistas', 'public');
        }

        $artista->save();

        return redirect()->route('admin.artistas.index');
    }
    
    /**
     * Formulario de edición
     */
    public function edit(Artista $artista)
    {
        return Inertia::render('Admin/Artistas/Edit', [
            'artista' => $artista,
            'dias' => Dia::all()
        ]);
    }

    /**
     * Actualiza el artista
     */
    public function update(Request $request, $id)
    {
        $artista = Artista::findOrFail($id);

        $request->validate([
            'nombre' => 'required|string|max:255',
            'dia_id' => 'required',
            'orden' => 'required|integer',
            'link_spotify' => 'nullable|url|max:255',
        ]);

        $artista->nombre = $request->nombre;
        $artista->dia_id = $request->dia_id;
        $artista->orden = $request->orden;
        $artista->link_spotify = $request->link_spotify;
        $artista->es_headliner = filter_var($request->es_headliner, FILTER_VALIDATE_BOOLEAN);

        if ($request->hasFile('imagen')) {
            if ($artista->imagen) {
                Storage::disk('public')->delete($artista->imagen);
            }
            $path = $request->file('imagen')->store('artistas', 'public');

            $artista->imagen = $path;
        }
        $artista->save();

        return redirect()->route('admin.artistas.index')->with('success', 'Artista actualizado con éxito');
    }

    public function cambiarVisibilidad($id)
    {
        $artista = Artista::findOrFail($id);

        $artista->esta_oculto = !$artista->esta_oculto;
        $artista->save();

        return back();
    }

    /**
     * Eliminar artista
     */
    public function destroy(Artista $artista)
    {
        if ($artista->imagen) {
            $path = str_replace('/storage/', '', $artista->imagen);
            Storage::disk('public')->delete($path);
        }

        $artista->delete();
        return redirect()->route('admin.artistas.index')->with('message', 'Artista eliminado');
    }
}