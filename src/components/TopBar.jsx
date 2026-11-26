import React from 'react';
import { Phone, Mail, Clock, MapPin, Download } from 'lucide-react';
import { deltaData } from '../data/deltaData';

export default function TopBar() {
  const { empresa } = deltaData;

  return (
    <div className="bg-[#07112E] text-[#B7C2E0] text-[12px] xl:text-[13px] tracking-wider border-b border-[#0B1A44] z-50 relative">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-6 xl:px-8 h-9 xl:h-10 flex items-center justify-between">
        {/* Left: Contact links */}
        <div className="flex items-center space-x-3 xl:space-x-5 overflow-x-auto py-1 no-scrollbar">
          <a
            href={`https://wa.me/${empresa.whatsappClean}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors flex-shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-blue" />
            <span className="font-barlow font-medium">WhatsApp: {empresa.celularWhatsapp}</span>
          </a>
          <span className="hidden sm:inline text-line/40">|</span>
          <a
            href={`tel:${empresa.telefonoFijo}`}
            className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors flex-shrink-0"
          >
            <span className="font-barlow font-medium">Fijo: {empresa.telefonoFijo}</span>
          </a>
          <span className="hidden md:inline text-line/40">|</span>
          <a
            href={`mailto:${empresa.email}`}
            className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors flex-shrink-0"
          >
            <Mail className="w-3.5 h-3.5 text-blue" />
            <span className="font-barlow font-medium">{empresa.email}</span>
          </a>
        </div>

        {/* Right: Location & Guarantee tag */}
        <div className="hidden lg:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-blue-light">
            <MapPin className="w-3.5 h-3.5" />
            <span className="font-barlow font-medium">Lourdes Colón, La Libertad, El Salvador</span>
          </div>
          <span className="text-line/40">|</span>
          <div className="text-[#8DA0FF] font-condensed uppercase tracking-wider font-bold">
            DISTRIBUIDOR OFICIAL GRUPO PARTES
          </div>
        </div>
      </div>
    </div>
  );
}
