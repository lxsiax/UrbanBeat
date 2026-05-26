<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dia extends Model
{
    /** @use HasFactory<\Database\Factories\DiaFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'fecha',
    ];
     
    public function tiposEntrada()
    {
        return $this->hasMany(TipoEntrada::class);
    }

    public function artistas()
    {
        return $this->hasMany(Artista::class);
    }
}
