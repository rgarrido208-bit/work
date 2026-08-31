// Registro maestro de los 19 simuladores. Cada módulo se implementa de forma
// independiente en src/modules/moduleXX/ y se referencia aquí por metadata.
// Los módulos aún no generados quedan marcados como `implemented: false` y la
// UI los muestra como "Próximamente" sin romper la navegación.

export const MODULES = [
  { id: 1, slug: 'enfriamiento', title: 'Sistema de Enfriamiento', subtitle: 'Fans · Muesca forzada · Ralentí térmico', implemented: true },
  { id: 2, slug: 'freno-dinamico', title: 'Freno Dinámico', subtitle: 'Malla · Campo · Corte de excitación', implemented: false },
  { id: 3, slug: 'ground-relay', title: 'Ground Relay', subtitle: 'Reseteos GR · Limitación de V_Max', implemented: false },
  { id: 4, slug: 'auto-ralenti', title: 'Auto-Ralentí', subtitle: 'Apagado automático por inactividad', implemented: false },
  { id: 5, slug: 'adherencia', title: 'Control de Adherencia', subtitle: 'Curva de tracción y slip óptimo', implemented: false },
  { id: 6, slug: 'excitacion-generador', title: 'Excitación del Generador', subtitle: 'Campo principal y regulación', implemented: false },
  { id: 7, slug: 'gestion-muescas', title: 'Gestión de Muescas (Notches)', subtitle: 'Escalonamiento de potencia', implemented: false },
  { id: 8, slug: 'hmi-nforce', title: 'Panel HMI NFORCE', subtitle: 'Indicadores y alarmas de cabina', implemented: false },
  { id: 9, slug: 'diagnostico-qes1000', title: 'Diagnóstico QES 1000', subtitle: 'Fallas activas e históricas', implemented: false },
  { id: 10, slug: 'baterias', title: 'Monitor de Baterías', subtitle: 'Carga, descarga y salud', implemented: false },
  { id: 11, slug: 'gobernador', title: 'Control de Velocidad / Gobernador', subtitle: 'RPM motor diésel', implemented: false },
  { id: 12, slug: 'combustible', title: 'Sistema de Combustible', subtitle: 'Nivel, consumo y autonomía', implemented: false },
  { id: 13, slug: 'motor-diesel', title: 'Motor Diésel — Parámetros', subtitle: 'Presión de aceite, temperatura, RPM', implemented: false },
  { id: 14, slug: 'neumatico', title: 'Compresor y Sistema Neumático', subtitle: 'Presión de freno principal', implemented: false },
  { id: 15, slug: 'senalizacion', title: 'Luces y Señalización', subtitle: 'Faros, campana y luces de cabina', implemented: false },
  { id: 16, slug: 'event-logger', title: 'Registro de Eventos', subtitle: 'Bitácora cronológica de fallas', implemented: false },
  { id: 17, slug: 'arranque-parada', title: 'Arranque / Parada', subtitle: 'Secuencia segura de encendido', implemented: false },
  { id: 18, slug: 'mantenimiento-predictivo', title: 'Mantenimiento Predictivo', subtitle: 'Horómetros y alertas de servicio', implemented: false },
  { id: 19, slug: 'configuracion', title: 'Configuración del Sistema', subtitle: 'Parámetros y calibración NFORCE/QES', implemented: false },
];

export const getModuleBySlug = (slug) => MODULES.find((m) => m.slug === slug);
