import { useAlertas } from "../hooks/useAlertas";

export function Alertas() {
    const { data, isLoading, error } = useAlertas();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                <p className="ml-4 text-gray-700">Cargando alertas...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">¡Error!</strong>
                <span className="block sm:inline ml-2">{error.message}</span>
            </div>
        );
    }

    if (!data || data.alertas.length === 0) {
        return (
            <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                <p className="font-bold">No hay alertas nuevas.</p>
                <p>Revisa más tarde o contacta al soporte si crees que hay un problema.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <ul className="space-y-4">
                {data.alertas.map((alerta, idx) => (
                    <li
                        key={idx}
                        className="bg-white shadow-lg rounded-lg p-5 border-l-4 border-orange-500 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    >
                        <div className="flex items-center mb-2">
                            <svg
                                className="w-6 h-6 text-orange-600 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                ></path>
                            </svg>
                            <strong className="text-xl font-semibold text-gray-900">
                                {alerta.mensaje}
                            </strong>
                            {"cantidad" in alerta && (
                                <span className="ml-3 px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                  Cantidad: {alerta.cantidad}
                </span>
                            )}
                        </div>

                        {"productos" in alerta && alerta.productos.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-gray-200">
                                <p className="text-gray-700 font-medium mb-2">Productos afectados:</p>
                                <ul className="list-disc list-inside text-gray-600 space-y-1">
                                    {alerta.productos.map((producto, i) => (
                                        <li key={i} className="bg-gray-50 p-2 rounded-md">
                      <pre className="text-sm overflow-x-auto">
                        {JSON.stringify(producto, null, 2)}
                      </pre>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}