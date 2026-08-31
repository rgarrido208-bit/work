// =============================================================================
// Validador de cumplimiento — Pliegos RIC
// -----------------------------------------------------------------------------
// Cada simulador reporta una lista de "checks" con su estado y referencia RIC.
// Este módulo centraliza el tipo de resultado y helpers de formato para que
// todos los módulos (1..19) muestren el badge de cumplimiento de forma uniforme.
// =============================================================================

export const COMPLIANCE_STATUS = {
  OK: 'CUMPLE',
  WARN: 'ADVERTENCIA',
  VIOLATION: 'NO_CUMPLE',
};

/**
 * @param {Object} p
 * @param {string} p.ruleId      Id de la regla (ver constants/rules.js)
 * @param {string} p.ricRef      Referencia al pliego RIC correspondiente
 * @param {string} p.label       Descripción corta de la condición evaluada
 * @param {boolean} p.pass       Resultado de la evaluación
 * @param {string} [p.detail]    Detalle numérico/contextual
 */
export function buildCheck({ ruleId, ricRef, label, pass, detail = '' }) {
  return {
    ruleId,
    ricRef,
    label,
    detail,
    status: pass ? COMPLIANCE_STATUS.OK : COMPLIANCE_STATUS.VIOLATION,
  };
}

export function overallStatus(checks) {
  if (checks.some((c) => c.status === COMPLIANCE_STATUS.VIOLATION)) return COMPLIANCE_STATUS.VIOLATION;
  if (checks.some((c) => c.status === COMPLIANCE_STATUS.WARN)) return COMPLIANCE_STATUS.WARN;
  return COMPLIANCE_STATUS.OK;
}

export const STATUS_STYLES = {
  [COMPLIANCE_STATUS.OK]: 'bg-transap-ok/15 text-transap-ok border-transap-ok/40',
  [COMPLIANCE_STATUS.WARN]: 'bg-transap-warn/15 text-transap-warn border-transap-warn/40',
  [COMPLIANCE_STATUS.VIOLATION]: 'bg-transap-danger/15 text-transap-danger border-transap-danger/40',
};
