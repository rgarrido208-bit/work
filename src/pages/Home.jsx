import { Link } from 'react-router-dom';
import { MODULES } from '../constants/modules.js';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="panel p-6 mb-6">
        <h2 className="text-2xl font-bold text-slate-100 mb-2">
          Simuladores interactivos NFORCE / QES 1000
        </h2>
        <p className="text-slate-400">
          Suite de 19 simuladores offline-first para operación, capacitación y diagnóstico de los
          sistemas de control de tracción NFORCE y QES 1000 de Transap S.A. Cada simulador valida
          en tiempo real el cumplimiento de las reglas duras de control frente a los Pliegos RIC.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODULES.map((m) => (
          <Link
            key={m.id}
            to={`/modulo/${m.slug}`}
            className={`panel p-4 hover:border-transap-accent/60 transition-colors ${
              !m.implemented ? 'opacity-70' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-slate-500">{String(m.id).padStart(2, '0')}</span>
              {m.implemented ? (
                <span className="badge bg-transap-ok/15 text-transap-ok border-transap-ok/40">Activo</span>
              ) : (
                <span className="badge bg-slate-500/15 text-slate-400 border-slate-500/30">Próx.</span>
              )}
            </div>
            <h3 className="font-semibold text-slate-100">{m.title}</h3>
            <p className="text-sm text-slate-500">{m.subtitle}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
