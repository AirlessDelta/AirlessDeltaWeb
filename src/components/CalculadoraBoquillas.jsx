import React, { useState } from 'react';
import { SlidersHorizontal, ArrowRight, Plus } from 'lucide-react';
import { deltaData } from '../data/deltaData';
import { useCart } from '../context/CartContext';

/**
 * Calculadora y Selector Técnico de Boquilla y Maquinaria:
 * - Selección por viscosidad y tipo de recubrimiento en obra
 * - Cálculo de presión óptima (PSI) y tamaño de orificio en milésimas
 * - Recomendación del equipo Delta Brushless o Honda correspondiente
 */
export default function CalculadoraBoquillas({ onSeleccionarMaquina, setApartadoActivo }) {
  const [materialActivo, setMaterialActivo] = useState('latex');
  const { agregarItem } = useCart();

  const recomendaciones = {
    latex: {
      nombreMaterial: "Pinturas Látex, Vinílicas y Acrílicas",
      aplicacion: "Paredes de block, ladrillo, tabla roca, interiores y exteriores.",
      boquillaSugerida: "517 RAC X (Azul) o 515 RAC X",
      abanico: "25 cm a 30 cm de distancia",
      orificio: '0.017" milésimas de pulgada',
      presionOptima: "1800 - 2200 PSI",
      modeloDeltaId: "395-xr",
      modeloDeltaNombre: "DELTA ULTRA MAX II 395 XR",
      motorInfo: "Motor Brushless 1500W · Caudal 2.0 L/min",
    },
    esmaltes: {
      nombreMaterial: "Esmaltes, Anticorrosivos y Lacas",
      aplicacion: "Portones metálicos, estructuras de acero, muebles de madera y carpintería.",
      boquillaSugerida: "FFLP 310 o FFLP 412 (Verde Baja Presión)",
      abanico: "15 a 20 cm con 50% menos niebla",
      orificio: '0.010" - 0.012" acabado fino',
      presionOptima: "1200 - 1600 PSI (Baja Presión)",
      modeloDeltaId: "495-xr",
      modeloDeltaNombre: "DELTA ULTRA MAX II 495 XR",
      motorInfo: "Motor Brushless 2300W · Caudal 2.2 L/min",
    },
    epoxi: {
      nombreMaterial: "Epóxicas Industriales y Suelos",
      aplicacion: "Pisos de bodegas, talleres, hangares y recubrimientos de tanques químicos.",
      boquillaSugerida: "521 RAC X o 623 RAC X",
      abanico: "25 a 30 cm de alto espesor",
      orificio: '0.021" - 0.023"',
      presionOptima: "2800 - 3250 PSI",
      modeloDeltaId: "1095-xp",
      modeloDeltaNombre: "DELTA ULTRA 1095 XP",
      motorInfo: "Motor Brushless 3000W · Caudal 4.8 L/min",
    },
    masilla: {
      nombreMaterial: "Masilla para Drywall (Tabla Roca) y Texturados",
      aplicacion: "Empastado continuo de juntas, plafones y acabado nivel 5 en tabiquería.",
      boquillaSugerida: "RAC X Heavy Duty 527, 531 o 635",
      abanico: "25 a 35 cm de cobertura masiva",
      orificio: '0.027" a 0.035" paso libre',
      presionOptima: "3000 - 3300 PSI continuo",
      modeloDeltaId: "mark-v",
      modeloDeltaNombre: "DELTA ULTRA MARK V / MARK X",
      motorInfo: "Motor Brushless 4000W - 4500W · Caudal hasta 9.0 L/min",
    },
    vial: {
      nombreMaterial: "Pintura de Tráfico Vial y Pavimentos",
      aplicacion: "Demarcación de calles, autopistas, pistas de aeropuerto y parqueos.",
      boquillaSugerida: "Boquilla de Línea 319 o 421",
      abanico: "Línea definida de 10 a 15 cm",
      orificio: '0.019" - 0.021"',
      presionOptima: "2500 - 3000 PSI",
      modeloDeltaId: "h20-1",
      modeloDeltaNombre: "DELTA H20-1 / H20-4 (Motor Honda)",
      motorInfo: "Motor Honda GX 6.5 HP a Gasolina · 10.0 L/min",
    },
    mortero: {
      nombreMaterial: "Mortero, Cemento Colado y Decoblock",
      aplicacion: "Repello proyectado, llenado de decoblock y transporte de concreto.",
      boquillaSugerida: "Lanza de Mortero Grano 4mm - 6mm",
      abanico: "Proyección cónica de mezcla",
      orificio: "Boquillas cerámicas 4-6 mm",
      presionOptima: "Presión de empuje 2200W",
      modeloDeltaId: "dt-311",
      modeloDeltaNombre: "DELTA DT-311 / DT-511",
      motorInfo: "Motor Eléctrico 4000W - 7500W · Producción 2-4 m³/h",
    },
  };

  const actual = recomendaciones[materialActivo];

  const handleIrAMaquina = () => {
    const maquinaEncontrada = deltaData.maquinas.find((m) => m.id === actual.modeloDeltaId);
    if (maquinaEncontrada && onSeleccionarMaquina) {
      onSeleccionarMaquina(maquinaEncontrada);
    } else if (setApartadoActivo) {
      setApartadoActivo('maquinaria');
    }
  };

  const handleCotizarEquipoSugerido = () => {
    const maquinaEncontrada = deltaData.maquinas.find((m) => m.id === actual.modeloDeltaId);
    if (maquinaEncontrada) {
      agregarItem({
        id: maquinaEncontrada.id,
        nombre: maquinaEncontrada.nombre,
        tipo: 'maquina',
        imagen: maquinaEncontrada.imagen,
        subtitulo: maquinaEncontrada.subtitulo,
        detalle: `Boquilla: ${actual.boquillaSugerida} · Presión: ${actual.presionOptima}`,
      });
    }
  };

  return (
    <div className="bg-white text-navy p-6 sm:p-8 lg:p-10 border border-line shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-line-soft mb-6 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-condensed font-bold uppercase tracking-widest text-blue mb-1">
            <SlidersHorizontal className="w-4 h-4" />
            <span>TABLA DE SELECCIÓN TÉCNICA · DELTA AIRLESS</span>
          </div>
          <h3 className="font-condensed font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-navy">
            SELECTOR DE BOQUILLA Y PRESIÓN POR MATERIAL
          </h3>
        </div>
        <span className="font-condensed text-xs font-bold uppercase bg-panel text-navy px-3 py-1 self-start sm:self-auto border border-line">
          ESPECIFICACIÓN OEM 2027
        </span>
      </div>

      {/* Selector de Material (Pills ergonómicas >= 44px) */}
      <div className="mb-8">
        <label className="font-condensed text-xs font-bold uppercase tracking-wider text-muted block mb-3">
          SELECCIONE EL TIPO DE RECUBRIMIENTO A APLICAR:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { id: 'latex', label: 'Látex / Paredes' },
            { id: 'esmaltes', label: 'Esmaltes / Metales' },
            { id: 'epoxi', label: 'Epóxicos / Suelos' },
            { id: 'masilla', label: 'Masilla / Drywall' },
            { id: 'vial', label: 'Pintura Tráfico' },
            { id: 'mortero', label: 'Mortero / Cemento' },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setMaterialActivo(btn.id)}
              className={`p-3 min-h-[44px] font-condensed font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border text-center ${
                materialActivo === btn.id
                  ? 'bg-navy text-white border-navy'
                  : 'bg-panel text-navy border-line hover:border-navy'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resultados Técnicos de Selección */}
      <div className="bg-panel text-navy p-6 lg:p-8 border border-line-soft">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          {/* Columna 1: Boquilla y Presión */}
          <div className="space-y-3 border-b lg:border-b-0 lg:border-r border-line pb-6 lg:pb-0 lg:pr-6">
            <span className="font-condensed text-xs font-bold uppercase tracking-widest text-blue block">
              CONFIGURACIÓN HIDRÁULICA
            </span>
            <div>
              <span className="text-xs font-barlow text-muted block">Boquilla recomendada:</span>
              <strong className="font-condensed font-bold text-2xl uppercase text-navy">
                {actual.boquillaSugerida}
              </strong>
            </div>
            <div>
              <span className="text-xs font-barlow text-muted block">Presión óptima de pulverización:</span>
              <strong className="font-condensed font-bold text-xl uppercase text-blue">
                {actual.presionOptima}
              </strong>
            </div>
            <div className="text-xs font-barlow text-muted">
              Abanico estimado: <strong className="text-navy">{actual.abanico}</strong>
            </div>
          </div>

          {/* Columna 2: Equipo DELTA Sugerido */}
          <div className="space-y-3 border-b lg:border-b-0 lg:border-r border-line pb-6 lg:pb-0 lg:pr-6">
            <span className="font-condensed text-xs font-bold uppercase tracking-widest text-navy block">
              MÁQUINA RECOMENDADA
            </span>
            <strong className="font-condensed font-bold text-2xl uppercase text-navy block leading-tight">
              {actual.modeloDeltaNombre}
            </strong>
            <p className="font-barlow text-xs text-muted">
              {actual.motorInfo}
            </p>
            <div className="text-xs font-barlow text-muted">
              {actual.aplicacion}
            </div>
          </div>

          {/* Columna 3: Botones de Acción */}
          <div className="flex flex-col gap-3 justify-center">
            <button
              type="button"
              onClick={handleIrAMaquina}
              className="btn-primary w-full text-center text-xs py-3 cursor-pointer"
            >
              VER ESPECIFICACIONES DE LA MÁQUINA
            </button>
            <button
              type="button"
              onClick={handleCotizarEquipoSugerido}
              className="px-4 py-3 border border-navy hover:bg-navy hover:text-white text-navy font-condensed font-bold text-xs uppercase tracking-wider transition-colors w-full text-center cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ AÑADIR A LISTA DE COTIZACIÓN</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
