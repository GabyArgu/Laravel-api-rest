<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CuponController;
use App\Http\Controllers\VentasController;
use App\Http\Controllers\AuthController;

//rutas publicas
Route::post('/Registro', [AuthController::class, 'register']);
/*
{
  "Nombre": "Karla",
  "Apellido": "Gonzalez",
  "Correo": "karlam@gmail.com",
  "Contraseña": "123456",
  "Contraseña_confirmation": "123456",
  "ID_Rol": 1,
  "Estado": true
}
*/


Route::post('/Login', [AuthController::class, 'login']);
/*
{
  "Correo": "karlam@gmail.com",
  "Contraseña": "123456"
}
*/


//rutas que necesitan el token para autenticarse
Route::middleware('auth:sanctum')->group(function () {

  //ver info de un cupon con su codigo
  Route::get('/Cupon/{codigoCupon}', [CuponController::class, 'datosCupon']);
  //http://127.0.0.1:8000/api/Cupon/GAL0014532908

  Route::put('/Canjear/{codigoCupon}', [VentasController::class, 'canjearCupon']);
  //http://127.0.0.1:8000/api/Canjear/GAL0014532908

  //cerrar sesion
  Route::post('/Logout', [AuthController::class, 'logout']);
});
