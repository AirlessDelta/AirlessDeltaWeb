import React, { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { deltaData } from '../data/deltaData';
import { useCart } from '../context/CartContext';

/**
 * Cabecera Sticky con navegación Hallmark:
 * - Botón de Carrito con badge dinámico de cotización multiproducto
 * - Sin duplicado de "Cotizar" (se maneja exclusivamente en el botón de acción principal)
 * - Nombres concisos sin saltos de línea antiestéticos (whitespace-nowrap)
 * - Sin contornos negros por defecto del navegador (focus:outline-none)
 * - Menú móvil acoplado exactamente a la altura del header (top-20)
 */
export default function Header({ apartadoActivo, setApartadoActivo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, abrirCarrito } = useCart();

  const handleNavClick = (id) => {
    setApartadoActivo(id);
    setMobileMenuOpen(false);
    window.location.hash = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // En el menú desktop excluimos 'contacto' porque ya tiene su botón primario 'COTIZAR'
  const navItemsDesktop = deltaData.apartados.filter((item) => item.id !== 'contacto');

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-line-soft shadow-sm">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-6 xl:px-8 h-20 flex items-center justify-between gap-2 xl:gap-4 flex-nowrap">
        
        {/* Logo DELTA + GRUPO PARTES */}
        <button
          type="button"
          onClick={() => handleNavClick('inicio')}
          className="flex items-center gap-2 xl:gap-3 group text-left cursor-pointer outline-none focus:outline-none select-none flex-shrink-0"
          style={{ outline: 'none', boxShadow: 'none' }}
        >
          <div className="w-10 h-10 xl:w-11 xl:h-11 bg-blue rounded-circle flex items-center justify-center text-white flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 xl:w-6 xl:h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="12,3 22,20 2,20" fill="white" />
              <polygon points="12,9 18,18 6,18" fill="#1E40AF" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-condensed font-bold text-[22px] lg:text-[24px] xl:text-[26px] tracking-wider leading-none text-navy group-hover:text-blue transition-colors">
              DELTA
            </span>
            <span className="font-condensed text-[9px] xl:text-[10px] font-bold tracking-[0.16em] uppercase text-muted leading-tight">
              SPRAY MACHINES · EL SALVADOR
            </span>
          </div>
        </button>

        {/* Desktop Nav - Apartados (Espaciado milimétrico para 0 desbordes en laptops) */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2.5 2xl:space-x-4 flex-shrink" aria-label="Navegación principal">
          {navItemsDesktop.map((item) => {
            const isActive = apartadoActivo === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`font-condensed font-bold text-[12px] xl:text-[14px] tracking-[0.03em] uppercase py-2 px-1 xl:px-2 cursor-pointer transition-colors relative whitespace-nowrap outline-none focus:outline-none focus:ring-0 active:outline-none focus-visible:outline-none select-none border-0 ${
                  isActive
                    ? 'text-blue border-b-2 border-blue'
                    : 'text-navy hover:text-blue'
                }`}
                style={{ outline: 'none', boxShadow: 'none', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Botón Carrito de Cotización y Botón Primario de Asesoría */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 flex-shrink-0">
          {/* Botón Carrito de Cotización Multiproducto (Estilo Industrial Slate Navy) */}
          <button
            type="button"
            onClick={abrirCarrito}
            className="relative px-2.5 xl:px-3 py-2 bg-navy hover:bg-navy-deep text-white border border-navy transition-all flex items-center gap-1.5 xl:gap-2 cursor-pointer group shadow-sm select-none outline-none focus:outline-none min-h-[38px] xl:min-h-[40px]"
            aria-label={`Ver lista de cotización (${totalItems} productos)`}
            style={{ outline: 'none', boxShadow: 'none' }}
          >
            <ShoppingBag className="w-4 h-4 text-slate-300 group-hover:scale-110 transition-transform" />
            <span className="font-condensed font-bold text-xs uppercase tracking-wider hidden xl:inline">
              COTIZACIÓN
            </span>
            {totalItems > 0 && (
              <span className="bg-blue text-white text-[11px] font-condensed font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center shadow">
                {totalItems}
              </span>
            )}
          </button>

          {/* Botón Primario: Asesoría Técnica & Ventas */}
          <button
            type="button"
            onClick={() => handleNavClick('contacto')}
            className="btn-primary py-2 px-2.5 xl:px-4 text-xs xl:text-sm tracking-wider select-none outline-none focus:outline-none whitespace-nowrap min-h-[38px] xl:min-h-[40px]"
            style={{ outline: 'none', boxShadow: 'none' }}
          >
            <span className="hidden xl:inline">ASESORÍA & VENTAS</span>
            <span className="xl:hidden">ASESORÍA</span>
          </button>
        </div>

        {/* Mobile Right Icons (Carrito + Menú Hamburguesa) */}
        <div className="lg:hidden flex items-center gap-1">
          {/* Carrito Mobile Icon */}
          <button
            type="button"
            onClick={abrirCarrito}
            className="relative w-11 h-11 flex items-center justify-center text-navy hover:text-blue transition-colors focus:outline-none cursor-pointer"
            aria-label={`Ver lista de cotización (${totalItems} productos)`}
          >
            <ShoppingBag className="w-6 h-6 text-blue" />
            {totalItems > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-blue text-white text-[10px] font-condensed font-bold w-5 h-5 rounded-circle flex items-center justify-center shadow">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button (min 44x44px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 flex items-center justify-center text-navy hover:text-blue transition-colors focus:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu (Ajustado exactamente debajo del header) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-navy text-white z-50 flex flex-col justify-between p-6 overflow-y-auto overscroll-contain animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-1 pt-2" aria-label="Menú móvil de apartados">
            <span className="font-condensed text-xs font-bold uppercase tracking-widest text-blue-light mb-3 block">
              APARTADOS DEL SITIO
            </span>
            {deltaData.apartados.map((item, index) => {
              const isActive = apartadoActivo === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left font-condensed font-bold text-2xl uppercase tracking-wider py-3 border-b border-white/10 flex items-center justify-between transition-colors focus:outline-none ${
                    isActive ? 'text-white pl-2.5 font-extrabold bg-white/5' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-normal text-muted-dark font-barlow">
                    0{index + 1}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="pt-6 pb-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                abrirCarrito();
              }}
              className="btn-primary w-full py-3.5 px-4 text-base tracking-wider flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>VER MI LISTA DE COTIZACIÓN ({totalItems})</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contacto')}
              className="btn-primary w-full text-center py-3 text-base"
            >
              FORMULARIO DE CONTACTO
            </button>
            <div className="text-center font-barlow text-xs text-slate-400">
              WhatsApp El Salvador: {deltaData.empresa.celularWhatsapp}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
