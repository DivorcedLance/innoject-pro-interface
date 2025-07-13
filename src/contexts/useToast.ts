import { useContext } from "react";
import {
  ToastContext,
  type ToastContextType,
  type ToastOptions,
} from "./ToastContext";

// Hook personalizado para usar el contexto
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast debe ser usado dentro de un ToastProvider");
  }

  return context;
};

// Hook alternativo con métodos de conveniencia
export const useToastHelpers = () => {
  const { showToast } = useToast();

  const success = (
    message: string,
    options?: Omit<ToastOptions, "message" | "type">
  ) => showToast({ message, type: "success", ...options });

  const error = (
    message: string,
    options?: Omit<ToastOptions, "message" | "type">
  ) => showToast({ message, type: "error", ...options });

  const warning = (
    message: string,
    options?: Omit<ToastOptions, "message" | "type">
  ) => showToast({ message, type: "warning", ...options });

  const info = (
    message: string,
    options?: Omit<ToastOptions, "message" | "type">
  ) => showToast({ message, type: "info", ...options });

  return {
    success,
    error,
    warning,
    info,
  };
};
