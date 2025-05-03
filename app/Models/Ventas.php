<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ventas extends Model
{
    protected $table = 'ventas';
    protected $primaryKey = 'ID_Venta';

    public $timestamps = false;

    protected $fillable = [
        'ID_Cupon',
        'ID_Cliente',
        'Fecha_Compra',
        'Cantidad',
        'Monto',
        'Metodo_Pago',
        'Estado',
        'Codigo_Cupon',
    ];
}
