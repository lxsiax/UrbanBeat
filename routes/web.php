<?php

use App\Http\Controllers\Admin\FestivalController;
use App\Http\Controllers\ArtistaController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\CartelController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\EntradaController;
use App\Http\Controllers\FacturaAdminController;
use App\Http\Controllers\MerchandisingController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PedidoAdminController;
use App\Http\Middleware\CheckAdmin;
use App\Models\AjusteFestival;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Entrada;
use App\Http\Controllers\NoticiaController;

// Rutas públicas
Route::get('/', [NoticiaController::class, 'home'])->name('home');

// Ruta para la sección de Información
Route::get('/informacion', [NoticiaController::class, 'informacion'])->name('informacion');

Route::get('/cartel', [CartelController::class, 'index'])->name('cartel.index');
Route::get('/merchandising', [MerchandisingController::class, 'index'])->name('merchandising');
Route::get('/merchandising/{id}', [ProductoController::class, 'show'])->name('merchandising.show');

// Rutas para usuarios no logueados
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

// Rutas para usuarios logueados
Route::middleware(['auth'])->group(function () {

    Route::post('/logout', function (Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    })->name('logout');

    Route::get('/perfil/entrada/{id}/pdf', [PerfilController::class, 'descargarEntradaPdf'])->name('perfil.entrada.pdf');

    Route::get('/perfil', [PerfilController::class, 'index'])->name('perfil.index');

    // Rutas del chat
    Route::get('/chat-general', [ChatController::class, 'chatGeneral'])->name('chat.general');
    Route::get('/chats/{chat}', [ChatController::class, 'show'])->name('chats.show');
    Route::post('/chats/{chat}/mensajes', [ChatController::class, 'enviarMensaje'])->name('chats.enviarMensaje');
    Route::post('/usuarios/{user}/banear', [ChatController::class, 'banearUsuario'])->name('usuarios.banear');

    // Rutas del carrito 
    Route::get('/carrito', [CarritoController::class, 'index'])->name('carrito.index');
    Route::post('/carrito/actualizar/{id}', [CarritoController::class, 'actualizar'])->name('carrito.actualizar');
    Route::delete('/carrito/eliminar/{id}', [CarritoController::class, 'eliminar'])->name('carrito.eliminar');
    Route::post('/carrito/aniadir', [CarritoController::class, 'aniadir'])->name('carrito.aniadir');
    Route::post('/carrito/agregar', [CarritoController::class, 'aniadirProducto'])->name('carrito.agregar');

    // Rutas para el pago
    Route::prefix('pago')->group(function () {
        Route::post('/iniciar', [PagoController::class, 'iniciarPago'])->name('pago.iniciar');
        Route::get('/exito', [PagoController::class, 'exito'])->name('pago.exito');
        Route::get('/confirmacion/{id}', [PagoController::class, 'confirmacion'])->name('pago.confirmacion');
        Route::get('/cancelado', [PagoController::class, 'cancelado'])->name('pago.cancelado');
    });
    Route::get('/pago/factura/{id}/pdf', [PagoController::class, 'descargarPdf'])->name('pago.pdf');

    // Rutas para el admin
    Route::middleware([CheckAdmin::class])->prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');

        //Rutas gestión del evento
        Route::get('/evento', [FestivalController::class, 'edit'])->name('admin.evento.edit');
        Route::patch('/evento/fecha', [FestivalController::class, 'updateFecha'])->name('admin.evento.update');
        Route::patch('/evento/contenidos', [FestivalController::class, 'updateContenidos'])
            ->name('admin.evento.contenidos');

        // Rutas crud usuarios
        Route::get('/usuarios', [UserController::class, 'index'])->name('usuarios.index');
        Route::patch('/usuarios/{usuario}/rol', [UserController::class, 'updateRole'])->name('usuarios.updateRole');
        Route::patch('/usuarios/{usuario}/acceso', [UserController::class, 'alternarAcceso'])->name('usuarios.acceso');
        Route::get('/usuarios/{id}/pedidos', [UserController::class, 'verPedidosUsuario'])->name('admin.usuarios.pedidos');
        Route::put('/pedidos/{compra}/estado-envio', [PedidoAdminController::class, 'actualizarEnvio'])->name('admin.pedidos.envio');

        // Rutas crud entradas
        Route::resource('entradas', EntradaController::class)->names([
            'index' => 'admin.entradas.index',
            'edit' => 'admin.entradas.edit',
            'create' => 'admin.entradas.create',
            'store' => 'admin.entradas.store',
            'update' => 'admin.entradas.update',
        ])->only(['index', 'edit', 'create', 'store', 'update']);

        // Rutas de noticias 
        Route::get('/noticias', [NoticiaController::class, 'index'])->name('admin.noticias.index');
        Route::get('/noticias/create', [NoticiaController::class, 'create'])->name('admin.noticias.create');
        Route::post('/noticias', [NoticiaController::class, 'store'])->name('admin.noticias.store');
        Route::get('/noticias/{noticia}/edit', [NoticiaController::class, 'edit'])->name('admin.noticias.edit');
        Route::put('/noticias/{noticia}', [NoticiaController::class, 'update'])->name('admin.noticias.update');
        Route::delete('/noticias/{noticia}', [NoticiaController::class, 'destroy'])->name('admin.noticias.destroy');

        // Rutas crud artistas 
        Route::resource('artistas', ArtistaController::class)->names([
            'index' => 'admin.artistas.index',
            'edit' => 'admin.artistas.edit',
            'create' => 'admin.artistas.create',
            'store' => 'admin.artistas.store',
            'update' => 'admin.artistas.update',
        ])->only(['index', 'edit', 'create', 'store', 'update']);

        // Rutas crud productos 
        Route::resource('productos', ProductoController::class)->names([
            'index' => 'admin.productos.index',
            'edit' => 'admin.productos.edit',
            'create' => 'admin.productos.create',
            'store' => 'admin.productos.store',
            'update' => 'admin.productos.update',
        ])->only(['index', 'edit', 'create', 'store', 'update']);

        //Rutas crud facturas
        Route::get('/facturas', [FacturaAdminController::class, 'index'])->name('admin.facturas.index');
        Route::get('/facturas/descargar-pdf/{id}', [FacturaAdminController::class, 'descargarPdf'])->name('admin.facturas.pdf');
        Route::delete('/facturas/{id}', [FacturaAdminController::class, 'destroy'])->name('admin.facturas.destroy');

        // Rutas de visibilidad para ocultar
        Route::patch('/entradas/{id}/cambiar-visibilidad', [EntradaController::class, 'cambiarVisibilidad'])
            ->name('admin.entradas.cambiarVisibilidad');
        Route::patch('/artistas/{id}/cambiar-visibilidad', [ArtistaController::class, 'cambiarVisibilidad'])
            ->name('admin.artistas.cambiarVisibilidad');
        Route::patch('/productos/{id}/cambiar-visibilidad', [ProductoController::class, 'cambiarVisibilidad'])
            ->name('admin.productos.cambiarVisibilidad');
        Route::post('/noticias/{id}/cambiar-visibilidad', [NoticiaController::class, 'cambiarVisibilidad'])->name('admin.noticias.cambiarVisibilidad');
    });
});

// Ruta de entradas
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

require __DIR__ . '/settings.php';