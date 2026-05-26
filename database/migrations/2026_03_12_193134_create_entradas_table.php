<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('entradas', function (Blueprint $table) {
            $table->id();
            $table->decimal('precio', 8, 2);
            $table->integer('stock');
            $table->integer('stock_inicial')->default(0)->after('stock');
            $table->foreignId('tipo_entrada_id')->constrained();
            $table->foreignId('zona_id')->constrained();
            $table->boolean('esta_oculta')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entradas');
    }
};
