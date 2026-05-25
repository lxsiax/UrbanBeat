<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Artista extends Model
{
    protected $fillable = [
        'nombre',
        'imagen',
        'es_headliner',
        'dia_id',
        'orden',
        'esta_oculto',
        'link_spotify',
        'created_at',
    ];

    public function dia() 
    {
        return $this->belongsTo(Dia::class);
    }
}
