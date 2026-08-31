// =============================================================================
// REGLAS DURAS — Sistemas de control NFORCE y QES 1000
// -----------------------------------------------------------------------------
// Fuente única de verdad para TODOS los módulos/simuladores. Ningún módulo debe
// re-declarar estos umbrales: deben importarse desde aquí para garantizar
// consistencia y trazabilidad frente a los Pliegos RIC (Reglamento de
// Instalaciones Eléctricas de Cabina/Vía aplicable al material rodante).
// =============================================================================

export const COOLING_RULES = {
  id: 'ENFRIAMIENTO',
  descripcion: 'Control de ventiladores de tracción y protección térmica del motor diésel/generador.',
  fan1OnC: 78, // °C — arranca Fan 1
  fan2OnC: 83, // °C — arranca Fan 2
  fan3OnC: 87, // °C — arranca Fan 3
  forceNotch6C: 102, // °C — fuerza muesca (notch) 6 de forma inmediata
  forceIdleC: 103, // °C — umbral de sobre-temperatura crítica
  forceIdleHoldS: 60, // s — tiempo sostenido sobre forceIdleC antes de forzar ralentí
  ricRef: 'RIC-4.2 (Protección térmica y control de enfriamiento forzado)',
};

export const DYNAMIC_BRAKE_RULES = {
  id: 'FRENO_DINAMICO',
  descripcion: 'Límites de corriente de malla/campo y protección de excitación en frenado dinámico.',
  meshCapA: 700, // A — tope de corriente de malla (grid)
  fieldCapA: 800, // A — tope de corriente de campo
  excitationCutoffV: 80, // V — por encima de este voltaje se corta la excitación
  ricRef: 'RIC-6.1 (Frenado dinámico — límites de corriente y sobretensión de excitación)',
};

export const GROUND_RELAY_RULES = {
  id: 'GROUND_RELAY',
  descripcion: 'Gestión de reseteos de relé de tierra (GR) en modo potencia dentro de una ventana horaria.',
  windowHours: 1, // h — ventana móvil de conteo
  resetLimitCount: 4, // reseteos — al 4to reseteo dentro de la ventana se activa la limitación
  limitedVMax: 625, // V — V_Max de generador limitado tras 4to reseteo
  ricRef: 'RIC-5.3 (Protección de falla a tierra — limitación de tensión de generador)',
};

export const AUTO_IDLE_RULES = {
  id: 'AUTO_RALENTI',
  descripcion: 'Auto-ralentí / apagado automático por inactividad prolongada en condiciones seguras.',
  delayMinutes: 15, // min — tiempo de inactividad antes de iniciar apagado
  minAmbientTempC: 4, // °C — T_Ambiente debe ser > a este valor
  minBatteryV: 70, // V — V_Batería debe ser > a este valor
  maxCurrentA: 20, // A — Corriente debe ser < a este valor
  ricRef: 'RIC-7.4 (Auto-ralentí — condiciones ambientales y eléctricas seguras)',
};

export const ADHERENCE_RULES = {
  id: 'ADHERENCIA',
  descripcion: 'Curva de tracción óptima según deslizamiento (slip) permitido sobre velocidad de vía.',
  minSlipKmh: 1, // km/h — slip mínimo de la curva óptima
  maxSlipKmh: 3, // km/h — slip máximo de la curva óptima
  ricRef: 'RIC-3.7 (Control de adherencia — deslizamiento admisible rueda/riel)',
};

// Registro plano para validadores/reportes RIC.
export const ALL_HARD_RULES = [
  COOLING_RULES,
  DYNAMIC_BRAKE_RULES,
  GROUND_RELAY_RULES,
  AUTO_IDLE_RULES,
  ADHERENCE_RULES,
];
