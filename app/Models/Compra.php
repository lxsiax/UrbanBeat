<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    /** @use HasFactory<\Database\Factories\CompraFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total',
        'stripe_session_id',
        'estado'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function facturas()
    {
        return $this->hasMany(Factura::class);
    }

    public function asistentes()
    {
        return $this->hasMany(Asistente::class);
    }
}
