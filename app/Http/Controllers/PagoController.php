<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Models\Compra;
use App\Models\Factura;
use App\Models\Asistente;
use App\Mail\ConfirmacionCompraMail;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;

class PagoController extends Controller
{
    public function iniciarPago(Request $request)
    {
        $request->validate([
            'total' => 'required|numeric|min:0.01',
            'asistentes' => 'nullable|array',
            'asistentes.*.entrada_id' => 'required|integer',
            'asistentes.*.nombre' => 'required|string|max:255',
            'asistentes.*.dni' => 'required|string|max:20',
            'asistentes.*.email' => 'required|email|max:255',
            'asistentes.*.numero' => 'required|string|max:20',
        ]);

        $user = auth()->user();
        if (!$user) {
            return back()->withErrors(['error' => 'Debes estar autenticado para realizar el pago.']);
        }

        $entradasCarrito = DB::table('entrada_user')
            ->join('entradas', 'entrada_user.entrada_id', '=', 'entradas.id')
            ->join('tipo_entradas', 'entradas.tipo_entrada_id', '=', 'tipo_entradas.id')
            ->where('entrada_user.user_id', $user->id)
            ->select('entradas.id', 'tipo_entradas.nombre as nombre', 'entradas.precio', 'entrada_user.cantidad')
            ->get()
            ->map(function($item) {
                return [
                    'id' => $item->id,
                    'nombre' => $item->nombre,
                    'precio' => $item->precio,
                    'cantidad' => $item->cantidad,
                    'tipo' => 'entrada'
                ];
            })->toArray();

        $productosCarrito = DB::table('producto_user')
            ->join('productos', 'producto_user.producto_id', '=', 'productos.id')
            ->where('producto_user.user_id', $user->id)
            ->select('productos.id', 'productos.nombre', 'productos.precio', 'producto_user.cantidad')
            ->get()
            ->map(function($item) {
                return [
                    'id' => $item->id,
                    'nombre' => $item->nombre,
                    'precio' => $item->precio,
                    'cantidad' => $item->cantidad,
                    'tipo' => 'merchandising'
                ];
            })->toArray();

        $itemsTotales = array_merge($entradasCarrito, $productosCarrito);

        if (empty($itemsTotales)) {
            return back()->withErrors(['error' => 'Tu carrito en la base de datos está vacío.']);
        }

        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        $total = $request->input('total');
        $asistentes = $request->input('asistentes', []);

        try {
            $metadata = [
                'user_id' => $user->id, 
                'asistentes_json' => json_encode($asistentes),
                'carrito_json' => json_encode($itemsTotales) 
            ];

            $session = \Stripe\Checkout\Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => 'Compra Total — UrbanBeat Festival',
                            'description' => 'Entradas y Merchandising oficial del festival.',
                        ],
                        'unit_amount' => $total * 100,
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'metadata' => $metadata, 
                'success_url' => route('pago.exito') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('pago.cancelado'),
            ]);

            return Inertia::location($session->url);

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Error con Stripe: ' . $e->getMessage()]);
        }
    }

    public function exito(Request $request)
    {
        $sessionId = $request->query('session_id');
        if (!$sessionId) { 
            return redirect()->route('carrito.index')->with('error', 'No se encontró sesión de pago.'); 
        }

        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

        try {
            $sessionStripe = \Stripe\Checkout\Session::retrieve($sessionId);

            if ($sessionStripe->payment_status !== 'paid') {
                return redirect()->route('carrito.index')->with('error', 'El pago no ha sido completado.');
            }

            $userId = $sessionStripe->metadata->user_id;
            
            $asistentesData = json_decode($sessionStripe->metadata->asistentes_json ?? '[]', true);
            $articulosComprados = json_decode($sessionStripe->metadata->carrito_json ?? '[]', true);

            DB::beginTransaction();

            $compra = Compra::create([
                'user_id' => $userId,
                'total' => $sessionStripe->amount_total / 100, 
                'estado' => 'Pagado'
            ]);

            foreach ($asistentesData as $asistente) {
                Asistente::create([
                    'compra_id' => $compra->id,
                    'entrada_id' => $asistente['entrada_id'],
                    'nombre' => $asistente['nombre'],
                    'dni' => $asistente['dni'],
                    'email' => $asistente['email'],
                    'numero' => $asistente['numero'], 
                ]);
            }

            foreach ($articulosComprados as $articulo) {
                Factura::create([
                    'compra_id' => $compra->id,
                    'producto_id' => $articulo['tipo'] === 'merchandising' ? $articulo['id'] : null,
                    'entrada_id' => $articulo['tipo'] === 'entrada' ? $articulo['id'] : null,
                    'talla_id' => $articulo['talla_id'] ?? null, 
                    'cantidad' => $articulo['cantidad'],
                    'precio_unitario' => $articulo['precio'],
                ]);
            }

            DB::table('entrada_user')->where('user_id', $userId)->delete();
            DB::table('producto_user')->where('user_id', $userId)->delete();

            $compra->load(['user', 'facturas.entrada', 'facturas.producto', 'asistentes']);

            $pdf = Pdf::loadView('pdf.factura', compact('compra'));
            $pdfOutput = $pdf->output();

            if ($compra->user && $compra->user->email) {
                Mail::to($compra->user->email)->send(new ConfirmacionCompraMail($compra, $pdfOutput));
            }

            DB::commit();

            return Inertia::render('PagoExito', [
                'compra_id' => $compra->id
            ]);

        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage(),
                'linea' => $e->getLine(),
                'archivo' => $e->getFile()
            ], 500);
        }
    }

    public function descargarPdf($id)
    {
        $compra = Compra::with(['user', 'facturas.entrada', 'facturas.producto', 'asistentes'])->findOrFail($id);
        
        if (auth()->check() && auth()->id() !== $compra->user_id) {
            abort(403, 'Acceso no autorizado.');
        }

        $pdf = Pdf::loadView('pdf.factura', compact('compra'));
        return $pdf->stream('Factura_UrbanBeat_#UB-' . $compra->id . '.pdf');
    }

    public function cancelado()
    {
        return redirect()->route('carrito.index')->with('error', 'El pago fue cancelado.');
    }
}