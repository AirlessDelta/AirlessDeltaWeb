import React from 'react';
import { ShieldCheck, Wrench, Calendar, Clock, AlertTriangle, Phone, CheckCircle2 } from 'lucide-react';
import { deltaData } from '../data/deltaData';

export default function Mantenimiento({ setApartadoActivo }) {
  return (
    <div className="py-12 lg:py-16 bg-paper min-h-screen text-navy">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="h-1 bg-navy w-16 mb-4" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-condensed font-bold uppercase tracking-widest text-blue block mb-1">
                TALLER Y SOPORTE OFICIAL GRUPO PARTES
              </span>
              <h1 className="font-condensed font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-navy tracking-tight">
                SERVICIO TÉCNICO Y MANTENIMIENTO
              </h1>
            </div>
            <a
              href={`https://wa.me/${deltaData.empresa.whatsappClean}?text=Hola%20Grupo%20Partes,%20deseo%20agendar%20un%20mantenimiento%20para%20mi%20maquina%20Airless`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-3 px-6 text-sm flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>AGENDAR TURNO DE TALLER</span>
            </a>
          </div>
          <p className="font-barlow text-sm sm:text-base text-muted mt-2 max-w-2xl">
            Técnicos certificados para diagnósticos de motor brushless, reemplazo de empaquetaduras V-Packing, calibración de transductores y pruebas hidrostáticas hasta 3300 PSI.
          </p>
        </div>

        {/* Beneficio Destacado Grupo Partes (Página 19 del Catálogo) */}
        <div className="bg-white border border-line p-6 sm:p-8 lg:p-10 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="text-xs font-condensed font-bold uppercase tracking-widest text-blue block mb-1">
                BENEFICIO EXCLUSIVO DE COMPRA
              </span>
              <h2 className="font-condensed font-bold text-2xl sm:text-3xl uppercase text-navy mb-3">
                1 MANTENIMIENTO PREVENTIVO GRATIS AL PRIMER MES
              </h2>
              <p className="font-barlow text-sm text-muted leading-relaxed mb-4">
                Con <strong>GRUPO PARTES</strong> cuentas con 1 servicio de mantenimiento preventivo sin costo un mes después de adquirir tu maquinaria Airless. Inspeccionamos sellos, verificamos la presión del transductor y calibramos la electrónica del motor brushless.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-condensed font-bold uppercase tracking-wider text-navy">
                <span className="flex items-center gap-1">✓ Mano de obra calificada</span>
                <span className="flex items-center gap-1">✓ Verificación en banco de prueba</span>
                <span className="flex items-center gap-1">✓ Limpieza y lubricación de sellos</span>
              </div>
            </div>

            <div className="p-6 bg-panel border border-line text-center">
              <span className="font-condensed font-bold text-5xl text-navy block mb-1">
                100%
              </span>
              <span className="font-condensed font-bold text-sm uppercase tracking-wider block text-navy">
                GARANTÍA DE OPERATIVIDAD
              </span>
              <span className="font-barlow text-xs text-muted block mt-2">
                Repuestos originales siempre en bodega de El Salvador para entrega en menos de 24 horas.
              </span>
            </div>
          </div>
        </div>

        {/* Tabla Oficial de Frecuencias de Mantenimiento (Pág 19 del Catálogo) */}
        <div className="mb-12">
          <h3 className="font-condensed font-bold text-2xl sm:text-3xl uppercase text-navy mb-6">
            CRONOGRAMA OFICIAL DE MANTENIMIENTO PREVENTIVO
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deltaData.mantenimientoCronograma.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-line p-6 flex flex-col justify-between shadow-sm hover:border-navy transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-line-soft mb-4">
                    <span className="font-condensed font-bold text-xs bg-navy text-white px-2 py-0.5 uppercase">
                      FASE {idx + 1}
                    </span>
                    <Clock className="w-4 h-4 text-blue" />
                  </div>

                  <h4 className="font-condensed font-bold text-xl uppercase text-navy mb-3">
                    {item.frecuencia}
                  </h4>

                  <ul className="space-y-2.5 font-barlow text-xs text-muted">
                    {item.acciones.map((acc, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <span className="text-blue font-bold">▪</span>
                        <span>{acc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-6 border-t border-line-soft text-[11px] font-condensed font-bold uppercase text-navy">
                  CRÍTICO PARA LA GARANTÍA
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motor Brushless y Tarjeta Electrónica Modular */}
        <div className="bg-white p-6 sm:p-8 border border-line shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-condensed font-bold uppercase tracking-widest text-blue block mb-1">
              INGENIERÍA MODERNA
            </span>
            <h3 className="font-condensed font-bold text-2xl sm:text-3xl uppercase text-navy mb-3">
              VENTAJAS DEL MOTOR BRUSHLESS (SIN ESCOBILLAS)
            </h3>
            <p className="font-barlow text-sm text-muted leading-relaxed mb-3">
              El motor brushless no genera fricción interna ni chispas mecánicas. Esto se traduce en una vida útil hasta 3 veces mayor y una entrega de torque inmediata para pulverizar masillas y pinturas de alta viscosidad sin pérdida de presión.
            </p>
            <p className="font-barlow text-sm text-muted leading-relaxed">
              Además, todos los modelos DELTA cuentan con una <strong>tarjeta electrónica modular de fácil sustitución</strong>. Si ocurre una variación extrema de voltaje en la obra, la tarjeta se reemplaza en minutos sin necesidad de rebobinar ni cambiar el motor.
            </p>
          </div>

          <div className="bg-panel p-6 border border-line-soft space-y-4">
            <h4 className="font-condensed font-bold text-base uppercase text-navy border-b border-line-soft pb-2">
              3 REGLAS DE ORO EN OBRA:
            </h4>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-navy text-white flex items-center justify-center font-condensed font-bold text-xs flex-shrink-0">
                1
              </span>
              <p className="font-barlow text-xs text-navy">
                <strong>Lubricación TSL:</strong> Coloque 3 a 5 gotas de aceite de garganta antes de cada uso para proteger las empaquetaduras de la fricción seca.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-navy text-white flex items-center justify-center font-condensed font-bold text-xs flex-shrink-0">
                2
              </span>
              <p className="font-barlow text-xs text-navy">
                <strong>Despresurización:</strong> Nunca desconecte mangueras ni limpie boquillas sin girar la válvula de cebado (Prime/Spray) para liberar los 3300 PSI.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 bg-navy text-white flex items-center justify-center font-condensed font-bold text-xs flex-shrink-0">
                3
              </span>
              <p className="font-barlow text-xs text-navy">
                <strong>Lavado Inmediato:</strong> Nunca deje pintura secar dentro de la bomba. Al finalizar, recircule agua o solvente hasta que salga completamente cristalino.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
