import { useState } from 'react';

export default function Login() {
    const [formData, setFormData] = useState({
        Correo: '',
        Contrasena: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`✅ Bienvenido`);
                localStorage.setItem('auth_token', data.token);
            } else {
                setMessage(`❌ Error: ${data.message || 'Credenciales inválidas'}`);
            }
        } catch (err) {
            setMessage('❌ Error de red');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-6">
                <h2 className="text-3xl font-semibold text-center text-gray-800">Iniciar sesión</h2>
                <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl shadow-sm">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Correo</label>
                        <input
                            type="email"
                            name="Correo"
                            value={formData.Correo}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 px-1 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Contraseña</label>
                        <input
                            type="password"
                            name="Contrasena"
                            value={formData.Contrasena}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 px-1 py-2"
                            required
                        />
                    </div>

                    <div className="flex items-center flex-col">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer w-1/2"
                        >
                            Ingresar
                        </button>

                        {message && <p className="mt-3 text-center text-sm text-gray-600">{message}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}
