<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Compra;
use Illuminate\Http\Request;

class PedidoAdminController extends Controller
{
    /**
     * Actualiza estrictamente el estado del envío físico (pagado, enviado, entregado o null)
     */
    public function actualizarEnvio(Request $request, Compra $compra)
    {
        $request->validate([
            'estado_envio' => 'nullable|in:pagado,enviado,entregado'
        ]);

        $nuevoEstado = $request->estado_envio;
        if ($nuevoEstado === '' || $nuevoEstado === 'null') {
            $nuevoEstado = null;
        }

        $compra->update([
            'estado_envio' => $nuevoEstado
        ]);

        return back();
    }
}