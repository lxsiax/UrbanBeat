<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zona extends Model
{
    /** @use HasFactory<\Database\Factories\ZonaFactory> */
    use HasFactory;

    protected $fillable = [
        'nombre',
        'aforo'
    ];

    public function entradas()
    {
        return $this->hasMany(Entrada::class);
    }
}
