// Sub-componentes de presentación del Módulo 1. Se mantienen en un solo
// archivo por cohesión (todos son específicos de este simulador y triviales).

export function FanCard({ label, onAt, active }) {
  return (
    <div
      className={`panel p-3 flex flex-col items-center gap-2 transition-colors ${
        active ? 'border-transap-accent/60 shadow-glow' : ''
      }`}
    >
      <div
        className={`h-12 w-12 rounded-full border-2 flex items-center justify-center text-xl ${
          active ? 'border-transap-accent text-transap-accent animate-spin' : 'border-transap-border text-slate-600'
        }`}
        style={{ animationDuration: active ? '0.8s' : undefined }}
        aria-hidden="true"
      >
        ✦
      </div>
      <p className="text-sm font-semibold text-slate-200">{label}</p>
      <p className="text-xs text-slate-500">Umbral {onAt}°C</p>
      <span
        className={`badge ${
          active ? 'bg-transap-ok/15 text-transap-ok border-transap-ok/40' : 'bg-slate-500/10 text-slate-400 border-slate-500/30'
        }`}
      >
        {active ? 'ON' : 'OFF'}
      </span>
    </div>
  );
}

export function ThermalGauge({ tempC }) {
  const pct = Math.max(0, Math.min(100, (tempC / 130) * 100));
  let colorClass = 'bg-transap-ok';
  if (tempC >= 103) colorClass = 'bg-transap-danger';
  else if (tempC >= 87) colorClass = 'bg-transap-warn';
  else if (tempC >= 78) colorClass = 'bg-transap-accent';

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <span className="text-xs uppercase tracking-wide text-slate-500">Temperatura motor</span>
        <span className="gauge-value text-slate-100">{tempC.toFixed(1)}°C</span>
      </div>
      <div className="h-3 w-full rounded-full bg-transap-panel2 border border-transap-border overflow-hidden">
        <div
          className={`h-full ${colorClass} transition-all duration-200`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-slate-600 mt-1 font-mono">
        <span>0</span>
        <span>78</span>
        <span>83</span>
        <span>87</span>
        <span>102</span>
        <span>103</span>
        <span>130</span>
      </div>
    </div>
  );
}

export function EventLog({ events }) {
  const levelClass = {
    ok: 'text-transap-ok',
    info: 'text-slate-400',
    warn: 'text-transap-warn',
    danger: 'text-transap-danger',
  };
  return (
    <div className="panel">
      <div className="panel-header">Bitácora de eventos</div>
      <div className="max-h-64 overflow-y-auto p-3 space-y-1.5 font-mono text-xs">
        {events.length === 0 && <p className="text-slate-600">Sin eventos aún — ajuste la temperatura para iniciar.</p>}
        {events.map((e) => (
          <p key={e.id} className={levelClass[e.level] ?? 'text-slate-400'}>
            <span className="text-slate-600">[{e.t}]</span> {e.message}
          </p>
        ))}
      </div>
    </div>
  );
}
