<?php 

namespace App\Http\Controllers;

use App\Models\Entrada;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CarritoController extends Controller
{
    public function index()
    {
        $usuario = Auth::user();

        $articulos = $usuario->entradas()
            ->with(['tipoEntrada', 'zona']) 
            ->get()
            ->map(function ($entrada) {
                return [
                    'id'       => $entrada->id,
                    'nombre'   => $entrada->tipoEntrada->nombre, 
                    'zona'     => $entrada->zona->nombre,
                    'precio'   => (float) $entrada->precio,
                    'cantidad' => $entrada->pivot->cantidad,
                ];
            });

        $total = $articulos->sum(fn($articulo) => $articulo['precio'] * $articulo['cantidad']);

        return Inertia::render('Carrito', [
            'articulos' => $articulos,
            'total'     => (float) $total
        ]);
    }

    public function actualizar(Request $request, $id)
    {
        $request->validate(['cantidad' => 'required|integer|min:1']);

        Auth::user()->entradas()->updateExistingPivot($id, [
            'cantidad' => $request->cantidad
        ]);

        return redirect()->back();
    }

    public function eliminar($id)
    {
        Auth::user()->entradas()->detach($id);

        return redirect()->back();
    }

    public function aniadir(Request $request)
    {
        $request->validate([
            'entrada_id' => 'required|exists:entradas,id',
            'cantidad' => 'required|integer|min:1|max:10'
        ]);

        $usuario = Auth::user();
        $entradaId = $request->entrada_id;
        $cantidadNueva = $request->cantidad;

        // Compruebo el stock por si no hay suficiente
        $entrada = Entrada::findOrFail($entradaId);
        if ($entrada->stock < $cantidadNueva) {
            return redirect()->back()->withErrors(['error' => 'No hay suficiente stock disponible.']);
        }

        // Busco la entrada que va a modificar (si la hay)
        $entradaExistente = $usuario->entradas()->where('entrada_id', $entradaId)->first();

        if ($entradaExistente) {
            $usuario->entradas()->updateExistingPivot($entradaId, [
                'cantidad' => $entradaExistente->pivot->cantidad + $cantidadNueva
            ]);
        } else {
            $usuario->entradas()->attach($entradaId, ['cantidad' => $cantidadNueva]);
        }

        return redirect()->back();
    }
}