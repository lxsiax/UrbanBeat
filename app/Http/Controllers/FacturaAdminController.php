<?php

namespace App\Http\Controllers;

use App\Models\Compra;
use App\Models\Factura;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacturaAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = Compra::with(['user', 'facturas.producto', 'facturas.entrada.tipoEntrada'])
            ->latest();

        if ($request->filled('usuario')) {
            $query->whereHas('user', fn($q) => $q->where('name', 'like', "%{$request->usuario}%"));
        }
        if ($request->filled('fecha')) {
            $query->whereDate('created_at', $request->fecha);
        }

        $compras = $query->paginate(20);

        return Inertia::render('Admin/Facturas/Index', ['compras' => $compras]);
    }

    public function descargarPdf($id)
    {
        $compra = Compra::where('id', $id)
            ->with(['user', 'facturas.entrada.tipoEntrada', 'facturas.producto', 'facturas.talla', 'asistentes'])
            ->firstOrFail();

        $pdf = Pdf::loadView('pdf.factura', compact('compra'));

        return $pdf->download('Factura_UrbanBeat_UB-' . $compra->id . '.pdf');
    }

    public function destroy($id)
    {
        $compra = Compra::findOrFail($id);

        $compra->delete();

        return redirect()->route('admin.facturas.index')->with('success', 'Compra eliminada correctamente.');
    }
}
