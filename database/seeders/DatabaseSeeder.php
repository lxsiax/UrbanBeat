<?php

namespace Database\Seeders;

use App\Models\Artista;
use App\Models\Chat;
use App\Models\Dia;
use App\Models\Entrada;
use App\Models\Noticia;
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
            'dni' => '55665566T',
            'password' => Hash::make('admin'),
            'fecha_registro' => Carbon::now(),
            'role_id' => $adminRol->id,
        ]);

        $usuario = User::create([
            'name' => 'Juan',
            'apellidos' => 'Pérez',
            'email' => 'juan@juan.com',
            'dni' => '22222222L',
            'password' => Hash::make('juan'),
            'fecha_registro' => Carbon::now(),
            'role_id' => $clienteRol->id,
        ]);

        User::create([
            'name' => 'Lucía',
            'apellidos' => 'Robles López',
            'dni' => '11111111A',
            'email' => 'lucia.robles@iesdonana.org',
            'password' => Hash::make('lucia'),
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
            'categoria' => 'ropa',
            'esta_oculto' => false,
            'imagen_url' => 'productos/camisetabuena.png',
        ]);
        $camiseta->tallas()->attach([
            $tallaS->id => ['stock' => 25],
            $tallaM->id => ['stock' => 50],
            $tallaL->id => ['stock' => 20],
            $tallaXL->id => ['stock' => 5],
        ]);

        $pantalon = Producto::create([
            'nombre' => 'Pantalon UrbanBeat',
            'descripcion' => 'Edición 2026 oficial del festival',
            'precio' => 25.00,
            'categoria' => 'ropa',
            'esta_oculto' => false,
            'imagen_url' => 'productos/pantalon.png',
        ]);
        $pantalon->tallas()->attach([
            $tallaS->id => ['stock' => 30],
            $tallaM->id => ['stock' => 50],
            $tallaL->id => ['stock' => 60],
            $tallaXL->id => ['stock' => 3],
        ]);

        $sudadera = Producto::create([
            'nombre' => 'Sudadera UrbanBeat',
            'descripcion' => 'Edición 2026 oficial del festival',
            'precio' => 40.00,
            'categoria' => 'ropa',
            'esta_oculto' => false,
            'imagen_url' => 'productos/sudadera.png',
        ]);
        $sudadera->tallas()->attach([
            $tallaS->id => ['stock' => 20],
            $tallaM->id => ['stock' => 30],
            $tallaL->id => ['stock' => 30],
            $tallaXL->id => ['stock' => 6],
        ]);

        $gafas = Producto::create([
            'nombre' => 'Gafas UrbanBeat',
            'descripcion' => 'Gafas de sol. Perfectas para disfrutar del festival tranquilo.',
            'precio' => 15.00,
            'categoria' => 'accesorios',
            'esta_oculto' => false,
            'imagen_url' => 'productos/gafas.png',
        ]);
        $gafas->tallas()->attach($tallaUnica->id, ['stock' => 100]);

        // 3. Gorra (Talla Única)
        $gorra = Producto::create([
            'nombre' => 'Gorra UrbanBeat',
            'descripcion' => 'Una gorra moderna de UrbanBeat para disfrutar del festival fresquito',
            'precio' => 12.00,
            'categoria' => 'accesorios',
            'esta_oculto' => false,
            'imagen_url' => 'productos/gorra.png',
        ]);
        $gorra->tallas()->attach($tallaUnica->id, ['stock' => 75]);

        // 4. Botella (Talla Única)
        $botella = Producto::create([
            'nombre' => 'Botella UrbanBeat',
            'descripcion' => 'Con esta botella termo, podrás llevar todas tus bebidas fresquitas',
            'precio' => 20.00,
            'categoria' => 'accesorios',
            'esta_oculto' => false,
            'imagen_url' => 'productos/botella.png',
        ]);
        $botella->tallas()->attach($tallaUnica->id, ['stock' => 150]);

        $pulsera = Producto::create([
            'nombre' => 'Pulsera UrbanBeat',
            'descripcion' => 'Pulsera de UrbanBeat con estilo festivalero',
            'precio' => 5.00,
            'categoria' => 'accesorios',
            'esta_oculto' => false,
            'imagen_url' => 'productos/pulsera.png',
        ]);
        $pulsera->tallas()->attach($tallaUnica->id, ['stock' => 150]);


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

        Noticia::create([
            'titulo' => '📅 Horarios y Aperturas Oficiales',
            'contenido' => "Apertura de puertas todos los días a las 17:00h.\n\n18:00h - Apertura con DJ Set\n19:30h - Primeros Shows\n22:30h - HEADLINERS (Show Principal)\n02:30h - Cierre de la jornada.\n\n¡Ven temprano al Escenario Único Urban Beat para ahorrarte las colas del control de seguridad!",
            'tipo' => 'horario',
        ]);

        Noticia::create([
            'titulo' => '🚀 Normas de Acceso y Consejos',
            'contenido' => "Para que el Urban Beat sea una experiencia brutal para todos, ten en cuenta:\n\n- Permitida la entrada con botellas de agua pequeñas sin tapón.\n- Queda prohibido el acceso con objetos cortantes, bengalas o mochilas de gran tamaño.\n- En el recinto dispondrás de puntos de agua gratuita y asistencia médica las 24 horas.\n\n¡Cuida de los tuyos y disfruta del viaje!",
            'tipo' => 'info_general',
        ]);

        Noticia::create([
            'titulo' => '🔥 ¡ABONOS GENERALES AGOTADOS EN TIEMPO RÉCORD!',
            'contenido' => '¡Esto es una auténtica locura, UrbanBeaters! Habéis reventado las taquillas y los abonos de 3 días han volado por completo. Mil gracias por la confianza. Si te has quedado sin el tuyo, aún quedan las últimas entradas de día para el jueves y sábado. ¡No duermas en los laureles!',
            'tipo' => 'novedad',
        ]);

        Noticia::create([
            'titulo' => 'Av. de las Piletas, 13, 11540 Sanlúcar de Barrameda, Cádiz', // <-- Tu dirección real
            'contenido' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!1s0xd0dc6ebf70094b9:0x8798bf1eb54f3b25!2sAv.+de+las+Piletas,+13,+11540+Sanl%C3%BAcar+de+Barrameda,+C%C3%A1diz!3m2!1d36.7820612!2d-6.3639459!4m5!sAv.+de+las+Piletas,+13,+11540+Sanl%C3%BAcar+de+Barrameda,+C%C3%A1diz!3m2!1d36.7820612!2d-6.3639459!5e0!3m2!es!2ses!4v1716600000000!5m2!es!2ses', // Enlace de incrustación de Google Maps
            'tipo' => 'ubicacion',
        ]);

        Noticia::create([
            'titulo' => '🍔 ZONA FOODTRUCKS: MÁS VARIEDAD QUE NUNCA',
            'contenido' => 'Este año en el Urban Beat no solo vas a saltar, ¡también vas a comer de locos! Ampliamos nuestro espacio gastronómico con opciones veganas, sin gluten, hamburguesas gourmet y comida internacional de la mano de los mejores chefs sobre ruedas. Listos para reponer fuerzas.',
            'tipo' => 'novedad',
        ]);
    }
}