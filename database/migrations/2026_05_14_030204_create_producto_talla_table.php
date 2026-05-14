<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('producto_talla', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_id')->constrained()->onDelete('cascade');
            $table->foreignId('talla_id')->constrained()->onDelete('cascade');
            $table->integer('stock')->default(0); 
            $table->timestamps();
        });

        Schema::table('productos', function (Blueprint $table) {
            $table->dropForeign(['talla_id']);
            $table->dropColumn(['talla_id', 'stock']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('producto_talla');
    }
};