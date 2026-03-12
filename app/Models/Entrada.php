<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entrada extends Model
{
    /** @use HasFactory<\Database\Factories\EntradaFactory> */
    use HasFactory;

    protected $fillable = [
        'precio',
        'stock',
        'tipo_entrada_id',
        'zona_id',
    ];

    public function tipoEntrada()
    {
        return $this->belongsTo(TipoEntrada::class);
    }

    public function zona()
    {
        return $this->belongsTo(Zona::class);
    }

    public function carritos()
    {
        return $this->belongsToMany(Carrito::class, 'carrito_entrada')
        ->withPivot('cantidad')
        ->withTimestamps();
    }

}
