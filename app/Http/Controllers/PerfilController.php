<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Compra;
use App\Models\Asistente;
use Barryvdh\DomPDF\Facade\Pdf;

class PerfilController extends Controller
{
    public function index()
    {
        $usuario = Auth::user();

        $compras = Compra::where('user_id', $usuario->id)
            ->with(['facturas.producto', 'facturas.entrada.tipoEntrada', 'facturas.entrada.zona', 'facturas.talla'])
            ->orderBy('created_at', 'desc')
            ->get();

        $entradas = Asistente::whereHas('compra', function ($query) use ($usuario) {
            $query->where('user_id', $usuario->id)->where('estado', 'Pagado');
        })
            ->with(['entrada.tipoEntrada.dia', 'entrada.zona']) 
            ->get();

        return Inertia::render('Perfil', [
            'usuario' => $usuario,
            'compras' => $compras,
            'entradas' => $entradas
        ]);
    }

    public function descargarEntradaPdf($id)
    {
        $asistente = Asistente::where('id', $id)
            ->whereHas('compra', function ($query) {
                $query->where('user_id', Auth::id());
            })
            ->with(['entrada.tipoEntrada', 'entrada.zona'])
            ->firstOrFail();

        $datosQr = json_encode([
            'ticket_id' => $asistente->id,
            'dni' => $asistente->dni,
            'nombre' => $asistente->nombre,
            'tipo' => $asistente->entrada->tipoEntrada->nombre ?? 'Entrada',
            'zona' => $asistente->entrada->zona->nombre ?? 'General'
        ]);

        $urlApi = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' . urlencode($datosQr);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $urlApi);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $imagenDatos = curl_exec($ch);
        curl_close($ch);

        $qrcode = 'data:image/png;base64,' . base64_encode($imagenDatos);

        $pdf = Pdf::loadView('pdf.entrada', compact('asistente', 'qrcode'));

        return $pdf->download('Ticket_UrbanBeat_' . $asistente->id . '.pdf');
    }
}