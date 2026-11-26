import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNavMobile from './components/BottomNavMobile';
import ToastSnackbar from './components/ToastSnackbar';
import ModalFichaTecnica from './components/ModalFichaTecnica';
import ModalCarritoCotizacion from './components/ModalCarritoCotizacion';
import { CartProvider } from './context/CartContext';

import Inicio from './vistas/Inicio';
import Maquinaria from './vistas/Maquinaria';
import Accesorios from './vistas/Accesorios';
import Repuestos from './vistas/Repuestos';
import Aplicaciones from './vistas/Aplicaciones';
import Mantenimiento from './vistas/Mantenimiento';
import Nosotros from './vistas/Nosotros';
import Contacto from './vistas/Contacto';

/**
 * Aplicación Airless DELTA — Nexthezia Hallmark Architecture:
 * - 8 apartados sincronizados con URL Hash
 * - Carrito de Cotización Multiproducto con envío directo a WhatsApp
 * - Barra inferior ergonómica para zona del pulgar en móvil (BottomNavMobile)
 * - Modal / Bottom-sheet interactivo para fichas técnicas y carrito
 * - Toast / Snackbar no bloqueante para feedback instantáneo
 */
export default function App() {
  const [apartadoActivo, setApartadoActivo] = useState('inicio');
  const [maquinaModal, setMaquinaModal] = useState(null);
  const [modeloPrecargado, setModeloPrecargado] = useState('');
  const [toast, setToast] = useState(null); // { mensaje, tipo }

  // Sincronización bidireccional con URL Hash (#maquinaria, #contacto, etc.)
  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace('#', '');
      const validApartados = [
        'inicio',
        'maquinaria',
        'accesorios',
        'repuestos',
        'aplicaciones',
        'mantenimiento',
        'nosotros',
        'contacto',
      ];
      if (hash && validApartados.includes(hash)) {
        setApartadoActivo(hash);
      }
    };

    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  const mostrarToast = (mensaje, tipo = 'exito') => {
    setToast({ mensaje, tipo });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleCotizarModelo = (nombreModelo) => {
    setModeloPrecargado(nombreModelo);
    setApartadoActivo('contacto');
    window.location.hash = 'contacto';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    mostrarToast(`Modelo ${nombreModelo} preseleccionado para cotizar.`, 'info');
  };

  const renderApartado = () => {
    switch (apartadoActivo) {
      case 'inicio':
        return (
          <Inicio
            setApartadoActivo={setApartadoActivo}
            onVerFicha={(m) => setMaquinaModal(m)}
          />
        );
      case 'maquinaria':
        return (
          <Maquinaria
            onVerFicha={(m) => setMaquinaModal(m)}
            setApartadoActivo={setApartadoActivo}
          />
        );
      case 'accesorios':
        return <Accesorios setApartadoActivo={setApartadoActivo} />;
      case 'repuestos':
        return <Repuestos setApartadoActivo={setApartadoActivo} />;
      case 'aplicaciones':
        return <Aplicaciones setApartadoActivo={setApartadoActivo} />;
      case 'mantenimiento':
        return <Mantenimiento setApartadoActivo={setApartadoActivo} />;
      case 'nosotros':
        return <Nosotros setApartadoActivo={setApartadoActivo} />;
      case 'contacto':
        return (
          <Contacto
            modeloPrecargado={modeloPrecargado}
            onMostrarToast={mostrarToast}
          />
        );
      default:
        return (
          <Inicio
            setApartadoActivo={setApartadoActivo}
            onVerFicha={(m) => setMaquinaModal(m)}
          />
        );
    }
  };

  return (
    <CartProvider onMostrarToast={mostrarToast}>
      <div className="min-h-[100dvh] flex flex-col bg-paper text-navy font-sans antialiased overflow-x-hidden selection:bg-blue selection:text-white pb-16 md:pb-0">
        {/* 1. Header sticky con navegación Hallmark y Carrito */}
        <Header
          apartadoActivo={apartadoActivo}
          setApartadoActivo={setApartadoActivo}
        />

        {/* 3. Contenido dinámico del apartado activo */}
        <main className="flex-1">{renderApartado()}</main>

        {/* 4. Footer corporativo institucional */}
        <Footer setApartadoActivo={setApartadoActivo} />

        {/* 5. Barra de Navegación Inferior (Thumb Zone) para Móviles con Carrito */}
        <BottomNavMobile
          apartadoActivo={apartadoActivo}
          setApartadoActivo={setApartadoActivo}
        />

        {/* 6. Modal / Slide-over Drawer del Carrito de Cotización */}
        <ModalCarritoCotizacion
          onNavegarApartado={(id) => {
            setApartadoActivo(id);
            window.location.hash = id;
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onMostrarToast={mostrarToast}
        />

        {/* 7. Modal / Bottom Sheet de Ficha Técnica */}
        {maquinaModal && (
          <ModalFichaTecnica
            maquina={maquinaModal}
            onClose={() => setMaquinaModal(null)}
            onCotizar={handleCotizarModelo}
          />
        )}

        {/* 8. Toast / Snackbar de Notificación no bloqueante */}
        {toast && (
          <ToastSnackbar
            mensaje={toast.mensaje}
            tipo={toast.tipo}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </CartProvider>
  );
}
