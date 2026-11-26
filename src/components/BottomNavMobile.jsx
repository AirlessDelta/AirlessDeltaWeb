import React from 'react';
import { Home, Layers, Wrench, ShoppingBag, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';

/**
 * Barra de Navegación Inferior (Thumb Zone) para Móviles (360px - 768px).
 * Cumple con la ergonomía móvil de SkillNexthezia:
 * - Área táctil >= 44x44px por botón
 * - Carrito de cotización con badge reactivo visible en todo momento
 * - Ubicada en la zona natural del pulgar
 */
export default function BottomNavMobile({ apartadoActivo, setApartadoActivo }) {
  const { totalItems, abrirCarrito } = useCart();

  const handleNav = (id) => {
    setApartadoActivo(id);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-navy-deep text-white border-t border-navy-card shadow-2xl safe-bottom-pad">
      <div className="grid grid-cols-4 h-16 items-center">
        
        {/* 1. Inicio */}
        <button
          type="button"
          onClick={() => handleNav('inicio')}
          className={`flex flex-col items-center justify-center h-full w-full py-1 min-h-[44px] cursor-pointer transition-colors ${
            apartadoActivo === 'inicio' ? 'text-white font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Home className={`w-5 h-5 ${apartadoActivo === 'inicio' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="font-condensed text-[11px] uppercase tracking-wider mt-1">
            Inicio
          </span>
        </button>

        {/* 2. Catálogo Maquinaria */}
        <button
          type="button"
          onClick={() => handleNav('maquinaria')}
          className={`flex flex-col items-center justify-center h-full w-full py-1 min-h-[44px] cursor-pointer transition-colors ${
            apartadoActivo === 'maquinaria' ? 'text-white font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className={`w-5 h-5 ${apartadoActivo === 'maquinaria' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="font-condensed text-[11px] uppercase tracking-wider mt-1">
            Catálogo
          </span>
        </button>

        {/* 3. Repuestos */}
        <button
          type="button"
          onClick={() => handleNav('repuestos')}
          className={`flex flex-col items-center justify-center h-full w-full py-1 min-h-[44px] cursor-pointer transition-colors ${
            apartadoActivo === 'repuestos' ? 'text-white font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Wrench className={`w-5 h-5 ${apartadoActivo === 'repuestos' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="font-condensed text-[11px] uppercase tracking-wider mt-1">
            Repuestos
          </span>
        </button>

        {/* 4. Carrito de Cotización Multiproducto (Destacado con Badge) */}
        <button
          type="button"
          onClick={abrirCarrito}
          className="flex flex-col items-center justify-center h-full w-full py-1 min-h-[44px] cursor-pointer transition-colors text-white relative group"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-circle bg-blue flex items-center justify-center text-white shadow-md group-active:scale-95 transition-transform">
              <ShoppingBag className="w-4 h-4" />
            </div>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-emerald-500 text-white text-[10px] font-condensed font-bold w-4 h-4 rounded-circle flex items-center justify-center shadow">
                {totalItems}
              </span>
            )}
          </div>
          <span className="font-condensed text-[11px] uppercase tracking-wider text-blue-light font-bold mt-0.5">
            Cotizar
          </span>
        </button>

      </div>
    </div>
  );
}
