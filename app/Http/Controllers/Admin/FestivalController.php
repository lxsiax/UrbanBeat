<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AjusteFestival;
use App\Models\Dia;
use App\Models\TipoEntrada;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class FestivalController extends Controller
{
    public function edit()
    {
        $fechaInicio = AjusteFestival::where('clave', 'fecha_inicio')->first()?->valor ?? '2026-07-23';
        $duracionDias = AjusteFestival::where('clave', 'duracion_dias')->first()?->valor ?? '3';

        $diasActuales = Dia::orderBy('fecha', 'asc')->get();

        return Inertia::render('Admin/Gestion/GestionEvento', [
            'fecha_actual' => $fechaInicio,
            'duracion_actual' => (int) $duracionDias,
            'dias' => $diasActuales
        ]);
    }

    public function updateFecha(Request $request)
    {
        $request->validate([
            'fecha_inicio' => 'required|date',
            'duracion_dias' => 'required|integer|min:1|max:10',
        ]);

        DB::transaction(function () use ($request) {
            AjusteFestival::updateOrCreate(['clave' => 'fecha_inicio'], ['valor' => $request->fecha_inicio]);
            AjusteFestival::updateOrCreate(['clave' => 'duracion_dias'], ['valor' => $request->duracion_dias]);

            DB::table('artistas')->delete();
            DB::table('entradas')->delete();  
            DB::table('tipo_entradas')->delete();

            Dia::truncate();

            $nuevaFecha = Carbon::parse($request->fecha_inicio);
            $totalDias = (int) $request->duracion_dias;

            TipoEntrada::create([
                'nombre' => 'Abono General',
                'dia_id' => null
            ]);


            for ($i = 0; $i < $totalDias; $i++) {
                $fechaCarbon = $nuevaFecha->copy()->addDays($i);
                
                $dia = Dia::create([
                    'fecha' => $fechaCarbon->format('Y-m-d')
                ]);

                $nombreDia = $fechaCarbon->locale('es')->isoFormat('D [de] MMMM');
                TipoEntrada::create([
                    'nombre' => 'Entrada ' . $nombreDia,
                    'dia_id' => $dia->id
                ]);
            }
        });

        return redirect()->back()->with('success', '¡Estructura del festival y dependencias reiniciadas con éxito!');
    }
}