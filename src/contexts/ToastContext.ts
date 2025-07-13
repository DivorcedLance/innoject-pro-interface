import { createContext } from "react";
import { type LucideIcon } from "lucide-react";

// Tipos para las opciones del toast
export type ToastType = "success" | "error" | "warning" | "info";

export type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export interface ToastOptions {
  message: string;
  type?: ToastType;
  icon?: LucideIcon;
  duration?: number;
  position?: ToastPosition;
  showCloseButton?: boolean;
  autoClose?: boolean;
}

export interface Toast extends ToastOptions {
  id: number;
}

// Interface para el contexto
export interface ToastContextType {
  toasts: Toast[];
  showToast: (options: ToastOptions) => number;
  removeToast: (id: number) => void;
  clearAllToasts: () => void;
}

// Crear el contexto
export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);
