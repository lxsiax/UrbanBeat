<?php

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\Compra;
use App\Models\Dia;
use App\Models\Entrada;
use App\Models\Factura; // Corregido el nombre que estaba como Fa1ctura
use App\Models\Mensaje;
use App\Models\Producto;
use App\Models\Role;
use App\Models\Talla;
use App\Models\TipoEntrada;
use App\Models\User;
use App\Models\Zona;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. ROLES
        $adminRol = Role::create(['nombre' => 'Admin']);
        $clienteRol = Role::create(['nombre' => 'Cliente']);

        // 2. USUARIOS
        $admin = User::create([
            'name' => 'Admin',
            'apellidos' => 'UrbanBeat',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin'),
            'fecha_registro' => Carbon::now(),
            'role_id' => $adminRol->id,
        ]);

        $usuario = User::create([
            'name' => 'Juan',
            'apellidos' => 'Pérez',
            'email' => 'juan@juan.com',
            'password' => Hash::make('juan'),
            'fecha_registro' => Carbon::now(),
            'role_id' => $clienteRol->id,
        ]);

        // 3. ZONAS Y DÍAS
        $zonaGeneral = Zona::create(['nombre' => 'Pista General', 'aforo' => 5000]);
        $front = Zona::create(['nombre' => 'Front Stage', 'aforo' => 300]);

        $dia1 = Dia::create(['fecha' => '2026-07-23']);
        $dia2 = Dia::create(['fecha' => '2026-07-24']);

        // 4. TIPOS DE ENTRADA Y ENTRADAS
        $tipoGeneral = TipoEntrada::create(['nombre' => 'Abono General']);
        $tipoDia = TipoEntrada::create(['nombre' => 'Entrada de Día', 'dia_id' => $dia1->id]);

        $entrada1 = Entrada::create([
            'tipo_entrada_id' => $tipoGeneral->id,
            'zona_id' => $front->id,
            'precio' => 120.50,
            'stock' => 3000
        ]);

        // 5. TALLAS
        $tallaS = Talla::create(['nombre' => 'S']);
        $tallaM = Talla::create(['nombre' => 'M']);
        $tallaL = Talla::create(['nombre' => 'L']);

        // 6. PRODUCTOS (Cada talla es un producto diferente 1:N)
        $productoM = Producto::create([
            'nombre' => 'Camiseta Oficial UrbanBeat',
            'descripcion' => 'Talla M - Camiseta oficial',
            'precio' => 20.00,
            'stock' => 100,
            'talla_id' => $tallaM->id
        ]);

        $productoL = Producto::create([
            'nombre' => 'Camiseta Oficial UrbanBeat',
            'descripcion' => 'Talla L - Camiseta oficial',
            'precio' => 20.00,
            'stock' => 100,
            'talla_id' => $tallaL->id
        ]);

        // 7. "CARRITO" (Relación directa N:M con el Usuario)
        // Juan guarda una entrada y dos camisetas en su perfil
        $usuario->entradas()->attach($entrada1->id, ['cantidad' => 1]);
        $usuario->productos()->attach($productoM->id, ['cantidad' => 2]);

        // 8. CHAT Y MENSAJES
        $chat = Chat::create([
            'nombre' => 'General',
            'descripcion' => 'Chat oficial para todos los asistentes'
        ]);

        Mensaje::create([
            'chat_id' => $chat->id,
            'user_id' => $usuario->id,
            'contenido' => '¡Hola a todos! ¿Cuándo abren las puertas?'
        ]);

        // 9. COMPRA (Se realiza volcando lo que hay en el usuario)
        $compra = Compra::create([
            'total' => 160.50, 
            'estado' => 'Pagado',
            'user_id' => $usuario->id,
            // carrito_id ha sido eliminado de la migración de compras
        ]);

        // 10. FACTURAS (Reflejan lo que el usuario tenía almacenado)
        
        // Facturamos la Entrada
        Factura::create([
            'compra_id' => $compra->id,
            'entrada_id' => $entrada1->id,
            'producto_id' => null,
            'talla_id' => null, // Las entradas no suelen llevar talla
            'cantidad' => 1,
            'precio_unitario' => 120.50,
        ]);

        // Facturamos los Productos (Usando la talla del producto directamente)
        Factura::create([
            'compra_id' => $compra->id,
            'producto_id' => $productoM->id,
            'entrada_id' => null,
            'talla_id' => $productoM->talla_id,
            'cantidad' => 2,
            'precio_unitario' => 20.00,
        ]);

        // NOTA: En la lógica real del controlador, aquí harías:
        // $usuario->productosEnCarrito()->detach();
        // $usuario->entradasEnCarrito()->detach();
    }
}