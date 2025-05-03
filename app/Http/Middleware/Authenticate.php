<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Auth\AuthenticationException;

class Authenticate extends Middleware
{
    protected function unauthenticated($request, array $guards)
    {
        throw new AuthenticationException(
            'Token no proporcionado o no válido. Por favor, autentíquese.',
            $guards
        );
    }
}