import { useCallback, useEffect, useRef, useState } from 'react';
import { COOLING_RULES } from '../../constants/rules.js';

const TICK_MS = 250;

/**
 * Motor de simulación del Módulo 1 — Sistema de Enfriamiento.
 *
 * Implementa, sin excepciones, la regla dura:
 *  - Fan 1 ON  a partir de 78 °C
 *  - Fan 2 ON  a partir de 83 °C
 *  - Fan 3 ON  a partir de 87 °C
 *  - A 102 °C  se fuerza la muesca (notch) 6 de inmediato
 *  - A 103 °C sostenidos durante 60 s se fuerza ralentí (notch 0)
 *
 * El "forzado" de muesca/ralentí tiene prioridad sobre la petición manual
 * del operador: el notch efectivo nunca puede superar el techo impuesto por
 * la protección térmica activa.
 */
export function useCoolingSimulation() {
  const [temp, setTemp] = useState(45);
  const [requestedNotch, setRequestedNotch] = useState(8);
  const [autoRun, setAutoRun] = useState(true);
  const [rateCperS, setRateCperS] = useState(2); // velocidad de calentamiento/enfriamiento manual (°C/s)
  const [overTempSince, setOverTempSince] = useState(null); // timestamp (ms simulados) desde que temp >= forceIdleC
  const [simClockMs, setSimClockMs] = useState(0);
  const [events, setEvents] = useState([]);
  const lastLoggedRef = useRef({ fan1: false, fan2: false, fan3: false, notch6: false, idle: false });

  const logEvent = useCallback((message, level = 'info') => {
    setEvents((prev) =>
      [{ id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, t: new Date().toLocaleTimeString(), message, level }, ...prev].slice(0, 60)
    );
  }, []);

  // --- Derivación de estado de ventiladores (histéresis simple: se apagan 2°C bajo el umbral) ---
  const fan1On = temp >= COOLING_RULES.fan1OnC;
  const fan2On = temp >= COOLING_RULES.fan2OnC;
  const fan3On = temp >= COOLING_RULES.fan3OnC;
  const notch6Forced = temp >= COOLING_RULES.forceNotch6C;
  const overCriticalNow = temp >= COOLING_RULES.forceIdleC;

  // Techo de muesca impuesto por protección térmica.
  let notchCeiling = 8;
  if (notch6Forced) notchCeiling = 6;
  const idleForced = overTempSince !== null && simClockMs - overTempSince >= COOLING_RULES.forceIdleHoldS * 1000;
  if (idleForced) notchCeiling = 0;

  const effectiveNotch = Math.min(requestedNotch, notchCeiling);

  const idleHoldElapsedS = overTempSince !== null ? Math.min((simClockMs - overTempSince) / 1000, COOLING_RULES.forceIdleHoldS) : 0;

  // --- Loop de simulación ---
  useEffect(() => {
    if (!autoRun) return undefined;
    const interval = setInterval(() => {
      setSimClockMs((prev) => prev + TICK_MS);
      setTemp((prev) => {
        const delta = (rateCperS * TICK_MS) / 1000;
        const next = prev + delta;
        return Math.max(0, Math.min(130, next));
      });
    }, TICK_MS);
    return () => clearInterval(interval);
  }, [autoRun, rateCperS]);

  // Ventana de 60 s a >=103°C
  useEffect(() => {
    if (overCriticalNow) {
      setOverTempSince((prev) => (prev === null ? simClockMs : prev));
    } else {
      setOverTempSince(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overCriticalNow]);

  // --- Logging de transiciones (evita spam: solo en flanco) ---
  useEffect(() => {
    const last = lastLoggedRef.current;
    if (fan1On !== last.fan1) logEvent(`Fan 1 ${fan1On ? 'ACTIVADO' : 'apagado'} (T=${temp.toFixed(1)}°C, umbral ${COOLING_RULES.fan1OnC}°C)`, fan1On ? 'ok' : 'info');
    if (fan2On !== last.fan2) logEvent(`Fan 2 ${fan2On ? 'ACTIVADO' : 'apagado'} (T=${temp.toFixed(1)}°C, umbral ${COOLING_RULES.fan2OnC}°C)`, fan2On ? 'ok' : 'info');
    if (fan3On !== last.fan3) logEvent(`Fan 3 ${fan3On ? 'ACTIVADO' : 'apagado'} (T=${temp.toFixed(1)}°C, umbral ${COOLING_RULES.fan3OnC}°C)`, fan3On ? 'ok' : 'info');
    if (notch6Forced !== last.notch6)
      logEvent(
        notch6Forced
          ? `PROTECCIÓN: Muesca forzada a 6 — T=${temp.toFixed(1)}°C ≥ ${COOLING_RULES.forceNotch6C}°C`
          : `Restricción de muesca 6 liberada — T=${temp.toFixed(1)}°C`,
        notch6Forced ? 'warn' : 'info'
      );
    lastLoggedRef.current = { ...last, fan1: fan1On, fan2: fan2On, fan3: fan3On, notch6: notch6Forced };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fan1On, fan2On, fan3On, notch6Forced]);

  useEffect(() => {
    const last = lastLoggedRef.current;
    if (idleForced !== last.idle) {
      logEvent(
        idleForced
          ? `PROTECCIÓN CRÍTICA: Ralentí forzado — T≥${COOLING_RULES.forceIdleC}°C sostenido ${COOLING_RULES.forceIdleHoldS}s`
          : 'Ralentí forzado liberado — temperatura normalizada',
        idleForced ? 'danger' : 'ok'
      );
      lastLoggedRef.current = { ...last, idle: idleForced };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idleForced]);

  const reset = useCallback(() => {
    setTemp(45);
    setRequestedNotch(8);
    setOverTempSince(null);
    setSimClockMs(0);
    setEvents([]);
    lastLoggedRef.current = { fan1: false, fan2: false, fan3: false, notch6: false, idle: false };
  }, []);

  return {
    temp,
    setTemp,
    requestedNotch,
    setRequestedNotch,
    autoRun,
    setAutoRun,
    rateCperS,
    setRateCperS,
    fan1On,
    fan2On,
    fan3On,
    notch6Forced,
    idleForced,
    idleHoldElapsedS,
    effectiveNotch,
    notchCeiling,
    events,
    reset,
  };
}
