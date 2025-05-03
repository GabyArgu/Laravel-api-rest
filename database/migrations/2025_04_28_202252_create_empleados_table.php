<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('empleados', function (Blueprint $table) {
            $table->id('ID_Empleado'); // Clave primaria
            $table->string('Nombre');
            $table->string('Apellido');
            $table->string('Correo')->unique();
            $table->string('Contraseña');
            $table->integer('ID_Rol');
            $table->boolean('Estado'); // Tipo booleano para manejar el campo bit
            $table->timestamps(); // Opcional, para created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empleados');
    }
};