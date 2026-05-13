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
    public function update(Request $request, $id)
    {
        // Buscamos el artista
        $artista = Artista::findOrFail($id);

        // 1. Validar los campos básicos
        $request->validate([
            'nombre' => 'required|string|max:255',
            'dia_id' => 'required',
            'orden' => 'required|integer',
        ]);

        // 2. Actualizar textos (Asignación manual para evitar fallos de fillable)
        $artista->nombre = $request->nombre;
        $artista->dia_id = $request->dia_id;
        $artista->orden = $request->orden;
        // En JS llega "1" o "0", lo convertimos a booleano real
        $artista->es_headliner = filter_var($request->es_headliner, FILTER_VALIDATE_BOOLEAN);

        // 3. Gestionar la imagen
        if ($request->hasFile('imagen')) {
            // Borrar la vieja si existe
            if ($artista->imagen) {
                \Storage::disk('public')->delete($artista->imagen);
            }

            // Guardar la nueva en 'storage/app/public/artistas'
            $path = $request->file('imagen')->store('artistas', 'public');

            // Guardamos la ruta resultante en la columna imagen
            $artista->imagen = $path;
        }

        // 4. GUARDAR CAMBIOS
        $artista->save();

        // Redirigir de vuelta
        return redirect()->route('admin.artistas.index')->with('success', 'Artista actualizado con éxito');
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