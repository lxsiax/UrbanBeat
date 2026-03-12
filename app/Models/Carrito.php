<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrito extends Model
{
    /** @use HasFactory<\Database\Factories\CarritoFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function entradas()
    {
        return $this->belongsToMany(Entrada::class, 'carrito_entrada')
        ->withPivot('cantidad')
        ->withTimestamps();
    }

    public function productos() 
    {
        return $this->belongsToMany(Producto::class, 'carrito_producto')
        ->withPivot('cantidad')
        ->withTimestamps();
    }

    public function compras()
    {
        return $this->hasMany(Compra::class);
    }
}
