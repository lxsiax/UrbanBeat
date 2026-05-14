<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Talla extends Model
{
    protected $fillable = ['nombre'];

    public function productos(): BelongsToMany
    {
        return $this->belongsToMany(Producto::class, 'producto_talla')
                    ->withPivot('stock')
                    ->withTimestamps();
    }
}