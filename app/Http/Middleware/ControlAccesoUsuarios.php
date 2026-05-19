<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ControlAccesoUsuarios
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $usuario = Auth::user();

            if (!$usuario->acceso_permitido) {
                Auth::logout();

                $request->session()->invalidate();
                $request->session()->regenerateToken();

                return redirect()->route('login')->withErrors([
                    'email' => 'Tu cuenta ha sido suspendida. No tienes permitido el acceso al sistema.',
                ]);
            }
        }

        return $next($request);
    }
}