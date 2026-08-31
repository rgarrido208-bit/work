import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar.jsx';
import Header from './components/layout/Header.jsx';
import Home from './pages/Home.jsx';
import ModulePlaceholder from './pages/ModulePlaceholder.jsx';
import Module1Enfriamiento from './modules/module01-enfriamiento/Module1Enfriamiento.jsx';
import { MODULES, getModuleBySlug } from './constants/modules.js';

// Mapa de slug -> componente para los módulos ya implementados.
const IMPLEMENTED_COMPONENTS = {
  enfriamiento: Module1Enfriamiento,
};

function ModuleRoute({ slug }) {
  const module = getModuleBySlug(slug);
  if (!module) return <ModulePlaceholder module={{ id: '?', title: 'Módulo no encontrado', subtitle: '' }} />;
  const Impl = IMPLEMENTED_COMPONENTS[slug];
  return Impl ? <Impl /> : <ModulePlaceholder module={module} />;
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-transap-bg">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Header onMenuClick={() => setSidebarOpen((v) => !v)} />
        <main className="flex-1 p-4 lg:p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            {MODULES.map((m) => (
              <Route key={m.id} path={`/modulo/${m.slug}`} element={<ModuleRoute slug={m.slug} />} />
            ))}
          </Routes>
        </main>
      </div>
    </div>
  );
}
