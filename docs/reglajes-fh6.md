# Reglajes detectados en Forza Horizon 6

Fuente: capturas del usuario tomadas en el menú de tuneo de Forza Horizon 6.
Coche usado como referencia de captura: ficha manual de usuario en clase B 600.

## Datos visibles del coche de ejemplo

- Coche: ficha manual de usuario
- Clase: B 600
- Distancia de frenado 97 km/h - 0: 35,0 m
- Distancia de frenado 161 km/h - 0: 84,1 m
- G laterales a 97 km/h: 1,05
- G laterales a 193 km/h: 1,12
- 0 - 97 km/h: 5,589 s
- 0 - 161 km/h: 15,456 s
- Velocidad máxima: 238,9 km/h
- Equilibrio mecánico: 0,49
- Equilibrio aerodinámico: 0,62
- Eficiencia aerodinámica: 0,856

## Pestañas de reglaje visibles

- Neumáticos
- Relación de marchas
- Alineamiento
- Barras estabilizadoras
- Muelles
- Amortiguación
- Aerodinámica
- Freno
- Diferencial

## Reglajes por sección

### Neumáticos

Ajustes:

- Presión delantera
  - Unidad: BAR
  - Escala: baja / alta
  - Valor de ejemplo: 2,1 bar
- Presión trasera
  - Unidad: BAR
  - Escala: baja / alta
  - Valor de ejemplo: 2,1 bar

Notas de diseño para la app:

- Presión más baja: más superficie de contacto, más temperatura, más agarre potencial, pero menos respuesta si se baja demasiado.
- Presión más alta: más respuesta y menor temperatura, pero puede causar pérdida de agarre si se sube demasiado.

### Relación de marchas

Ajustes:

- Transmisión final
  - Escala: velocidad / aceleración
  - Valor de ejemplo: 3,78
- 1ª marcha
- 2ª marcha
- 3ª marcha
- 4ª marcha
- 5ª marcha

Notas:

- En la captura solo la transmisión final está desbloqueada.
- Las marchas individuales aparecen bloqueadas en este coche/configuración.
- La app debe permitir marcar si el coche tiene caja ajustable completa.
- Transmisión final más alta: marchas más cortas, mejor aceleración, menos punta.
- Transmisión final más baja: marchas más largas, mejor punta, menos aceleración.

### Alineamiento

Ajustes:

- Inclinación de rueda delantera / camber delantero
  - Escala: negativo / positivo
  - Valor de ejemplo: -1,0°
- Inclinación de rueda trasera / camber trasero
  - Escala: negativo / positivo
  - Valor de ejemplo: -0,5°
- Convergencia delantera / toe delantero
  - Escala: dentro / fuera
  - Valor de ejemplo: 0,0°
- Convergencia trasera / toe trasero
  - Escala: dentro / fuera
  - Valor de ejemplo: -0,2°
- Ángulo rueda delantera / caster
  - Escala: baja / alta
  - Valor de ejemplo: 7,0°

Notas:

- Camber negativo ayuda al agarre en curva, pero si es excesivo reduce frenada y aceleración en línea recta.
- Toe afecta estabilidad y agilidad.
- Caster alto suele mejorar estabilidad y apoyo delantero.

### Barras estabilizadoras

Ajustes:

- Barra estabilizadora delantera
  - Escala: blandos / duros
  - Valor de ejemplo: 61,60
- Barra estabilizadora trasera
  - Escala: blandos / duros
  - Valor de ejemplo: 49,40

Notas:

- Para reducir subviraje: suavizar delantera, endurecer trasera o ambas.
- Para reducir sobreviraje: suavizar trasera, endurecer delantera o ambas.

### Muelles

Ajustes:

- Muelle delantero
  - Unidad: kgf/mm
  - Escala: blandos / duros
  - Valor de ejemplo: 120,6 kgf/mm
- Muelle trasero
  - Unidad: kgf/mm
  - Escala: blandos / duros
  - Valor de ejemplo: 123,9 kgf/mm
- Altura delantera
  - Unidad: cm
  - Escala: baja / alta
  - Valor de ejemplo: 15,4 cm
- Altura trasera
  - Unidad: cm
  - Escala: baja / alta
  - Valor de ejemplo: 13,9 cm

Notas:

- Muelles delanteros más blandos aumentan agarre delantero y reducen subviraje, pero si se ablandan demasiado puede tocar fondo.
- Muelles delanteros más duros pueden reducir sobreviraje, pero si hay mucha diferencia pueden generar subviraje.
- Para asfalto/circuito suele interesar altura baja sin tocar fondo.
- Para rally/cross-country la altura debe ser mayor.

