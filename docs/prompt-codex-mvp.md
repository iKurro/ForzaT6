# Prompt para Codex: crear MVP de ForzaT6

Crea la primera versión funcional de ForzaT6.

El repositorio ya contiene documentación de especificación en:

- docs/alcance-mvp.md
- docs/reglajes-fh6.md

Usa esos documentos como fuente principal para decidir el alcance de la app.

## Objetivo

ForzaT6 debe ser una app web personal para ayudar a ajustar reglajes de coches en Forza Horizon 6.

IMPORTANTE: No debe intentar calcular combinaciones exactas de piezas para subir de un PI a otro. El MVP se centra en reglajes, diagnóstico y consejos.

## Stack técnico

Usa:

- Vite
- React
- TypeScript
- CSS moderno sin dependencias complicadas

No uses Tailwind en esta primera versión.

## Requisitos funcionales

La app debe incluir:

1. Pantalla principal con título: ForzaT6 - Tuning Lab
2. Selector de coche
3. Selector de clase objetivo:
   - D
   - C
   - B
   - A
   - S1
   - S2
   - X
4. Selector de tipo de uso:
   - Carretera
   - Circuito
   - Sprint
   - Rally
   - Drift
   - Drag
5. Selector de problema a corregir:
   - Ninguno, solo base
   - Subviraje
   - Sobreviraje
   - Falta de tracción
   - Poca velocidad punta
   - Frenada inestable
6. Botón: Generar reglaje
7. Resultado con:
   - reglaje base recomendado
   - consejos de corrección
   - advertencias de ajustes bloqueados
   - piezas que suelen desbloquear ciertos reglajes
8. Guardar builds favoritas con localStorage
9. Añadir notas personales por build
10. Interfaz completamente en español

## Garaje de usuario

La app debe empezar sin coches de ejemplo. Los coches se añaden manualmente desde la interfaz y se guardan en localStorage.

## Datos de reglajes que debe soportar

Crear estructuras de datos para estas secciones:

- Neumáticos
- Relación de marchas
- Alineamiento
- Barras estabilizadoras
- Muelles
- Amortiguación
- Aerodinámica
- Freno
- Diferencial

Cada reglaje debe tener:

- id
- nombre visible
- sección
- unidad si aplica
- eje si aplica: delantero, trasero, central o general
- valor recomendado
- explicación corta
- efecto al subir
- efecto al bajar
- si puede aparecer bloqueado
- pieza que lo desbloquea si aplica

## Reglas iniciales

Usa como base las reglas descritas en docs/reglajes-fh6.md.

Ejemplos:

### Si subvira

- ablandar barra estabilizadora delantera
- endurecer barra estabilizadora trasera
- añadir carga aerodinámica delantera si está disponible
- ajustar camber delantero
- revisar diferencial si es AWD

### Si sobrevira

- ablandar barra estabilizadora trasera
- reducir bloqueo de diferencial trasero en aceleración
- añadir carga aerodinámica trasera si está disponible
- suavizar muelles traseros

### Si falta tracción

- bajar presión trasera ligeramente
- reducir bloqueo del diferencial trasero en aceleración
- alargar un poco la transmisión final
- recomendar mejores neumáticos si el problema persiste

### Si falta velocidad punta

- reducir carga aerodinámica si hay margen
- alargar transmisión final
- advertir que demasiada aero o marchas cortas limitan la punta

## Diseño

Diseño oscuro, estilo racing moderno:

- fondo oscuro
- tarjetas grandes
- buen contraste
- botones claros
- layout cómodo para PC
- responsive básico para móvil
- sin copiar logos ni marcas oficiales

## Instrucciones técnicas

Después de crear los archivos:

1. Instala dependencias si el entorno lo permite.
2. Ejecuta build.
3. Corrige errores de TypeScript o Vite.
4. Actualiza el README con instrucciones de:
   - instalación
   - desarrollo
   - build
   - descripción del MVP

## Resultado esperado

Deja el proyecto listo para revisar con una pull request o commit.
