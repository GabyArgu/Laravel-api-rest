import { useState } from 'react';

export default function Registro() {
    const [formData, setFormData] = useState({
        Nombre: '',
        Apellido: '',
        Dui: '',
        Telefono: '',
        Direccion: '',
        Correo: '',
        Contrasena: '',
        Contrasena_confirmation: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.Contrasena !== formData.Contrasena_confirmation) {
            setMessage('❌ Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/Registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`✅ ${data.message}`);
            } else {
                setMessage(`❌ Error: ${data.details || data.error}`);
            }
        } catch (err) {
            setMessage('❌ Error de red');
        }
    };

    const getLabel = (field) => {
        if (field === 'Contrasena') return 'Contraseña';
        if (field === 'Contrasena_confirmation') return 'Confirmar contraseña';
        return field;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-1/2 space-y-6">
                <h2 className="text-3xl font-semibold text-center text-gray-800">Crear cuenta</h2>
                <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl shadow-sm grid grid-cols-2 gap-4">
                    {['Nombre', 'Apellido', 'Dui', 'Telefono', 'Direccion', 'Correo', 'Contrasena', 'Contrasena_confirmation'].map((field) => (
                        <div key={field}>
                            <label className="block text-sm text-gray-600 mb-1">{getLabel(field)}</label>
                            <input
                                type={field.toLowerCase().includes('contrasena') ? 'password' : 'text'}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 px-1 py-2"
                                required
                            />
                        </div>
                    ))}

                    <div className="flex items-center flex-col col-span-2">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer w-1/2"
                        >
                            Registrar
                        </button>

                        {message && <p className="mt-3 text-center text-sm text-gray-600">{message}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}
