<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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

    public function talla()
    {
        return $this->belongsTo(Talla::class);
    }

    public function users()
    {
        return $this->BelongsToMany(User::class, 'producto_user')
        ->withPivot('cantidad');
    }

    public function facturas()
    {
        return $this->hasMany(Factura::class);
    }
}
