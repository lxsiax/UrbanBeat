<?php

namespace Database\Seeders;

use App\Models\Carrito;
use App\Models\Chat;
use App\Models\Compra;
use App\Models\Dia;
use App\Models\Entrada;
use App\Models\Factura;
use App\Models\Mensaje;
use App\Models\Producto;
use App\Models\Role;
use App\Models\Talla;
use App\Models\TipoEntrada;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        // User::factory(10)->create();

        // 1. ROLES
        $adminRol = Role::create(['nombre' => 'Admin']);
        $clienteRol = Role::create(['nombre' => 'Cliente']);

        // 2. USUARIOS
        $admin = User::create([
            'name' => 'Lucía',
            'apellidos' => 'Admin',
            'email' => 'admin@urbanbeat.com',
            'password' => Hash::make('password'),
            'fecha_registro' => Carbon::now(),
            'role_id' => $adminRol->id,
        ]);

        $usuario = User::create([
            'name' => 'Juan',
            'apellidos' => 'Pérez',
            'email' => 'juan@gmail.com',
            'password' => Hash::make('password'),
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

        $entrada2 = Entrada::create([
            'tipo_entrada_id' => $tipoDia->id,
            'zona_id' => $zonaGeneral->id,
            'precio' => 45.00,
            'stock' => 5000
        ]);

        // 5. PRODUCTOS Y TALLAS
        $tallaS = Talla::create(['nombre' => 'S']);
        $tallaM = Talla::create(['nombre' => 'M']);
        $tallaL = Talla::create(['nombre' => 'L']);

        $producto = Producto::create([
            'nombre' => 'Camiseta Oficial UrbanBeat',
            'descripcion' => 'Descripción de la camiseta oficial de UrbanBeat',
            'precio' => 20.00,
            'stock' => 200
        ]);

        // Relación N:M entre productos y tallas (asumiendo tabla producto_talla)
        $producto->tallas()->attach([$tallaS->id, $tallaM->id, $tallaL->id]);

        // 6. CARRITO (Creamos uno para el usuario Juan)
        $carrito = Carrito::create([
            'user_id' => $usuario->id,
        ]);

        // Añadimos una entrada y un producto al carrito (tablas pivote)
        $carrito->entradas()->attach($entrada1->id, ['cantidad' => 1]);
        $carrito->productos()->attach($producto->id, ['cantidad' => 2, 'talla_id' => $tallaM->id]);

        // 7. CHAT Y MENSAJES
        $chat = Chat::create([
            'nombre' => 'General',
            'descripcion' => 'Chat oficial para todos los asistentes'
        ]);

        Mensaje::create([
            'chat_id' => $chat->id,
            'user_id' => $usuario->id,
            'contenido' => '¡Hola a todos! ¿Cuándo abren las puertas del festival?'
        ]);

        Mensaje::create([
            'chat_id' => $chat->id,
            'user_id' => $admin->id,
            'contenido' => 'Hola Juan, abrimos a las 16:00 el viernes.'
        ]);
        // 8. COMPRAS (Cabecera del ticket)
        $compra = Compra::create([
            'total' => 160.50, // 120.50 (entrada) + 20.00*2 (camisetas)
            'estado' => 'Pagado',
            'user_id' => $usuario->id,
            'carrito_id' => $carrito->id,
        ]);

        // 9. FACTURAS (Detalles/Líneas de la compra)

        // Línea 1: La entrada
        Factura::create([
            'compra_id' => $compra->id,
            'producto_id' => null,
            'entrada_id' => $entrada1->id,
            'talla_id' => null,
            'cantidad' => 1,
            'precio_unitario' => 120.50,
        ]);

        // Línea 2: Las camisetas (2 unidades, como pusimos en el carrito)
        Factura::create([
            'compra_id' => $compra->id,
            'producto_id' => $producto->id,
            'entrada_id' => null,
            'talla_id' => $tallaM->id,
            'cantidad' => 2,
            'precio_unitario' => 20.00,
        ]);
    }
}
