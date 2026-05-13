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
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'genero' => 'nullable|string|max:255',
            'es_headliner' => 'required|boolean',
            'dia_id' => 'required|exists:dias,id',
            'orden' => 'required|integer',
            'imagen' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('artistas', 'public');
            $validated['imagen'] = '/storage/' . $path;
        }

        Artista::create($validated);

        return redirect()->route('admin.artistas.index')->with('message', 'Artista creado correctamente');
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
    public function update(Request $request, Artista $artista)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'genero' => 'nullable|string|max:255',
            'es_headliner' => 'required|boolean',
            'dia_id' => 'required|exists:dias,id',
            'orden' => 'required|integer',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('imagen')) {
            // Borrar imagen antigua
            if ($artista->imagen) {
                $oldPath = str_replace('/storage/', '', $artista->imagen);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('imagen')->store('artistas', 'public');
            $validated['imagen'] = '/storage/' . $path;
        }

        $artista->update($validated);

        return redirect()->route('admin.artistas.index')->with('message', 'Artista actualizado con éxito');
    }

    /**
     * Alterna la visibilidad (Oculto/Visible)
     */
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