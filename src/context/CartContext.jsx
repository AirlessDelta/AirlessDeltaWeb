import React, { createContext, useContext, useState, useEffect } from 'react';
import { deltaData } from '../data/deltaData';

const CartContext = createContext(null);

const STORAGE_KEY = 'delta_cotizacion_cart_v1';
const CLIENT_STORAGE_KEY = 'delta_cotizacion_cliente_v1';

/**
 * Función pura para estructurar el mensaje de cotización para WhatsApp
 */
export function formatWhatsAppQuotation(items, clienteInfo = {}) {
  const separador = '---------------------------------';
  const totalItems = items.reduce((acc, it) => acc + (it.cantidad || 1), 0);

  let msg = `*SOLICITUD DE COTIZACIÓN FORMAL*\n`;
  msg += `*DELTA INDUSTRIAL SPRAY MACHINES*\n`;
  msg += `Distribuidor: GRUPO PARTES EL SALVADOR\n`;
  msg += `${separador}\n\n`;

  if (clienteInfo.nombre || clienteInfo.empresa || clienteInfo.ubicacion) {
    msg += `*DATOS DEL SOLICITANTE:*\n`;
    if (clienteInfo.nombre) msg += `• *Contacto:* ${clienteInfo.nombre.trim()}\n`;
    if (clienteInfo.empresa) msg += `• *Empresa / Proyecto:* ${clienteInfo.empresa.trim()}\n`;
    if (clienteInfo.ubicacion) msg += `• *Ubicación:* ${clienteInfo.ubicacion.trim()}\n`;
    msg += `\n`;
  }

  msg += `*LISTA DE PRODUCTOS (${totalItems} items solicitados):*\n\n`;

  items.forEach((item, index) => {
    const tipoLabel =
      item.tipo === 'maquina'
        ? 'MÁQUINA'
        : item.tipo === 'accesorio'
        ? 'ACCESORIO'
        : item.tipo === 'repuesto'
        ? 'REPUESTO'
        : 'PRODUCTO';

    msg += `${index + 1}. [${tipoLabel}] *${item.nombre}*\n`;
    msg += `   • Cantidad: *${item.cantidad} unidad(es)*\n`;
    if (item.codigo) msg += `   • Código OEM: ${item.codigo}\n`;
    if (item.subtitulo) msg += `   • Especificación: ${item.subtitulo}\n`;
    if (item.detalle) msg += `   • Detalle: ${item.detalle}\n`;
    msg += `\n`;
  });

  if (clienteInfo.notas) {
    msg += `*NOTAS / REQUERIMIENTO ADICIONAL:*\n`;
    msg += `${clienteInfo.notas.trim()}\n\n`;
  }

  msg += `${separador}\n`;
  msg += `Por favor confirmar precios oficiales, disponibilidad inmediata en bodega Lourdes Colón y opciones de entrega en obra. ¡Muchas gracias!`;

  return msg;
}

export function CartProvider({ children, onMostrarToast }) {
  // Cargar items desde localStorage si existen de manera segura
  const [items, setItems] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const guardado = localStorage.getItem(STORAGE_KEY);
        return guardado ? JSON.parse(guardado) : [];
      }
    } catch (e) {}
    return [];
  });

  const [clienteInfo, setClienteInfo] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const guardado = localStorage.getItem(CLIENT_STORAGE_KEY);
        return guardado
          ? JSON.parse(guardado)
          : { nombre: '', empresa: '', ubicacion: '', notas: '' };
      }
    } catch (e) {}
    return { nombre: '', empresa: '', ubicacion: '', notas: '' };
  });

  const [isOpen, setIsOpen] = useState(false);

  // Persistir en localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      }
    } catch (e) {}
  }, [items]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(CLIENT_STORAGE_KEY, JSON.stringify(clienteInfo));
      }
    } catch (e) {}
  }, [clienteInfo]);

  const abrirCarrito = () => setIsOpen(true);
  const cerrarCarrito = () => setIsOpen(false);
  const toggleCarrito = () => setIsOpen((prev) => !prev);

  const agregarItem = (producto, cantidad = 1) => {
    setItems((prevItems) => {
      const itemExistenteIndex = prevItems.findIndex((it) => it.id === producto.id);
      if (itemExistenteIndex > -1) {
        const nuevos = [...prevItems];
        nuevos[itemExistenteIndex].cantidad += cantidad;
        return nuevos;
      } else {
        return [
          ...prevItems,
          {
            id: producto.id,
            nombre: producto.nombre,
            tipo: producto.tipo || 'producto',
            imagen: producto.imagen || '/img/hero/hero-airless.png',
            codigo: producto.codigo || '',
            subtitulo: producto.subtitulo || '',
            detalle: producto.detalle || '',
            cantidad: Math.max(1, cantidad),
          },
        ];
      }
    });

    if (onMostrarToast) {
      onMostrarToast(`"${producto.nombre}" agregado a la lista de cotización.`, 'exito');
    }
  };

  const removerItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    if (onMostrarToast) {
      onMostrarToast('Producto removido de la cotización.', 'info');
    }
  };

  const actualizarCantidad = (id, delta) => {
    setItems((prev) =>
      prev
        .map((it) => {
          if (it.id === id) {
            const nuevaCantidad = it.cantidad + delta;
            return nuevaCantidad > 0 ? { ...it, cantidad: nuevaCantidad } : null;
          }
          return it;
        })
        .filter(Boolean)
    );
  };

  const vaciarCarrito = () => {
    setItems([]);
    if (onMostrarToast) {
      onMostrarToast('Lista de cotización vaciada.', 'info');
    }
  };

  const actualizarCliente = (campo, valor) => {
    setClienteInfo((prev) => ({ ...prev, [campo]: valor }));
  };

  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);

  const generarMensajeWhatsApp = () => formatWhatsAppQuotation(items, clienteInfo);

  const enviarWhatsApp = () => {
    if (items.length === 0) {
      if (onMostrarToast) {
        onMostrarToast('Agregue al menos un producto a la lista antes de enviar.', 'error');
      }
      return;
    }

    const texto = encodeURIComponent(generarMensajeWhatsApp());
    const url = `https://wa.me/${deltaData.empresa.whatsappClean}?text=${texto}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        isOpen,
        abrirCarrito,
        cerrarCarrito,
        toggleCarrito,
        agregarItem,
        removerItem,
        actualizarCantidad,
        vaciarCarrito,
        clienteInfo,
        actualizarCliente,
        generarMensajeWhatsApp,
        enviarWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}
