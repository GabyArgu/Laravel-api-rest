<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cupones;
use App\Models\Ventas;
use Illuminate\Support\Facades\DB;

class CuponController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index( Request $request)
 
    
    {
                  
             
        }
  
    

   
    /**
     * Store a newly created resource  in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function datosCupon($codigoCupon)
    {
        try {
            $cupon = DB::table('cupones as c')
                ->join('ventas as v', 'c.ID_Cupon', '=', 'v.ID_Cupon')
                ->select(
                    'v.Codigo_Cupon',
                    'c.ID_Cupon',
                    'c.ID_Empresa',
                    'c.Titulo',
                    'c.Imagen',
                    'c.PrecioR',
                    'c.PrecioO',
                    'c.Fecha_Inicial',
                    'c.Fecha_Final',
                    'c.Fecha_Limite',
                    'c.Descripcion',
                    'c.Stock',
                    'c.Cantidad_Vendidos',
                    'c.Estado_Aprobacion',
                    'c.Estado_Cupon',
                    'c.Justificacion',
                    'v.Cantidad',
                    'v.Veces_Canje',
                )
                ->where('v.Codigo_Cupon', $codigoCupon)
                ->first();
    
            if (!$cupon) {
                return response()->json(['status' => false, 'message' => 'Cupón no encontrado'], 404);
            }
    
            return response()->json(['status' => true, 'cupon' => $cupon], 200);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => 'Error al obtener el cupón', 'error' => $e->getMessage()], 500);
        }
    }
    
   
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $cupon = Cupones::find($id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
