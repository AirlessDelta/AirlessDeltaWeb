import React, { useEffect } from 'react';
import { X, Check, Gauge, Zap, Weight, Disc, ArrowRight, ShieldCheck, Phone, Plus, ShoppingBag } from 'lucide-react';
import { deltaData } from '../data/deltaData';
import { useCart } from '../context/CartContext';

/**
 * Ficha Técnica con diseño híbrido Modal / Bottom-Sheet según SkillNexthezia:
 * - Totalmente contenido dentro del viewport (sin desbordes ni cortes horizontales)
 * - Muestra la imagen real de la máquina extraída de la Ficha Técnica oficial
 * - En móvil se adapta como Bottom Sheet accesible con arrastre
 * - En escritorio como panel modal centrado con backdrop blur
 * - Manejo de teclado (Escape para cerrar) y bloqueo de scroll de fondo
 */
export default function ModalFichaTecnica({ maquina, onClose, onCotizar }) {
  if (!maquina) return null;
  const { agregarItem, abrirCarrito } = useCart();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-navy/80 backdrop-blur-sm overflow-hidden"
      onClick={onClose}
    >
      <div
        className="bg-white text-navy w-full sm:max-w-3xl border-t-4 sm:border-2 border-navy shadow-2xl relative max-h-[90dvh] sm:max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag / Sheet Handle Indicator */}
        <div className="sm:hidden w-12 h-1 bg-[#C3CBE0] rounded-circle mx-auto my-2 flex-shrink-0" />

        {/* Modal Top Bar */}
        <div className="bg-navy text-white p-4 sm:p-5 flex items-center justify-between border-b border-navy-card flex-shrink-0">
          <div className="pr-2 min-w-0">
            <span className="text-[11px] font-condensed font-bold tracking-widest text-blue-light uppercase block">
              FICHA TÉCNICA OFICIAL · DELTA 2027
            </span>
            <h3 id="modal-titulo" className="font-condensed font-bold text-xl sm:text-2xl uppercase tracking-tight">
              {maquina.nombre}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-white hover:text-blue-light hover:bg-white/10 transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex-shrink-0 cursor-pointer"
            aria-label="Cerrar ficha técnica"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body with smooth internal scroll */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto overflow-x-hidden flex-1 overscroll-contain">
          
          {/* Header Product Showcase with Real Extracted Image */}
          <div className="bg-[#EEF1F8] p-4 sm:p-5 border border-[#C3CBE0] flex flex-col sm:flex-row items-center gap-5">
            <div className="w-36 h-36 sm:w-44 sm:h-44 bg-white border border-[#C3CBE0] p-2 flex items-center justify-center flex-shrink-0 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0B1A44_1px,transparent_1px)] bg-[size:12px_12px]" />
              <img
                src={maquina.imagen}
                alt={maquina.nombre}
                className="max-h-full max-w-full object-contain filter drop-shadow-md"
              />
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="bg-blue text-white font-condensed font-bold text-xs uppercase px-2.5 py-0.5">
                  {maquina.tag2027}
                </span>
                <span className="bg-navy text-white font-condensed font-bold text-xs uppercase px-2.5 py-0.5">
                  PRESIÓN: {maquina.presion}
                </span>
              </div>
              <h4 className="font-condensed font-bold text-lg sm:text-xl text-navy uppercase leading-tight mb-1">
                {maquina.subtitulo}
              </h4>
              <p className="font-barlow text-xs text-muted mb-3">
                Línea distribuida y respaldada en El Salvador con garantía oficial de Grupo Partes.
              </p>
              <div className="inline-flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-xs font-condensed font-bold text-blue uppercase bg-white px-3 py-1.5 border border-[#C3CBE0]">
                <span>CAUDAL: {maquina.caudal}</span>
                <span>•</span>
                <span>POTENCIA: {maquina.potencia}</span>
                <span>•</span>
                <span>BOQUILLA MÁX: {maquina.boquillaMax}</span>
              </div>
            </div>
          </div>

          {/* Technical Specs Grid: Responsive, sin recortes ni desbordes */}
          <div>
            <h4 className="font-condensed font-bold text-base uppercase tracking-wider text-navy border-b border-navy pb-1 mb-3">
              ESPECIFICACIONES TÉCNICAS DE FÁBRICA
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 w-full">
              <div className="p-3 bg-[#EEF1F8] border border-[#C3CBE0] min-w-0 flex flex-col justify-between">
                <span className="font-condensed text-[11px] uppercase text-muted block font-bold tracking-wider">MOTOR / VOLTAJE</span>
                <span className="font-condensed font-bold text-sm text-navy leading-tight mt-1">{maquina.motor}</span>
              </div>
              <div className="p-3 bg-[#EEF1F8] border border-[#C3CBE0] min-w-0 flex flex-col justify-between">
                <span className="font-condensed text-[11px] uppercase text-muted block font-bold tracking-wider">POTENCIA MOTOR</span>
                <span className="font-condensed font-bold text-sm text-blue leading-tight mt-1">{maquina.potencia}</span>
              </div>
              <div className="p-3 bg-[#EEF1F8] border border-[#C3CBE0] min-w-0 flex flex-col justify-between">
                <span className="font-condensed text-[11px] uppercase text-muted block font-bold tracking-wider">CAUDAL MÁXIMO</span>
                <span className="font-condensed font-bold text-sm text-navy leading-tight mt-1">{maquina.caudal}</span>
              </div>
              <div className="p-3 bg-panel border border-line min-w-0 flex flex-col justify-between">
                <span className="font-condensed text-[11px] uppercase text-muted block font-bold tracking-wider">PRESIÓN MÁXIMA</span>
                <span className="font-condensed font-bold text-sm text-navy leading-tight mt-1">{maquina.presion}</span>
              </div>
              <div className="p-3 bg-panel border border-line min-w-0 flex flex-col justify-between">
                <span className="font-condensed text-[11px] uppercase text-muted block font-bold tracking-wider">RENDIMIENTO / ÁREA</span>
                <span className="font-condensed font-bold text-sm text-navy leading-tight mt-1">{maquina.produccion}</span>
              </div>
              <div className="p-3 bg-panel border border-line min-w-0 flex flex-col justify-between">
                <span className="font-condensed text-[11px] uppercase text-muted block font-bold tracking-wider">BOQUILLA MÁXIMA</span>
                <span className="font-condensed font-bold text-sm text-navy leading-tight mt-1">{maquina.boquillaMax}</span>
              </div>
              <div className="p-3 bg-panel border border-line min-w-0 flex flex-col justify-between">
                <span className="font-condensed text-[11px] uppercase text-muted block font-bold tracking-wider">PESO TOTAL</span>
                <span className="font-condensed font-bold text-sm text-navy leading-tight mt-1">{maquina.peso}</span>
              </div>
              <div className="p-3 bg-panel border border-line min-w-0 flex flex-col justify-between">
                <span className="font-condensed text-[11px] uppercase text-muted block font-bold tracking-wider">CHASIS / ESTILO</span>
                <span className="font-condensed font-bold text-sm text-navy leading-tight mt-1">{maquina.estilo}</span>
              </div>
              <div className="p-3 bg-panel border border-line min-w-0 flex flex-col justify-between">
                <span className="font-condensed text-[11px] uppercase text-muted block font-bold tracking-wider">RESISTENCIA & USO</span>
                <span className="font-condensed font-bold text-sm text-navy leading-tight mt-1">{maquina.resistencia}</span>
              </div>
            </div>
          </div>

          {/* Materiales y Pinturas Homologadas */}
          <div>
            <h4 className="font-condensed font-bold text-base uppercase tracking-wider text-navy border-b border-navy pb-1 mb-3">
              MATERIALES Y RECUBRIMIENTOS APTOS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
              {maquina.materiales.map((mat, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-panel border border-line min-w-0">
                  <Check className="w-4 h-4 text-blue flex-shrink-0" />
                  <span className="font-barlow text-xs text-navy truncate font-medium">{mat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ventajas Tecnológicas */}
          <div>
            <h4 className="font-condensed font-bold text-base uppercase tracking-wider text-navy border-b border-navy pb-1 mb-3">
              VENTAJAS DE INGENIERÍA
            </h4>
            <ul className="space-y-2 font-barlow text-xs sm:text-sm text-navy">
              {maquina.ventajas.map((v, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-circle bg-blue flex-shrink-0 mt-1.5" />
                  <span className="leading-snug">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Garantía y Respaldo Oficial Grupo Partes */}
          <div className="p-4 bg-panel border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white border border-line flex items-center justify-center flex-shrink-0 text-navy">
                <Check className="w-4 h-4 text-blue" />
              </div>
              <div>
                <strong className="font-condensed font-bold text-sm uppercase block tracking-wider text-navy">
                  RESPALDO Y GARANTÍA OFICIAL · GRUPO PARTES
                </strong>
                <span className="font-barlow text-xs text-muted">
                  {deltaData.empresa.beneficioGarantia}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-paper p-4 sm:p-5 border-t border-line flex flex-col-reverse sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary py-2.5 px-4 text-xs w-full sm:w-auto text-center min-h-[44px]"
          >
            CERRAR
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                agregarItem({
                  id: maquina.id,
                  nombre: maquina.nombre,
                  tipo: 'maquina',
                  imagen: maquina.imagen,
                  subtitulo: maquina.subtitulo,
                  detalle: `Presión: ${maquina.presion} · Motor: ${maquina.motor} · Caudal: ${maquina.caudal}`,
                });
                onClose();
                abrirCarrito();
              }}
              className="btn-primary py-2.5 px-5 text-xs w-full sm:w-auto flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>+ AGREGAR A COTIZACIÓN</span>
            </button>

            <a
              href={`https://wa.me/${deltaData.empresa.whatsappClean}?text=Hola%20Grupo%20Partes,%20deseo%20cotizar%20el%20equipo%20${encodeURIComponent(maquina.nombre)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-navy hover:bg-navy-deep text-white border border-navy font-condensed font-bold text-xs uppercase tracking-wider transition-colors min-h-[44px] select-none"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>CONSULTA INMEDIATA WHATSAPP</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
