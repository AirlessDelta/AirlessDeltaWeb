import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Gauge,
  Zap,
  Check,
  ArrowRight,
  LayoutGrid,
  Table,
  RefreshCw,
  Phone,
  Plus,
  ShoppingBag,
  SlidersHorizontal,
  Flame,
} from 'lucide-react';
import { deltaData } from '../data/deltaData';
import { useCart } from '../context/CartContext';
import SkeletonCard from '../components/SkeletonCard';

/**
 * Catálogo de Maquinaria Industrial — Nexthezia Hallmark & Impeccable UI:
 * - Studio Stage con iluminación radial para fotografía de producto.
 * - Filtros por categoría con contadores dinámicos de inventario.
 * - Ficha técnica de telemetría de 4 cuadrantes.
 * - Botón de cotización instantánea multiproducto hacia WhatsApp.
 */
export default function Maquinaria({ onVerFicha, setApartadoActivo }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [vistaModo, setVistaModo] = useState('grid'); // 'grid' | 'table'
  const [cargando, setCargando] = useState(false);
  const { agregarItem, abrirCarrito } = useCart();

  // Simular transición suave de carga con debounce para evitar parpadeos
  useEffect(() => {
    setCargando(true);
    const timer = setTimeout(() => {
      setCargando(false);
    }, 160);
    return () => clearTimeout(timer);
  }, [categoriaSeleccionada, busqueda]);

  const maquinasFiltradas = deltaData.maquinas.filter((m) => {
    const coincideCategoria =
      categoriaSeleccionada === 'todas' || m.categoria === categoriaSeleccionada;
    const termino = busqueda.toLowerCase().trim();
    if (!termino) return coincideCategoria;

    const coincideBusqueda =
      m.nombre.toLowerCase().includes(termino) ||
      m.subtitulo.toLowerCase().includes(termino) ||
      m.motor.toLowerCase().includes(termino) ||
      m.materiales.some((mat) => mat.toLowerCase().includes(termino));

    return coincideCategoria && coincideBusqueda;
  });

  const handleLimpiarFiltros = () => {
    setCategoriaSeleccionada('todas');
    setBusqueda('');
  };

  const handleAgregarACotizar = (m) => {
    agregarItem({
      id: m.id,
      nombre: m.nombre,
      tipo: 'maquina',
      imagen: m.imagen,
      subtitulo: m.subtitulo,
      detalle: `Presión: ${m.presion} · Motor: ${m.motor.split('(')[0]} · Caudal: ${m.caudal}`,
    });
  };

  return (
    <div className="py-10 lg:py-16 bg-paper min-h-screen text-navy">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-10">
        
        {/* Header de la sección con jerarquía Hallmark */}
        <div className="mb-8">
          <div className="h-1 bg-navy w-16 mb-4" />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-condensed font-bold uppercase tracking-widest text-blue block mb-1">
                INVENTARIO EN BODEGA CENTRAL · EL SALVADOR
              </span>
              <h1 className="font-condensed font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-navy tracking-tight">
                CATÁLOGO DE MAQUINARIA INDUSTRIAL
              </h1>
            </div>
            
            {/* Toggle de Vista (Cuadrícula vs Tabla) */}
            <div className="flex items-center gap-2 self-start lg:self-auto">
              <span className="text-xs font-condensed font-bold uppercase text-muted hidden sm:inline">
                VISUALIZACIÓN:
              </span>
              <div className="inline-flex border border-line bg-white p-0.5 shadow-sm">
                <button
                  type="button"
                  onClick={() => setVistaModo('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-condensed font-bold uppercase transition-colors cursor-pointer ${
                    vistaModo === 'grid' ? 'bg-navy text-white shadow-sm' : 'text-muted hover:text-navy'
                  }`}
                  aria-label="Vista en cuadrícula"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Tarjetas</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVistaModo('table')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-condensed font-bold uppercase transition-colors cursor-pointer ${
                    vistaModo === 'table' ? 'bg-navy text-white shadow-sm' : 'text-muted hover:text-navy'
                  }`}
                  aria-label="Vista en tabla comparativa"
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>Tabla Comparativa</span>
                </button>
              </div>
            </div>
          </div>
          <p className="font-barlow text-sm sm:text-base text-muted mt-2 max-w-2xl">
            Pulverizadoras Airless (motores Brushless y gasolina Honda), rociadoras de mortero y bombas de concreto. Agrega uno o varios modelos a tu lista para cotizar todo junto por WhatsApp.
          </p>
        </div>

        {/* Barra de Filtros y Buscador de Alta Fidelidad */}
        <div className="bg-white p-5 lg:p-6 border border-line shadow-sm mb-8 space-y-4">
          <div className="relative w-full">
            <Search className="w-5 h-5 text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por modelo (ej: 395, Mark V, GMAX), material (látex, epoxi, masilla) o motor..."
              className="input-industrial pr-10 text-sm sm:text-base w-full"
              style={{ paddingLeft: '3.75rem' }}
            />
            {busqueda && (
              <button
                type="button"
                onClick={() => setBusqueda('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted hover:text-navy w-8 h-8 flex items-center justify-center cursor-pointer"
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-line flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <span className="text-xs font-condensed font-bold uppercase tracking-wider text-muted hidden lg:inline">
              CATEGORÍA DE EQUIPO:
            </span>
            <div
              className="flex items-center gap-2 overflow-x-auto lg:flex-wrap pb-1 lg:pb-0 no-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {deltaData.categoriasMaquinaria.map((cat) => {
                const count =
                  cat.id === 'todas'
                    ? deltaData.maquinas.length
                    : deltaData.maquinas.filter((m) => m.categoria === cat.id).length;

                const isSelected = categoriaSeleccionada === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoriaSeleccionada(cat.id)}
                    className={`px-3.5 py-2 text-xs font-condensed font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border min-h-[44px] flex items-center gap-1.5 select-none ${
                      isSelected
                        ? 'bg-navy text-white border-navy shadow-sm'
                        : 'bg-white text-navy border-line hover:border-navy hover:bg-panel'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] font-condensed font-bold px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-panel text-muted'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contenido: Grid de Skeleton o Resultados */}
        {cargando ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : maquinasFiltradas.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-line p-12 text-center text-muted max-w-lg mx-auto my-8">
            <div className="w-16 h-16 bg-panel border border-line rounded-circle flex items-center justify-center mx-auto mb-4 text-muted">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-condensed font-bold text-2xl uppercase text-navy mb-2">
              No se encontraron modelos
            </h3>
            <p className="font-barlow text-sm text-muted mb-6">
              No hay coincidencias para "{busqueda}" en la categoría seleccionada.
            </p>
            <button
              type="button"
              onClick={handleLimpiarFiltros}
              className="btn-primary py-2.5 px-6 text-sm inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>RESTABLECER FILTROS</span>
            </button>
          </div>
        ) : vistaModo === 'grid' ? (
          /* Vista Cuadrícula: Tarjetas Industriales Impeccable */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {maquinasFiltradas.map((m) => (
              <div
                key={m.id}
                className="card-industrial flex flex-col justify-between group overflow-hidden bg-white border border-line"
              >
                <div>
                  {/* Top Badges & Status Strip */}
                  <div className="p-5 pb-3 border-b border-line flex items-center justify-between">
                    <span className="font-condensed font-bold text-xs bg-navy text-white px-2.5 py-0.5 uppercase tracking-wider">
                      {m.tag2027}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-circle bg-emerald-500" />
                      <span className="font-condensed font-bold text-xs text-blue uppercase tracking-wide">
                        {m.presion}
                      </span>
                    </div>
                  </div>

                  {/* Studio Product Stage para la Máquina */}
                  <div className="studio-stage p-6 flex items-center justify-center h-56 sm:h-60 relative border-b border-line">
                    <img
                      src={m.imagen}
                      alt={m.nombre}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain filter drop-shadow hover:scale-105 transition-transform duration-300 relative z-10"
                    />
                    <span className="absolute bottom-3 right-3 bg-navy text-white text-[10px] font-condensed font-bold px-2 py-0.5 uppercase tracking-wider z-20">
                      {m.potencia}
                    </span>
                  </div>

                  {/* Informacion de Producto */}
                  <div className="p-5">
                    <h3 className="font-condensed font-bold text-2xl uppercase text-navy mb-1 leading-tight">
                      {m.nombre}
                    </h3>
                    <p className="font-barlow text-xs text-muted mb-4 font-normal line-clamp-2">
                      {m.subtitulo}
                    </p>

                    {/* Matriz de Telemetría (4 Cuadrantes de Especificaciones) */}
                    <div className="grid grid-cols-2 gap-2 p-3 bg-panel border border-line mb-4 font-barlow text-xs">
                      <div className="border-r border-line pr-2 pb-1.5 border-b">
                        <span className="text-[10px] font-condensed font-bold uppercase text-muted block">MOTOR</span>
                        <strong className="text-navy font-condensed text-xs truncate block">{m.motor.split('(')[0]}</strong>
                      </div>
                      <div className="pl-2 pb-1.5 border-b border-line">
                        <span className="text-[10px] font-condensed font-bold uppercase text-muted block">POTENCIA</span>
                        <strong className="text-blue font-condensed text-xs truncate block">{m.potencia}</strong>
                      </div>
                      <div className="border-r border-line pr-2 pt-1.5">
                        <span className="text-[10px] font-condensed font-bold uppercase text-muted block">CAUDAL MÁX</span>
                        <strong className="text-navy font-condensed text-xs truncate block">{m.caudal}</strong>
                      </div>
                      <div className="pl-2 pt-1.5">
                        <span className="text-[10px] font-condensed font-bold uppercase text-muted block">BOQUILLA</span>
                        <strong className="text-navy font-condensed text-xs truncate block">{m.boquillaMax}</strong>
                      </div>
                    </div>

                    {/* Materiales destacados */}
                    <div>
                      <span className="text-[10px] font-condensed font-bold uppercase tracking-wider text-muted block mb-1.5">
                        MATERIALES HOMOLOGADOS:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {m.materiales.slice(0, 3).map((mat, idx) => (
                          <span
                            key={idx}
                            className="bg-white text-navy text-[10px] font-barlow px-2 py-0.5 border border-line"
                          >
                            {mat.split('(')[0]}
                          </span>
                        ))}
                        {m.materiales.length > 3 && (
                          <span className="text-[10px] text-blue font-condensed font-bold self-center px-1">
                            +{m.materiales.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions: Ficha y + Cotizar */}
                <div className="p-4 bg-paper border-t border-line flex items-center justify-between gap-2.5">
                  <button
                    type="button"
                    onClick={() => onVerFicha(m)}
                    className="font-condensed font-bold text-xs uppercase text-navy hover:text-blue transition-colors flex items-center gap-1 min-h-[44px] cursor-pointer"
                  >
                    <span>FICHA COMPLETA</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAgregarACotizar(m)}
                    className="btn-primary py-2 px-4 text-xs flex items-center gap-1.5 min-h-[44px]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ COTIZAR</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Vista Tabla Comparativa */
          <div className="bg-white border border-line shadow-sm overflow-x-auto">
            <table className="w-full text-left font-barlow text-sm border-collapse">
              <thead>
                <tr className="bg-navy text-white font-condensed font-bold text-xs uppercase tracking-wider">
                  <th className="p-4">MODELO DELTA</th>
                  <th className="p-4">MOTOR & POTENCIA</th>
                  <th className="p-4">CAUDAL MÁX</th>
                  <th className="p-4">PRESIÓN</th>
                  <th className="p-4">BOQUILLA</th>
                  <th className="p-4">PESO</th>
                  <th className="p-4 text-right">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {maquinasFiltradas.map((m) => (
                  <tr key={m.id} className="hover:bg-panel transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 studio-stage border border-line p-1 flex items-center justify-center flex-shrink-0">
                          <img src={m.imagen} alt={m.nombre} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div>
                          <strong className="font-condensed font-bold text-lg text-navy uppercase block">
                            {m.nombre}
                          </strong>
                          <span className="text-xs text-muted block">{m.subtitulo}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-condensed font-bold text-blue text-sm block">{m.potencia}</span>
                      <span className="text-xs text-muted">{m.motor.split('(')[0]}</span>
                    </td>
                    <td className="p-4 font-semibold text-navy">
                      {m.caudal}
                    </td>
                    <td className="p-4 font-semibold text-navy">
                      {m.presion}
                    </td>
                    <td className="p-4 text-xs text-muted">
                      {m.boquillaMax}
                    </td>
                    <td className="p-4 text-xs text-muted">
                      {m.peso}
                    </td>
                    <td className="p-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onVerFicha(m)}
                        className="px-3 py-1.5 bg-paper border border-line text-navy font-condensed font-bold text-xs uppercase hover:bg-white cursor-pointer"
                      >
                        FICHA
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAgregarACotizar(m)}
                        className="px-3 py-1.5 bg-blue text-white font-condensed font-bold text-xs uppercase hover:bg-navy inline-flex items-center gap-1 cursor-pointer"
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
        )}

        {/* Footer Banner de Asesoría Técnica */}
        <div className="mt-12 p-8 bg-navy text-white border border-line shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-condensed font-bold uppercase tracking-widest text-blue-light block mb-1">
              INGENIERÍA Y ASESORÍA DE PRODUCTO
            </span>
            <h4 className="font-condensed font-bold text-2xl lg:text-3xl uppercase tracking-tight mb-2">
              ¿DUDAS SOBRE QUÉ MODELO ADQUIRIR PARA SU PROYECTO?
            </h4>
            <p className="font-barlow text-sm text-slate-300 max-w-2xl">
              Nuestros ingenieros evalúan la viscosidad de sus recubrimientos (látex, epoxi, masilla o mortero) y dimensionan la máquina y boquillas óptimas sin costo.
            </p>
          </div>
          <button
            type="button"
            onClick={abrirCarrito}
            className="btn-primary whitespace-nowrap flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>REVISAR MI COTIZACIÓN</span>
          </button>
        </div>

      </div>
    </div>
  );
}
