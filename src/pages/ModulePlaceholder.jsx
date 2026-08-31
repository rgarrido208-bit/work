export default function ModulePlaceholder({ module }) {
  return (
    <div className="panel p-8 max-w-xl mx-auto mt-10 text-center">
      <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">
        Módulo {String(module.id).padStart(2, '0')}
      </p>
      <h2 className="text-xl font-bold text-slate-100 mb-1">{module.title}</h2>
      <p className="text-slate-400 mb-4">{module.subtitle}</p>
      <span className="badge bg-transap-warn/15 text-transap-warn border-transap-warn/40">
        En construcción — se generará en un módulo posterior
      </span>
    </div>
  );
}
