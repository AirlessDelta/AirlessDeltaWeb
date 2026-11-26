import React from 'react';
import { ArrowRight, CheckCircle2, Factory, Home, Trees, Building, ShieldAlert, Navigation } from 'lucide-react';
import { deltaData } from '../data/deltaData';

export default function Aplicaciones({ setApartadoActivo }) {
  const getIcon = (id) => {
    switch (id) {
      case 'vigas-metal':
        return <Factory className="w-5 h-5 text-blue-light" />;
      case 'drywall-tablaroca':
        return <Home className="w-5 h-5 text-blue-light" />;
      case 'muebles-madera':
        return <Trees className="w-5 h-5 text-blue-light" />;
      case 'parques-industriales':
        return <Building className="w-5 h-5 text-blue-light" />;
      case 'techos-impermeables':
        return <ShieldAlert className="w-5 h-5 text-blue-light" />;
      case 'senializacion-vial':
        return <Navigation className="w-5 h-5 text-blue-light" />;
      default:
        return <Factory className="w-5 h-5 text-blue-light" />;
    }
  };

  return (
    <div className="py-12 lg:py-20 bg-paper min-h-screen text-navy">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-10">
        
        {/* Header */}
        <div className="mb-12">
          <div className="h-1 bg-navy w-16 mb-4" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-condensed font-bold uppercase tracking-widest text-blue block mb-1">
                CAMPOS BENEFICIADOS · CATÁLOGO DELTA AIRLESS
              </span>
              <h1 className="font-condensed font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-navy tracking-tight">
                APLICACIONES INDUSTRIALES EN OBRA
              </h1>
            </div>
            <button
              type="button"
              onClick={() => setApartadoActivo('maquinaria')}
              className="btn-primary"
            >
              VER EQUIPOS SUGERIDOS
            </button>
          </div>
          <p className="font-barlow text-sm sm:text-base text-muted mt-2 max-w-2xl">
            La tecnología Airless se adapta a los requerimientos específicos de cada sector: desde el acabado fino de muebles hasta recubrimientos pesados en estructuras metálicas y señalización vial. Fotografías reales de aplicación en obra tomadas del catálogo.
          </p>
        </div>

        {/* Grid de 6 Campos Beneficiados con Fotos Reales del Catálogo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deltaData.camposBeneficiados.map((campo) => (
            <div
              key={campo.id}
              className="bg-white border border-line p-6 lg:p-8 flex flex-col justify-between hover:border-navy transition-colors group shadow-sm overflow-hidden"
            >
              <div>
                {/* Real Industry Photo from Catalog Pages 5-9 */}
                <div className="h-48 -mx-6 -mt-6 lg:-mx-8 lg:-mt-8 mb-6 overflow-hidden relative border-b border-line">
                  <img
                    src={campo.imagen}
                    alt={campo.titulo}
                    loading="lazy"
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      {getIcon(campo.id)}
                      <span className="font-condensed font-bold text-xs uppercase tracking-wider drop-shadow">
                        FOTOGRAFÍA EN OBRA
                      </span>
                    </div>
                    <span className="font-condensed font-bold text-[10px] uppercase bg-navy text-white px-2 py-0.5 border border-white/20">
                      EL SALVADOR
                    </span>
                  </div>
                </div>

                <h3 className="font-condensed font-bold text-2xl uppercase text-navy group-hover:text-blue transition-colors mb-3">
                  {campo.titulo}
                </h3>

                <p className="font-barlow text-sm text-muted mb-6 leading-relaxed">
                  {campo.descripcion}
                </p>

                {/* Ventajas operativas */}
                <div className="space-y-2 mb-6 pt-4 border-t border-line">
                  <span className="text-xs font-condensed font-bold uppercase text-navy block mb-2">
                    VENTAJAS DE PRODUCCIÓN:
                  </span>
                  {campo.ventajas.map((v, vIdx) => (
                    <div key={vIdx} className="flex items-start gap-2 text-xs font-barlow text-muted">
                      <span className="text-blue font-bold">✓</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: Equipo sugerido */}
              <div className="pt-4 border-t border-line bg-panel -mx-6 -mb-6 lg:-mx-8 lg:-mb-8 p-4 flex flex-col gap-2">
                <span className="text-[11px] font-condensed font-bold text-muted uppercase">
                  EQUIPO RECOMENDADO:
                </span>
                <span className="font-condensed font-bold text-sm text-navy uppercase">
                  {campo.equipoRecomendado}
                </span>
                <button
                  type="button"
                  onClick={() => setApartadoActivo('maquinaria')}
                  className="inline-flex items-center gap-1.5 text-xs font-condensed font-bold text-blue hover:text-navy uppercase self-start mt-1 cursor-pointer transition-colors"
                >
                  <span>CONSULTAR ESPECIFICACIÓN</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
