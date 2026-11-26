import React from 'react';
import { ArrowUp, Phone, Mail, MapPin } from 'lucide-react';
import { deltaData } from '../data/deltaData';

export default function Footer({ setApartadoActivo }) {
  const { empresa } = deltaData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const irApartado = (id) => {
    setApartadoActivo(id);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-deep text-slate-400 border-t border-navy-card">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          
          {/* Col 1: DELTA & GRUPO PARTES */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue rounded-circle flex items-center justify-center text-white flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="12,3 22,20 2,20" fill="white" />
                  <polygon points="12,9 18,18 6,18" fill="#1E40AF" />
                </svg>
              </div>
              <div>
                <span className="font-condensed font-bold text-3xl tracking-wider text-white block leading-none">
                  DELTA
                </span>
                <span className="font-condensed text-[10px] tracking-widest text-slate-400 uppercase">
                  GRUPO PARTES EL SALVADOR
                </span>
              </div>
            </div>
            <p className="font-barlow text-sm text-slate-400 leading-relaxed mb-6">
              Maquinaria industrial para pulverización airless de alta presión. Distribución directa, repuestos originales y servicio técnico en El Salvador.
            </p>
            <div className="inline-block border border-white/20 px-3 py-1 text-[11px] font-condensed font-bold uppercase tracking-wider text-slate-300">
              LÍNEA 2027 HOMOLOGADA
            </div>
          </div>

          {/* Col 2: Apartados Principales */}
          <div>
            <h4 className="font-condensed font-bold text-lg uppercase tracking-wider text-white mb-4 border-b border-navy-card pb-2">
              APARTADOS DEL SITIO
            </h4>
            <ul className="space-y-2.5 font-barlow text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => irApartado('inicio')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Inicio y Comparativa Pascal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => irApartado('maquinaria')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Catálogo de Maquinaria 2027
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => irApartado('accesorios')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pistolas, Boquillas y Mangueras
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => irApartado('repuestos')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Repuestos y Despieces de Fábrica
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => irApartado('aplicaciones')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Campos Beneficiados e Industrias
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => irApartado('mantenimiento')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Mantenimiento y Garantía de Taller
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Modelos Clave */}
          <div>
            <h4 className="font-condensed font-bold text-lg uppercase tracking-wider text-white mb-4 border-b border-navy-card pb-2">
              EQUIPOS DESTACADOS
            </h4>
            <ul className="space-y-2 font-barlow text-xs text-slate-400">
              <li>DELTA ULTRA MAX II 395 XR (1500W Brushless)</li>
              <li>DELTA ULTRA MAX II 495 XR (2300W Brushless)</li>
              <li>DELTA ULTRA 1095 XP (3000W Caudal 4.8 L/m)</li>
              <li>DELTA ULTRA MARK V (4000W para Masilla)</li>
              <li>DELTA ULTRA MARK X (4500W Caudal 9.0 L/m)</li>
              <li>DELTA GMAX II 7900 (Motor Honda 6.5 HP)</li>
              <li>DELTA H20-1 & H20-4 (Señalización Vial)</li>
              <li>DELTA DT-311 & DT-511 (Rociadoras Mortero)</li>
              <li>DELTA DT-5500 (Bomba de Concreto Colado)</li>
            </ul>
          </div>

          {/* Col 4: Casa Matriz */}
          <div>
            <h4 className="font-condensed font-bold text-lg uppercase tracking-wider text-white mb-4 border-b border-navy-card pb-2">
              MATRIZ & BODEGA
            </h4>
            <div className="space-y-3 font-barlow text-sm text-slate-400">
              <p>
                <strong className="text-white block font-condensed uppercase tracking-wider text-xs">
                  Dirección:
                </strong>
                {empresa.direccion}
              </p>
              <p>
                <strong className="text-white block font-condensed uppercase tracking-wider text-xs">
                  Teléfono & WhatsApp:
                </strong>
                {empresa.telefonoFijo} · {empresa.celularWhatsapp}
              </p>
              <p>
                <strong className="text-white block font-condensed uppercase tracking-wider text-xs">
                  Email de Ventas:
                </strong>
                {empresa.email}
              </p>
              <p>
                <strong className="text-white block font-condensed uppercase tracking-wider text-xs">
                  Horario:
                </strong>
                {empresa.horario}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-navy-card flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-barlow text-slate-500">
          <div>
            © {new Date().getFullYear()} DELTA Industrial Spray Machines · Grupo Partes El Salvador. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <span className="font-condensed uppercase tracking-wider">
              Documentación técnica extraída de Catálogo y Ficha 2027
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-white hover:text-blue-light transition-colors font-condensed uppercase tracking-wider cursor-pointer"
            >
              <span>SUBIR</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
