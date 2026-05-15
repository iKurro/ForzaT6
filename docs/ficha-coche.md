# Ficha técnica por coche

La app ya no usa únicamente un reglaje genérico. Cada coche debe tener una `ficha` dentro del array `coches` de `src/main.ts`. Esa ficha contiene los datos mínimos para que el generador pueda adaptar presiones, barras, muelles, altura, aero, frenos, diferencial y consejos.

## Datos que hay que rellenar

Campos principales:

- `claseBase` y `piBase`: clase y PI del coche/build desde el que partes.
- `motor`: posición del motor (`Delantero`, `Central` o `Trasero`).
- `aspiracion`: tipo de entrega de potencia (`Atmosférico`, `Turbo`, `Biturbo`, `Sobrealimentado` o `Eléctrico`).
- `potenciaKw`, `potenciaCv` y `parNm`: potencia en kW leída en Forza Horizon 6, potencia en CV calculada por la app y par actual del build en N·m.
- `pesoKg`: peso actual.
- `repartoPesoDelantero`: porcentaje de peso delante. La app calcula el trasero automáticamente.
- `cilindradaL`: cilindrada en litros.
- `neumaticos`: compuesto instalado.
- `anchoDelanteroMm` y `anchoTraseroMm`: ancho de neumáticos.
- `traccionOriginal` y `traccionBuild`: tracción de serie y tracción final del build.
- `marchas`: número de marchas que debe mostrar el reglaje.
- `piezasAjustables`: qué piezas ajustables están instaladas o disponibles.
- `prioridadMejora`: resumen de qué debe cuidar más ese coche.
- `notasTuneo`: notas específicas que se muestran en la ficha.

## Plantilla para añadir un coche

Copia este bloque dentro de `const coches` en `src/main.ts` y cambia los datos:

```ts
coche('Marca Modelo Año', 'RWD', 'Nota corta visible en el resumen.', {
  claseBase: 'A',
  piBase: 700,
  motor: 'Delantero',
  aspiracion: 'Turbo',
  potenciaKw: 257,
  potenciaCv: 349,
  parNm: 450,
  pesoKg: 1400,
  repartoPesoDelantero: 52,
  cilindradaL: 2.0,
  neumaticos: 'Deportivos',
  anchoDelanteroMm: 245,
  anchoTraseroMm: 265,
  traccionOriginal: 'RWD',
  traccionBuild: 'RWD',
  marchas: 6,
  piezasAjustables: {
    cajaCompleta: true,
    suspension: true,
    barras: true,
    diferencial: true,
    frenos: true,
    aeroDelantera: true,
    aeroTrasera: true,
  },
  prioridadMejora: 'Controlar tracción y mantener estabilidad de frenada.',
  notasTuneo: [
    'Primera nota específica del coche.',
    'Segunda nota específica del coche.',
  ],
}),
```

## Cómo usa la app esos datos

- El peso, reparto y uso seleccionado influyen en muelles, altura, barras y frenada.
- La potencia en kW se convierte a CV para relación peso/potencia; esa potencia derivada, el par por tonelada y la tracción influyen en presiones, diferencial y transmisión final.
- El compuesto y ancho de neumático ayudan a decidir presiones más conservadoras o agresivas.
- La clase objetivo y el uso influyen en aero, altura y prioridad de estabilidad.
- `piezasAjustables` decide si la UI avisa de que un reglaje puede estar bloqueado.
