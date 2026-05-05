<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Entrada;

Route::get('/', function () {
    return Inertia::render('home');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('auth/login');
    })->name('login');

    Route::post('/login', function (Request $request) {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/');
        }

        return back()->withErrors(['email' => 'Las credenciales no coinciden.'])->onlyInput('email');
    });

    Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', function (Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    })->name('logout');

    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/entradas', [AdminController::class, 'entradas'])->name('admin.entradas.index');
    Route::patch('/admin/entradas/{id}', [AdminController::class, 'updateEntrada'])->name('admin.entradas.update');
});

Route::get('/entradas', function (Request $request) {
    $query = Entrada::with(['tipoEntrada.dia', 'zona']);

    if ($request->tipo === 'abono') {
        $query->whereHas('tipoEntrada', fn($q) => $q->whereNull('dia_id'));
    }

    if ($request->dia) {
        $query->whereHas('tipoEntrada.dia', fn($q) => $q->where('fecha', $request->dia));
    }

    return Inertia::render('Entradas', [
        'entradas' => $query->get(),
        'titulo' => $request->tipo === 'abono' ? 'Abonos Generales' : ($request->dia ? 'Entradas Diarias' : 'Tickets')
    ]);
});

require __DIR__.'/settings.php';