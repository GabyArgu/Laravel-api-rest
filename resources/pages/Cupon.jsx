import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition
} from '@headlessui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cupon() {
    const { codigoCupon } = useParams();
    const [cupon, setCupon] = useState(null);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loadingCanje, setLoadingCanje] = useState(false);

    // Obtener datos del cupón
    const fetchCuponData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/Cupon/${codigoCupon}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener el cupón');
            }

            const data = await response.json();
            setCupon(data.cupon);
        } catch (error) {
            setError(error.message);
        }
    };
    useEffect(() => {
        fetchCuponData();
    }, [codigoCupon]);

    // Canjear cupón
    const handleCanjear = async () => {
        setLoadingCanje(true);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/Canjear/${codigoCupon}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.mensaje || "Error al canjear el cupón");
            }

            toast.success("¡Cupón canjeado con éxito!", {
                position: "top-center",
                autoClose: 4000,
                theme: "colored",
            });
            fetchCuponData();
        } catch (error) {
            toast.error(error.message, {
                position: "top-center",
                theme: "colored",
            });
        } finally {
            setLoadingCanje(false);
            setIsOpen(false);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/Logout', {
                method: 'POST',
                credentials: 'include', // Para cookies
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al cerrar sesión');
            }

            // Limpia el almacenamiento local
            localStorage.removeItem('auth_token');

            // Redirige al login
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout error:', error);
            toast.error(error.message, {
                position: "top-center",
                theme: "colored",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer />

            {/* Modal de Confirmación */}
            <Dialog
                open={isOpen}
                as="div"
                className="relative z-10 focus:outline-none"
                onClose={() => setIsOpen(false)}
            >
                {/* Fondo oscuro (Overlay) */}
                <div className="fixed inset-0 bg-black/50" />

                {/* Contenedor del modal */}
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        {/* Panel del diálogo (con transición) */}
                        <Transition
                            show={isOpen}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Confirmar Canje
                                </DialogTitle>

                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        ¿Estás seguro de canjear el cupón "{cupon?.Titulo}"?
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        className="px-4 py-2 text-sm font-medium cursor-pointer text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cancelar
                                    </button>

                                    <button
                                        type="button"
                                        className="px-4 py-2 text-sm font-medium cursor-pointer text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
                                        onClick={handleCanjear}
                                        disabled={loadingCanje}
                                    >
                                        {loadingCanje ? 'Procesando...' : 'Confirmar'}
                                    </button>
                                </div>
                            </DialogPanel>
                        </Transition>
                    </div>
                </div>
            </Dialog>

            {/* Contenido Principal */}
            <div className="max-w-md mx-auto">
                {error ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                        <p className="text-red-700">{error}</p>
                    </div>
                ) : cupon ? (
                    <>
                        {/* Encabezado */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">Detalles del Cupón</h2>
                            <p className="mt-2 text-sm text-gray-600">Disfruta de esta oferta exclusiva</p>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm rounded-xl">
                            {/* Imagen del cupón */}
                            <img
                                src={cupon.Imagen}
                                alt={cupon.Titulo}
                                className="w-full h-48 object-cover"
                            />

                            {/* Contenido */}
                            <div className="p-6">
                                {/* Título y precio */}
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900">{cupon.Titulo}</h3>
                                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                        ${cupon.PrecioO} <span className="line-through text-gray-500 ml-1">${cupon.PrecioR}</span>
                                    </div>
                                </div>

                                {/* Descripción */}
                                <p className="text-gray-600 mb-6">{cupon.Descripcion}</p>

                                {/* Detalles en grid */}
                                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                                    <div>
                                        <p className="text-gray-500">Fecha Inicial</p>
                                        <p className="font-medium">{cupon.Fecha_Inicial}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Fecha Final</p>
                                        <p className="font-medium">{cupon.Fecha_Final}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Stock</p>
                                        <p className="font-medium">{cupon.Stock} disponibles</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Vendidos</p>
                                        <p className="font-medium">{cupon.Cantidad_Vendidos}</p>
                                    </div>
                                </div>

                                {/* Estado y botón de canje */}
                                <div className="flex items-center justify-between mt-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${cupon.Cantidad > cupon.Veces_Canje
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        {cupon.Cantidad > cupon.Veces_Canje ? 'Disponible' : 'No Disponible'}
                                    </span>

                                    {cupon.Cantidad > cupon.Veces_Canje && (
                                        <button
                                            className="px-4 py-2 text-sm font-medium cursor-pointer text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50"
                                            onClick={() => setIsOpen(true)}
                                        >
                                            Confirmar Canje
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>

                ) : (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Cargando detalles del cupón...</p>
                    </div>
                )}
            </div>

            {localStorage.getItem('auth_token') ?
                <button className='absolute bottom-0 right-0 m-4 cursor-pointer' onClick={handleLogout} type='button'>Cerrar Sesión</button>
                : null}
        </div>
    );
};