### Amortiguación

Ajustes:

- Rigidez de expansión delantera
  - Escala: blandos / duros
  - Valor de ejemplo: 6,0
- Rigidez de expansión trasera
  - Escala: blandos / duros
  - Valor de ejemplo: 8,0
- Rigidez del rebote delantera
  - Escala: blandos / duros
  - Valor de ejemplo: 5,5
- Rigidez del rebote trasera
  - Escala: blandos / duros
  - Valor de ejemplo: 5,5

Notas:

- La app debe usar nombres visibles en español, pero internamente puede mapearlos a rebound/bump.
- Aumentar expansión delantera puede aumentar subviraje de transición.
- Reducir expansión delantera puede aumentar sobreviraje de transición.

### Aerodinámica

Ajustes:

- Carga aerodinámica delantera
  - Unidad: kgf
  - Escala: velocidad / manejo
  - Valor de ejemplo: 54 kgf
- Carga aerodinámica trasera
  - Unidad: kgf
  - En la captura aparece bloqueada.

Notas:

- Más carga: más agarre y manejo, menos velocidad punta.
- Menos carga: más velocidad punta, menos agarre.
- La app debe permitir que aero delantero y trasero estén disponibles o bloqueados según piezas instaladas.

### Freno

Ajustes:

- Equilibrio de frenada
  - Escala: trasera / delantera
  - En la captura aparece bloqueado.
- Presión de frenado
  - Escala: baja / alta
  - En la captura aparece bloqueado.

Requisito de desbloqueo visible:

- Se desbloquea al instalar mejoras de sistema de frenos de competición.

Notas:

- Reparto hacia atrás: más sobreviraje al frenar.
- Reparto hacia delante: más estabilidad, pero puede aumentar subviraje al frenar.

### Diferencial

Ajustes visibles para diferencial trasero:

- Aceleración
  - Unidad: %
  - Valor de ejemplo: 20 %
- Deceleración
  - Unidad: %
  - Valor de ejemplo: 30 %

Notas:

- Más bloqueo en aceleración: más tracción, pero puede aumentar sobreviraje en RWD/AWD.
- Menos bloqueo en aceleración: más progresivo, menos agresivo.
- Más bloqueo en deceleración: más estabilidad al levantar/frenar, pero puede dificultar el giro.
- Menos bloqueo en deceleración: más entrada en curva, pero menos estabilidad.
- La app debe soportar diferencial delantero, trasero y central para coches AWD.

## Requisitos de diseño para la app

La app debe modelar cada reglaje con:

- id interno
- nombre visible en español
- sección
- unidad
- eje: delantero, trasero, ambos, central o general
- valor por defecto o valor recomendado
- valor mínimo y máximo si se conocen
- si está disponible o bloqueado
- pieza necesaria para desbloquearlo si aplica
- explicación corta
- efecto al subir el valor
- efecto al bajar el valor

## Reglas iniciales de corrección

### Subviraje

Opciones típicas:

- Bajar presión delantera ligeramente.
- Ablandar barra estabilizadora delantera.
- Endurecer barra estabilizadora trasera.
- Añadir algo más de carga aerodinámica delantera si está disponible.
- Ablandar muelles delanteros o endurecer traseros con cuidado.
- Reducir bloqueo de diferencial delantero si es AWD.

### Sobreviraje

Opciones típicas:

- Bajar presión trasera ligeramente.
- Ablandar barra estabilizadora trasera.
- Endurecer barra estabilizadora delantera.
- Añadir carga aerodinámica trasera si está disponible.
- Reducir bloqueo de diferencial trasero en aceleración.
- Suavizar muelles traseros.

### Falta de tracción al acelerar

Opciones típicas:

- Bajar presión trasera ligeramente.
- Reducir bloqueo de diferencial trasero en aceleración si el coche es RWD.
- Alargar un poco la transmisión final.
- Usar neumáticos mejores o más anchos.
- Evitar añadir potencia antes de controlar el agarre.

### Poca velocidad punta

Opciones típicas:

- Bajar carga aerodinámica si hay margen.
- Alargar transmisión final.
- Reducir anchura de neumático o aero si el objetivo es speed trap.
- Aumentar potencia solo si la clase objetivo lo permite.

## Pendiente de capturar

Para completar la app hacen falta capturas de:

- Menú de piezas/mejoras del coche.
- Conversión de motor y tracción.
- Neumáticos y llantas.
- Plataforma y manejo.
- Transmisión.
- Motor.
- Aero y apariencia.
- Freno desbloqueado con frenos de competición.
- Caja desbloqueada con marchas individuales ajustables.
- Diferencial AWD con delantero, trasero y central si existe.
