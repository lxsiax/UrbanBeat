<?php

namespace App\Http\Controllers;

use App\Models\Entrada;
use App\Models\Producto;
use App\Models\Talla;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CarritoController extends Controller
{
    public function index()
    {
        $usuario = Auth::user();

        $entradas = $usuario->entradas()
            ->with(['tipoEntrada', 'zona'])
            ->get()
            ->map(function ($entrada) {
                return [
                    'id' => $entrada->id,
                    'carrito_id' => 'entrada_' . $entrada->id,
                    'tipo' => 'entrada',
                    'nombre' => $entrada->tipoEntrada->nombre,
                    'detalle' => 'Zona: ' . $entrada->zona->nombre,
                    'precio' => (float) $entrada->precio,
                    'cantidad' => $entrada->pivot->cantidad,
                    'imagen' => null,
                ];
            });

        $productos = $usuario->productos()
            ->with(['tallas'])
            ->get()
            ->map(function ($producto) {
                $talla = Talla::find($producto->pivot->talla_id);

                return [
                    'id' => $producto->id,
                    'carrito_id' => 'producto_' . $producto->pivot->id, // ID del registro pivote
                    'tipo' => 'merchandising',
                    'nombre' => $producto->nombre,
                    'detalle' => $talla ? 'Talla: ' . $talla->nombre : 'Talla única',
                    'precio' => (float) $producto->precio,
                    'cantidad' => $producto->pivot->cantidad,
                    'imagen' => $producto->imagen_url ? "/storage/{$producto->imagen_url}" : '/img/placeholder.jpg',
                ];
            });

        $articulos = $entradas->concat($productos);

        $total = $articulos->sum(fn($articulo) => $articulo['precio'] * $articulo['cantidad']);

        return Inertia::render('Carrito', [
            'articulos' => $articulos,
            'total' => (float) $total
        ]);
    }

    public function aniadirProducto(Request $request)
    {
        $request->validate([
            'producto_id' => 'required|exists:productos,id',
            'talla_id' => 'nullable|exists:tallas,id',
            'cantidad' => 'required|integer|min:1'
        ]);

        $usuario = Auth::user();
        $productoId = $request->producto_id;
        $tallaId = $request->talla_id;
        $cantidadNueva = $request->cantidad;

        $producto = Producto::findOrFail($productoId);

        if ($tallaId) {
            $tallaInventario = $producto->tallas()->where('talla_id', $tallaId)->first();

            if (!$tallaInventario || $tallaInventario->pivot->stock < $cantidadNueva) {
                return redirect()->back()->withErrors(['error' => 'No hay suficiente stock disponible para esta talla.']);
            }
        }

        $productoEnCarrito = $usuario->productos()
            ->where('producto_id', $productoId)
            ->where('talla_id', $tallaId)
            ->first();

        if ($productoEnCarrito) {
            $cantidadFinal = $productoEnCarrito->pivot->cantidad + $cantidadNueva;

            if ($tallaId && $tallaInventario->pivot->stock < $cantidadFinal) {
                return redirect()->back()->withErrors(['error' => 'No puedes añadir más unidades de las disponibles en stock.']);
            }

            DB::table('producto_user')
                ->where('user_id', $usuario->id)
                ->where('producto_id', $productoId)
                ->where('talla_id', $tallaId)
                ->update(['cantidad' => $cantidadFinal, 'updated_at' => now()]);

        } else {
            $usuario->productos()->attach($productoId, [
                'talla_id' => $tallaId,
                'cantidad' => $cantidadNueva
            ]);
        }

        return redirect()->back();
    }

    /**
     * Actualiza la cantidad de cualquier artículo
     */
    public function actualizar(Request $request, $id)
    {
        $request->validate(['cantidad' => 'required|integer|min:1']);
        $usuario = Auth::user();


        if (str_starts_with($id, 'entrada_')) {
            $entradaId = str_replace('entrada_', '', $id);
            
            $entrada = Entrada::findOrFail($entradaId);
            if ($entrada->stock < $request->cantidad) {
                return redirect()->back()->withErrors(['error' => 'No hay suficiente stock disponible para esta entrada.']);
            }

            $usuario->entradas()->updateExistingPivot($entradaId, [
                'cantidad' => $request->cantidad
            ]);

        } elseif (str_starts_with($id, 'producto_')) {
            $pivotId = str_replace('producto_', '', $id);

            $filaCarrito = DB::table('producto_user')->where('id', $pivotId)->first();

            if ($filaCarrito) {
                $producto = Producto::findOrFail($filaCarrito->producto_id);
                $tallaInventario = $producto->tallas()->where('talla_id', $filaCarrito->talla_id)->first();

                if ($tallaInventario && $tallaInventario->pivot->stock < $request->cantidad) {
                    return redirect()->back()->withErrors(['error' => 'No hay suficiente stock de la talla seleccionada.']);
                }

                DB::table('producto_user')
                    ->where('id', $pivotId)
                    ->update(['cantidad' => $request->cantidad, 'updated_at' => now()]);
            }
        }

        return redirect()->back();
    }

    /**
     * Elimina cualquier artículo del carrito
     */
    public function eliminar($id)
    {
        $usuario = Auth::user();

        if (str_starts_with($id, 'entrada_')) {
            $entradaId = str_replace('entrada_', '', $id);
            $usuario->entradas()->detach($entradaId);

        } elseif (str_starts_with($id, 'producto_')) {
            $pivotId = str_replace('producto_', '', $id);
            
            DB::table('producto_user')->where('id', $pivotId)->delete();
        }

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

        $entrada = Entrada::findOrFail($entradaId);
        if ($entrada->stock < $cantidadNueva) {
            return redirect()->back()->withErrors(['error' => 'No hay suficiente stock disponible.']);
        }

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