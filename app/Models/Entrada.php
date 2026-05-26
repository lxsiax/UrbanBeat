<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Entrada extends Model
{
    /** @use HasFactory<\Database\Factories\EntradaFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'precio',
        'stock',
        'tipo_entrada_id',
        'zona_id',
        'esta_oculta',
        'stock_inicial'
    ];

    public function tipoEntrada()
    {
        return $this->belongsTo(TipoEntrada::class);
    }

    public function zona()
    {
        return $this->belongsTo(Zona::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'entrada_user')
            ->withPivot('cantidad');
    }

    public function facturas()
    {
        return $this->hasMany(Factura::class);
    }

}
