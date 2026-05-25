<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ajuste_festivals', function (Blueprint $table) {
            $table->id();
            $table->string('clave')->unique(); 
            $table->string('valor');     
            $table->timestamps();
        });

        // Insertamos los valores iniciales por defecto para el Festival
        DB::table('ajuste_festivals')->insert([
            [
                'clave' => 'fecha_inicio',
                'valor' => '2026-07-23',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'clave' => 'duracion_dias',
                'valor' => '3', // Duración inicial por defecto: 3 días
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('ajuste_festivals');
    }
};