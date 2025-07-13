import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  type LucideProps,
} from "lucide-react";

export const Toast = ({
  message,
  icon: CustomIcon,
  type = "info",
  duration = 5000,
  onClose,
  position = "top-right",
  showCloseButton = true,
  autoClose = true,
}: {
  message: string;
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
  position?:
    | "top-right"
    | "top-left"
    | "top-center"
    | "bottom-right"
    | "bottom-left"
    | "bottom-center";
  showCloseButton?: boolean;
  autoClose?: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  // Íconos por defecto según el tipo
  const defaultIcons: Record<
    string,
    React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >
  > = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  // Colores según el tipo
  const typeStyles: Record<string, string> = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const iconStyles: Record<string, string> = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600",
  };

  // Posiciones
  const positionStyles: Record<string, string> = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  const Icon = CustomIcon || defaultIcons[type];

  useEffect(() => {
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, autoClose]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300); // Duración de la animación de salida
  };

  if (!isVisible) return null;

  return (
    <div
      className={`absolute z-50 ${
        positionStyles[position]
      } transition-all duration-300 ease-in-out transform ${
        isLeaving
          ? "opacity-0 translate-y-2 scale-95"
          : "opacity-100 translate-y-0 scale-100"
      }`}
    >
      <div
        className={`
        flex items-center gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm
        ${typeStyles[type]}
        min-w-80 max-w-md
        animate-in slide-in-from-top-2 fade-in duration-300
      `}
      >
        {/* Ícono */}
        <div className="flex-shrink-0">
          <Icon className={`w-5 h-5 ${iconStyles[type]}`} />
        </div>

        {/* Mensaje */}
        <div className="flex-1 text-xl font-medium">{message}</div>

        {/* Botón de cerrar */}
        {showCloseButton && (
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors duration-200"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Barra de progreso (opcional) */}
        {autoClose && duration > 0 && (
          <div className="absolute bottom-0 left-0 h-1 bg-black/20 rounded-b-lg overflow-hidden">
            <div
              className="h-full bg-black/40 rounded-b-lg animate-shrink"
              style={{ ["--duration"]: `${duration}ms` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
