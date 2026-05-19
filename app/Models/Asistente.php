<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asistente extends Model
{
    use HasFactory;

    protected $fillable = [
        'compra_id',
        'entrada_id',
        'nombre',
        'dni',
        'numero',
        'email'
    ];

    public function compra()
    {
        return $this->belongsTo(Compra::class);
    }

    public function entrada()
    {
        return $this->belongsTo(Entrada::class);
    }
}