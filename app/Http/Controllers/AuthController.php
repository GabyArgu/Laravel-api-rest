<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class AuthController extends Controller
{


    public function register(Request $request)
    {
        try {
            // Validación de los datos
            $request->validate([
                'Nombre' => 'required|string|max:255',
                'Apellido' => 'required|string|max:255',
                'Dui' => 'required|string|max:10|unique:cliente',
                'Telefono' => 'required|string|max:8|unique:cliente',
                'Direccion' => 'required|string|max:255',
                'Correo' => 'required|string|email|max:255|unique:cliente',
                'Contrasena' => 'required|string|min:6|confirmed'
            ]);

            // Creación del usuario
            $user = Cliente::create([
                'Nombre' => $request->Nombre,
                'Apellido' => $request->Apellido,
                'Dui' => $request->Dui,
                'Telefono' => $request->Telefono,
                'Direccion' => $request->Direccion,
                'Correo' => $request->Correo,
                'Contrasena' => bcrypt($request->Contrasena),
                'Token' => '',
                'Estado' => 0
            ]);

            return response()->json([
                'message' => 'Cliente registrado correctamente',
                'user' => $user,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al registrar el usuario',
                'details' => $e->getMessage(),
            ], 500);
        }
    }


    public function login(Request $request)
    {
        $validated = $request->validate([
            'Correo' => 'required|string|email',
            'Contrasena' => 'required|string',
        ]);

        $cliente = Cliente::where('Correo', $validated['Correo'])->first();

        if (!$cliente || !Hash::check($validated['Contrasena'], $cliente->Contrasena)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        $token = $cliente->createToken('token')->plainTextToken;
        $cookie = cookie('cookie_token', $token, 60 * 24);

        return response(['token' => $token], 200)->withCookie($cookie);
    }

    public function logout(Request $request)
    {
        // Verifica explícitamente la autenticación
        if (!$request->user()) {
            return response()->json([
                'message' => 'No hay sesión activa'
            ], 401);
        }

        // Elimina todos los tokens del usuario (opcional)
        $request->user()->tokens()->delete();

        // Alternativa: Revocar sólo el token actual (si existe)
        // if ($request->user()->currentAccessToken()) {
        //     $request->user()->currentAccessToken()->delete();
        // }

        // Elimina la cookie
        $cookie = cookie('cookie_token', '', -1);

        return response()->json([
            'message' => 'Sesión cerrada correctamente',
        ])->withCookie($cookie);
    }
}
