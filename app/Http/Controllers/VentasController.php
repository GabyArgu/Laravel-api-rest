<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ventas;
use App\Models\Cupones;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class VentasController extends Controller
{
    
    
    public function canjearCupon($codigoCupon)
    {
        try {
            
            $venta = DB::table('ventas as v')
                ->join('cupones as c', 'v.ID_Cupon', '=', 'c.ID_Cupon')
                ->select(
                    'v.ID_Venta',
                    'v.ID_Cupon',
                    'v.Fecha_Compra',
                    'v.Veces_Canje',
                    'v.Estado',
                    'v.Codigo_Cupon',
                    'c.Fecha_Inicial',
                    'c.Fecha_Final',
                    'c.Estado_Aprobacion',
                    'v.Cantidad',
                    'c.Estado_Cupon'
                )
                ->where('v.Codigo_Cupon', $codigoCupon)
                ->first();
    
          
            if (!$venta) {
                return response()->json(['mensaje' => 'Cupón no encontrado'], 404);
            }
    
           
             if ($venta->Estado_Cupon != 'Disponible') {
                return response()->json(['mensaje' => 'El cupón no está disponible'], 400);
               
             }

            if($venta->Veces_Canje >= $venta->Cantidad){
                return response()->json(['mensaje' => 'El cupón ya ha sido canjeado'], 400);
            }
    
            //validacion de cupon vencido
            $fechaActual = Carbon::now();
            $fechaFinal = Carbon::parse($venta->Fecha_Final);
           
    
            if ($fechaFinal->lt($fechaActual)) {
                return response()->json(['mensaje' => 'El cupón esta vencido'], 400);
            }
    
            
    
            // canjeado estado 1
            $actualizado = DB::table('ventas')
                ->where('ID_Venta', $venta->ID_Venta)
                ->update([
                    'Estado' => '1',
                    'Veces_Canje' => $venta->Veces_Canje + 1,
                ]);
    
            if (!$actualizado) {
                return response()->json(['mensaje' => 'Error al actualizar estado'], 500);
            }
    
            return response()->json(['mensaje' => 'Cupón canjeado exitosamente'], 200);
        } catch (\Exception $e) {
            return response()->json(['mensaje' => 'Error al canjear el cupon', 'error' => $e->getMessage()], 500);
        }
    }
}
