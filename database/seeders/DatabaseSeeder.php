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

        $zonaPista = Zona::create(['nombre' => 'Pista', 'aforo' => 5000]);
        $zonaGrada = Zona::create(['nombre' => 'Grada', 'aforo' => 3000]);
        $zonaFront = Zona::create(['nombre' => 'Front Stage', 'aforo' => 500]);

        $dia23 = Dia::create(['fecha' => '2026-07-23']);
        $dia24 = Dia::create(['fecha' => '2026-07-24']);
        $dia25 = Dia::create(['fecha' => '2026-07-25']);

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

            Entrada::create([
                'tipo_entrada_id' => $tipo->id,
                'zona_id' => $zonaPista->id,
                'precio' => $preciosBase[$categoria]['Pista'],
                'stock' => 1000
            ]);

            Entrada::create([
                'tipo_entrada_id' => $tipo->id,
                'zona_id' => $zonaGrada->id,
                'precio' => $preciosBase[$categoria]['Grada'],
                'stock' => 800
            ]);

            Entrada::create([
                'tipo_entrada_id' => $tipo->id,
                'zona_id' => $zonaFront->id,
                'precio' => $preciosBase[$categoria]['Front Stage'],
                'stock' => 200
            ]);
        }

        $tallaM = Talla::create(['nombre' => 'M']);
        Producto::create([
            'nombre' => 'Camiseta UrbanBeat',
            'descripcion' => 'Edición 2026',
            'precio' => 25.00,
            'stock' => 100,
            'talla_id' => $tallaM->id
        ]);

        Chat::create([
            'nombre' => 'General',
            'descripcion' => 'Chat oficial'
        ]);

        $artistas = [
            // DÍA 23
            [
                'nombre' => 'Bad Gyal',
                'imagen' => 'public/artistas/badgyal.jpg',
                'es_headliner' => true,
                'dia_id' => $dia23->id,
                'esta_oculto' => false,
                'orden' => 1
            ],
            [
                'nombre' => 'Ruth Empoderada',
                'imagen' => 'public/artistas/ruth.jpg',
                'es_headliner' => false,
                'esta_oculto' => false,
                'dia_id' => $dia23->id,
                'orden' => 2
            ],
            [
                'nombre' => 'Lia Kali',
                'imagen' => 'public/artistas/lia.jpg',
                'es_headliner' => false,
                'esta_oculto' => false,
                'dia_id' => $dia23->id,
                'orden' => 3
            ],
                        [
                'nombre' => 'Duki',
                'imagen' => 'public/artistas/duki.jpg',
                'es_headliner' => false,
                'dia_id' => $dia23->id,
                'esta_oculto' => false,
                'orden' => 4
            ],
            // DÍA 24
            [
                'nombre' => 'Quevedo',
                'imagen' => 'public/artistas/quevedo.jpeg',
                'es_headliner' => true,
                'dia_id' => $dia24->id,
                'esta_oculto' => false,
                'orden' => 1
            ],
            [
                'nombre' => 'Cruz Cafuné',
                'imagen' => 'public/artistas/cruzi.jpg',
                'es_headliner' => false,
                'dia_id' => $dia24->id,
                'esta_oculto' => false,
                'orden' => 2
            ],
            // DÍA 25
            [
                'nombre' => 'Trueno',
                'imagen' => 'public/artistas/trueno.jpg',
                'es_headliner' => true,
                'dia_id' => $dia25->id,
                'esta_oculto' => false,
                'orden' => 1
            ],
            [
                'nombre' => 'Young Miko',
                'imagen' => 'public/artistas/miko.jpg',
                'es_headliner' => false,
                'dia_id' => $dia25->id,
                'esta_oculto' => false,
                'orden' => 2
            ],
        ];

        foreach ($artistas as $artista) {
            Artista::create($artista);
        }
    }
}