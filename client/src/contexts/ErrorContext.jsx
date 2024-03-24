import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto de error
export const ErrorContext = createContext();

// Hook personalizado para acceder al contexto de error
export const useError = () => {
  return useContext(ErrorContext);
};

// Proveedor de contexto para envolver tu aplicación y gestionar errores
export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  // Función para establecer un nuevo error
  const setErrorMsg = (errorMsg) => {
    setError(errorMsg);
  };

  // Función para limpiar el error
  const clearError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, setErrorMsg, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

// errores que no entiendo aun como aplicarlos en el proyecto

