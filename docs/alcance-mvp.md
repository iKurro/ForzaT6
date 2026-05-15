# Alcance del MVP de ForzaT6

## Decisión principal

La primera versión de ForzaT6 no intentará calcular combinaciones exactas de piezas para subir un coche de un PI concreto a otro PI concreto, por ejemplo de 765 a 800.

Ese problema se deja fuera del MVP porque en Forza Horizon cada coche tiene muchas combinaciones posibles de piezas, conversiones, neumáticos, peso, potencia, aero y transmisión. Además, el valor de rendimiento/PI depende de cálculos internos del juego que no son completamente visibles desde fuera.

## Enfoque de la primera versión

ForzaT6 será primero una app de ayuda para reglajes y diagnóstico.

La app debe ayudar a responder preguntas como:

- El coche subvira, ¿qué puedo tocar?
- El coche sobrevira, ¿qué puedo tocar?
- No tracciona al acelerar, ¿qué cambios pruebo?
- Le falta velocidad punta, ¿qué puedo ajustar?
- Quiero una base estable para carretera, circuito, sprint, rally, drift o drag.
- Qué reglajes están disponibles y cuáles dependen de piezas instaladas.

## Qué sí debe incluir

- Selector de coche.
- Selector de clase objetivo.
- Selector de tipo de uso.
- Reglaje base recomendado.
- Consejos de corrección según problema.
- Indicación de reglajes bloqueados.
- Indicación de qué pieza suele desbloquear ciertos reglajes.
- Guardado de builds favoritas.
- Notas personales por coche.

## Qué no debe incluir todavía

- Optimizador exacto de piezas por PI.
- Cálculo automático de la mejor combinación de mejoras.
- Recomendación exacta de piezas para pasar de un PI a otro.
- Meta builds online exactas.

## Cómo tratar las piezas en el MVP

Las piezas solo deben usarse como requisitos o recomendaciones generales.

Ejemplos:

- Para ajustar frenos, la app puede indicar que hacen falta frenos de competición.
- Para ajustar marchas individuales, la app puede indicar que hace falta una caja ajustable completa.
- Para ajustar diferencial, la app puede recomendar diferencial de carreras.
- Para setups serios, la app puede recomendar instalar suspensión, barras estabilizadoras y diferencial ajustables.

Pero la app no debe intentar decidir una combinación exacta de piezas para alcanzar un PI concreto.

## Filosofía

Primero, la app debe ser útil para entender y corregir el comportamiento del coche.
Después, si se quiere, se podrá añadir una sección manual de piezas favoritas o builds guardadas por el usuario.
