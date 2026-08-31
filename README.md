# Transap S.A. — Simuladores NFORCE / QES 1000

PWA offline-first (Dark Mode) con 19 simuladores interactivos basados en los
datos técnicos de los sistemas de control de tracción **NFORCE** y **QES 1000**.

## Stack

- React 18 + Vite
- Tailwind CSS (dark mode por defecto)
- `vite-plugin-pwa` (Workbox) — app-shell y assets cacheados para uso 100% offline
- React Router (HashRouter, compatible con la app instalada sin backend)

## Estructura

```
src/
  constants/
    rules.js       # Fuente única de verdad de las 5 reglas duras de control
    modules.js      # Registro maestro de los 19 módulos/simuladores
  lib/
    ricCompliance.js # Helpers de validación/formato de cumplimiento Pliegos RIC
  modules/
    module01-enfriamiento/   # Módulo 1 (implementado)
    module02-.. module19-..  # Se agregan incrementalmente
  components/layout/  # Sidebar, Header
  pages/               # Home, ModulePlaceholder
```

Cada módulo nuevo se agrega como una carpeta `moduleNN-<slug>/` con su propio
hook de simulación + componente de UI, se registra en `constants/modules.js`
y se referencia en el mapa `IMPLEMENTED_COMPONENTS` de `src/App.jsx`.

## Reglas duras implementadas (`src/constants/rules.js`)

1. **Enfriamiento**: Fan 1 (78 °C), Fan 2 (83 °C), Fan 3 (87 °C). A 102 °C se
   fuerza muesca 6. A 103 °C sostenidos 60 s se fuerza ralentí. *(Módulo 1 —
   implementado)*
2. **Freno Dinámico**: tope de malla 700 A, tope de campo 800 A, corte de
   excitación > 80 V. *(constantes listas, simulador pendiente)*
3. **Ground Relay**: al 4º reseteo en 1 h (modo potencia) se limita V_Max del
   generador a 625 V. *(constantes listas, simulador pendiente)*
4. **Auto-Ralentí**: apagado a los 15 min si T_Ambiente > 4 °C, V_Batería >
   70 V y Corriente < 20 A. *(constantes listas, simulador pendiente)*
5. **Adherencia**: slip óptimo de 1 a 3 km/h sobre la velocidad de vía.
   *(constantes listas, simulador pendiente)*

Cada simulador reporta un panel de **cumplimiento normativo (Pliegos RIC)**
que evalúa en tiempo real las condiciones de la regla dura contra el estado
simulado, usando `src/lib/ricCompliance.js`.

## Desarrollo

```bash
npm install
npm run dev
npm run build   # genera dist/ + manifest + service worker
```

## Estado de módulos

| # | Módulo | Estado |
|---|--------|--------|
| 1 | Sistema de Enfriamiento | ✅ Implementado |
| 2–19 | Ver `src/constants/modules.js` | 🚧 Próximamente |
