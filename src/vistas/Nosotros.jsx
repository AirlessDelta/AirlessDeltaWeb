import React from 'react';
import { MapPin, Phone, Mail, Clock, Check, ShieldCheck } from 'lucide-react';
import { deltaData } from '../data/deltaData';

export default function Nosotros({ setApartadoActivo }) {
  const { empresa } = deltaData;

  const capacidades = [
    {
      titulo: "IMPORTACIÓN DIRECTA AUTORIZADA",
      detalle: "Distribuidor exclusivo de la marca DELTA en El Salvador desde 2010. Equipos nuevos de fábrica con trazabilidad OEM.",
    },
    {
      titulo: "BODEGA CENTRAL EN LA LIBERTAD",
      detalle: "Almacén propio en Complejo Pasatiempo Norte, Local C-4, Lourdes Colón. Despacho inmediato para proyectos y obras en todo el país.",
    },
    {
      titulo: "TALLER DE SERVICIO Y BANCO DE PRUEBAS",
      detalle: "Pruebas hidráulicas certificadas a 3300 PSI, calibración de presostatos SmartControl y diagnóstico técnico especializado.",
    },
    {
      titulo: "STOCK PERMANENTE DE DESGASTE",
      detalle: "Cero retrasos de importación: empaquetaduras V-Packing, pistones endurecidos, mangueras blindadas y boquillas de carburo.",
    },
  ];

  return (
    <div className="py-12 lg:py-16 bg-paper min-h-screen text-navy">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="h-1 bg-navy w-16 mb-4" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-condensed font-bold uppercase tracking-widest text-blue block mb-1">
                IMPORTADOR DIRECTO Y DISTRIBUIDOR AUTORIZADO
              </span>
              <h1 className="font-condensed font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-navy tracking-tight">
                GRUPO PARTES EL SALVADOR
              </h1>
            </div>
            <button
              type="button"
              onClick={() => setApartadoActivo('contacto')}
              className="btn-primary"
            >
              CONTACTAR A VENTAS
            </button>
          </div>
          <p className="font-barlow text-sm sm:text-base text-muted mt-2 max-w-2xl">
            Importadores y distribuidores directos de tecnología de pulverización industrial Airless, repuestos OEM y soporte técnico en obra desde 2010.
          </p>
        </div>

        {/* Bloque Corporativo con Imagen Real de Bodega y Declaración de Misión */}
        <div className="bg-white border border-line shadow-sm mb-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Foto Real de la Bodega */}
            <div className="relative min-h-[320px] lg:min-h-[420px] bg-navy">
              <img
                src={empresa.imagenBodega}
                alt="Bodega Central Grupo Partes El Salvador"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="bg-blue text-white text-[11px] font-condensed font-bold px-2.5 py-0.5 uppercase tracking-wider block w-fit mb-1.5">
                  FOTOGRAFÍA REAL · INSTALACIONES FÍSICAS
                </span>
                <span className="font-condensed font-bold text-xl uppercase block leading-tight">
                  BODEGA CENTRAL EN LOURDES COLÓN, LA LIBERTAD
                </span>
                <span className="font-barlow text-xs text-line-soft">
                  Complejo Pasatiempo Norte, Local C-4. Taller de pruebas hidráulicas y showroom.
                </span>
              </div>
            </div>

            {/* Texto de Enfoque y Capacidades */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-condensed font-bold uppercase tracking-widest text-blue block mb-2">
                  ENFOQUE ESTRATÉGICO
                </span>
                <h2 className="font-condensed font-bold text-2xl sm:text-3xl uppercase text-navy mb-4 leading-tight">
                  "DAR A CONOCER PROCESOS MÁS EFICIENTES Y ECONÓMICOS AL MOMENTO DE RECUBRIR VARIEDAD DE MATERIALES."
                </h2>
                <p className="font-barlow text-sm text-muted leading-relaxed mb-6">
                  Promovemos la transición hacia la tecnología Airless de alta presión para el sector de la construcción, remodelación y mantenimiento industrial en El Salvador. Ayudamos a constructoras y contratistas a recortar tiempos de entrega, reducir horas-hombre y elevar los estándares de acabado en pintura, masilla y mortero.
                </p>
              </div>

              {/* 4 Capacidades Operativas en Lista Limpia */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-line-soft pt-6">
                {capacidades.map((cap, idx) => (
                  <div key={idx} className="bg-panel p-3 border border-line-soft">
                    <div className="flex items-start gap-2 mb-1">
                      <Check className="w-4 h-4 text-blue flex-shrink-0 mt-0.5" />
                      <strong className="font-condensed font-bold text-xs uppercase text-navy block leading-tight">
                        {cap.titulo}
                      </strong>
                    </div>
                    <p className="font-barlow text-[11px] text-muted leading-relaxed pl-6">
                      {cap.detalle}
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* Ubicación y Datos Físicos de Contacto */}
        <div className="bg-white border border-line p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            <div>
              <span className="text-xs font-condensed font-bold uppercase tracking-widest text-blue block mb-1">
                ATENCIÓN PRESENCIAL Y DEMOSTRACIONES
              </span>
              <h3 className="font-condensed font-bold text-2xl sm:text-3xl uppercase text-navy mb-3">
                VISÍTANOS EN NUESTRO TALLER Y SALA DE VENTAS
              </h3>
              <p className="font-barlow text-sm text-muted leading-relaxed mb-6">
                Puede programar una prueba técnica en banco con su propio material (látex, epóxico, masilla o mortero) antes de realizar su compra, para comprobar el rendimiento exacto del equipo.
              </p>

              <div className="space-y-3.5 font-barlow text-sm text-muted">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-navy block font-condensed uppercase text-xs font-bold">Dirección:</strong>
                    {empresa.direccion}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-blue flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-navy block font-condensed uppercase text-xs font-bold">Teléfonos:</strong>
                    Fijo: {empresa.telefonoFijo} · WhatsApp Técnico: {empresa.celularWhatsapp}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-navy block font-condensed uppercase text-xs font-bold">Email:</strong>
                    {empresa.email}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-blue flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-navy block font-condensed uppercase text-xs font-bold">Horario de Atención:</strong>
                    {empresa.horario}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-panel border border-line p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="font-condensed font-bold text-xs uppercase tracking-wider text-navy block mb-2">
                  GARANTÍA Y RESPALDO DEL DISTRIBUIDOR
                </span>
                <h4 className="font-condensed font-bold text-xl uppercase text-navy mb-3">
                  1 MANTENIMIENTO PREVENTIVO GRATUITO
                </h4>
                <p className="font-barlow text-xs text-muted leading-relaxed mb-6">
                  Todas nuestras máquinas incluyen 1 mantenimiento preventivo sin costo adicional al mes de uso para calibrar empaquetaduras, verificar válvulas de bola de carburo y asegurar la máxima vida útil de su inversión.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${empresa.whatsappClean}?text=Hola%20Grupo%20Partes,%20deseo%20coordinar%20una%20visita%20a%20su%20bodega%20de%20Lourdes%20Colón`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-2.5 px-4 text-xs text-center cursor-pointer"
                >
                  COORDINAR VISITA A BODEGA
                </a>
                <button
                  type="button"
                  onClick={() => setApartadoActivo('maquinaria')}
                  className="px-4 py-2.5 border border-navy hover:bg-navy hover:text-white text-navy font-condensed font-bold text-xs uppercase tracking-wider transition-colors text-center cursor-pointer"
                >
                  VER CATÁLOGO
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
