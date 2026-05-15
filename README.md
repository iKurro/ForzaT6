# ForzaT6

ForzaT6 es una app web personal para crear bases de reglaje y diagnosticar el comportamiento de coches en Forza Horizon 6.

## Descripción del MVP

La primera versión se centra en reglajes, diagnóstico y consejos. No intenta calcular combinaciones exactas de piezas para subir de un PI a otro ni generar meta builds online.

Incluye:

- Pantalla principal **ForzaT6 - Tuning Lab**.
- Selector de coche con seis coches iniciales.
- Ficha técnica por coche con peso, potencia, par, reparto, neumáticos, tracción del build y piezas ajustables.
- Selector de clase objetivo: D, C, B, A, S1, S2 y X.
- Selector de uso: Carretera, Circuito, Sprint, Rally, Drift y Drag.
- Selector de problema: base, subviraje, sobreviraje, falta de tracción, poca velocidad punta y frenada inestable.
- Generador de reglaje calculado desde la ficha por secciones: neumáticos, marchas, alineamiento, barras estabilizadoras, muelles, amortiguación, aerodinámica, freno y diferencial.
- Consejos de corrección en español según uso, clase, tracción y problema.
- Advertencias de ajustes que pueden estar bloqueados y piezas que suelen desbloquearlos.
- Guardado de builds favoritas y notas personales con `localStorage`.
- Diseño oscuro estilo racing moderno, responsive básico y sin Tailwind.

## Requisitos

- Node.js 20 o superior recomendado.
- npm.

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Después abre la URL local que indique el servidor, normalmente `http://localhost:5173`.

## Build de producción

```bash
npm run build
```

El resultado se genera en `dist/`.

## Vista previa del build

```bash
npm run preview
```

## Despliegue en GitHub Pages

El repositorio incluye un workflow de GitHub Actions que se ejecuta automáticamente al publicar cambios en `main`. El workflow instala dependencias, ejecuta `npm run build`, sube el contenido de `dist/` como artifact de Pages y lo despliega en GitHub Pages.

La salida de producción usa rutas relativas para los assets (`./assets/...`), por lo que funciona correctamente bajo la ruta de proyecto de GitHub Pages, por ejemplo `https://<usuario>.github.io/ForzaT6/`.

## Añadir coches nuevos

Para añadir coches, edita el array `coches` en `src/main.ts` y crea una entrada con su `ficha`: clase/PI base, posición de motor, aspiración, potencia, par, peso, reparto de peso, neumáticos, anchuras, tracción original, tracción del build, marchas y piezas ajustables instaladas.

La guía completa y una plantilla copiables están en `docs/ficha-coche.md`.

## Notas de alcance

Las piezas se tratan como requisitos o recomendaciones generales para desbloquear ajustes, por ejemplo frenos de competición, caja ajustable completa, diferencial de carreras, suspensión o aero ajustable. La app no decide una combinación exacta de piezas para alcanzar un PI concreto.
