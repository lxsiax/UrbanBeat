<?php

namespace Database\Seeders;

use App\Models\Artista;
use App\Models\Chat;
use App\Models\Dia;
use App\Models\Entrada;
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
    public function run(): void
    {
        // --- ROLES Y USUARIOS ---
        $adminRol = Role::create(['nombre' => 'Admin']);
        $clienteRol = Role::create(['nombre' => 'Cliente']);

        User::create([
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

        // --- ZONAS Y DÍAS ---
        $zonaPista = Zona::create(['nombre' => 'Pista', 'aforo' => 5000]);
        $zonaGrada = Zona::create(['nombre' => 'Grada', 'aforo' => 3000]);
        $zonaFront = Zona::create(['nombre' => 'Front Stage', 'aforo' => 500]);

        $dia23 = Dia::create(['fecha' => '2026-07-23']);
        $dia24 = Dia::create(['fecha' => '2026-07-24']);
        $dia25 = Dia::create(['fecha' => '2026-07-25']);

        // --- ENTRADAS ---
        $tipoAbono = TipoEntrada::create(['nombre' => 'Abono General', 'dia_id' => null]);
        $tipoD23 = TipoEntrada::create(['nombre' => 'Entrada 23 de Julio', 'dia_id' => $dia23->id]);
        $tipoD24 = TipoEntrada::create(['nombre' => 'Entrada 24 de Julio', 'dia_id' => $dia24->id]);
        $tipoD25 = TipoEntrada::create(['nombre' => 'Entrada 25 de Julio', 'dia_id' => $dia25->id]);

        $tipos = [$tipoAbono, $tipoD23, $tipoD24, $tipoD25];
        $preciosBase = [
            'Abono General' => ['Pista' => 120, 'Grada' => 100, 'Front Stage' => 170],
            'Entrada de Día' => ['Pista' => 60, 'Grada' => 45, 'Front Stage' => 100]
        ];

        foreach ($tipos as $tipo) {
            $categoria = ($tipo->nombre === 'Abono General') ? 'Abono General' : 'Entrada de Día';
            Entrada::create(['tipo_entrada_id' => $tipo->id, 'zona_id' => $zonaPista->id, 'precio' => $preciosBase[$categoria]['Pista'], 'stock' => 1000]);
            Entrada::create(['tipo_entrada_id' => $tipo->id, 'zona_id' => $zonaGrada->id, 'precio' => $preciosBase[$categoria]['Grada'], 'stock' => 800]);
            Entrada::create(['tipo_entrada_id' => $tipo->id, 'zona_id' => $zonaFront->id, 'precio' => $preciosBase[$categoria]['Front Stage'], 'stock' => 200]);
        }

        // --- TALLAS ---
        $tallaS = Talla::create(['nombre' => 'S']);
        $tallaM = Talla::create(['nombre' => 'M']);
        $tallaL = Talla::create(['nombre' => 'L']);
        $tallaXL = Talla::create(['nombre' => 'XL']);
        $tallaUnica = Talla::create(['nombre' => 'Única']);

        // --- PRODUCTOS Y STOCKS ---

        // 1. Camiseta (Con tallas múltiples)
        $camiseta = Producto::create([
            'nombre' => 'Camiseta UrbanBeat',
            'descripcion' => 'Edición 2026 oficial del festival',
            'precio' => 25.00,
            'esta_oculto' => false,
            'imagen_url' => 'productos/camisetabuena.png',
        ]);
        $camiseta->tallas()->attach([
            $tallaS->id => ['stock' => 25],
            $tallaM->id => ['stock' => 50],
            $tallaL->id => ['stock' => 20],
            $tallaXL->id => ['stock' => 5],
        ]);

        // 2. Gafas (Talla Única)
        $gafas = Producto::create([
            'nombre' => 'Gafas UrbanBeat',
            'descripcion' => 'Gafas de sol. Perfectas para disfrutar del festival tranquilo.',
            'precio' => 15.00,
            'esta_oculto' => false,
            'imagen_url' => 'productos/gafas.png',
        ]);
        $gafas->tallas()->attach($tallaUnica->id, ['stock' => 100]);

        // 3. Gorra (Talla Única)
        $gorra = Producto::create([
            'nombre' => 'Gorra UrbanBeat',
            'descripcion' => 'Una gorra moderna de UrbanBeat para disfrutar del festival fresquito',
            'precio' => 12.00,
            'esta_oculto' => false,
            'imagen_url' => 'productos/gorra.png',
        ]);
        $gorra->tallas()->attach($tallaUnica->id, ['stock' => 75]);

        // 4. Botella (Talla Única)
        $botella = Producto::create([
            'nombre' => 'Botella UrbanBeat',
            'descripcion' => 'Con esta botella termo, podrás llevar todas tus bebidas fresquitas',
            'precio' => 20.00,
            'esta_oculto' => false,
            'imagen_url' => 'productos/botella.png',
        ]);
        $botella->tallas()->attach($tallaUnica->id, ['stock' => 150]);


        // --- OTROS ---
        Chat::create(['nombre' => 'General', 'descripcion' => 'Chat oficial']);

        $artistas = [
            ['nombre' => 'Bad Gyal', 'imagen' => 'artistas/badgyal.jpeg', 'es_headliner' => true, 'dia_id' => $dia23->id, 'esta_oculto' => false, 'link_spotify' => 'https://open.spotify.com/intl-es/artist/4F4pp8NUW08JuXwnoxglpN?si=6386f732291f4836', 'orden' => 1],
            ['nombre' => 'Lia Kali', 'imagen' => 'artistas/lia.jpg', 'es_headliner' => false, 'esta_oculto' => false, 'dia_id' => $dia23->id, 'link_spotify' => 'https://open.spotify.com/intl-es/artist/7rFHoDuiSlV0DGHxckjm89?si=bb30d6e2eb2f4639', 'orden' => 3],
            ['nombre' => 'Duki', 'imagen' => 'artistas/duki.jpg', 'es_headliner' => false, 'link_spotify' => 'https://open.spotify.com/intl-es/artist/1bAftSH8umNcGZ0uyV7LMg?si=2138df945e2243f5', 'dia_id' => $dia23->id, 'esta_oculto' => false, 'orden' => 4],
            ['nombre' => 'Quevedo', 'imagen' => 'artistas/quevedo.jpeg', 'es_headliner' => true, 'dia_id' => $dia24->id, 'link_spotify' => 'https://open.spotify.com/intl-es/artist/52iwsT98xCoGgiGntTiR7K?si=081ffb2a73b64396', 'esta_oculto' => false, 'orden' => 1],
            ['nombre' => 'Cruz Cafuné', 'imagen' => 'artistas/cruzi.jpg', 'es_headliner' => false, 'link_spotify' => 'https://open.spotify.com/intl-es/artist/0jeYkqwckGJoHQhhXwgzk3?si=0ad7321704184438', 'dia_id' => $dia24->id, 'esta_oculto' => false, 'orden' => 2],
            ['nombre' => 'Trueno', 'imagen' => 'artistas/trueno.jpg', 'es_headliner' => true, 'dia_id' => $dia25->id, 'link_spotify' => 'https://open.spotify.com/intl-es/artist/2x7PC78TmgqpEIjaGAZ0Oz?si=02ddbab14ea84349', 'esta_oculto' => false, 'orden' => 1],
            ['nombre' => 'Young Miko', 'imagen' => 'artistas/miko.jpg', 'es_headliner' => false, 'dia_id' => $dia25->id, 'link_spotify' => 'https://open.spotify.com/intl-es/artist/3qsKSpcV3ncke3hw52JSMB?si=aea7becc516847be', 'esta_oculto' => false, 'orden' => 2],
        ];

        foreach ($artistas as $artista) {
            Artista::create($artista);
        }
    }
}