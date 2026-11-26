import { describe, it, expect } from 'vitest';
import { deltaData } from '../data/deltaData';

describe('Integridad de Datos DELTA 2027 (Catálogo y Ficha Técnica)', () => {
  it('contiene la información oficial de la empresa Grupo Partes El Salvador', () => {
    expect(deltaData.empresa.nombre).toContain('DELTA');
    expect(deltaData.empresa.distribuidorOficial).toBe('GRUPO PARTES');
    expect(deltaData.empresa.telefonoFijo).toBe('+503 2319-4425');
    expect(deltaData.empresa.celularWhatsapp).toBe('+503 7000-5512');
    expect(deltaData.empresa.whatsappClean).toBe('50370005512');
    expect(deltaData.empresa.email).toBe('ventas@airlessdelta.com');
    expect(deltaData.empresa.direccion).toContain('Lourdes Colón');
  });

  it('contiene exactamente los 8 apartados para la navegación', () => {
    expect(deltaData.apartados).toHaveLength(8);
    const ids = deltaData.apartados.map((a) => a.id);
    expect(ids).toEqual([
      'inicio',
      'maquinaria',
      'accesorios',
      'repuestos',
      'aplicaciones',
      'mantenimiento',
      'nosotros',
      'contacto',
    ]);
  });

  it('contiene las 13 máquinas oficiales con especificaciones completas', () => {
    expect(deltaData.maquinas.length).toBe(13);
    deltaData.maquinas.forEach((m) => {
      expect(m.id).toBeTruthy();
      expect(m.nombre).toBeTruthy();
      expect(m.categoria).toBeTruthy();
      expect(m.motor).toBeTruthy();
      expect(m.potencia).toBeTruthy();
      expect(m.caudal).toBeTruthy();
      expect(m.presion).toBeTruthy();
      expect(m.materiales.length).toBeGreaterThan(0);
      expect(m.tag2027).toBe('Línea 2027');
    });
  });

  it('incluye modelos emblemáticos de los PDFs (395 XR, Mark V, GMAX 7900, H20, DT-311, DT-5500)', () => {
    const nombres = deltaData.maquinas.map((m) => m.nombre);
    expect(nombres).toContain('DELTA ULTRA MAX II 395 XR');
    expect(nombres).toContain('DELTA ULTRA MAX II 495 XR');
    expect(nombres).toContain('DELTA ULTRA 1095 XP');
    expect(nombres).toContain('DELTA ULTRA MARK V');
    expect(nombres).toContain('DELTA ULTRA MARK X');
    expect(nombres).toContain('DELTA GMAX II 7900');
    expect(nombres).toContain('DELTA H20-1');
    expect(nombres).toContain('DELTA H20-4');
    expect(nombres).toContain('DELTA DT-311');
    expect(nombres).toContain('DELTA DT-5500');
  });

  it('contiene el cronograma de mantenimiento oficial en 4 fases', () => {
    expect(deltaData.mantenimientoCronograma).toHaveLength(4);
    const frecuencias = deltaData.mantenimientoCronograma.map((f) => f.frecuencia);
    expect(frecuencias[0]).toContain('DIARIO');
    expect(frecuencias[1]).toContain('SEMANAL');
    expect(frecuencias[2]).toContain('MENSUAL');
    expect(frecuencias[3]).toContain('ANUAL');
  });

  it('contiene los 6 campos beneficiados de la industria', () => {
    expect(deltaData.camposBeneficiados).toHaveLength(6);
    const ids = deltaData.camposBeneficiados.map((c) => c.id);
    expect(ids).toContain('vigas-metal');
    expect(ids).toContain('drywall-tablaroca');
    expect(ids).toContain('muebles-madera');
    expect(ids).toContain('parques-industriales');
    expect(ids).toContain('techos-impermeables');
    expect(ids).toContain('senializacion-vial');
  });

  it('asigna imágenes reales extraídas de los PDFs a todas las entidades', () => {
    // Empresa
    expect(deltaData.empresa.imagenBodega).toBe('/img/empresa/bodega-salvador.jpg');
    expect(deltaData.empresa.imagenHero).toBe('/img/hero/hero-airless.png');

    // 13 Máquinas
    deltaData.maquinas.forEach((m) => {
      expect(m.imagen).toBeTruthy();
      expect(m.imagen).toMatch(/^\/img\/maquinas\/[a-z0-9\-]+\.png$/);
    });

    // Accesorios
    deltaData.accesorios.forEach((acc) => {
      expect(acc.imagen).toBeTruthy();
      expect(acc.imagen).toMatch(/^\/img\/accesorios\/accesorio-\d+\.png$/);
    });

    // Repuestos
    deltaData.repuestos.forEach((rep) => {
      expect(rep.imagen).toBeTruthy();
      expect(rep.imagen).toContain('/img/repuestos/');
    });

    // Campos beneficiados
    deltaData.camposBeneficiados.forEach((c) => {
      expect(c.imagen).toBeTruthy();
      expect(c.imagen).toContain('/img/industrias/');
    });
  });
});
