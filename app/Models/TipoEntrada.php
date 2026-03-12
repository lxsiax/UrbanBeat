<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoEntrada extends Model
{
    /** @use HasFactory<\Database\Factories\TipoEntradaFactory> */
    use HasFactory;

    protected $fillable = [
        'nombre', 
        'dia_id',
    ];
    public function dia()
    {
        return $this->belongsTo(Dia::class);
    }

    public function entradas()
    {
        return $this->hasMany(Entrada::class);
    }
    
}
