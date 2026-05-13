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
        Schema::table('artistas', function (Blueprint $table) {
            $table->boolean('esta_oculto')->default(false)->after('es_headliner');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('artistas', function (Blueprint $table) {
            $table->dropColumn('esta_oculto');
        });
    }
};
