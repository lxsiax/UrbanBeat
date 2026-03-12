<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    /** @use HasFactory<\Database\Factories\ProductoFactory> */
    use HasFactory;

    protected $fillable = [
        'nombre', 
        'descripcion', 
        'precio',
        'stock',
        'imagen_url',
    ];

    public function carritos()
    {
        return $this->belongsToMany(Carrito::class, 'carrito_producto')
        ->withPivot('cantidad')
        ->withTimestamps();
    }
    public function tallas()
    {
        return $this->belongsToMany(Talla::class, 'producto_talla')
        ->withPivot('stock')
        ->withTimestamps();
    }
}
