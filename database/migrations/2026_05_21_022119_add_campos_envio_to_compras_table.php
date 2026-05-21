<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('compras', function (Blueprint $table) {
            $table->string('telefono_comprador')->nullable()->after('total');
            $table->text('direccion_comprador')->nullable()->after('telefono_comprador');
            $table->string('estado_envio')->default('pagado')->after('estado'); 
        });
    }

    public function down(): void
    {
        Schema::table('compras', function (Blueprint $table) {
            $table->dropColumn(['telefono_comprador', 'direccion_comprador', 'estado_envio']);
        });
    }
};