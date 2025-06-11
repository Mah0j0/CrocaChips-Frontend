import { useState } from "react";
import { Dropdown } from "../dropdown/Dropdown.tsx";
import { DropdownItem } from "../dropdown/DropdownItem.tsx";
import { useAlertas } from "../../../entities/dashboard/hooks/useAlertas.ts";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const { data, isLoading, error } = useAlertas();

  const handleClick = () => {
    toggleDropdown();
    // Solo desactiva la notificación si las alertas se cargaron correctamente
    if (data && data.alertas.length > 0) {
      setNotifying(false);
    }
  };

  return (
      <div className="relative">
        <button
            className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full dropdown-toggle hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={handleClick}
        >
        <span
            className={`absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-400 ${
                !notifying || (data && data.alertas.length === 0) ? "hidden" : "flex" // Oculta si no hay alertas
            }`}
        >
          <span className="absolute inline-flex w-full h-full bg-orange-400 rounded-full opacity-75 animate-ping"></span>
        </span>
          <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z"
                fill="currentColor"
            />
          </svg>
        </button>

        <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0"
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
            <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Notificaciones
            </h5>
            <button
                onClick={toggleDropdown}
                className="text-gray-500 transition dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                    fill="currentColor"
                />
              </svg>
            </button>
          </div>

          <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
            {isLoading && (
                <div className="flex justify-center items-center h-full text-gray-600 dark:text-gray-400">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <p className="ml-3">Cargando alertas...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm m-2">
                  <strong className="font-bold">¡Error!</strong>
                  <span className="block sm:inline ml-2">{error.message}</span>
                </div>
            )}

            {!isLoading && !error && (!data || data.alertas.length === 0) && (
                <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 m-2 text-sm">
                  <p className="font-bold">No hay alertas nuevas.</p>
                  <p>Revisa más tarde o contacta al soporte.</p>
                </div>
            )}

            {!isLoading && !error && data && data.alertas.length > 0 && (
                <>
                  {data.alertas.map((alerta, idx) => (
                      <li key={idx}>
                        <DropdownItem
                            onItemClick={closeDropdown}
                            className="flex flex-col gap-2 rounded-lg border-b border-gray-100 p-3 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                        >
                          <div className="flex items-center">
                            <svg
                                className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0"
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
                            <span className="block text-gray-800 dark:text-white font-medium text-base leading-tight">
                        {alerta.mensaje}
                      </span>
                          </div>

                          {"cantidad" in alerta && (
                              <span className="ml-7 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full self-start">
                        Cantidad: {alerta.cantidad}
                      </span>
                          )}

                          {"productos" in alerta && alerta.productos.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 w-full">
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                                  Productos afectados:
                                </p>
                                <ul className="list-disc list-inside text-gray-500 text-xs space-y-0.5">
                                  {alerta.productos.map((producto, i) => (
                                      <li key={i} className="bg-gray-50 dark:bg-gray-800 p-1 rounded-sm overflow-x-auto break-words">
                              <pre className="text-xs">
                                {JSON.stringify(producto, null, 2)}
                              </pre>
                                      </li>
                                  ))}
                                </ul>
                              </div>
                          )}
                        </DropdownItem>
                      </li>
                  ))}
                </>
            )}
          </ul>
        </Dropdown>
      </div>
  );
}