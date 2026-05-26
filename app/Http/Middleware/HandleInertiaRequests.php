<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $usuario = $request->user();
        $carritoCount = 0;

        if ($usuario) {
            $cantidadesEntradas = \DB::table('entrada_user')
                ->where('user_id', $usuario->id)
                ->sum('cantidad');

            $cantidadesProductos = \DB::table('producto_user')
                ->where('user_id', $usuario->id)
                ->sum('cantidad');

            $carritoCount = $cantidadesEntradas + $cantidadesProductos;
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $usuario ? [
                    'id' => $usuario->id,
                    'name' => $usuario->name,
                    'role_id' => $usuario->role_id,
                    'dni' => $request->user()->dni,
                ] : null,
                'carrito_count' => $carritoCount,
            ],
            'dias_evento' => \App\Models\Dia::orderBy('fecha', 'asc')->get(),
            'sidebarOpen' => !$request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
