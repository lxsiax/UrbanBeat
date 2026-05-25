<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Noticia extends Model
{
    protected $fillable = [
        'titulo',
        'contenido', 
        'imagen',
        'tipo',
        'created_at'
    ];
}
