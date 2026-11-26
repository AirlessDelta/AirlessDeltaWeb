import React, { useState } from 'react';
import { Search, Cog, ShieldCheck, Phone, CheckCircle2, AlertTriangle, Layers, Plus, ShoppingBag } from 'lucide-react';
import { deltaData } from '../data/deltaData';
import { useCart } from '../context/CartContext';

export default function Repuestos({ setApartadoActivo }) {
  const [busqueda, setBusqueda] = useState('');
  const { agregarItem, abrirCarrito, totalItems } = useCart();

  return (
    <div className="py-12 lg:py-16 bg-paper min-h-screen text-navy">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="h-1 bg-navy w-16 mb-4" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-condensed font-bold uppercase tracking-widest text-blue block mb-1">
                BODEGA CENTRAL EN EL SALVADOR · STOCK PERMANENTE
              </span>
              <h1 className="font-condensed font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-navy tracking-tight">
                REPUESTOS ORIGINALES Y DESPIECES
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={abrirCarrito}
                className="btn-primary flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>MI COTIZACIÓN ({totalItems})</span>
              </button>

              <a
                href={`https://wa.me/${deltaData.empresa.whatsappClean}?text=Hola%20Grupo%20Partes,%20necesito%20cotizar%20un%20repuesto%20para%20mi%20maquina%20Airless`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-navy hover:bg-navy-deep text-white font-condensed font-bold text-xs uppercase tracking-wider transition-colors min-h-[44px] cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <div className="flex flex-col text-left leading-tight">
                  <span>CONSULTAR EN WHATSAPP</span>
                  <span className="text-[10px] font-barlow text-emerald-400 font-medium">+503 7000-5512</span>
                </div>
              </a>
            </div>
          </div>
          <p className="font-barlow text-sm sm:text-base text-muted mt-2 max-w-2xl">
            Trazabilidad directa de fábrica en componentes de desgaste crítico: kits de juntas V-Packing, pistones endurecidos, camisas de bomba y tarjetas electrónicas SmartControl. Agrega repuestos individuales para cotizar en bloque por WhatsApp.
          </p>
        </div>

        {/* Buscador de repuesto */}
        <div className="bg-white p-4 border border-line shadow-sm mb-8">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por código (ej: D-395-01) o nombre de pieza..."
              className="input-industrial pr-10 text-sm"
              style={{ paddingLeft: '2.75rem' }}
            />
            {busqueda && (
              <button
                type="button"
                onClick={() => setBusqueda('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted hover:text-navy cursor-pointer"
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Despieces por serie de máquina */}
        <div className="space-y-10">
          {deltaData.repuestos.map((grupo, gIdx) => {
            const piezasFiltradas = grupo.piezas.filter((p) => {
              const term = busqueda.toLowerCase();
              return (
                p.codigo.toLowerCase().includes(term) ||
                p.nombre.toLowerCase().includes(term) ||
                p.funcion.toLowerCase().includes(term)
              );
            });

            if (piezasFiltradas.length === 0) return null;

            return (
              <div key={gIdx} className="bg-white border border-line p-6 lg:p-8 shadow-sm">
                <div className="pb-4 border-b border-line mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-condensed font-bold text-xs uppercase tracking-wider text-blue block">
                      DESPIECE HOMOLOGADO OEM
                    </span>
                    <h3 className="font-condensed font-bold text-2xl lg:text-3xl uppercase text-navy">
                      {grupo.maquina}
                    </h3>
                  </div>
                  <span className="text-xs font-barlow text-muted">
                    {grupo.seccion}
                  </span>
                </div>

                {/* Grid con Esquema Real Extraído del PDF y Tabla de Piezas */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-6 items-start">
                  
                  {/* Despiece Visual Oficial en Studio Stage */}
                  <div className="bg-paper border border-line p-4 flex flex-col items-center justify-center relative overflow-hidden group shadow-sm">
                    <div className="w-full flex items-center justify-between mb-2">
                      <span className="text-[10px] font-condensed font-bold uppercase tracking-wider text-muted flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-blue" />
                        <span>DIAGRAMA DE DESPIECE OFICIAL</span>
                      </span>
                      <span className="text-[10px] font-condensed font-bold uppercase text-navy bg-white px-2 py-0.5 border border-line">
                        FICHA TÉCNICA 2027
                      </span>
                    </div>

                    <div className="w-full h-72 sm:h-80 studio-stage border border-line-soft p-3 flex items-center justify-center relative overflow-hidden">
                      <img
                        src={grupo.imagen}
                        alt={`Diagrama de despiece ${grupo.maquina}`}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-300 relative z-10"
                      />
                    </div>
                    <span className="text-[11px] font-barlow text-muted mt-2 text-center">
                      Identifique el número de pieza en el diagrama y haga clic en "+ Cotizar" para añadirlo a su lista.
                    </span>
                  </div>

                  {/* Tabla de Piezas y Códigos con Botón + Cotizar */}
                  <div className="overflow-x-auto bg-white border border-line">
                    <table className="w-full text-left font-barlow text-sm border-collapse">
                      <thead>
                        <tr className="bg-navy text-white font-condensed font-bold text-xs uppercase tracking-wider">
                          <th className="p-3 w-28">CÓDIGO</th>
                          <th className="p-3">NOMBRE DE LA PIEZA</th>
                          <th className="p-3">FUNCIÓN Y APLICACIÓN</th>
                          <th className="p-3 w-36 text-right">ACCIÓN</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        {piezasFiltradas.map((pieza, pIdx) => (
                          <tr key={pIdx} className="hover:bg-panel transition-colors">
                            <td className="p-3">
                              <span className="font-condensed font-bold text-navy text-sm bg-panel px-2 py-0.5 border border-line inline-block">
                                {pieza.codigo}
                              </span>
                            </td>
                            <td className="p-3 font-semibold text-navy">
                              {pieza.nombre}
                            </td>
                            <td className="p-3 text-muted text-xs">
                              {pieza.funcion}
                            </td>
                            <td className="p-3 text-right">
                              <button
                                type="button"
                                onClick={() =>
                                  agregarItem({
                                    id: `rep-${pieza.codigo}`,
                                    nombre: `${pieza.nombre} (${pieza.codigo})`,
                                    tipo: 'repuesto',
                                    imagen: grupo.imagen,
                                    codigo: pieza.codigo,
                                    subtitulo: `Para ${grupo.maquina}`,
                                    detalle: pieza.funcion,
                                  })
                                }
                                className="px-2.5 py-1.5 bg-blue hover:bg-navy text-white font-condensed font-bold text-xs uppercase transition-colors inline-flex items-center gap-1 cursor-pointer min-h-[32px] shadow-sm"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>+ COTIZAR</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Banner de Garantía y Aviso de Mantenimiento */}
        <div className="mt-12 p-6 sm:p-8 bg-white border border-line flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-panel border border-line flex items-center justify-center flex-shrink-0 text-navy">
              <Cog className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-condensed font-bold uppercase tracking-wider text-blue block mb-1">
                PROTOCOLO TÉCNICO DE MANTENIMIENTO PREVENTIVO
              </span>
              <h4 className="font-condensed font-bold text-2xl uppercase text-navy">
                REEMPLAZO PREVENTIVO DE JUNTAS V-PACKING
              </h4>
              <p className="font-barlow text-sm text-muted mt-1 max-w-xl">
                Se recomienda renovar el juego de empaquetaduras cada 20,000 m² de aplicación o ante la primera señal de goteo en la varilla del pistón para evitar rayaduras en la camisa del cilindro.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={abrirCarrito}
            className="btn-primary whitespace-nowrap flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>VER LISTA DE COTIZACIÓN ({totalItems})</span>
          </button>
        </div>

      </div>
    </div>
  );
}
