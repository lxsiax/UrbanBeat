<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('facturas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('compra_id')->constrained(); 

            $table->foreignId('producto_id')->nullable()->constrained();
            $table->foreignId('entrada_id')->nullable()->constrained();
            $table->foreignId('talla_id')->nullable()->constrained();

            $table->integer('cantidad');
            $table->decimal('precio_unitario', 10, 2); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facturas');
    }
};
