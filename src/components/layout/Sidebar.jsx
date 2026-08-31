import { NavLink } from 'react-router-dom';
import { MODULES } from '../../constants/modules.js';

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed lg:static z-40 top-0 left-0 h-full w-72 shrink-0 bg-transap-panel border-r border-transap-border
        transform transition-transform duration-200 ease-out
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="px-4 py-4 border-b border-transap-border">
          <p className="text-xs uppercase tracking-widest text-transap-accent font-semibold">Transap S.A.</p>
          <h1 className="text-lg font-bold text-slate-100 leading-tight">Simuladores NFORCE / QES 1000</h1>
        </div>
        <nav className="overflow-y-auto h-[calc(100%-88px)] py-2">
          {MODULES.map((m) => (
            <NavLink
              key={m.id}
              to={`/modulo/${m.slug}`}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm border-l-2 transition-colors ${
                  isActive
                    ? 'border-transap-accent bg-transap-panel2 text-transap-accent'
                    : 'border-transparent text-slate-300 hover:bg-transap-panel2 hover:text-slate-100'
                } ${!m.implemented ? 'opacity-60' : ''}`
              }
            >
              <span className="font-mono text-xs w-6 shrink-0 text-slate-500">{String(m.id).padStart(2, '0')}</span>
              <span className="flex-1">
                <span className="block font-medium">{m.title}</span>
                <span className="block text-xs text-slate-500">{m.subtitle}</span>
              </span>
              {!m.implemented && (
                <span className="text-[10px] uppercase font-semibold text-slate-500 border border-transap-border rounded px-1.5 py-0.5">
                  Próx.
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
