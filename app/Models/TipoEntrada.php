<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoEntrada extends Model
{
    /** @use HasFactory<\Database\Factories\TipoEntradaFactory> */
    use HasFactory, SoftDeletes;

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
