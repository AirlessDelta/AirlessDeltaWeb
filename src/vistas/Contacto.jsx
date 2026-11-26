import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle, FileText, Download } from 'lucide-react';
import { deltaData } from '../data/deltaData';

/**
 * Vista de Cotización y Contacto refinada bajo SkillNexthezia:
 * - Cero controles feos por defecto (selects estilizados con SVG chevron)
 * - Inputs ergonómicos con fuente >= 16px (evita auto-zoom iOS)
 * - Áreas táctiles >= 44x44px
 * - Validación defensiva en tiempo real y honeypot antispam
 */
export default function Contacto({ modeloPrecargado, onMostrarToast }) {
  const { empresa } = deltaData;

  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    equipoInteres: modeloPrecargado || 'DELTA ULTRA MAX II 395 XR',
    tipoMaterial: 'Pintura Látex / Acrílica',
    mensaje: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [ultimoEnvio, setUltimoEnvio] = useState(0);

  // Sanitizador anti-XSS y limitador de longitud de carga útil
  const sanitize = (str) => {
    if (typeof str !== 'string') return '';
    return str.replace(/[<>]/g, '').trim().slice(0, 500);
  };

  const validate = () => {
    const errs = {};
    const nombreLimpio = sanitize(formData.nombre);
    const emailLimpio = sanitize(formData.email);
    const telefonoLimpio = sanitize(formData.telefono);

    if (!nombreLimpio) {
      errs.nombre = 'El nombre es obligatorio.';
    } else if (nombreLimpio.length < 3) {
      errs.nombre = 'Ingrese un nombre válido (mínimo 3 caracteres).';
    }

    if (!emailLimpio) {
      errs.email = 'El correo electrónico es obligatorio.';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailLimpio)) {
      errs.email = 'Ingrese un formato de correo válido (ej: nombre@dominio.com).';
    }

    if (!telefonoLimpio) {
      errs.telefono = 'El teléfono o WhatsApp es obligatorio para enviarle la cotización.';
    } else if (!/^[0-9+\s()-]{7,20}$/.test(telefonoLimpio)) {
      errs.telefono = 'Ingrese un número telefónico válido (ej: +503 7000-0000).';
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.honeypot) return; // Honeypot anti-bot silencioso

    // Rate limiting defensivo (cooldown de 3 segundos entre envíos)
    const ahora = Date.now();
    if (ahora - ultimoEnvio < 3000) {
      if (onMostrarToast) {
        onMostrarToast('Por favor espere un momento antes de enviar otra solicitud.', 'info');
      }
      return;
    }

    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setUltimoEnvio(ahora);
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        if (onMostrarToast) {
          onMostrarToast('¡Cotización recibida! Un ingeniero de Grupo Partes se comunicará a la brevedad.', 'exito');
        }
      }, 600);
    }
  };

  const handleWhatsAppDirecto = () => {
    const ahora = Date.now();
    if (ahora - ultimoEnvio < 2000) return;
    setUltimoEnvio(ahora);

    const nombreLimpio = sanitize(formData.nombre) || 'Interesado';
    const texto = `Hola Grupo Partes El Salvador, deseo cotizar el equipo: ${formData.equipoInteres}. Material a aplicar: ${formData.tipoMaterial}. Nombre: ${nombreLimpio}.`;
    window.open(`https://wa.me/${empresa.whatsappClean}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-10 lg:py-16 bg-paper min-h-screen text-navy">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="h-1 bg-navy w-16 mb-4" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-condensed font-bold uppercase tracking-widest text-blue block mb-1">
                VENTAS & ASESORÍA TÉCNICA · EL SALVADOR
              </span>
              <h1 className="font-condensed font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-navy tracking-tight">
                COTIZACIÓN DIRECTA DE FÁBRICA
              </h1>
            </div>
            <button
              type="button"
              onClick={handleWhatsAppDirecto}
              className="btn-primary py-3 px-6 text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>WHATSAPP VENTAS (+503 7000-5512)</span>
            </button>
          </div>
          <p className="font-barlow text-sm sm:text-base text-muted mt-2 max-w-2xl">
            Envíenos los detalles de su proyecto. Un asesor técnico de Grupo Partes le enviará la cotización formal con opciones de pago y entrega en obra.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Form */}
          <div className="bg-white p-6 sm:p-8 lg:p-10 border border-line shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
              <span className="font-condensed font-bold text-xl uppercase tracking-wider text-navy">
                FORMULARIO DE COTIZACIÓN
              </span>
              <span className="font-condensed text-xs font-bold text-blue uppercase">
                RESPUESTA EN &lt; 2 HORAS
              </span>
            </div>

            <div aria-live="polite">
              {submitted && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-condensed font-bold text-lg uppercase">
                      ¡SOLICITUD ENVIADA CON ÉXITO!
                    </h4>
                    <p className="font-barlow text-sm mt-1">
                      Hemos recibido sus datos para la cotización de <strong>{formData.equipoInteres}</strong>. Un asesor técnico de Grupo Partes se comunicará hoy mismo con usted.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <input
                type="text"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                tabIndex="-1"
                className="hidden"
                aria-hidden="true"
              />

              {/* Nombre y Empresa */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className="font-condensed text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                    NOMBRE COMPLETO *
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => {
                      setFormData({ ...formData, nombre: e.target.value });
                      if (errors.nombre) setErrors({ ...errors, nombre: '' });
                    }}
                    placeholder="Ej. Ing. Roberto Menéndez"
                    className="input-industrial"
                  />
                  {errors.nombre && (
                    <span className="text-red-600 text-xs font-barlow mt-1 block font-medium">{errors.nombre}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="empresa" className="font-condensed text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                    EMPRESA O TALLER
                  </label>
                  <input
                    id="empresa"
                    type="text"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    placeholder="Constructora / Pinturas"
                    className="input-industrial"
                  />
                </div>
              </div>

              {/* Email y Telefono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="font-condensed text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                    CORREO ELECTRÓNICO *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="correo@empresa.com"
                    className="input-industrial"
                  />
                  {errors.email && (
                    <span className="text-red-600 text-xs font-barlow mt-1 block font-medium">{errors.email}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="telefono" className="font-condensed text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                    TELÉFONO O WHATSAPP *
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => {
                      setFormData({ ...formData, telefono: e.target.value });
                      if (errors.telefono) setErrors({ ...errors, telefono: '' });
                    }}
                    placeholder="+503 7000-0000"
                    className="input-industrial"
                  />
                  {errors.telefono && (
                    <span className="text-red-600 text-xs font-barlow mt-1 block font-medium">{errors.telefono}</span>
                  )}
                </div>
              </div>

              {/* Selector de Maquinaria Refinado (SkillNexthezia select-industrial) */}
              <div>
                <label htmlFor="equipo" className="font-condensed text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                  EQUIPO O LÍNEA DE INTERÉS *
                </label>
                <select
                  id="equipo"
                  value={formData.equipoInteres}
                  onChange={(e) => setFormData({ ...formData, equipoInteres: e.target.value })}
                  className="input-industrial select-industrial font-semibold text-navy"
                >
                  <optgroup label="Línea Eléctrica Brushless">
                    <option value="DELTA ULTRA MAX II 395 XR">DELTA ULTRA MAX II 395 XR (1500W · 2.0 L/min)</option>
                    <option value="DELTA ULTRA MAX II 495 XR">DELTA ULTRA MAX II 495 XR (2300W · 2.2 L/min)</option>
                    <option value="DELTA ULTRA 1095 XP">DELTA ULTRA 1095 XP (3000W · 4.8 L/min)</option>
                    <option value="DELTA ULTRA MARK V">DELTA ULTRA MARK V (4000W · 6.3 L/min · Masilla)</option>
                    <option value="DELTA ULTRA MARK X">DELTA ULTRA MARK X (4500W · 9.0 L/min · Masilla Pesada)</option>
                  </optgroup>
                  <optgroup label="Línea Gasolina Motor Honda">
                    <option value="DELTA GMAX II 7900">DELTA GMAX II 7900 (Honda 6.5 HP · 8.7 L/min)</option>
                    <option value="DELTA H20-1 Señalización Vial">DELTA H20-1 (Señalización Vial 1 Línea)</option>
                    <option value="DELTA H20-4 Señalización Vial">DELTA H20-4 (Señalización Vial Doble Pistola)</option>
                  </optgroup>
                  <optgroup label="Mortero, Cemento y Concreto">
                    <option value="DELTA DT-311 Rociadora Mortero">DELTA DT-311 Rociadora de Cemento y Decoblock</option>
                    <option value="DELTA DT-511 Proyectora Mortero">DELTA DT-511 Proyectora de Mortero 7500W</option>
                    <option value="DELTA DT-711 Proyectora Mortero">DELTA DT-711 Proyectora Industrial 9000W</option>
                    <option value="DELTA DT-5500 Bomba Concreto">DELTA DT-5500 Bomba para Columnas y Plafón</option>
                    <option value="DELTA DT-7500 Bomba Concreto">DELTA DT-7500 Bomba para Llenado de Losas</option>
                  </optgroup>
                  <optgroup label="Accesorios y Repuestos">
                    <option value="Accesorios Oficiales">Pistolas, boquillas RAC/FFLP, mangueras</option>
                    <option value="Repuestos y Juntas V-Packing">Kits de juntas V-Packing, pistones, válvulas</option>
                    <option value="Servicio de Mantenimiento">Turno de taller técnico / calibración</option>
                  </optgroup>
                </select>
              </div>

              {/* Tipo de Material Refinado */}
              <div>
                <label htmlFor="material" className="font-condensed text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                  MATERIAL O RECUBRIMIENTO A APLICAR
                </label>
                <select
                  id="material"
                  value={formData.tipoMaterial}
                  onChange={(e) => setFormData({ ...formData, tipoMaterial: e.target.value })}
                  className="input-industrial select-industrial"
                >
                  <option value="Pintura Látex / Acrílica">Pintura Látex / Acrílica (Paredes y Cielos)</option>
                  <option value="Esmalte y Anticorrosivo">Esmalte sintético y anticorrosivo para metales</option>
                  <option value="Epóxica para pisos">Pintura epóxica para pisos de naves o parqueos</option>
                  <option value="Masilla para Tabla Roca">Masilla para tabla roca / pasta para drywall</option>
                  <option value="Impermeabilizante de techo">Impermeabilizantes elastoméricos de techos</option>
                  <option value="Pintura de Tráfico Vial">Pintura de tráfico vial y demarcación</option>
                  <option value="Mortero o Cemento Colado">Mortero proyectado, decoblock o concreto</option>
                </select>
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="mensaje" className="font-condensed text-xs font-bold uppercase tracking-wider text-muted block mb-1">
                  DETALLES DE LA CONSULTA
                </label>
                <textarea
                  id="mensaje"
                  rows={3}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  placeholder="Superficie aproximada en m², tiempo de obra o especificación adicional..."
                  className="input-industrial resize-y text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full gap-2 py-3.5 mt-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'PROCESANDO SOLICITUD...' : 'ENVIAR SOLICITUD DE COTIZACIÓN'}
              </button>
            </form>
          </div>

          {/* Right Column: Contact info & PDFs downloads */}
          <div className="space-y-6">
            
            <div className="bg-white text-navy p-6 sm:p-8 border border-line shadow-sm">
              <span className="text-xs font-condensed font-bold uppercase tracking-widest text-blue block mb-1">
                ATENCIÓN INMEDIATA
              </span>
              <h3 className="font-condensed font-bold text-2xl uppercase tracking-tight mb-6">
                CANALES DIRECTOS DE GRUPO PARTES
              </h3>

              <div className="space-y-4 font-barlow text-sm text-muted">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-panel flex items-center justify-center text-blue flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-navy block font-condensed uppercase tracking-wider text-xs">
                      Teléfonos de Atención:
                    </strong>
                    <span>Fijo: {empresa.telefonoFijo}</span>
                    <span className="block text-navy font-semibold">WhatsApp: {empresa.celularWhatsapp}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-panel flex items-center justify-center text-blue flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-navy block font-condensed uppercase tracking-wider text-xs">
                      Correo Electrónico:
                    </strong>
                    <span className="text-navy font-semibold">{empresa.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-panel flex items-center justify-center text-blue flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-navy block font-condensed uppercase tracking-wider text-xs">
                      Oficina Matriz y Bodega:
                    </strong>
                    <span>{empresa.direccion}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-panel flex items-center justify-center text-blue flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-navy block font-condensed uppercase tracking-wider text-xs">
                      Horario de Planta y Despachos:
                    </strong>
                    <span>{empresa.horario}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Documentos Técnicos Disponibles */}
            <div className="bg-white p-6 border border-line shadow-sm">
              <span className="font-condensed font-bold text-xs uppercase tracking-widest text-muted block mb-3">
                DOCUMENTACIÓN OFICIAL DELTA
              </span>
              <div className="space-y-3">
                <div className="p-3 bg-panel border border-line-soft flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue" />
                    <div>
                      <strong className="font-condensed font-bold text-sm uppercase text-navy block">
                        CATÁLOGO GENERAL DELTA AIRLESS
                      </strong>
                      <span className="font-barlow text-xs text-muted">23 Páginas · Fundamentos y accesorios</span>
                    </div>
                  </div>
                  <span className="font-condensed font-bold text-xs text-navy uppercase bg-white px-2 py-1 border border-line">
                    PDF OFICIAL
                  </span>
                </div>

                <div className="p-3 bg-panel border border-line-soft flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue" />
                    <div>
                      <strong className="font-condensed font-bold text-sm uppercase text-navy block">
                        FICHA TÉCNICA NUEVA LÍNEA DELTA 2027
                      </strong>
                      <span className="font-barlow text-xs text-muted">24 Páginas · Modelos y despieces</span>
                    </div>
                  </div>
                  <span className="font-condensed font-bold text-xs text-navy uppercase bg-white px-2 py-1 border border-line">
                    PDF OFICIAL
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
