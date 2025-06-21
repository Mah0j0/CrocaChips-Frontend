import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../dropdown/Dropdown.tsx";
import { DropdownItem } from "../dropdown/DropdownItem.tsx";
import { useAlertas } from "../../../entities/dashboard/hooks/useAlertas.ts";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [lastAlertCount, setLastAlertCount] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { data, isLoading, error, isFetching } = useAlertas();

  // Filtrar alertas
  const filteredAlertas = data?.alertas
    ? data.alertas.filter(alerta => {
      // Filtrar alertas con cantidad 0
      if ('cantidad' in alerta && alerta.cantidad === 0) return false;

      // Filtrar alertas con array de productos vacío
      if ('productos' in alerta && alerta.productos.length === 0) return false;

      return true;
    })
    : [];

  // Efecto para manejar notificaciones automáticas
  useEffect(() => {
    if (data && filteredAlertas.length > lastAlertCount && lastAlertCount > 0) {
      // Hay nuevas alertas, activar notificación
      setNotifying(true);
    }
    setLastAlertCount(filteredAlertas.length);
  }, [filteredAlertas.length, data, lastAlertCount]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleClick = () => {
    toggleDropdown();
    // Solo desactiva la notificación si las alertas se cargaron correctamente
    if (data && filteredAlertas.length > 0) {
      setNotifying(false);
    }
  };

  const handleAlertaClick = (alerta: any) => {
    closeDropdown();
    // Navegar basado en el tipo de alerta
    switch (alerta.tipo) {
      case "ventas_pendientes":
        navigate("/ventas");
        break;
      case "productos_sin_stock":
      case "productos_stock_bajo":
        navigate("/almacen");
        break;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative flex items-center justify-center text-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-full dropdown-toggle hover:text-orange-600 h-11 w-11 hover:bg-orange-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-orange-400 dark:hover:shadow-lg"
        onClick={handleClick}
        aria-label="Notificaciones"
        aria-expanded={isOpen}
      >
        {/* Indicador de notificación */}
        <span
          className={`absolute -right-0.5 -top-0.5 z-10 h-3 w-3 rounded-full bg-red-500 border-2 border-white dark:border-gray-800 transition-all duration-300 ${!notifying || filteredAlertas.length === 0
            ? "scale-0 opacity-0"
            : "scale-100 opacity-100"
            }`}
        >
          <span className="absolute inline-flex w-full h-full bg-red-500 rounded-full opacity-75 animate-ping"></span>
        </span>

        {/* Indicador de refresco */}
        {isFetching && (
          <span className="absolute -left-0.5 -top-0.5 z-10 h-2 w-2 rounded-full bg-orange-500 border border-white dark:border-gray-800 animate-pulse"></span>
        )}

        <svg
          className="fill-current transition-transform duration-200 hover:scale-110"
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
        className="absolute -right-[240px] mt-3 flex flex-col rounded-2xl border border-gray-200 bg-white p-0 shadow-2xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800 w-[380px] sm:w-[400px] lg:right-0 transition-all duration-300 transform"      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-700 dark:to-gray-600 rounded-t-2xl p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <svg
                className="w-5 h-5 text-orange-600 dark:text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
            </div>
            <div>
              <h5 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Notificaciones
                {isFetching && (
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    Actualizando...
                  </span>
                )}
              </h5>
              {filteredAlertas.length > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredAlertas.length} {filteredAlertas.length === 1 ? 'alerta' : 'alertas'} nueva{filteredAlertas.length === 1 ? '' : 's'}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={toggleDropdown}
            className="p-2 text-gray-500 transition-all duration-200 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            aria-label="Cerrar notificaciones"
          >
            <svg
              className="fill-current w-5 h-5"
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

        {/* Content */}
        <div className="flex flex-col">
          <div className="overflow-y-auto max-h-[50vh] custom-scrollbar p-4">
            {!isLoading && !error && (!data || filteredAlertas.length === 0) && (
              <div className="flex flex-col items-center justify-center min-h-[100px] space-y-4 text-gray-500 dark:text-gray-400">                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-700 dark:text-gray-300">No hay alertas nuevas</p>
                  <p className="text-sm mt-1">Todo está funcionando correctamente</p>
                  {isFetching && (
                    <p className="text-xs mt-2 text-gray-400 dark:text-gray-500">
                      Actualizando automáticamente...
                    </p>
                  )}
                </div>
              </div>
            )}

            {!isLoading && !error && data && filteredAlertas.length > 0 && (
              <div className="space-y-3">
                {filteredAlertas.map((alerta, idx) => (
                  <li key={idx} className="list-none">
                    <DropdownItem
                      onItemClick={() => handleAlertaClick(alerta)}
                      className="group relative bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-4 hover:shadow-lg transition-all duration-200 hover:border-orange-200 dark:hover:border-orange-500 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                          <svg
                            className="w-5 h-5 text-orange-600 dark:text-orange-400"
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
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-relaxed group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
                            {alerta.mensaje}
                          </p>

                          {"cantidad" in alerta && (
                            <div className="mt-2"></div>
                          )}

                          {"productos" in alerta && alerta.productos.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-600">
                              {alerta.productos.map((producto) => (
                                <pre className="text-xs text-gray-700 dark:text-gray-300 font-mono whitespace-pre-wrap break-words">
                                  {JSON.stringify(producto, null, 2)}
                                </pre>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Indicador de navegación */}
                        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <svg
                            className="w-4 h-4 text-gray-400 group-hover:text-orange-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </DropdownItem>
                  </li>
                ))}
              </div>
            )}
          </div>
        </div>
      </Dropdown>
    </div>
  );
}