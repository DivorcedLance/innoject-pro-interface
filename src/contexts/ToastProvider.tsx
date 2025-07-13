import React, { useState, type ReactNode } from "react";
import type { Toast, ToastOptions } from "./ToastContext";
import { ToastContext, type ToastContextType } from "./ToastContext";
// Props del provider
interface ToastProviderProps {
  children: ReactNode;
}

// Provider del contexto
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (options: ToastOptions): number => {
    const id = Date.now();
    const toast: Toast = {
      id,
      type: "info",
      duration: 5000,
      position: "top-right",
      showCloseButton: true,
      autoClose: true,
      ...options,
    };

    // Solo 1 toast
    setToasts([toast]);

    // Para múltiples toasts, descomenta la siguiente línea y comenta la anterior
    // setToasts((prev) => [...prev, toast]);

    // Auto-remover después del tiempo especificado
    if (options.autoClose !== false) {
      setTimeout(() => {
        removeToast(id);
      }, options.duration || 5000);
    }

    return id;
  };

  const removeToast = (id: number): void => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const clearAllToasts = (): void => {
    setToasts([]);
  };

  const value: ToastContextType = {
    toasts,
    showToast,
    removeToast,
    clearAllToasts,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
