<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cliente extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = 'cliente';
    protected $primaryKey = 'ID_Cliente';

    public $timestamps = false;

    protected $fillable = [
        'Nombre',
        'Apellido',
        'Dui',
        'Telefono',
        'Direccion',
        'Correo',
        'Contrasena',
        'Token',
        'Estado',
    ];

    protected $hidden = [
        'Contrasena',
    ];

    protected $casts = [
        'Estado' => 'boolean',
    ];

    public function getAuthIdentifierName()
    {
        return 'Correo';
    }

    public function getAuthPassword()
    {
        return $this->Contrasena;
    }
}
