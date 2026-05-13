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
                'imagen' => 'https://www.letrasboom.com/thumbs/artistas/img_1576275520.jpg',
                'es_headliner' => true,
                'dia_id' => $dia23->id,
                'orden' => 1
            ],
            [
                'nombre' => 'Ruth Empoderada',
                'imagen' => 'https://yt3.googleusercontent.com/aBdPWXwbaO_G-d-czMNsnZ7G3baSPRUI44f4fFfh4rllyAxJQLrGRy6VxdX_xYdwedGLHnX_=s900-c-k-c0x00ffffff-no-rj',
                'es_headliner' => false,
                'dia_id' => $dia23->id,
                'orden' => 2
            ],
            [
                'nombre' => 'Lia Kali',
                'imagen' => 'https://los40.com/resizer/v2/PQX7K2UGRVCVRKLKD3CD2EVNIM.jpg?auth=bcae38e8e9eaf876c74cf20a20f66340eb44c0ecd2502c72d81e979a2006ffc5&quality=70&width=706&height=706&focal=1947,1307',
                'es_headliner' => false,
                'dia_id' => $dia23->id,
                'orden' => 3
            ],
                        [
                'nombre' => 'Duki',
                'imagen' => 'https://concertmusicfestival.com/wp-content/uploads/2023/03/Duki_Concert_Music_Festival_2023.jpg',
                'es_headliner' => false,
                'dia_id' => $dia23->id,
                'orden' => 4
            ],
            // DÍA 24
            [
                'nombre' => 'Quevedo',
                'imagen' => 'https://www.lavanguardia.com/uploads/2024/10/31/6723516957b50.jpeg',
                'es_headliner' => true,
                'dia_id' => $dia24->id,
                'orden' => 1
            ],
            [
                'nombre' => 'Cruz Cafuné',
                'imagen' => 'https://concertmusicfestival.com/wp-content/uploads/2024/11/Cruz-Cafune_1000x1000.jpg',
                'es_headliner' => false,
                'dia_id' => $dia24->id,
                'orden' => 2
            ],
            // DÍA 25
            [
                'nombre' => 'Trueno',
                'imagen' => 'https://coolcoruna.com/wp-content/uploads/2025/03/Trueno-foto-promo-1-683x1024.jpg',
                'es_headliner' => true,
                'dia_id' => $dia25->id,
                'orden' => 1
            ],
            [
                'nombre' => 'Young Miko',
                'imagen' => 'https://hips.hearstapps.com/hmg-prod/images/photo-feb-16-2024-7-49-10-pm-660f6efbe410b.jpg?crop=1.00xw:0.667xh;0,0.234xh&resize=640:*',
                'es_headliner' => false,
                'dia_id' => $dia25->id,
                'orden' => 2
            ],
        ];

        foreach ($artistas as $artista) {
            Artista::create($artista);
        }
    }
}