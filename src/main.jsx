import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* HashRouter: garantiza navegación funcional offline/PWA instalada sin
        depender de configuración de servidor para rutas profundas. */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
