import React from 'react';
import { Wrench, Shield, Check, Phone, ArrowRight, Plus, ShoppingBag } from 'lucide-react';
import { deltaData } from '../data/deltaData';
import { useCart } from '../context/CartContext';

export default function Accesorios({ setApartadoActivo }) {
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
                REPUESTOS Y ACCESORIOS ORIGINALES HOMOLOGADOS
              </span>
              <h1 className="font-condensed font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-navy tracking-tight">
                ACCESORIOS ORIGINALES AIRLESS
              </h1>
            </div>
            <button
              type="button"
              onClick={abrirCarrito}
              className="btn-primary flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>VER MI COTIZACIÓN ({totalItems})</span>
            </button>
          </div>
          <p className="font-barlow text-sm sm:text-base text-muted mt-2 max-w-2xl">
            Pistolas de alta presión (3600 y 5000 PSI), boquillas reversibles de carburo de tungsteno RAC X y FFLP, mangueras blindadas BlueShield y extensiones de aluminio aeronáutico. Seleccione los accesorios deseados para cotizarlos en conjunto.
          </p>
        </div>

        {/* Grid de Secciones de Accesorios con Imágenes Oficiales */}
        <div className="space-y-8">
          {deltaData.accesorios.map((seccion) => (
            <div key={seccion.id} className="bg-white border border-line p-6 lg:p-8 shadow-sm">
              
              {/* Header de Categoría con Foto Real Extraída del Catálogo */}
              <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 pb-6 border-b border-line-soft mb-6">
                <div className="w-full sm:w-56 h-48 studio-stage border border-line-soft p-3 flex items-center justify-center flex-shrink-0 relative overflow-hidden group">
                  <img
                    src={seccion.imagen}
                    alt={seccion.nombre}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-300 relative z-10"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="font-condensed font-bold text-2xl lg:text-3xl uppercase text-navy">
                      {seccion.nombre}
                    </h3>
                    <span className="font-condensed font-bold text-xs bg-panel border border-line text-navy px-3 py-1 uppercase self-center sm:self-auto">
                      STOCK EN EL SALVADOR
                    </span>
                  </div>
                  <p className="font-barlow text-sm text-muted leading-relaxed">
                    {seccion.descripcion}
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {seccion.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-panel border border-line-soft hover:border-navy transition-colors flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      <h4 className="font-condensed font-bold text-lg uppercase text-navy mb-1.5 leading-snug">
                        {it.modelo}
                      </h4>
                      {it.presion && (
                        <div className="text-xs font-condensed text-blue font-bold uppercase mb-1">
                          PRESIÓN: {it.presion}
                        </div>
                      )}
                      {it.tipos && (
                        <div className="text-xs font-condensed text-blue font-bold uppercase mb-1">
                          MEDIDAS: {it.tipos}
                        </div>
                      )}
                      {it.material && (
                        <div className="text-xs font-barlow text-muted mb-1">
                          Material: {it.material} · {it.peso}
                        </div>
                      )}
                      <p className="font-barlow text-xs text-muted leading-relaxed">
                        {it.uso || it.funcion}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-line-soft flex items-center justify-between gap-2">
                      <span className="text-emerald-700 font-condensed font-bold text-xs uppercase">
                        DISPONIBLE
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          agregarItem({
                            id: `acc-${seccion.id}-${idx}`,
                            nombre: it.modelo,
                            tipo: 'accesorio',
                            imagen: seccion.imagen,
                            subtitulo: it.presion || it.tipos || seccion.nombre,
                            detalle: it.uso || it.funcion || '',
                          })
                        }
                        className="px-3 py-1.5 bg-navy hover:bg-blue text-white text-xs font-condensed font-bold uppercase transition-colors inline-flex items-center gap-1 cursor-pointer min-h-[36px]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ COTIZAR</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Banner de Consulta Técnica */}
        <div className="mt-10 p-6 sm:p-8 bg-white text-navy border border-line shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-condensed font-bold uppercase tracking-widest text-blue block mb-1">
              ASESORÍA EN BOQUILLAS Y MANGUERAS
            </span>
            <h3 className="font-condensed font-bold text-2xl uppercase tracking-tight mb-2">
              ¿NO SABE QUÉ NÚMERO DE BOQUILLA O PRESIÓN NECESITA?
            </h3>
            <p className="font-barlow text-sm text-muted max-w-2xl">
              Consulte a nuestros técnicos en WhatsApp. Le indicamos la combinación exacta de boquilla FFLP/RAC X y manguera según el espesor de su pintura.
            </p>
          </div>
          <button
            type="button"
            onClick={abrirCarrito}
            className="btn-primary whitespace-nowrap flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>REVISAR MI COTIZACIÓN ({totalItems})</span>
          </button>
        </div>

      </div>
    </div>
  );
}
