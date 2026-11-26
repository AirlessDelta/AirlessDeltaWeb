import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Gauge,
  Wrench,
  Layers,
  Building2,
  Flame,
  Plus,
  ShoppingBag,
  Check,
  X as XIcon,
} from 'lucide-react';
import { deltaData } from '../data/deltaData';
import { useCart } from '../context/CartContext';
import CalculadoraBoquillas from '../components/CalculadoraBoquillas';

export default function Inicio({ setApartadoActivo, onVerFicha }) {
  const { agregarItem, abrirCarrito, totalItems } = useCart();
  const maquinasDestacadas = deltaData.maquinas.filter((m) => m.destacado);

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

  // Banco de pruebas interactivo en el Hero con 4 modelos líderes de la Ficha Técnica
  const modelosHero = [
    {
      id: "1095-xp",
      nombre: "DELTA 1095 XP",
      subtitulo: "Brushless 2800W · Trabajo Pesado",
      presion: "3250 PSI",
      caudal: "4.8 L/min",
      motor: "Brushless 220V (2800W)",
      boquilla: '0.035"',
      imagen: "/img/maquinas/1095-xp.png",
      tag: "DOBLE PISTOLA SIMULTÁNEA",
    },
    {
      id: "395-xr",
      nombre: "DELTA 395 XR",
      subtitulo: "Brushless 1500W · Portátil Ligero",
      presion: "3250 PSI",
      caudal: "2.0 L/min",
      motor: "Brushless 220V (1500W)",
      boquilla: '0.021"',
      imagen: "/img/maquinas/395-xr.png",
      tag: "PORTÁTIL 20 KG",
    },
    {
      id: "mark-v",
      nombre: "DELTA MARK V",
      subtitulo: "3000W · Masilla & Pinturas Densas",
      presion: "3300 PSI",
      caudal: "6.0 L/min",
      motor: "Brushless 220V (3000W)",
      boquilla: '0.039"',
      imagen: "/img/maquinas/mark-v.png",
      tag: "MASILLA & EPÓXICO",
    },
    {
      id: "gmax-7900",
      nombre: "GMAX II 7900",
      subtitulo: "Motor Honda 200cc · Autonomía en Obra",
      presion: "3300 PSI",
      caudal: "8.3 L/min",
      motor: "Gasolina Honda GX200",
      boquilla: '0.047"',
      imagen: "/img/maquinas/gmax-7900.png",
      tag: "ALTO RENDIMIENTO GASOLINA",
    },
  ];

  const [modeloHeroActivo, setModeloHeroActivo] = useState(modelosHero[0]);

  const handleAgregarHeroACotizar = () => {
    agregarItem({
      id: modeloHeroActivo.id,
      nombre: modeloHeroActivo.nombre,
      tipo: 'maquina',
      imagen: modeloHeroActivo.imagen,
      subtitulo: modeloHeroActivo.subtitulo,
      detalle: `Presión: ${modeloHeroActivo.presion} · Motor: ${modeloHeroActivo.motor} · Caudal: ${modeloHeroActivo.caudal}`,
    });
  };

  const handleVerFichaDesdeHero = () => {
    const maquinaCompleta = deltaData.maquinas.find((m) => m.id === modeloHeroActivo.id);
    if (maquinaCompleta && onVerFicha) {
      onVerFicha(maquinaCompleta);
    } else {
      setApartadoActivo('maquinaria');
    }
  };

  return (
    <div className="bg-paper text-navy">
      
      {/* 1. HERO SECTION: INGENIERÍA INDUSTRIAL PURA (CERO CLICHÉS IA) */}
      <section className="bg-navy text-white pt-10 sm:pt-14 pb-16 lg:pb-24 border-b border-navy-card">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-12 items-center">
            
            {/* Columna Izquierda: Información de ingeniería y negocio real */}
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/10 text-line-soft text-xs font-condensed uppercase tracking-wider font-semibold border border-white/15">
                <span>DISTRIBUIDOR OFICIAL GRUPO PARTES · EL SALVADOR</span>
              </div>

              <h1 className="font-condensed font-bold text-[36px] leading-[34px] sm:text-[50px] sm:leading-[46px] lg:text-[62px] lg:leading-[58px] uppercase tracking-tight text-white mb-5">
                SISTEMAS DE PULVERIZACIÓN AIRLESS & ALTA PRESIÓN
              </h1>

              <p className="font-barlow text-base sm:text-lg leading-relaxed text-line-soft max-w-xl mb-7">
                Equipos de pulverización industrial con motores Brushless 220V y motores Honda a gasolina. Hasta 3300 PSI de presión hidráulica directa para acabados de alta adherencia sin niebla, con 100% de stock de repuestos y soporte técnico certificado en El Salvador.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <button
                  type="button"
                  onClick={() => setApartadoActivo('maquinaria')}
                  className="btn-primary text-center py-3 px-6 text-sm sm:text-base tracking-wider"
                >
                  CATÁLOGO DE MAQUINARIA (13 EQUIPOS)
                </button>
                <button
                  type="button"
                  onClick={abrirCarrito}
                  className="px-5 py-3 border border-white/30 hover:border-white text-white font-condensed font-bold text-sm sm:text-base tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-blue-light" />
                  <span>LISTA DE COTIZACIÓN ({totalItems})</span>
                </button>
              </div>

              {/* Métricas Técnicas Certificadas */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-8 border-t border-white/10">
                <div className="p-3 bg-white/5 border border-white/10">
                  <span className="font-condensed text-[11px] uppercase text-line-crisp block font-bold tracking-wider">CAUDAL NOMINAL</span>
                  <span className="font-condensed font-bold text-xl sm:text-2xl text-white block">8.3 L/MIN</span>
                  <span className="font-barlow text-[11px] text-slate-400">Capacidad industrial</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/10">
                  <span className="font-condensed text-[11px] uppercase text-line-crisp block font-bold tracking-wider">PRESIÓN MÁX</span>
                  <span className="font-condensed font-bold text-xl sm:text-2xl text-white block">3300 PSI</span>
                  <span className="font-barlow text-[11px] text-slate-400">Proyección continua</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/10">
                  <span className="font-condensed text-[11px] uppercase text-line-crisp block font-bold tracking-wider">AHORRO EN OBRA</span>
                  <span className="font-condensed font-bold text-xl sm:text-2xl text-white block">-30%</span>
                  <span className="font-barlow text-[11px] text-slate-400">Cero niebla suspendida</span>
                </div>
                <div className="p-3 bg-white/5 border border-white/10">
                  <span className="font-condensed text-[11px] uppercase text-line-crisp block font-bold tracking-wider">GARANTÍA LOCAL</span>
                  <span className="font-condensed font-bold text-xl sm:text-2xl text-white block">OFICIAL</span>
                  <span className="font-barlow text-[11px] text-slate-400">Bodega Lourdes Colón</span>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Banco de Pruebas Técnico (Limpio, sin chips flotantes de ciencia ficción) */}
            <div>
              <div className="bg-navy-card border border-white/15 p-5 sm:p-6 shadow-xl">
                
                {/* Selector de modelos de la Ficha Técnica */}
                <div className="flex items-center justify-between pb-3 border-b border-white/15 mb-3">
                  <span className="font-condensed font-bold text-xs uppercase tracking-widest text-line-soft">
                    BANCO DE PRUEBAS INTERACTIVO
                  </span>
                  <span className="bg-blue text-white text-[11px] font-condensed font-bold px-2 py-0.5">
                    {modeloHeroActivo.tag}
                  </span>
                </div>

                {/* Pestañas de modelos */}
                <div className="grid grid-cols-4 gap-1.5 mb-4">
                  {modelosHero.map((m) => {
                    const isSel = modeloHeroActivo.id === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setModeloHeroActivo(m)}
                        className={`py-2 px-1 text-xs font-condensed font-bold uppercase transition-all border cursor-pointer truncate ${
                          isSel
                            ? 'bg-blue text-white border-blue'
                            : 'bg-white/5 text-line-soft border-white/10 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {m.nombre.replace('DELTA ', '')}
                      </button>
                    );
                  })}
                </div>

                {/* Fotografía de la Máquina en Entorno de Iluminación Neutra */}
                <div className="w-full bg-navy/60 p-6 relative border border-white/10 flex items-center justify-center min-h-[280px]">
                  <img
                    key={modeloHeroActivo.id}
                    src={modeloHeroActivo.imagen}
                    alt={modeloHeroActivo.nombre}
                    className="max-h-64 w-auto object-contain relative z-10 filter drop-shadow-lg animate-in fade-in duration-200"
                  />
                </div>

                {/* Ficha Técnica Rápida en Tabla de Alta Densidad */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xs font-condensed">
                    <div className="bg-white/5 p-2 border border-white/10">
                      <span className="text-muted-dark block text-[10px] uppercase font-bold">PRESIÓN MÁX</span>
                      <strong className="text-white text-sm">{modeloHeroActivo.presion}</strong>
                    </div>
                    <div className="bg-white/5 p-2 border border-white/10">
                      <span className="text-muted-dark block text-[10px] uppercase font-bold">CAUDAL</span>
                      <strong className="text-white text-sm">{modeloHeroActivo.caudal}</strong>
                    </div>
                    <div className="bg-white/5 p-2 border border-white/10">
                      <span className="text-muted-dark block text-[10px] uppercase font-bold">MOTOR</span>
                      <strong className="text-white text-sm">{modeloHeroActivo.motor.split('(')[0]}</strong>
                    </div>
                    <div className="bg-white/5 p-2 border border-white/10">
                      <span className="text-muted-dark block text-[10px] uppercase font-bold">BOQUILLA</span>
                      <strong className="text-white text-sm">{modeloHeroActivo.boquilla}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleVerFichaDesdeHero}
                      className="px-4 py-2 border border-white/20 hover:border-white text-white font-condensed font-bold text-xs uppercase cursor-pointer transition-colors"
                    >
                      VER FICHA TÉCNICA
                    </button>
                    <button
                      type="button"
                      onClick={handleAgregarHeroACotizar}
                      className="btn-primary py-2 px-4 text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ COTIZAR ESTE EQUIPO</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SECTORES INDUSTRIALES Y APLICACIONES EN OBRA (CERO CLICHÉS "01, 02, 03, 04") */}
      <section className="py-14 lg:py-20 max-w-[1240px] mx-auto px-4 lg:px-8">
        <div className="mb-10">
          <div className="h-1 bg-navy w-16 mb-4" />
          <span className="text-xs font-condensed font-bold uppercase tracking-widest text-blue block mb-1">
            CAMPO DE APLICACIÓN EN EL SALVADOR
          </span>
          <h2 className="font-condensed font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-navy tracking-tight">
            SOLUCIONES POR TIPO DE PROYECTO
          </h2>
          <p className="font-barlow text-sm sm:text-base text-muted mt-2 max-w-2xl">
            Cada máquina DELTA está configurada para el caudal y viscosidad exacta que demanda su recubrimiento en obra.
          </p>
        </div>

        {/* Galería de 4 Sectores Reales con Fotografías de Campo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deltaData.camposBeneficiados.slice(0, 4).map((campo) => (
            <div
              key={campo.id}
              className="bg-white border border-line flex flex-col justify-between overflow-hidden shadow-sm hover:border-navy transition-colors group"
            >
              <div>
                <div className="h-44 overflow-hidden relative bg-panel">
                  <img
                    src={campo.imagen}
                    alt={campo.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[11px] font-condensed font-bold uppercase tracking-wider text-white bg-navy/90 px-2.5 py-0.5">
                    {campo.equipoRecomendado.split('/')[0]}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-condensed font-bold text-xl uppercase text-navy mb-2 leading-tight">
                    {campo.titulo}
                  </h3>
                  <p className="font-barlow text-xs text-muted mb-4 leading-relaxed line-clamp-3">
                    {campo.descripcion}
                  </p>

                  <ul className="space-y-1.5 border-t border-line-soft pt-3">
                    {campo.ventajas.slice(0, 2).map((v, vIdx) => (
                      <li key={vIdx} className="font-barlow text-[11px] text-navy flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-blue flex-shrink-0 mt-0.5" />
                        <span>{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-panel border-t border-line-soft">
                <button
                  type="button"
                  onClick={() => setApartadoActivo('aplicaciones')}
                  className="font-condensed font-bold text-xs uppercase text-blue hover:text-navy flex items-center justify-between w-full cursor-pointer"
                >
                  <span>VER DETALLES TÉCNICOS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CALCULADORA TÉCNICA Y SELECTOR DE BOQUILLAS RAC X */}
      <section className="py-14 bg-panel border-y border-line">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
          <CalculadoraBoquillas
            onSeleccionarMaquina={onVerFicha}
            setApartadoActivo={setApartadoActivo}
          />
        </div>
      </section>

      {/* 4. EQUIPOS DESTACADOS DEL CATÁLOGO */}
      <section className="py-14 lg:py-20 max-w-[1240px] mx-auto px-4 lg:px-8">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="h-1 bg-navy w-16 mb-4" />
            <span className="text-xs font-condensed font-bold uppercase tracking-widest text-blue block mb-1">
              CATÁLOGO Y FICHA TÉCNICA OFICIAL
            </span>
            <h2 className="font-condensed font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-navy tracking-tight">
              MÁQUINAS PULVERIZADORAS DESTACADAS
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setApartadoActivo('maquinaria')}
            className="inline-flex items-center gap-2 font-condensed font-bold text-blue hover:text-navy uppercase text-base cursor-pointer"
          >
            <span>VER LOS 13 MODELOS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid de Máquinas con Tarjetas de Especificación Industrial */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {maquinasDestacadas.slice(0, 6).map((m) => (
            <div
              key={m.id}
              className="bg-white border border-line flex flex-col justify-between hover:border-navy transition-colors shadow-sm"
            >
              <div>
                <div className="p-4 border-b border-line-soft flex items-center justify-between">
                  <span className="font-condensed font-bold text-xs bg-navy text-white px-2.5 py-0.5 uppercase tracking-wider">
                    {m.potencia}
                  </span>
                  <span className="font-condensed font-bold text-xs text-blue uppercase tracking-wide">
                    {m.presion}
                  </span>
                </div>

                {/* Escaparate Neutro del Producto */}
                <div className="studio-stage p-6 flex items-center justify-center h-52 relative border-b border-line-soft">
                  <img
                    src={m.imagen}
                    alt={m.nombre}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain filter drop-shadow hover:scale-105 transition-transform duration-300 relative z-10"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-condensed font-bold text-2xl uppercase text-navy mb-1 leading-tight">
                    {m.nombre}
                  </h3>
                  <p className="font-barlow text-xs text-muted mb-4 line-clamp-2">
                    {m.subtitulo}
                  </p>

                  {/* Tabla de Telemetría Compacta */}
                  <div className="bg-panel p-3 border border-line-soft mb-4 font-barlow text-xs space-y-1.5">
                    <div className="flex justify-between border-b border-line-soft pb-1">
                      <span className="text-muted">Caudal Máx:</span>
                      <strong className="text-navy font-semibold">{m.caudal}</strong>
                    </div>
                    <div className="flex justify-between border-b border-line-soft pb-1">
                      <span className="text-muted">Rendimiento:</span>
                      <strong className="text-navy font-semibold">{m.produccion}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Motorización:</span>
                      <strong className="text-navy font-semibold">{m.motor.split('(')[0]}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-panel border-t border-line-soft flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onVerFicha(m)}
                  className="font-condensed font-bold text-xs text-navy hover:text-blue uppercase transition-colors cursor-pointer min-h-[44px] flex items-center gap-1"
                >
                  <span>FICHA TÉCNICA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleAgregarACotizar(m)}
                  className="btn-primary py-2 px-4 text-xs inline-flex items-center gap-1.5 cursor-pointer min-h-[44px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ COTIZAR</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MATRIZ TÉCNICA DE COMPARACIÓN: AIRLESS VS COMPRESOR (PÁGINA 18 DEL CATÁLOGO) */}
      <section className="py-14 lg:py-20 bg-white border-t border-line">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
          <div className="mb-10">
            <div className="h-1 bg-navy w-16 mb-4" />
            <span className="text-xs font-condensed font-bold uppercase tracking-widest text-blue block mb-1">
              FUNDAMENTO DE INGENIERÍA · PRINCIPIO DE PASCAL
            </span>
            <h2 className="font-condensed font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-navy tracking-tight">
              AIRLESS DE ALTA PRESIÓN VS COMPRESOR TRADICIONAL
            </h2>
            <p className="font-barlow text-sm sm:text-base text-muted mt-2 max-w-3xl">
              Datos técnicos de aplicación real en obras de El Salvador. Mayor adherencia, velocidad multiplicada y cero aire que contamine la película de pintura.
            </p>
          </div>

          {/* Tabla Comparativa de Ingeniería (Reemplaza los bloques con bordes de color) */}
          <div className="overflow-x-auto border border-line shadow-sm">
            <table className="w-full text-left border-collapse font-barlow text-sm">
              <thead>
                <tr className="bg-navy text-white font-condensed text-base uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6 w-1/4">Parámetro Técnico</th>
                  <th className="py-3.5 px-4 sm:px-6 w-3/8 bg-blue">Sistema Airless DELTA (Hidráulico)</th>
                  <th className="py-3.5 px-4 sm:px-6 w-3/8 bg-navy-card">Compresor de Aire Convencional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {deltaData.diferenciasAirlessVsCompresor.map((d, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-panel'}>
                    <td className="py-4 px-4 sm:px-6 font-condensed font-bold text-navy uppercase text-sm sm:text-base">
                      {d.caracteristica}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-navy font-medium bg-blue/5">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{d.airless}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-muted">
                      <div className="flex items-start gap-2">
                        <XIcon className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                        <span>{d.compresor}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. GARANTÍA Y SOPORTE OFICIAL GRUPO PARTES */}
      <section className="py-14 bg-panel border-t border-line">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
          <div className="p-8 lg:p-10 bg-white border border-line shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-condensed font-bold uppercase tracking-widest text-blue block mb-1">
                IMPORTADOR DIRECTO Y DISTRIBUIDOR AUTORIZADO
              </span>
              <h3 className="font-condensed font-bold text-2xl sm:text-3xl uppercase text-navy mb-2">
                1 MANTENIMIENTO PREVENTIVO GRATIS CON TU COMPRA
              </h3>
              <p className="font-barlow text-sm text-muted leading-relaxed">
                En Grupo Partes respaldamos su inversión con taller certificado, pruebas hidráulicas en banco a 3300 PSI y stock garantizado de repuestos originales en nuestra bodega de Lourdes Colón, La Libertad.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setApartadoActivo('contacto')}
              className="btn-primary py-3.5 px-6 whitespace-nowrap text-sm cursor-pointer"
            >
              CONTACTAR ASESOR DE VENTAS
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
