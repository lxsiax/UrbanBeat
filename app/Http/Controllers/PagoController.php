<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class PagoController extends Controller
{
    public function iniciarPago(Request $request)
    {
        Stripe::setApiKey(config('services.stripe.secret') ?? env('STRIPE_SECRET'));

        $total = $request->input('total', 0);

        if ($total <= 0) {
            return back()->withErrors(['error' => 'El total debe ser mayor a 0']);
        }

        try {
            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [
                    [
                        'price_data' => [
                            'currency' => 'eur',
                            'product_data' => [
                                'name' => 'Compra en UrbanBeat Festival',
                                'description' => 'Entradas y/o merchandising',
                            ],
                            'unit_amount' => $total * 100,
                        ],
                        'quantity' => 1,
                    ]
                ],
                'mode' => 'payment',
                'success_url' => route('pago.exito') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('pago.cancelado'),
            ]);

            return Inertia::location($session->url);

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Error al conectar con Stripe: ' . $e->getMessage()]);
        }
    }

    public function exito(Request $request)
    {
        return view('pago-exito');
    }

    public function cancelado()
    {
        return redirect()->route('carrito.index')->with('error', 'El pago fue cancelado.');
    }
}