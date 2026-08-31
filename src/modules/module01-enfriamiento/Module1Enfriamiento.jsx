import { COOLING_RULES } from '../../constants/rules.js';
import { buildCheck, overallStatus, STATUS_STYLES } from '../../lib/ricCompliance.js';
import { useCoolingSimulation } from './useCoolingSimulation.js';
import { FanCard, ThermalGauge, EventLog } from './components.jsx';

export default function Module1Enfriamiento() {
  const sim = useCoolingSimulation();

  // --- Checks de cumplimiento normativo (Pliegos RIC) para este módulo ---
  const checks = [
    buildCheck({
      ruleId: COOLING_RULES.id,
      ricRef: COOLING_RULES.ricRef,
      label: 'Fan 1 se activa exactamente a 78°C',
      pass: sim.fan1On === sim.temp >= COOLING_RULES.fan1OnC,
      detail: `Estado actual: ${sim.fan1On ? 'ON' : 'OFF'} @ ${sim.temp.toFixed(1)}°C`,
    }),
    buildCheck({
      ruleId: COOLING_RULES.id,
      ricRef: COOLING_RULES.ricRef,
      label: 'Fan 2 se activa exactamente a 83°C',
      pass: sim.fan2On === sim.temp >= COOLING_RULES.fan2OnC,
      detail: `Estado actual: ${sim.fan2On ? 'ON' : 'OFF'} @ ${sim.temp.toFixed(1)}°C`,
    }),
    buildCheck({
      ruleId: COOLING_RULES.id,
      ricRef: COOLING_RULES.ricRef,
      label: 'Fan 3 se activa exactamente a 87°C',
      pass: sim.fan3On === sim.temp >= COOLING_RULES.fan3OnC,
      detail: `Estado actual: ${sim.fan3On ? 'ON' : 'OFF'} @ ${sim.temp.toFixed(1)}°C`,
    }),
    buildCheck({
      ruleId: COOLING_RULES.id,
      ricRef: COOLING_RULES.ricRef,
      label: 'Muesca limitada a 6 a partir de 102°C',
      pass: sim.temp < COOLING_RULES.forceNotch6C || sim.effectiveNotch <= 6,
      detail: `Muesca efectiva: ${sim.effectiveNotch} (solicitada: ${sim.requestedNotch})`,
    }),
    buildCheck({
      ruleId: COOLING_RULES.id,
      ricRef: COOLING_RULES.ricRef,
      label: `Ralentí forzado tras ${COOLING_RULES.forceIdleHoldS}s ≥ ${COOLING_RULES.forceIdleC}°C`,
      pass: sim.idleHoldElapsedS < COOLING_RULES.forceIdleHoldS || sim.effectiveNotch === 0,
      detail: `Tiempo en sobre-temperatura: ${sim.idleHoldElapsedS.toFixed(1)}s / ${COOLING_RULES.forceIdleHoldS}s`,
    }),
  ];
  const status = overallStatus(checks);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Módulo 01</p>
          <h2 className="text-2xl font-bold text-slate-100">Sistema de Enfriamiento</h2>
          <p className="text-slate-400 text-sm">
            Control de ventiladores y protección térmica — NFORCE / QES 1000
          </p>
        </div>
        <span className={`badge ${STATUS_STYLES[status]}`}>{status.replace('_', ' ')}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Columna principal: controles + gauge */}
        <div className="lg:col-span-2 space-y-6">
          <div className="panel p-5 space-y-5">
            <ThermalGauge tempC={sim.temp} />

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Temperatura manual</span>
                  <span className="font-mono">{sim.temp.toFixed(1)}°C</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={130}
                  step={0.5}
                  value={sim.temp}
                  onChange={(e) => {
                    sim.setAutoRun(false);
                    sim.setTemp(Number(e.target.value));
                  }}
                  className="w-full accent-cyan-400"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Muesca solicitada por operador</span>
                  <span className="font-mono">{sim.requestedNotch}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={8}
                  step={1}
                  value={sim.requestedNotch}
                  onChange={(e) => sim.setRequestedNotch(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-transap-border">
              <button
                onClick={() => sim.setAutoRun((v) => !v)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${
                  sim.autoRun
                    ? 'bg-transap-accent/15 text-transap-accent border-transap-accent/40'
                    : 'bg-transap-panel2 text-slate-300 border-transap-border'
                }`}
              >
                {sim.autoRun ? '⏸ Pausar simulación automática' : '▶ Reanudar simulación automática'}
              </button>
              <label className="text-xs text-slate-400 flex items-center gap-2">
                Velocidad ({sim.rateCperS >= 0 ? '+' : ''}
                {sim.rateCperS.toFixed(1)}°C/s)
                <input
                  type="range"
                  min={-5}
                  max={5}
                  step={0.5}
                  value={sim.rateCperS}
                  onChange={(e) => sim.setRateCperS(Number(e.target.value))}
                  className="w-32 accent-cyan-400"
                />
              </label>
              <button
                onClick={sim.reset}
                className="ml-auto px-3 py-1.5 rounded-lg text-sm font-semibold border border-transap-border text-slate-300 hover:bg-transap-panel2"
              >
                ↺ Reiniciar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FanCard label="Fan 1" onAt={COOLING_RULES.fan1OnC} active={sim.fan1On} />
            <FanCard label="Fan 2" onAt={COOLING_RULES.fan2OnC} active={sim.fan2On} />
            <FanCard label="Fan 3" onAt={COOLING_RULES.fan3OnC} active={sim.fan3On} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className={`panel p-4 ${sim.notch6Forced ? 'border-transap-warn/60' : ''}`}>
              <p className="text-xs uppercase text-slate-500 mb-1">Muesca efectiva</p>
              <p className="gauge-value text-slate-100">
                {sim.effectiveNotch}
                <span className="text-base text-slate-500"> / {sim.requestedNotch} solicitada</span>
              </p>
              {sim.notch6Forced && (
                <p className="text-xs text-transap-warn mt-1">⚠ Forzada a 6 por protección térmica (≥102°C)</p>
              )}
            </div>
            <div className={`panel p-4 ${sim.idleForced ? 'border-transap-danger/60' : ''}`}>
              <p className="text-xs uppercase text-slate-500 mb-1">Ralentí forzado</p>
              <p className="gauge-value text-slate-100">{sim.idleForced ? 'ACTIVO' : 'Inactivo'}</p>
              <div className="h-1.5 w-full rounded-full bg-transap-panel2 border border-transap-border overflow-hidden mt-2">
                <div
                  className="h-full bg-transap-danger transition-all duration-200"
                  style={{ width: `${(sim.idleHoldElapsedS / COOLING_RULES.forceIdleHoldS) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {sim.idleHoldElapsedS.toFixed(1)}s / {COOLING_RULES.forceIdleHoldS}s sobre {COOLING_RULES.forceIdleC}°C
              </p>
            </div>
          </div>

          <EventLog events={sim.events} />
        </div>

        {/* Columna lateral: cumplimiento RIC */}
        <div className="space-y-4">
          <div className="panel">
            <div className="panel-header">Cumplimiento Pliegos RIC</div>
            <div className="p-4 space-y-3">
              {checks.map((c, i) => (
                <div key={i} className="text-sm border-b border-transap-border last:border-0 pb-3 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-slate-200">{c.label}</span>
                    <span className={`badge shrink-0 ${STATUS_STYLES[c.status]}`}>{c.status}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{c.detail}</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">{c.ricRef}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-4">
            <p className="text-xs uppercase text-slate-500 mb-2">Regla dura aplicada</p>
            <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
              <li>Fan 1 → {COOLING_RULES.fan1OnC}°C</li>
              <li>Fan 2 → {COOLING_RULES.fan2OnC}°C</li>
              <li>Fan 3 → {COOLING_RULES.fan3OnC}°C</li>
              <li>Muesca 6 forzada → {COOLING_RULES.forceNotch6C}°C</li>
              <li>
                Ralentí forzado → {COOLING_RULES.forceIdleC}°C durante {COOLING_RULES.forceIdleHoldS}s
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
