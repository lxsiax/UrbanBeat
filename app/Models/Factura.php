<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    /** @use HasFactory<\Database\Factories\FacturaFactory> */
    use HasFactory;

    protected $fillable = [
        'compra_id',
        'entrada_id',
        'producto_id',
        'talla_id',
        'cantidad',
        'precio_unitario'
    ];

    public function compra()
    {
        return $this->belongsTo(Compra::class);
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }

    public function entrada()
    {
        return $this->belongsTo(Entrada::class)->withTrashed();
    }
    public function talla()
    {
        return $this->belongsTo(Talla::class);
    }
}
