<?php

namespace App\Http\Controllers;

use App\Models\AjusteFestival;
use App\Models\Noticia;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoticiaController extends Controller
{
    public function home()
    {
        $ajuste = AjusteFestival::where('clave', 'fecha_inicio')->first();
        $fechaFestival = $ajuste ? $ajuste->valor : '2026-07-23';

        $user = auth()->user();
        $esAdmin = $user && $user->role_id === 1;

        $query = Noticia::whereIn('tipo', ['novedad', 'producto', 'artista'])->latest();

        if (!$esAdmin) {
            $ultimasNoticias = $query->where('esta_oculta', false)->take(3)->get();
        } else {
            $ultimasNoticias = $query->take(10)->get();
        }

        return Inertia::render('home', [
            'fechaFestival' => $fechaFestival,
            'ultimasNoticias' => $ultimasNoticias
        ]);
    }

    public function informacion()
    {
        $user = auth()->user();
        $esAdmin = $user && $user->role_id === 1;

        $query = Noticia::whereIn('tipo', ['novedad', 'producto', 'artista']);

        if (!$esAdmin) {
            $query->where('esta_oculta', false);
        }

        return Inertia::render('Informacion', [
            'novedades' => $query->latest()->get(),
            'horario' => AjusteFestival::where('clave', 'horario')->value('valor'),
            'ubicacion' => AjusteFestival::where('clave', 'ubicacion')->value('valor'),
            'normas' => AjusteFestival::where('clave', 'normas')->value('valor'),
            'mapa_src' => AjusteFestival::where('clave', 'mapa_src')->value('valor'),
        ]);
    }
    public function index()
    {
        return Inertia::render('Admin/Noticias/Index', [
            'noticias' => Noticia::latest()->get()
        ]);
    }

    public function create()
    {
        session(['url.anterior' => url()->previous()]);

        return Inertia::render('Admin/Noticias/Create');
    }

    public function edit(Noticia $noticia)
    {
        session(['url.anterior' => url()->previous()]);

        return Inertia::render('Admin/Noticias/Edit', [
            'noticia' => $noticia
        ]);
    }

    public function cambiarVisibilidad($id)
    {
        $noticia = Noticia::findOrFail($id);
        $noticia->esta_oculta = !$noticia->esta_oculta;
        $noticia->save();

        return back()->with('message', 'Visibilidad actualizada');
    }

    public function update(Request $request, Noticia $noticia)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
            'tipo' => 'required|string|in:novedad,producto,artista', // <-- Agregada validación estricta del tipo
            'imagen' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('imagen')) {
            $estaSiendoUsada = \App\Models\Artista::where('imagen', $noticia->imagen)->exists();

            if ($noticia->imagen && !$estaSiendoUsada) {
                \Storage::disk('public')->delete($noticia->imagen);
            }

            $validated['imagen'] = $request->file('imagen')->store('noticias', 'public');
        } else {
            unset($validated['imagen']);
        }

        $noticia->update($validated);

        $url = session('url.anterior', route('admin.noticias.index'));
        return redirect($url)->with('message', 'Noticia actualizada correctamente');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'contenido' => 'required|string',
            'tipo' => 'required|string',
            'imagen' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('noticias', 'public');
            $validated['imagen'] = $path;
        }

        Noticia::create($validated);
        $url = session('url.anterior', route('admin.noticias.index'));
        return redirect($url)->with('message', 'Noticia creada correctamente');
    }

    public function destroy(Noticia $noticia)
    {
        $noticia->delete();
        return redirect()->back()->with('message', 'Noticia eliminada');
    }

}