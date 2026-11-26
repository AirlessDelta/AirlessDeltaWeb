import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import ToastSnackbar from '../components/ToastSnackbar';
import SkeletonCard from '../components/SkeletonCard';
import BottomNavMobile from '../components/BottomNavMobile';
import Header from '../components/Header';
import ModalCarritoCotizacion from '../components/ModalCarritoCotizacion';
import Inicio from '../vistas/Inicio';
import Maquinaria from '../vistas/Maquinaria';
import { CartProvider, formatWhatsAppQuotation } from '../context/CartContext';

describe('Renderizado de Componentes UI Nexthezia Hallmark', () => {
  it('renderiza ToastSnackbar con mensaje y rol de accesibilidad polite', () => {
    const html = renderToString(
      <ToastSnackbar mensaje="Cotización enviada exitosamente" tipo="exito" />
    );
    expect(html).toContain('Cotización enviada exitosamente');
    expect(html).toContain('role="status"');
    expect(html).toContain('aria-live="polite"');
  });

  it('no renderiza nada si ToastSnackbar no tiene mensaje', () => {
    const html = renderToString(<ToastSnackbar mensaje="" />);
    expect(html).toBe('');
  });

  it('renderiza SkeletonCard con clases shimmer para CLS = 0', () => {
    const html = renderToString(<SkeletonCard />);
    expect(html).toContain('skeleton-shimmer');
    expect(html).toContain('animate-pulse');
  });

  it('renderiza BottomNavMobile dentro de CartProvider con accesos táctiles', () => {
    const html = renderToString(
      <CartProvider>
        <BottomNavMobile apartadoActivo="inicio" setApartadoActivo={() => {}} />
      </CartProvider>
    );
    expect(html).toContain('Inicio');
    expect(html).toContain('Catálogo');
    expect(html).toContain('Repuestos');
    expect(html).toContain('Cotizar');
    expect(html).toContain('safe-bottom-pad');
  });

  it('el Carrito no se renderiza si isOpen es false', () => {
    const html = renderToString(
      <CartProvider>
        <ModalCarritoCotizacion onNavegarApartado={() => {}} onMostrarToast={() => {}} />
      </CartProvider>
    );
    expect(html).toBe('');
  });

  it('renderiza Header sin duplicado de COTIZAR y con acción clara de asesoría', () => {
    const html = renderToString(
      <CartProvider>
        <Header apartadoActivo="inicio" setApartadoActivo={() => {}} />
      </CartProvider>
    );
    expect(html).toContain('DELTA');
    expect(html).toContain('COTIZACIÓN');
    expect(html).toContain('ASESORÍA &amp; VENTAS');
  });

  it('renderiza Inicio con Hero industrial interactivo y sin variables indefinidas', () => {
    const html = renderToString(
      <CartProvider>
        <Inicio setApartadoActivo={() => {}} onVerFicha={() => {}} />
      </CartProvider>
    );
    expect(html).toContain('SISTEMAS DE PULVERIZACIÓN AIRLESS');
    expect(html).toContain('BANCO DE PRUEBAS INTERACTIVO');
    expect(html).toContain('DELTA 1095 XP');
    expect(html).toContain('MÁQUINAS PULVERIZADORAS DESTACADAS');
  });

  it('renderiza Maquinaria con filtros y barra de búsqueda completa', () => {
    const html = renderToString(
      <CartProvider>
        <Maquinaria onVerFicha={() => {}} onCotizar={() => {}} />
      </CartProvider>
    );
    expect(html).toContain('CATÁLOGO DE MAQUINARIA INDUSTRIAL');
    expect(html).toContain('Buscar por modelo');
  });
});

describe('Lógica del Carrito y Mensaje de WhatsApp Multiproducto', () => {
  it('genera un mensaje de WhatsApp estructurado con múltiples productos de diferentes categorías', () => {
    const items = [
      {
        id: '395-xr',
        nombre: 'DELTA ULTRA MAX II 395 XR',
        tipo: 'maquina',
        subtitulo: 'Pulverizadora Airless Eléctrica Brushless',
        cantidad: 1,
      },
      {
        id: 'acc-1',
        nombre: 'Pistola Delta Contractor 4-Dedos',
        tipo: 'accesorio',
        subtitulo: 'Presión 3600 PSI',
        cantidad: 2,
      },
      {
        id: 'rep-D-395-01',
        nombre: 'Kit de Empaquetaduras V-Packing',
        tipo: 'repuesto',
        codigo: 'D-395-01',
        cantidad: 3,
      },
    ];

    const clienteInfo = {
      nombre: 'Carlos Hernández',
      empresa: 'Constructora San Salvador',
      ubicacion: 'Lourdes Colón',
      notas: 'Requerimos entrega en obra y crédito fiscal.',
    };

    const mensaje = formatWhatsAppQuotation(items, clienteInfo);
    expect(mensaje).toContain('SOLICITUD DE COTIZACIÓN FORMAL');
    expect(mensaje).toContain('DELTA INDUSTRIAL SPRAY MACHINES');
    expect(mensaje).toContain('GRUPO PARTES EL SALVADOR');
    expect(mensaje).toContain('Carlos Hernández');
    expect(mensaje).toContain('Constructora San Salvador');
    expect(mensaje).toContain('Lourdes Colón');
    expect(mensaje).toContain('DELTA ULTRA MAX II 395 XR');
    expect(mensaje).toContain('Pistola Delta Contractor 4-Dedos');
    expect(mensaje).toContain('D-395-01');
    expect(mensaje).toContain('6 items solicitados');
    expect(mensaje).toContain('Requerimos entrega en obra y crédito fiscal.');
  });
});
