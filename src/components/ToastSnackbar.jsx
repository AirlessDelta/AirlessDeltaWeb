import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

/**
 * Toast/Snackbar ergonómico para feedback no bloqueante.
 * SkillNexthezia: Reemplaza alert()/confirm() nativos, anclado en la zona del pulgar.
 */
export default function ToastSnackbar({ mensaje, tipo = 'exito', onClose }) {
  if (!mensaje) return null;

  const getEstilos = () => {
    switch (tipo) {
      case 'error':
        return 'bg-red-900/95 border-red-500 text-white';
      case 'info':
        return 'bg-navy border-line text-white';
      case 'exito':
      default:
        return 'bg-navy-deep border-line text-white';
    }
  };

  const getIcon = () => {
    switch (tipo) {
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-light flex-shrink-0" />;
      case 'exito':
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />;
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <div
        className={`p-4 border border-line shadow-lg flex items-center justify-between gap-3 backdrop-blur-md ${getEstilos()}`}
      >
        <div className="flex items-center gap-3">
          {getIcon()}
          <span className="font-barlow text-sm font-medium leading-snug">
            {mensaje}
          </span>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label="Cerrar notificación"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
