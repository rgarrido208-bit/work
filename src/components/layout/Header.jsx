import { useEffect, useState } from 'react';

export default function Header({ onMenuClick }) {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-3 px-4 py-3 bg-transap-panel/95 backdrop-blur border-b border-transap-border">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg border border-transap-border text-slate-300 hover:bg-transap-panel2"
          aria-label="Abrir menú"
        >
          ☰
        </button>
        <span className="text-sm text-slate-400">Plataforma de simulación técnica — uso en cabina/taller</span>
      </div>
      <div
        className={`badge ${
          online
            ? 'bg-transap-ok/15 text-transap-ok border-transap-ok/40'
            : 'bg-transap-warn/15 text-transap-warn border-transap-warn/40'
        }`}
        title="Estado de conexión — la app funciona 100% offline una vez instalada"
      >
        <span className={`h-1.5 w-1.5 rounded-full ${online ? 'bg-transap-ok' : 'bg-transap-warn'}`} />
        {online ? 'En línea' : 'Modo offline'}
      </div>
    </header>
  );
}
