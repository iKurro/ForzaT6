# ForzaT6

ForzaT6 es una app web personal para crear bases de reglaje y diagnosticar el comportamiento de coches en Forza Horizon 6.

## Descripción del MVP

La app empieza con el garaje vacío: ya no incluye coches de ejemplo ni perfiles predefinidos. La idea es que añadas manualmente los coches que quieres tunear desde la interfaz, con los datos que ves en el juego, y que esos coches queden guardados en `localStorage` del navegador.

Incluye:

- Pantalla principal **ForzaT6 - Tuning Lab**.
- Estado vacío claro cuando no hay coches: “No hay coches todavía. Añade tu primer coche para generar reglajes.”
- Botón visible **Añadir coche** y sección **Gestionar coches**.
- Formulario en español para crear, editar, borrar y duplicar coches creados por el usuario.
- Selector principal alimentado solo por los coches guardados en `localStorage`.
- Exportación de coches a JSON e importación desde JSON con validación para evitar que un archivo incorrecto rompa la app.
- Selector de clase objetivo: D, C, B, A, S1, S2 y X.
- Selector de uso: Carretera, Circuito, Sprint, Rally, Drift y Drag.
- Selector de problema: base, subviraje, sobreviraje, falta de tracción, poca velocidad punta y frenada inestable.
- Generador de reglaje calculado desde la ficha por secciones: neumáticos, marchas, alineamiento, barras estabilizadoras, muelles, amortiguación, aerodinámica, freno y diferencial.
- Consejos de corrección en español según uso, clase, tracción y problema.
- Advertencias de ajustes que pueden estar bloqueados y piezas que suelen desbloquearlos.
- Guardado de builds favoritas y notas personales con `localStorage`.
- Visualización segura de builds favoritas que apunten a un coche borrado, con opción de eliminarlas.
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

## Añadir un coche desde la app

1. Abre la app.
2. Pulsa **Añadir coche** en la pantalla principal.
3. Rellena el formulario de **Gestionar coches**.
4. Pulsa **Guardar coche**.
5. Vuelve al generador: el coche aparecerá en el selector principal.

La ficha pide estos bloques de datos:

- **Datos básicos:** nombre, clase base, PI base, tracción original y tracción del build.
- **Motor:** posición, aspiración, potencia en CV, par en Nm, peso en kg, reparto de peso delantero, cilindrada en litros.
- **Neumáticos y caja:** compuesto, ancho delantero, ancho trasero y número de marchas.
- **Piezas ajustables disponibles:** caja completa, suspensión, barras, diferencial, frenos, aero delantera y aero trasera.
- **Notas:** prioridad de mejora, notas específicas de tuneo y resumen visible del coche.

## Editar, borrar o duplicar coches

Entra en **Gestionar coches** para ver el garaje local.

- **Editar:** abre el formulario con los datos guardados del coche y permite guardar cambios.
- **Borrar:** elimina el coche de `localStorage`. Si una build favorita apuntaba a ese coche, la build no rompe la app: se mostrará como coche no encontrado y podrás eliminarla.
- **Duplicar coche:** crea una copia con “(copia)” en el nombre para que puedas modificar una variante sin perder la ficha original.

## Exportar e importar JSON

En **Gestionar coches** hay dos acciones:

- **Exportar coches a JSON:** descarga un archivo con todos los coches guardados.
- **Importar coches desde JSON:** carga un archivo `.json` y sustituye el garaje local por los coches del archivo.

La importación valida la estructura antes de guardar. Si el JSON está mal formado, no contiene una lista de coches o algún coche tiene datos fuera de rango, la app muestra un mensaje de error claro y conserva el estado anterior.

El formato aceptado puede ser:

```json
{
  "version": 1,
  "coches": []
}
```

También se acepta directamente un array de coches exportado previamente.

## Qué datos conviene sacar del juego

Para que el generador tenga una base útil, conviene copiar del juego estos datos después de montar el build que quieres tunear:

- Nombre exacto del coche.
- Clase y PI base del build.
- Tracción original y tracción final del build.
- Posición del motor y tipo de aspiración.
- Potencia, par, peso y reparto de peso delantero.
- Cilindrada aproximada si aparece en la ficha.
- Compuesto de neumáticos y anchos delantero/trasero.
- Número de marchas de la caja instalada.
- Qué piezas de reglaje están disponibles en tu build: caja completa, suspensión, barras, diferencial, frenos y aero.
- Sensaciones o problemas detectados: subviraje, sobreviraje, falta de tracción, frenada inestable o poca velocidad punta.

La guía completa y una plantilla copiables están en `docs/ficha-coche.md`.

## Notas de alcance

Las piezas se tratan como requisitos o recomendaciones generales para desbloquear ajustes, por ejemplo frenos de competición, caja ajustable completa, diferencial de carreras, suspensión o aero ajustable. La app no decide una combinación exacta de piezas para alcanzar un PI concreto.
