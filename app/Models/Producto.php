<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'imagen_url',
        'categoria',
        'esta_oculto',
        'created_at',
    ];

    public function tallas(): BelongsToMany
    {
        return $this->belongsToMany(Talla::class, 'producto_talla')
            ->withPivot('stock')
            ->withTimestamps();
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'producto_user')
            ->withPivot('cantidad');
    }

    public function facturas()
    {
        return $this->hasMany(Factura::class);
    }

    protected $appends = ['stock_total'];

    public function getStockTotalAttribute()
    {
        return $this->tallas->sum('pivot.stock');
    }
}