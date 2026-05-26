<?php

namespace Database\Seeders;

use App\Models\AjusteFestival;
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

        User::create([
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

        // --- TIPOS ---
        $tipoAbono = TipoEntrada::create(['nombre' => 'Abono General', 'dia_id' => null]);
        $tipoD23 = TipoEntrada::create(['nombre' => 'Entrada 23 de Julio', 'dia_id' => $dia23->id]);
        $tipoD24 = TipoEntrada::create(['nombre' => 'Entrada 24 de Julio', 'dia_id' => $dia24->id]);
        $tipoD25 = TipoEntrada::create(['nombre' => 'Entrada 25 de Julio', 'dia_id' => $dia25->id]);

        // --- TALLAS ---
        $tallaS = Talla::create(['nombre' => 'S']);
        $tallaM = Talla::create(['nombre' => 'M']);
        $tallaL = Talla::create(['nombre' => 'L']);
        $tallaXL = Talla::create(['nombre' => 'XL']);
        $tallaUnica = Talla::create(['nombre' => 'Única']);

        Chat::create(['nombre' => 'General', 'descripcion' => 'Chat oficial']);

        // ==========================================
        // CONTADOR PROGRESIVO DE DÍAS EN DETRÁS
        // ==========================================
        $diasAtras = 1;

        // 1. Primeros Artistas
        Artista::create([
            'nombre' => 'Bad Gyal',
            'imagen' => 'artistas/badgyal.jpg',
            'es_headliner' => true,
            'dia_id' => $dia23->id,
            'esta_oculto' => false,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/4F4pp8NUW08JuXwnoxglpN?si=6386f732291f4836',
            'orden' => 1,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        Artista::create([
            'nombre' => 'Lia Kali',
            'imagen' => 'artistas/lia.jpg',
            'es_headliner' => false,
            'esta_oculto' => false,
            'dia_id' => $dia23->id,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/7rFHoDuiSlV0DGHxckjm89?si=bb30d6e2eb2f4639',
            'orden' => 3,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        // 2. Mezclamos primer bloque de Merchandising
        $fCamiseta = now()->subDays($diasAtras++);
        $camiseta = Producto::create([
            'nombre' => 'Camiseta UrbanBeat',
            'descripcion' => 'Edición 2026 oficial del festival',
            'precio' => 25.00,
            'categoria' => 'ropa',
            'esta_oculto' => false,
            'imagen_url' => 'productos/camisetabuena.png',
            'created_at' => $fCamiseta,
        ]);
        $camiseta->tallas()->attach([
            $tallaS->id => ['stock' => 25, 'created_at' => $fCamiseta],
            $tallaM->id => ['stock' => 50, 'created_at' => $fCamiseta],
            $tallaL->id => ['stock' => 20, 'created_at' => $fCamiseta],
            $tallaXL->id => ['stock' => 5, 'created_at' => $fCamiseta],
        ]);

        // 3. Artistas Día 24 (Inicio Bloque Bento Grid)
        Artista::create([
            'nombre' => 'Quevedo',
            'imagen' => 'artistas/quevedo.jpeg',
            'es_headliner' => true,
            'dia_id' => $dia24->id,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/52iwsT98xCoGgiGntTiR7K?si=081ffb2a73b64396',
            'esta_oculto' => false,
            'orden' => 1,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        Artista::create([
            'nombre' => 'Violeta Hodar',
            'imagen' => 'artistas/violetahodar.png',
            'es_headliner' => false,
            'dia_id' => $dia24->id,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/0VxwKDOfIkq37oYoXbcEvt?si=5a4193c561a24cae',
            'esta_oculto' => false,
            'orden' => 2,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        // 4. Mezclamos más Merchandising
        $fPantalon = now()->subDays($diasAtras++);
        $pantalon = Producto::create([
            'nombre' => 'Pantalon UrbanBeat',
            'descripcion' => 'Edición 2026 oficial del festival',
            'precio' => 25.00,
            'categoria' => 'ropa',
            'esta_oculto' => false,
            'imagen_url' => 'productos/pantalon.png',
            'created_at' => $fPantalon,
        ]);
        $pantalon->tallas()->attach([
            $tallaS->id => ['stock' => 30, 'created_at' => $fPantalon],
            $tallaM->id => ['stock' => 50, 'created_at' => $fPantalon],
            $tallaL->id => ['stock' => 60, 'created_at' => $fPantalon],
            $tallaXL->id => ['stock' => 5, 'created_at' => $fPantalon],
        ]);

        // 5. Continuamos con Artistas Día 24 Bento
        Artista::create([
            'nombre' => 'Mvrk',
            'imagen' => 'artistas/mvrk.jpg',
            'es_headliner' => false,
            'dia_id' => $dia24->id,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/6WCTfR8dIuTqWrFrzt2yl0?si=4b1343a875ed45be',
            'esta_oculto' => false,
            'orden' => 3,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        Artista::create([
            'nombre' => 'Bad Bunny',
            'imagen' => 'artistas/badbunny.jpg',
            'es_headliner' => true,
            'dia_id' => $dia24->id,
            'esta_oculto' => false,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/4q3ewBCX7sLwd24euuV69X?si=3c71f3eeba414180',
            'orden' => 4,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        // 6. Mezclamos Accesorios (Gafas)
        $fGafas = now()->subDays($diasAtras++);
        $gafas = Producto::create([
            'nombre' => 'Gafas UrbanBeat',
            'descripcion' => 'Gafas de sol. Perfectas para disfrutar del festival tranquilo.',
            'precio' => 15.00,
            'categoria' => 'accesorios',
            'esta_oculto' => false,
            'imagen_url' => 'productos/gafas.png',
            'created_at' => $fGafas,
        ]);
        $gafas->tallas()->attach($tallaUnica->id, ['stock' => 100, 'created_at' => $fGafas]);

        // 7. Últimos Artistas del Día 24 Bento
        Artista::create([
            'nombre' => 'Kristina',
            'imagen' => 'artistas/kristina.jpg',
            'es_headliner' => false,
            'dia_id' => $dia24->id,
            'esta_oculto' => false,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/07Z7bvJe6gxi40UxVpuEL1?si=0b64b49597c5405d',
            'orden' => 5,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        Artista::create([
            'nombre' => 'D. Valentino',
            'imagen' => 'artistas/dvalentino.jpg',
            'es_headliner' => false,
            'dia_id' => $dia24->id,
            'esta_oculto' => false,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/01WzyfcDKX94myMXnGfU4N?si=b1c18ae0bdfb4fd3',
            'orden' => 6,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        // 8. Mezclamos Gorra
        $fGorra = now()->subDays($diasAtras++);
        $gorra = Producto::create([
            'nombre' => 'Gorra UrbanBeat',
            'descripcion' => 'Una gorra moderna de UrbanBeat para disfrutar del festival fresquito',
            'precio' => 12.00,
            'categoria' => 'accesorios',
            'esta_oculto' => false,
            'imagen_url' => 'productos/gorra.png',
            'created_at' => $fGorra,
        ]);
        $gorra->tallas()->attach($tallaUnica->id, ['stock' => 75, 'created_at' => $fGorra]);

        // 9. Siguientes Artistas
        Artista::create([
            'nombre' => 'Duki',
            'imagen' => 'artistas/duki.jpg',
            'es_headliner' => false,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/1bAftSH8umNcGZ0uyV7LMg?si=2138df945e2243f5',
            'dia_id' => $dia23->id,
            'esta_oculto' => false,
            'orden' => 4,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        Artista::create([
            'nombre' => 'Cruz Cafuné',
            'imagen' => 'artistas/cruzi.jpg',
            'es_headliner' => false,
            'dia_id' => $dia23->id,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/0jeYkqwckGJoHQhhXwgzk3?si=0ad7321704184438',
            'esta_oculto' => false,
            'orden' => 2,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        // 10. Mezclamos Botella Termo
        $fBotella = now()->subDays($diasAtras++);
        $botella = Producto::create([
            'nombre' => 'Botella UrbanBeat',
            'descripcion' => 'Con esta botella termo, podrás llevar todas tus bebidas fresquitas',
            'precio' => 20.00,
            'categoria' => 'accesorios',
            'esta_oculto' => false,
            'imagen_url' => 'productos/botella.png',
            'created_at' => $fBotella,
        ]);
        $botella->tallas()->attach($tallaUnica->id, ['stock' => 150, 'created_at' => $fBotella]);

        // 11. Artistas del Día 25
        Artista::create([
            'nombre' => 'Trueno',
            'imagen' => 'artistas/trueno.jpg',
            'es_headliner' => true,
            'dia_id' => $dia25->id,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/2x7PC78TmgqpEIjaGAZ0Oz?si=02ddbab14ea84349',
            'esta_oculto' => false,
            'orden' => 1,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        Artista::create([
            'nombre' => 'Young Miko',
            'imagen' => 'artistas/miko.jpg',
            'es_headliner' => false,
            'dia_id' => $dia25->id,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/3qsKSpcV3ncke3hw52JSMB?si=aea7becc516847be',
            'esta_oculto' => false,
            'orden' => 2,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        // 12. Mezclamos Pulsera
        $fPulsera = now()->subDays($diasAtras++);
        $pulsera = Producto::create([
            'nombre' => 'Pulsera UrbanBeat',
            'descripcion' => 'Pulsera de UrbanBeat con estilo festivalero',
            'precio' => 5.00,
            'categoria' => 'accesorios',
            'esta_oculto' => false,
            'imagen_url' => 'productos/pulsera.png',
            'created_at' => $fPulsera,
        ]);
        $pulsera->tallas()->attach($tallaUnica->id, ['stock' => 150, 'created_at' => $fPulsera]);

        // 13. Más Artistas
        Artista::create([
            'nombre' => 'L0rna',
            'imagen' => 'artistas/l0rna.jpg',
            'es_headliner' => false,
            'dia_id' => $dia25->id,
            'esta_oculto' => false,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/2kFBKRwutklbaGSKBpc6TS?si=8d5366137a744d16',
            'orden' => 2,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        Artista::create([
            'nombre' => 'Becky G',
            'imagen' => 'artistas/beckyg.jpg',
            'es_headliner' => true,
            'dia_id' => $dia25->id,
            'esta_oculto' => false,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/4obzFoKoKRHIphyHzJ35G3?si=eaab0727afb944f8',
            'orden' => 2,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        // 14. Último artículo: Sudadera
        $fSudadera = now()->subDays($diasAtras++);
        $sudadera = Producto::create([
            'nombre' => 'Sudadera UrbanBeat',
            'descripcion' => 'Edición 2026 oficial del festival',
            'precio' => 40.00,
            'categoria' => 'ropa',
            'esta_oculto' => false,
            'imagen_url' => 'productos/sudadera.png',
            'created_at' => $fSudadera,
        ]);
        $sudadera->tallas()->attach([
            $tallaS->id => ['stock' => 20, 'created_at' => $fSudadera],
            $tallaM->id => ['stock' => 30, 'created_at' => $fSudadera],
            $tallaL->id => ['stock' => 30, 'created_at' => $fSudadera],
            $tallaXL->id => ['stock' => 6, 'created_at' => $fSudadera],
        ]);

        // 15. Última tanda de artistas
        Artista::create([
            'nombre' => 'Karol G',
            'imagen' => 'artistas/karolg.jpg',
            'es_headliner' => true,
            'dia_id' => $dia23->id,
            'esta_oculto' => false,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/790FomKkXshlbRYZFtlgla?si=pOnruDwrSh-zR3s7O2F7MA',
            'orden' => 2,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        $zonas = [$zonaPista, $zonaGrada, $zonaFront];
        $preciosBase = [
            'Abono' => ['Pista' => 120, 'Grada' => 100, 'Front Stage' => 170],
            'Dia' => ['Pista' => 60, 'Grada' => 45, 'Front Stage' => 100]
        ];

        foreach ($zonas as $z) {
            $distribucion = [
                $tipoAbono->id => 0.40,
                $tipoD23->id => 0.20,
                $tipoD24->id => 0.20,
                $tipoD25->id => 0.20
            ];

            foreach ($distribucion as $tipoId => $porcentaje) {
                $stockCalculado = floor($z->aforo * $porcentaje);
                $esAbono = ($tipoId === $tipoAbono->id);
                $precio = $esAbono ? $preciosBase['Abono'][$z->nombre] : $preciosBase['Dia'][$z->nombre];

                Entrada::create([
                    'tipo_entrada_id' => $tipoId,
                    'zona_id' => $z->id,
                    'precio' => $precio,
                    'stock' => $stockCalculado,
                    'stock_inicial' => $stockCalculado,
                    'created_at' => now()->subDays($diasAtras++)
                ]);
            }
        }

        Artista::create([
            'nombre' => 'Maikel De La Calle',
            'imagen' => 'artistas/maikeldelacalle.jpg',
            'es_headliner' => false,
            'dia_id' => $dia25->id,
            'esta_oculto' => false,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/2t7vyRN71qtQT18frElAnV?si=626ccdbdc2224210',
            'orden' => 3,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        Artista::create([
            'nombre' => 'Abhir',
            'imagen' => 'artistas/abhir.png',
            'es_headliner' => false,
            'dia_id' => $dia25->id,
            'esta_oculto' => false,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/2D8UzkIVdg1bj0Iqz6gjk0?si=a5ec1e5187cd4413',
            'orden' => 4,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        Artista::create([
            'nombre' => 'Judeline',
            'imagen' => 'artistas/judeline.jpg',
            'es_headliner' => false,
            'dia_id' => $dia23->id,
            'esta_oculto' => false,
            'link_spotify' => 'https://open.spotify.com/intl-es/artist/1H6X7yhnXZg73f9bssaj1Q?si=a8b48b78955c4f0c',
            'orden' => 2,
            'created_at' => now()->subDays($diasAtras++)
        ]);

        // --- AJUSTES Y NOTICIAS ---
        AjusteFestival::insert([
            ['clave' => 'horario', 'valor' => "Apertura de puertas todos los días a las 17:00h.\n\n18:00h - Apertura con DJ Set\n19:30h - Primeros Shows\n22:30h - HEADLINERS (Show Principal)\n02:30h - Cierre de la jornada.\n\n¡Ven temprano al Escenario Único Urban Beat para ahorrarte las colas del control de seguridad!", 'created_at' => now(), 'updated_at' => now()],
            ['clave' => 'normas', 'valor' => "Para que el Urban Beat sea una experiencia brutal para todos, ten en cuenta:\n\n- Permitida la entrada con botellas de agua pequeñas sin tapón.\n- Queda prohibido el acceso con objetos cortantes, bengalas o mochilas de gran tamaño.\n- En el recinto dispondrás de puntos de agua gratuita y asistencia médica las 24 horas.\n\n¡Cuida de los tuyos y disfruta del viaje!", 'created_at' => now(), 'updated_at' => now()],
            ['clave' => 'ubicacion', 'valor' => "Av. de las Piletas, 13, 11540 Sanlúcar de Barrameda, Cádiz", 'created_at' => now(), 'updated_at' => now()],
            ['clave' => 'mapa_src', 'valor' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3195.4934925429425!2d-6.361902023466998!3d36.782716672252114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0ddfd2efcf77a1%3A0x56d913ea787bbd6a!2sTeatro%20Municipal%20SANL%C3%9ACAR!5e0!3m2!1ses!2ses!4v1779678936981!5m2!1ses!2ses', 'created_at' => now(), 'updated_at' => now()],
        ]);

        Noticia::create([
            'titulo' => '🔥 ¡ABONOS GENERALES AGOTADOS EN TIEMPO RÉCORD!',
            'contenido' => '¡Esto es una auténtica locura, UrbanBeaters! Habéis reventado las taquillas y los abonos de 3 días han volado por completo. Mil gracias por la confianza.',
            'tipo' => 'novedad',
            'created_at' => now()->subDays($diasAtras++)
        ]);

        Noticia::create([
            'titulo' => '🍔 ZONA FOODTRUCKS: MÁS VARIEDAD QUE NUNCA',
            'contenido' => 'Este año en el Urban Beat no solo vas a saltar, ¡también vas a comer de locos! Ampliamos nuestro espacio gastronómico.',
            'tipo' => 'novedad',
            'created_at' => now()->subDays($diasAtras++)
        ]);
    }
}