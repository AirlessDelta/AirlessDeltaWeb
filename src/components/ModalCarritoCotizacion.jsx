import React, { useState, useEffect } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Phone,
  Copy,
  Check,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Building2,
  MapPin,
  FileText,
  User,
  MessageSquare,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { deltaData } from '../data/deltaData';

/**
 * Carrito de Cotización Multiproducto — UI/UX Impeccable & SkillNexthezia:
 * - Slide-over de alta fidelidad en escritorio y Bottom-Sheet en móvil.
 * - Visualización nítida de productos agregados con stepper ergonómico (>= 44px).
 * - Vista previa interactiva estilo WhatsApp con el mensaje estructurado oficial.
 * - Integración con soporte técnico y garantía de Grupo Partes El Salvador (+503 7000-5512).
 */
export default function ModalCarritoCotizacion({ onNavegarApartado, onMostrarToast }) {
  const {
    items,
    totalItems,
    isOpen,
    cerrarCarrito,
    removerItem,
    actualizarCantidad,
    vaciarCarrito,
    clienteInfo,
    actualizarCliente,
    enviarWhatsApp,
    generarMensajeWhatsApp,
  } = useCart();

  const [copiado, setCopiado] = useState(false);
  const [mostrarFormularioCliente, setMostrarFormularioCliente] = useState(false);
  const [mostrarPreviewWhatsApp, setMostrarPreviewWhatsApp] = useState(false);

  // Bloquear scroll de fondo mientras el drawer está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') cerrarCarrito();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, cerrarCarrito]);

  if (!isOpen) return null;

  const handleCopiarMensaje = async () => {
    try {
      const texto = generarMensajeWhatsApp();
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      if (onMostrarToast) {
        onMostrarToast('Texto de la cotización copiado al portapapeles.', 'exito');
      }
      setTimeout(() => setCopiado(false), 2500);
    } catch (err) {
      if (onMostrarToast) {
        onMostrarToast('No se pudo copiar automáticamente. Intente nuevamente.', 'error');
      }
    }
  };

  const handleIrA = (apartado) => {
    cerrarCarrito();
    if (onNavegarApartado) {
      onNavegarApartado(apartado);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="carrito-titulo"
      className="fixed inset-0 z-[80] flex justify-end bg-[#07112E]/75 backdrop-blur-md overflow-hidden animate-in fade-in duration-200"
      onClick={cerrarCarrito}
    >
      <div
        className="w-full sm:max-w-lg lg:max-w-xl h-full bg-white text-navy shadow-2xl flex flex-col justify-between border-l border-line overflow-hidden animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* 1. Top Header con Estética Industrial Hallmark */}
        <div className="bg-navy text-white p-4 sm:p-5 flex items-center justify-between border-b border-navy-card flex-shrink-0 relative">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 bg-blue rounded-circle flex items-center justify-center text-white flex-shrink-0 shadow-md">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 id="carrito-titulo" className="font-condensed font-bold text-xl sm:text-2xl uppercase tracking-tight truncate">
                  LISTA DE COTIZACIÓN
                </h3>
                <span className="bg-blue-light text-navy font-condensed font-bold text-xs px-2.5 py-0.5 rounded-full shadow-sm">
                  {totalItems} {totalItems === 1 ? 'equipo' : 'equipos/repuestos'}
                </span>
              </div>
              <span className="font-barlow text-xs text-[#B7C2E0] block truncate">
                Grupo Partes · Distribuidor Autorizado en El Salvador
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={cerrarCarrito}
            className="w-10 h-10 flex items-center justify-center text-[#B7C2E0] hover:text-white hover:bg-white/10 transition-colors focus:outline-none min-h-[44px] min-w-[44px] cursor-pointer"
            aria-label="Cerrar cotización"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 2. Cuerpo Desplazable con Tarjetas de Producto */}
        <div className="p-4 sm:p-6 overflow-y-auto overflow-x-hidden flex-1 space-y-5 overscroll-contain bg-[#F8FAFC]">
          
          {items.length === 0 ? (
            /* Estado Vacío de Alta Jerarquía */
            <div className="py-14 px-4 text-center">
              <div className="w-20 h-20 bg-white border border-[#C3CBE0] rounded-circle flex items-center justify-center mx-auto mb-4 text-blue shadow-sm">
                <ShoppingBag className="w-9 h-9 text-blue/80 stroke-[1.75]" />
              </div>
              <h4 className="font-condensed font-bold text-2xl uppercase text-navy mb-2">
                TU LISTA DE COTIZACIÓN ESTÁ VACÍA
              </h4>
              <p className="font-barlow text-sm text-muted max-w-sm mx-auto mb-6 leading-relaxed">
                Agrega maquinaria Airless, boquillas reversibles RAC X, pistolas o repuestos para enviar una sola solicitud consolidada a WhatsApp.
              </p>

              <div className="space-y-2.5 max-w-xs mx-auto">
                <button
                  type="button"
                  onClick={() => handleIrA('maquinaria')}
                  className="btn-primary w-full py-3 text-xs flex items-center justify-center gap-2"
                >
                  <span>EXPLORAR CATÁLOGO DE MAQUINARIA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleIrA('accesorios')}
                  className="btn-secondary w-full py-2.5 text-xs flex items-center justify-center gap-2"
                >
                  <span>VER ACCESORIOS Y BOQUILLAS</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleIrA('repuestos')}
                  className="btn-secondary w-full py-2.5 text-xs flex items-center justify-center gap-2"
                >
                  <span>VER DESPIECES Y REPUESTOS</span>
                </button>
              </div>
            </div>
          ) : (
            /* Lista de Productos Enriquecida */
            <>
              {/* Barra superior de lista con botón vaciar */}
              <div className="flex items-center justify-between pb-3 border-b border-[#C3CBE0]">
                <div className="flex items-center gap-2">
                  <span className="font-condensed font-bold text-xs uppercase tracking-wider text-muted">
                    EQUIPOS SELECCIONADOS ({items.length})
                  </span>
                  <span className="w-1.5 h-1.5 rounded-circle bg-emerald-500" />
                </div>
                <button
                  type="button"
                  onClick={vaciarCarrito}
                  className="text-xs font-condensed font-bold text-red-600 hover:text-red-700 hover:underline uppercase flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>VACIAR LISTA</span>
                </button>
              </div>

              {/* Tarjetas de Producto */}
              <div className="space-y-3">
                {items.map((it) => {
                  const isMaquina = it.tipo === 'maquina';
                  const isAccesorio = it.tipo === 'accesorio';
                  const isRepuesto = it.tipo === 'repuesto';

                  const badgeClass = isMaquina
                    ? 'bg-navy text-white'
                    : isAccesorio
                    ? 'bg-blue text-white'
                    : 'bg-[#182C66] text-white';

                  return (
                    <div
                      key={it.id}
                      className="p-3.5 sm:p-4 bg-white border border-[#C3CBE0] hover:border-blue transition-all flex items-center gap-3.5 shadow-sm group relative"
                    >
                      {/* Miniatura de Producto con Studio Stage */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 studio-stage border border-[#D3DAEA] p-1.5 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                        <img
                          src={it.imagen}
                          alt={it.nombre}
                          className="max-h-full max-w-full object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Detalles del Ítem */}
                      <div className="flex-1 min-w-0 pr-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[9px] font-condensed font-bold uppercase px-2 py-0.5 tracking-wider ${badgeClass}`}>
                            {it.tipo}
                          </span>
                          {it.codigo && (
                            <span className="text-[10px] font-condensed font-bold text-blue tracking-wide bg-[#EEF1F8] px-1.5 py-0.5 border border-[#C3CBE0]">
                              OEM: {it.codigo}
                            </span>
                          )}
                        </div>

                        <h5 className="font-condensed font-bold text-base sm:text-lg uppercase text-navy leading-tight truncate group-hover:text-blue transition-colors">
                          {it.nombre}
                        </h5>
                        
                        {it.subtitulo && (
                          <p className="font-barlow text-xs text-muted truncate">
                            {it.subtitulo}
                          </p>
                        )}

                        {/* Stepper Ergonómico de Cantidad */}
                        <div className="flex items-center gap-3 mt-2.5">
                          <div className="inline-flex items-center border border-[#AAB7D4] bg-[#F8FAFC]">
                            <button
                              type="button"
                              onClick={() => actualizarCantidad(it.id, -1)}
                              className="w-8 h-8 flex items-center justify-center text-navy hover:bg-[#EEF1F8] transition-colors cursor-pointer select-none active:bg-blue active:text-white"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-9 text-center font-condensed font-bold text-sm text-navy bg-white py-1 select-none border-x border-[#AAB7D4]">
                              {it.cantidad}
                            </span>
                            <button
                              type="button"
                              onClick={() => actualizarCantidad(it.id, 1)}
                              className="w-8 h-8 flex items-center justify-center text-navy hover:bg-[#EEF1F8] transition-colors cursor-pointer select-none active:bg-blue active:text-white"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-xs font-barlow text-muted font-medium">
                            {it.cantidad === 1 ? 'unidad' : 'unidades'}
                          </span>
                        </div>
                      </div>

                      {/* Botón Eliminar Ítem */}
                      <button
                        type="button"
                        onClick={() => removerItem(it.id)}
                        className="w-9 h-9 flex items-center justify-center text-muted/60 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer flex-shrink-0"
                        aria-label={`Remover ${it.nombre}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Botón Desplegable: Datos del Cliente (Para formalizar cotización) */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setMostrarFormularioCliente(!mostrarFormularioCliente)}
                  className="w-full py-2.5 px-3.5 bg-white border border-[#C3CBE0] hover:border-blue text-xs font-condensed font-bold uppercase text-navy transition-all flex items-center justify-between cursor-pointer shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue" />
                    <span>
                      {mostrarFormularioCliente
                        ? 'OCULTAR DATOS DE CONTACTO'
                        : '+ AGREGAR DATOS PARA AGILIZAR COTIZACIÓN (OPCIONAL)'}
                    </span>
                  </span>
                  {mostrarFormularioCliente ? <ChevronUp className="w-4 h-4 text-blue" /> : <ChevronDown className="w-4 h-4 text-muted" />}
                </button>

                {mostrarFormularioCliente && (
                  <div className="mt-3 p-4 bg-white border border-[#C3CBE0] space-y-3 animate-in fade-in duration-150 shadow-sm">
                    <div>
                      <label className="text-[11px] font-condensed font-bold uppercase text-muted block mb-1">
                        NOMBRE DE CONTACTO:
                      </label>
                      <input
                        type="text"
                        value={clienteInfo.nombre}
                        onChange={(e) => actualizarCliente('nombre', e.target.value)}
                        placeholder="Ej: Ing. Carlos Hernández"
                        className="input-industrial py-2 px-3 text-xs w-full bg-[#FAFCFF]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-condensed font-bold uppercase text-muted block mb-1">
                        EMPRESA O PROYECTO:
                      </label>
                      <input
                        type="text"
                        value={clienteInfo.empresa}
                        onChange={(e) => actualizarCliente('empresa', e.target.value)}
                        placeholder="Ej: Constructora El Roble / Proyecto Vial"
                        className="input-industrial py-2 px-3 text-xs w-full bg-[#FAFCFF]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-condensed font-bold uppercase text-muted block mb-1">
                        UBICACIÓN EN EL SALVADOR:
                      </label>
                      <input
                        type="text"
                        value={clienteInfo.ubicacion}
                        onChange={(e) => actualizarCliente('ubicacion', e.target.value)}
                        placeholder="Ej: Lourdes Colón, San Salvador, Santa Ana"
                        className="input-industrial py-2 px-3 text-xs w-full bg-[#FAFCFF]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-condensed font-bold uppercase text-muted block mb-1">
                        REQUERIMIENTO O NOTAS ADICIONALES:
                      </label>
                      <textarea
                        rows={2}
                        value={clienteInfo.notas}
                        onChange={(e) => actualizarCliente('notas', e.target.value)}
                        placeholder="Ej: Requerimos entrega en obra y crédito fiscal..."
                        className="input-industrial py-2 px-3 text-xs w-full bg-[#FAFCFF] resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Botón Desplegable: Vista Previa Real del Mensaje de WhatsApp */}
              <div>
                <button
                  type="button"
                  onClick={() => setMostrarPreviewWhatsApp(!mostrarPreviewWhatsApp)}
                  className="w-full py-2 px-3.5 bg-[#EEF1F8] border border-[#C3CBE0] hover:border-navy text-xs font-condensed font-bold uppercase text-muted hover:text-navy transition-all flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>
                      {mostrarPreviewWhatsApp
                        ? 'OCULTAR VISTA PREVIA DEL MENSAJE'
                        : 'VER FORMATO DEL MENSAJE OFICIAL WHATSAPP'}
                    </span>
                  </span>
                  {mostrarPreviewWhatsApp ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-muted" />}
                </button>

                {mostrarPreviewWhatsApp && (
                  <div className="mt-2.5 p-3.5 bg-[#DCF8C6]/30 border-2 border-emerald-500/40 font-mono text-xs text-navy whitespace-pre-wrap leading-relaxed shadow-inner animate-in fade-in duration-150">
                    {generarMensajeWhatsApp()}
                  </div>
                )}
              </div>

              {/* Garantía y Compromiso Grupo Partes */}
              <div className="p-3.5 bg-panel border border-line flex items-start gap-3">
                <div className="w-7 h-7 bg-white border border-line flex items-center justify-center flex-shrink-0 text-navy">
                  <Check className="w-3.5 h-3.5 text-blue" />
                </div>
                <div className="text-xs font-barlow text-navy">
                  <strong className="font-condensed uppercase block font-bold text-sm">
                    VENTA DIRECTA & GARANTÍA OFICIAL
                  </strong>
                  Su cotización será atendida directamente por ingenieros de producto en la bodega central de Grupo Partes (Lourdes Colón, La Libertad).
                </div>
              </div>
            </>
          )}

        </div>

        {/* 3. Footer con CTA Primario de WhatsApp de Alto Impacto */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-line space-y-3 flex-shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
            
            {/* Botón WhatsApp de Gran Visibilidad */}
            <button
              type="button"
              onClick={enviarWhatsApp}
              className="btn-whatsapp w-full min-h-[52px] text-lg font-condensed font-bold uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-circle bg-white text-[#25D366] flex items-center justify-center flex-shrink-0 shadow-sm">
                <Phone className="w-4 h-4 fill-[#25D366]" />
              </div>
              <span>ENVIAR COTIZACIÓN A WHATSAPP</span>
            </button>

            {/* Fila de Acciones Secundarias */}
            <div className="flex items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={handleCopiarMensaje}
                className="flex-1 py-2 px-3 bg-white border border-line hover:border-navy text-navy text-xs font-condensed font-bold uppercase transition-colors flex items-center justify-center gap-1.5 min-h-[42px] cursor-pointer"
              >
                {copiado ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">¡COPIADO AL PORTAPAPELES!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-muted" />
                    <span>COPIAR TEXTO FORMAL</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={cerrarCarrito}
                className="py-2 px-4 bg-[#EEF1F8] border border-[#C3CBE0] hover:bg-white text-navy text-xs font-condensed font-bold uppercase transition-colors min-h-[42px] cursor-pointer"
              >
                + AGREGAR MÁS EQUIPOS
              </button>
            </div>
            
            <div className="text-center pt-1">
              <span className="text-[11px] font-barlow text-muted block">
                Atención inmediata: <strong>+503 7000-5512</strong> · Lunes a Viernes 8:00 AM - 5:30 PM | Sábado 8:00 AM - 12:30 PM
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
