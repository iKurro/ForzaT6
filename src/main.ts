type ClaseObjetivo = 'D' | 'C' | 'B' | 'A' | 'S1' | 'S2' | 'X';
type TipoUso = 'Carretera' | 'Circuito' | 'Sprint' | 'Rally' | 'Drift' | 'Drag';
type Problema = 'Ninguno, solo base' | 'Subviraje' | 'Sobreviraje' | 'Falta de tracción' | 'Poca velocidad punta' | 'Frenada inestable';
type Seccion = 'Neumáticos' | 'Relación de marchas' | 'Alineamiento' | 'Barras estabilizadoras' | 'Muelles' | 'Amortiguación' | 'Aerodinámica' | 'Freno' | 'Diferencial';
type Traccion = 'RWD' | 'AWD' | 'FWD';
type TipoMotor = 'Delantero' | 'Central' | 'Trasero';
type Aspiracion = 'Atmosférico' | 'Turbo' | 'Biturbo' | 'Sobrealimentado' | 'Eléctrico';
type CompuestoNeumatico = 'Stock' | 'Street' | 'Sport' | 'Semi-slick' | 'Slick' | 'Rally' | 'Drag';

interface PiezasAjustables {
  cajaCompleta: boolean;
  suspension: boolean;
  barras: boolean;
  diferencial: boolean;
  frenos: boolean;
  aeroDelantera: boolean;
  aeroTrasera: boolean;
}

interface FichaTecnica {
  claseBase: ClaseObjetivo;
  piBase: number;
  motor: TipoMotor;
  aspiracion: Aspiracion;
  potenciaCv: number;
  parNm: number;
  pesoKg: number;
  repartoPesoDelantero: number;
  cilindradaL: number;
  neumaticos: CompuestoNeumatico;
  anchoDelanteroMm: number;
  anchoTraseroMm: number;
  traccionOriginal: Traccion;
  traccionBuild: Traccion;
  marchas: number;
  piezasAjustables: PiezasAjustables;
  prioridadMejora: string;
  notasTuneo: string[];
}

interface Coche { nombre: string; traccion: Traccion; nota: string; ficha: FichaTecnica }
interface Reglaje { id: string; nombreVisible: string; seccion: Seccion; eje: string; valorRecomendado: string; explicacion: string; efectoAlSubir: string; efectoAlBajar: string; puedeAparecerBloqueado: boolean; piezaDesbloqueo?: string }
interface ReglajeCalculado extends Reglaje { valorCalculado: string; motivoCalculo: string }
interface BuildFavorita { id: string; coche: string; claseObjetivo: ClaseObjetivo; tipoUso: TipoUso; problema: Problema; notas: string; fecha: string }

const STORAGE_KEY = 'forzat6-builds-favoritas';
const piezasBase: PiezasAjustables = { cajaCompleta: true, suspension: true, barras: true, diferencial: true, frenos: true, aeroDelantera: true, aeroTrasera: true };
const coches: Coche[] = [
  coche("1989 Nissan Silvia K's", 'RWD', 'Base ligera y reactiva; vigila la tracción trasera al salir de curvas lentas.', {
    claseBase: 'B', piBase: 600, motor: 'Delantero', aspiracion: 'Turbo', potenciaCv: 205, parNm: 274, pesoKg: 1170, repartoPesoDelantero: 54, cilindradaL: 1.8, neumaticos: 'Sport', anchoDelanteroMm: 205, anchoTraseroMm: 225, traccionOriginal: 'RWD', traccionBuild: 'RWD', marchas: 5,
    piezasAjustables: { ...piezasBase, aeroTrasera: false }, prioridadMejora: 'Tracción trasera, diferencial progresivo y estabilidad en apoyos rápidos.',
    notasTuneo: ['Coche ligero: evita muelles excesivamente duros.', 'Turbo pequeño: marchas algo cerradas funcionan bien en clase B/A.'],
  }),
  coche('Toyota Supra RZ 1998', 'RWD', 'Potente en recta; agradece diferencial progresivo y marchas no demasiado cortas.', {
    claseBase: 'A', piBase: 720, motor: 'Delantero', aspiracion: 'Biturbo', potenciaCv: 326, parNm: 441, pesoKg: 1510, repartoPesoDelantero: 53, cilindradaL: 3.0, neumaticos: 'Sport', anchoDelanteroMm: 235, anchoTraseroMm: 255, traccionOriginal: 'RWD', traccionBuild: 'RWD', marchas: 6,
    piezasAjustables: { ...piezasBase }, prioridadMejora: 'Controlar par en salida antes de añadir más potencia.',
    notasTuneo: ['Mucho par: alarga un poco final si patina en 2ª/3ª.', 'Peso medio-alto: frenos y neumático trasero son prioridad.'],
  }),
  coche('Nissan Skyline GT-R V-Spec 1997', 'AWD', 'AWD estable; el diferencial central ayuda a rotar o estabilizar el coche.', {
    claseBase: 'A', piBase: 710, motor: 'Delantero', aspiracion: 'Biturbo', potenciaCv: 280, parNm: 368, pesoKg: 1540, repartoPesoDelantero: 57, cilindradaL: 2.6, neumaticos: 'Sport', anchoDelanteroMm: 245, anchoTraseroMm: 245, traccionOriginal: 'AWD', traccionBuild: 'AWD', marchas: 5,
    piezasAjustables: { ...piezasBase }, prioridadMejora: 'Reducir subviraje AWD y mantener salida limpia.',
    notasTuneo: ['Reparte más par atrás si no gira.', 'No cierres demasiado el diferencial delantero.'],
  }),
  coche('Mazda RX-7 1997', 'RWD', 'Muy ágil; evita endurecer demasiado la trasera si aparece sobreviraje.', {
    claseBase: 'B', piBase: 645, motor: 'Delantero', aspiracion: 'Turbo', potenciaCv: 276, parNm: 314, pesoKg: 1280, repartoPesoDelantero: 50, cilindradaL: 1.3, neumaticos: 'Sport', anchoDelanteroMm: 225, anchoTraseroMm: 235, traccionOriginal: 'RWD', traccionBuild: 'RWD', marchas: 5,
    piezasAjustables: { ...piezasBase }, prioridadMejora: 'Aprovechar equilibrio 50/50 sin hacer nerviosa la trasera.',
    notasTuneo: ['Buen reparto: usa cambios pequeños de barras.', 'Rotativo: mantiene velocidad con marchas medias.'],
  }),
  coche('BMW M3 E46 2005', 'RWD', 'Equilibrado para circuito; funciona bien con suspensión ajustable y aero moderada.', {
    claseBase: 'B', piBase: 650, motor: 'Delantero', aspiracion: 'Atmosférico', potenciaCv: 343, parNm: 365, pesoKg: 1570, repartoPesoDelantero: 51, cilindradaL: 3.2, neumaticos: 'Sport', anchoDelanteroMm: 225, anchoTraseroMm: 255, traccionOriginal: 'RWD', traccionBuild: 'RWD', marchas: 6,
    piezasAjustables: { ...piezasBase }, prioridadMejora: 'Base de circuito equilibrada: frenos, suspensión y neumático.',
    notasTuneo: ['Atmosférico: admite final algo más corto que turbos con mucho par.', 'Peso medio: no bajes altura si toca pianos agresivos.'],
  }),
  coche('Ford Mustang GT 2018', 'RWD', 'Mucho par; prioriza tracción, frenada estable y una transmisión final algo larga.', {
    claseBase: 'A', piBase: 700, motor: 'Delantero', aspiracion: 'Atmosférico', potenciaCv: 460, parNm: 570, pesoKg: 1680, repartoPesoDelantero: 54, cilindradaL: 5.0, neumaticos: 'Sport', anchoDelanteroMm: 255, anchoTraseroMm: 275, traccionOriginal: 'RWD', traccionBuild: 'RWD', marchas: 6,
    piezasAjustables: { ...piezasBase }, prioridadMejora: 'Domar el par: neumático trasero, diferencial y frenada estable.',
    notasTuneo: ['Pesado y con mucho par: evita una trasera demasiado rígida.', 'Si pierde punta, revisa aero antes de tocar potencia.'],
  }),
];
const clases: ClaseObjetivo[] = ['D', 'C', 'B', 'A', 'S1', 'S2', 'X'];
const usos: TipoUso[] = ['Carretera', 'Circuito', 'Sprint', 'Rally', 'Drift', 'Drag'];
const problemas: Problema[] = ['Ninguno, solo base', 'Subviraje', 'Sobreviraje', 'Falta de tracción', 'Poca velocidad punta', 'Frenada inestable'];
const secciones: Seccion[] = ['Neumáticos', 'Relación de marchas', 'Alineamiento', 'Barras estabilizadoras', 'Muelles', 'Amortiguación', 'Aerodinámica', 'Freno', 'Diferencial'];

const reglajes: Reglaje[] = [
  r('presion-delantera', 'Presión delantera', 'Neumáticos', 'delantero', '2,1 bar', 'Equilibra agarre, temperatura y respuesta del eje delantero.', 'Más respuesta y menor temperatura, pero menos agarre si se excede.', 'Más huella y agarre potencial, con respuesta más blanda.'),
  r('presion-trasera', 'Presión trasera', 'Neumáticos', 'trasero', '2,1 bar', 'Mantiene tracción sin hacer lenta la trasera.', 'Trasera más viva y fría, con riesgo de perder tracción.', 'Mejora tracción y estabilidad si no se calienta demasiado.'),
  r('transmision-final', 'Transmisión final', 'Relación de marchas', 'general', '3,78', 'Ajuste global entre aceleración y velocidad punta.', 'Marchas más cortas: más aceleración y menos punta.', 'Marchas más largas: más punta y menos respuesta.', 'Caja de cambios ajustable o de carreras'),
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => r(`marcha-${n}`, `${n}ª marcha`, 'Relación de marchas', 'general', ['3,20', '2,15', '1,55', '1,18', '0,94', '0,78', '0,66', '0,57', '0,50', '0,45'][n - 1], 'Afinado individual cuando hay caja completa.', 'Acorta esa marcha y mejora salida.', 'Alarga esa marcha y mejora velocidad antes del cambio.', 'Caja ajustable completa o caja de carreras')),
  r('camber-delantero', 'Camber delantero', 'Alineamiento', 'delantero', '-1,0°', 'Inclinación negativa moderada para apoyar el neumático exterior.', 'Menos negativo: mejor frenada recta, menos apoyo.', 'Más negativo: más agarre en curva, peor recta si te pasas.'),
  r('camber-trasero', 'Camber trasero', 'Alineamiento', 'trasero', '-0,5°', 'Camber suave para conservar tracción en salida.', 'Menos negativo: más tracción recta.', 'Más negativo: más apoyo lateral, menos tracción.'),
  r('toe-delantero', 'Convergencia delantera', 'Alineamiento', 'delantero', '0,0°', 'Neutral para no sacrificar velocidad ni estabilidad.', 'Más hacia dentro: más estabilidad.', 'Más hacia fuera: más agilidad y nerviosismo.'),
  r('toe-trasero', 'Convergencia trasera', 'Alineamiento', 'trasero', '-0,2°', 'Ligera ayuda a la rotación sin desestabilizar.', 'Más estable, menos rotación.', 'Más giro, con riesgo de sobreviraje.'),
  r('caster', 'Ángulo rueda delantera / caster', 'Alineamiento', 'delantero', '7,0°', 'Caster alto para estabilidad y apoyo delantero progresivo.', 'Más estabilidad y camber dinámico.', 'Dirección más ligera y menos apoyo.'),
  r('barra-delantera', 'Barra estabilizadora delantera', 'Barras estabilizadoras', 'delantero', '61,60', 'Controla balanceo y agarre delantero.', 'Más precisión, puede aumentar subviraje.', 'Más agarre delantero, menos respuesta inmediata.', 'Barras estabilizadoras ajustables o de carreras'),
  r('barra-trasera', 'Barra estabilizadora trasera', 'Barras estabilizadoras', 'trasero', '49,40', 'Ajusta rotación y apoyo trasero.', 'Más rotación y menos subviraje, riesgo de sobreviraje.', 'Más estabilidad trasera, posible subviraje.', 'Barras estabilizadoras ajustables o de carreras'),
  r('muelle-delantero', 'Muelle delantero', 'Muelles', 'delantero', '120,6 kgf/mm', 'Base firme para asfalto sin perder agarre delantero.', 'Más soporte, puede generar subviraje.', 'Más agarre delantero, riesgo de tocar fondo.', 'Suspensión ajustable o de carreras'),
  r('muelle-trasero', 'Muelle trasero', 'Muelles', 'trasero', '123,9 kgf/mm', 'Sostiene la trasera y mantiene agilidad.', 'Más rotación, menos tracción si se excede.', 'Más tracción y estabilidad.', 'Suspensión ajustable o de carreras'),
  r('altura-delantera', 'Altura delantera', 'Muelles', 'delantero', '15,4 cm', 'Altura baja con margen para no tocar fondo.', 'Más margen en baches y rally.', 'Mejor centro de gravedad, riesgo de tocar fondo.', 'Suspensión ajustable o de carreras'),
  r('altura-trasera', 'Altura trasera', 'Muelles', 'trasero', '13,9 cm', 'Base estable; en rally conviene subir ambos ejes.', 'Más recorrido en superficies rotas.', 'Más apoyo, riesgo de rebotes.', 'Suspensión ajustable o de carreras'),
  r('expansion-delantera', 'Rigidez de expansión delantera', 'Amortiguación', 'delantero', '6,0', 'Controla extensión del amortiguador delantero.', 'Más control, puede aumentar subviraje de transición.', 'Más transferencia y posible sobreviraje de transición.', 'Suspensión ajustable o de carreras'),
  r('expansion-trasera', 'Rigidez de expansión trasera', 'Amortiguación', 'trasero', '8,0', 'Estabiliza la trasera al cambiar de apoyo.', 'Más control trasero.', 'Más absorción, menos precisión.', 'Suspensión ajustable o de carreras'),
  r('rebote-delantero', 'Rigidez del rebote delantera', 'Amortiguación', 'delantero', '5,5', 'Controla compresión y respuesta inicial delantera.', 'Más respuesta, menos absorción.', 'Más agarre en baches, menos precisión.', 'Suspensión ajustable o de carreras'),
  r('rebote-trasero', 'Rigidez del rebote trasera', 'Amortiguación', 'trasero', '5,5', 'Ajuste de compresión trasera para salida y estabilidad.', 'Más rotación y precisión.', 'Más tracción y absorción.', 'Suspensión ajustable o de carreras'),
  r('aero-delantera', 'Carga aerodinámica delantera', 'Aerodinámica', 'delantero', '54 kgf', 'Carga frontal moderada para mejorar giro rápido.', 'Más agarre delantero y menos punta.', 'Más punta y menos apoyo delantero.', 'Aero delantero ajustable'),
  r('aero-trasera', 'Carga aerodinámica trasera', 'Aerodinámica', 'trasero', '70 kgf', 'Carga trasera para estabilizar curvas rápidas.', 'Más estabilidad y menos punta.', 'Más velocidad punta, menos estabilidad.', 'Aero trasero ajustable'),
  r('equilibrio-frenada', 'Equilibrio de frenada', 'Freno', 'general', '52% delante', 'Reparto estable para evitar bloqueos agresivos.', 'Más estabilidad, posible subviraje al frenar.', 'Más rotación, posible inestabilidad.', 'Frenos de competición'),
  r('presion-frenado', 'Presión de frenado', 'Freno', 'general', '100%', 'Presión neutral para ajustar según bloqueo y mando/pedal.', 'Más mordida y riesgo de bloqueo.', 'Más dosificable y más distancia.', 'Frenos de competición'),
  r('diferencial-delantero-acel', 'Diferencial delantero - aceleración', 'Diferencial', 'delantero', '15%', 'Soporte AWD/FWD bajo para que el coche gire.', 'Más tracción delantera, más subviraje.', 'Más giro y menos tirones.', 'Diferencial de carreras'),
  r('diferencial-trasero-acel', 'Diferencial trasero - aceleración', 'Diferencial', 'trasero', '20%', 'Bloqueo progresivo para salida de curva.', 'Más tracción si la acepta, más sobreviraje RWD/AWD.', 'Entrega más suave y menos sobreviraje.', 'Diferencial de carreras'),
  r('diferencial-trasero-decel', 'Diferencial trasero - deceleración', 'Diferencial', 'trasero', '30%', 'Estabilidad al levantar gas y entrar frenando.', 'Más estabilidad, pero cuesta girar.', 'Más entrada en curva, menos estabilidad.', 'Diferencial de carreras'),
  r('diferencial-central', 'Diferencial central', 'Diferencial', 'central', '65% hacia atrás', 'Solo AWD: reparte empuje entre ejes.', 'Más comportamiento trasero y rotación.', 'Más estabilidad delantera, riesgo de subviraje.', 'Diferencial central ajustable de carreras'),
];

const usoConsejos: Record<TipoUso, string[]> = {
  Carretera: ['Mantén una base equilibrada y fácil de conducir.', 'Usa altura media-baja para absorber baches.', 'Prioriza frenos y diferencial ajustables si hay mucha potencia.'],
  Circuito: ['Baja altura en asfalto si no toca fondo.', 'Aumenta aero solo en trazados con curvas rápidas.', 'Ajusta marchas para terminar rectas en zona alta útil.'],
  Sprint: ['Evita exceso de aero en rectas largas.', 'Deja transmisión algo más larga que en circuito.', 'Conserva estabilidad de frenada para curvas desconocidas.'],
  Rally: ['Sube altura y ablanda suspensión para tierra y saltos.', 'Baja presiones con moderación.', 'Usa diferencial progresivo para no romper tracción.'],
  Drift: ['Busca una trasera viva y controlable.', 'Aumenta respuesta delantera con camber/caster.', 'El objetivo es controlar el deslizamiento, no eliminarlo.'],
  Drag: ['Prioriza tracción recta, marchas largas y mínima aero.', 'Baja presión trasera en RWD si patina.', 'Evita toe agresivo porque penaliza velocidad.'],
};
const problemaConsejos: Record<Problema, string[]> = {
  'Ninguno, solo base': ['Empieza con valores base y cambia un parámetro cada vez.', 'Haz una tanda corta y localiza si el problema ocurre en entrada, centro o salida.', 'Guarda notas con pista, clase y sensación.'],
  Subviraje: ['Baja presión delantera ligeramente.', 'Ablanda barra delantera o endurece la trasera en pasos pequeños.', 'Añade carga delantera si está disponible y el problema es en alta.', 'Ajusta camber delantero hacia algo más negativo.', 'En AWD, reduce bloqueo delantero o reparte más hacia atrás.'],
  Sobreviraje: ['Baja presión trasera ligeramente.', 'Ablanda barra trasera o endurece la delantera con cuidado.', 'Reduce bloqueo de diferencial trasero en aceleración.', 'Añade carga trasera si está disponible.', 'Suaviza muelles traseros si la pérdida es brusca.'],
  'Falta de tracción': ['Baja presión trasera ligeramente.', 'Reduce bloqueo del diferencial trasero en aceleración.', 'Alarga un poco la transmisión final.', 'Recomienda mejores neumáticos si persiste.', 'Evita añadir potencia antes de controlar agarre.'],
  'Poca velocidad punta': ['Reduce carga aerodinámica si hay margen.', 'Alarga la transmisión final.', 'Evita marchas demasiado cortas.', 'Demasiada aero o neumático ancho puede limitar la punta.'],
  'Frenada inestable': ['Mueve equilibrio de frenada ligeramente hacia delante.', 'Baja presión de frenado si bloqueas ruedas.', 'Aumenta diferencial de deceleración trasero si se mueve al levantar.', 'Evita toe trasero agresivo y revisa altura.'],
};

let estado = { coche: coches[0].nombre, clase: 'B' as ClaseObjetivo, uso: 'Circuito' as TipoUso, problema: 'Ninguno, solo base' as Problema, notas: '', generado: false, favoritas: cargarFavoritas() };

function coche(nombre: string, traccion: Traccion, nota: string, ficha: FichaTecnica): Coche { return { nombre, traccion, nota, ficha }; }
function r(id: string, nombreVisible: string, seccion: Seccion, eje: string, valorRecomendado: string, explicacion: string, efectoAlSubir: string, efectoAlBajar: string, piezaDesbloqueo?: string): Reglaje {
  return { id, nombreVisible, seccion, eje, valorRecomendado, explicacion, efectoAlSubir, efectoAlBajar, puedeAparecerBloqueado: Boolean(piezaDesbloqueo), piezaDesbloqueo };
}
function esc(value: string) { return value.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c); }
function cargarFavoritas(): BuildFavorita[] { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as BuildFavorita[]; } catch { return []; } }
function persistir() { localStorage.setItem(STORAGE_KEY, JSON.stringify(estado.favoritas)); }
function cocheActual() { return coches.find((c) => c.nombre === estado.coche) ?? coches[0]; }
function formato(num: number, decimales = 1) { return num.toFixed(decimales).replace('.', ','); }
function clamp(num: number, min: number, max: number) { return Math.min(max, Math.max(min, num)); }
function relacionPesoPotencia(c: Coche) { return c.ficha.pesoKg / c.ficha.potenciaCv; }
function parPorTonelada(c: Coche) { return c.ficha.parNm / (c.ficha.pesoKg / 1000); }

function piezaDisponible(c: Coche, reglaje: Reglaje) {
  const p = c.ficha.piezasAjustables;
  if (reglaje.seccion === 'Relación de marchas' && reglaje.id !== 'transmision-final') return p.cajaCompleta;
  if (['Muelles', 'Amortiguación'].includes(reglaje.seccion)) return p.suspension;
  if (reglaje.seccion === 'Barras estabilizadoras') return p.barras;
  if (reglaje.seccion === 'Diferencial') return p.diferencial;
  if (reglaje.seccion === 'Freno') return p.frenos;
  if (reglaje.id === 'aero-delantera') return p.aeroDelantera;
  if (reglaje.id === 'aero-trasera') return p.aeroTrasera;
  return true;
}

function reglajesVisibles() {
  const c = cocheActual();
  return reglajes
    .filter((reglaje) => {
      if (reglaje.id === 'diferencial-central') return c.ficha.traccionBuild === 'AWD';
      if (reglaje.id === 'diferencial-delantero-acel') return c.ficha.traccionBuild === 'AWD' || c.ficha.traccionBuild === 'FWD';
      if (reglaje.id.includes('diferencial-trasero')) return c.ficha.traccionBuild === 'AWD' || c.ficha.traccionBuild === 'RWD';
      if (reglaje.id.startsWith('marcha-')) return Number(reglaje.id.replace('marcha-', '')) <= c.ficha.marchas;
      return true;
    })
    .map((reglaje) => ({ ...reglaje, puedeAparecerBloqueado: reglaje.puedeAparecerBloqueado && !piezaDisponible(c, reglaje), ...calcularValor(reglaje, c) }));
}

function calcularValor(reglaje: Reglaje, c: Coche): Pick<ReglajeCalculado, 'valorCalculado' | 'motivoCalculo'> {
  const f = c.ficha;
  const peso = f.pesoKg;
  const pesoDel = f.repartoPesoDelantero / 100;
  const pesoTras = 1 - pesoDel;
  const parT = parPorTonelada(c);
  const rpp = relacionPesoPotencia(c);
  const uso = estado.uso;
  const problema = estado.problema;
  const factorUso = uso === 'Rally' ? 0.84 : uso === 'Drift' ? 0.9 : uso === 'Drag' ? 0.95 : uso === 'Sprint' ? 0.98 : 1;
  const baseMuelle = clamp((peso / 10) * factorUso, 70, 190);
  const aeroAlta = estado.clase === 'S2' || estado.clase === 'X' || uso === 'Circuito';
  const slick = ['Semi-slick', 'Slick', 'Drag'].includes(f.neumaticos);

  switch (reglaje.id) {
    case 'presion-delantera': {
      const valor = clamp(2.1 + (f.repartoPesoDelantero - 52) * 0.01 + (uso === 'Drag' ? 0.08 : 0) - (uso === 'Rally' ? 0.18 : 0) - (slick ? 0.06 : 0), 1.75, 2.35);
      return { valorCalculado: `${formato(valor)} bar`, motivoCalculo: `Ajustado por ${f.repartoPesoDelantero}% de peso delantero, neumático ${f.neumaticos} y uso ${uso}.` };
    }
    case 'presion-trasera': {
      const traccion = f.traccionBuild === 'RWD' ? -0.08 : f.traccionBuild === 'FWD' ? 0.04 : -0.03;
      const valor = clamp(2.1 + traccion - (parT > 330 ? 0.06 : 0) - (uso === 'Rally' ? 0.18 : 0) + (uso === 'Drag' ? -0.12 : 0) - (slick ? 0.05 : 0), 1.65, 2.3);
      return { valorCalculado: `${formato(valor)} bar`, motivoCalculo: `Ajustado por tracción ${f.traccionBuild}, ${Math.round(parT)} Nm/t y uso ${uso}.` };
    }
    case 'transmision-final': {
      const valor = clamp(3.65 + (rpp > 4.5 ? 0.18 : -0.08) + (uso === 'Drag' || uso === 'Sprint' || problema === 'Poca velocidad punta' ? -0.22 : 0) + (uso === 'Circuito' ? 0.08 : 0), 3.05, 4.25);
      return { valorCalculado: formato(valor, 2), motivoCalculo: `Calculado con ${formato(rpp, 2)} kg/CV, ${f.marchas} marchas y objetivo ${uso}.` };
    }
    case 'camber-delantero': {
      const valor = clamp(-1.0 - (aeroAlta ? 0.25 : 0) - (uso === 'Drift' ? 0.4 : 0) + (uso === 'Drag' ? 0.35 : 0), -2.2, -0.4);
      return { valorCalculado: `${formato(valor)}°`, motivoCalculo: `Base según apoyo esperado para ${uso} y clase ${estado.clase}.` };
    }
    case 'camber-trasero': {
      const valor = clamp(-0.55 - (f.traccionBuild === 'RWD' && parT > 330 ? -0.15 : 0) - (uso === 'Drift' ? 0.25 : 0) + (uso === 'Drag' ? 0.35 : 0), -1.5, -0.1);
      return { valorCalculado: `${formato(valor)}°`, motivoCalculo: `Protege tracción trasera con ${Math.round(parT)} Nm/t y uso ${uso}.` };
    }
    case 'barra-delantera': {
      const valor = clamp(50 + f.repartoPesoDelantero * 0.18 + (problema === 'Subviraje' ? -4 : 0) + (problema === 'Sobreviraje' ? 3 : 0) + (uso === 'Rally' ? -8 : 0), 25, 65);
      return { valorCalculado: formato(valor, 2), motivoCalculo: `Ajustada por reparto ${f.repartoPesoDelantero}/${100 - f.repartoPesoDelantero} y diagnóstico ${problema}.` };
    }
    case 'barra-trasera': {
      const valor = clamp(45 + (50 - f.repartoPesoDelantero) * 0.25 + (problema === 'Subviraje' ? 4 : 0) + (problema === 'Sobreviraje' ? -5 : 0) + (uso === 'Rally' ? -8 : 0), 20, 65);
      return { valorCalculado: formato(valor, 2), motivoCalculo: `Ajustada para rotación según reparto, tracción ${f.traccionBuild} y diagnóstico ${problema}.` };
    }
    case 'muelle-delantero': {
      const valor = clamp(baseMuelle * pesoDel * 1.85, 75, 180);
      return { valorCalculado: `${formato(valor)} kgf/mm`, motivoCalculo: `Calculado desde ${peso} kg, ${f.repartoPesoDelantero}% delante y superficie ${uso}.` };
    }
    case 'muelle-trasero': {
      const valor = clamp(baseMuelle * pesoTras * 2.05 + (f.traccionBuild === 'RWD' && parT > 330 ? -6 : 0), 70, 185);
      return { valorCalculado: `${formato(valor)} kgf/mm`, motivoCalculo: `Calculado desde ${peso} kg, tracción ${f.traccionBuild} y par disponible.` };
    }
    case 'altura-delantera': {
      const valor = clamp(13.8 + (uso === 'Rally' ? 5.2 : 0) + (peso > 1600 ? 0.7 : 0) + (uso === 'Drag' ? 0.8 : 0), 11.5, 22);
      return { valorCalculado: `${formato(valor)} cm`, motivoCalculo: `Altura base por peso ${peso} kg y uso ${uso}.` };
    }
    case 'altura-trasera': {
      const valor = clamp(13.4 + (uso === 'Rally' ? 5.4 : 0) + (peso > 1600 ? 0.8 : 0) + (uso === 'Drag' ? 1.3 : 0), 11.5, 22.5);
      return { valorCalculado: `${formato(valor)} cm`, motivoCalculo: `Altura trasera adaptada a tracción ${f.traccionBuild} y superficie ${uso}.` };
    }
    case 'aero-delantera': {
      const valor = clamp(45 + (aeroAlta ? 18 : 0) + (problema === 'Subviraje' ? 8 : 0) - (problema === 'Poca velocidad punta' ? 10 : 0), 35, 85);
      return { valorCalculado: `${Math.round(valor)} kgf`, motivoCalculo: `Carga calculada por clase ${estado.clase}, uso ${uso} y diagnóstico ${problema}.` };
    }
    case 'aero-trasera': {
      const valor = clamp(58 + (aeroAlta ? 22 : 0) + (problema === 'Sobreviraje' ? 10 : 0) - (problema === 'Poca velocidad punta' ? 12 : 0), 40, 105);
      return { valorCalculado: `${Math.round(valor)} kgf`, motivoCalculo: `Carga trasera adaptada para estabilidad y punta.` };
    }
    case 'equilibrio-frenada': {
      const valor = clamp(f.repartoPesoDelantero + 1 + (problema === 'Frenada inestable' ? 2 : 0), 48, 58);
      return { valorCalculado: `${Math.round(valor)}% delante`, motivoCalculo: `Reparto de freno según ${f.repartoPesoDelantero}% de peso delantero.` };
    }
    case 'presion-frenado': {
      const valor = clamp(100 - (peso > 1600 ? 4 : 0) - (problema === 'Frenada inestable' ? 6 : 0) + (uso === 'Circuito' ? 2 : 0), 88, 105);
      return { valorCalculado: `${Math.round(valor)}%`, motivoCalculo: `Presión modulada por peso, uso y estabilidad de frenada.` };
    }
    case 'diferencial-delantero-acel': {
      const valor = f.traccionBuild === 'FWD' ? 28 : 14;
      return { valorCalculado: `${valor}%`, motivoCalculo: `Bloqueo delantero bajo para limitar subviraje en ${f.traccionBuild}.` };
    }
    case 'diferencial-trasero-acel': {
      const valor = clamp(18 + (parT > 330 ? -3 : 2) + (uso === 'Drift' ? 18 : 0) + (uso === 'Drag' ? 12 : 0), 10, 55);
      return { valorCalculado: `${Math.round(valor)}%`, motivoCalculo: `Bloqueo trasero según ${Math.round(parT)} Nm/t y uso ${uso}.` };
    }
    case 'diferencial-trasero-decel': {
      const valor = clamp(28 + (problema === 'Frenada inestable' ? 5 : 0) + (uso === 'Drift' ? -8 : 0), 12, 45);
      return { valorCalculado: `${Math.round(valor)}%`, motivoCalculo: `Deceleración ajustada por estabilidad al levantar/frenar.` };
    }
    case 'diferencial-central': {
      const valor = clamp(62 + (problema === 'Subviraje' ? 8 : 0) - (problema === 'Sobreviraje' ? 4 : 0), 50, 80);
      return { valorCalculado: `${Math.round(valor)}% hacia atrás`, motivoCalculo: `Reparto central para rotación AWD según diagnóstico ${problema}.` };
    }
    default:
      return { valorCalculado: reglaje.valorRecomendado, motivoCalculo: 'Valor base; afínalo tras una tanda y cambia solo un parámetro cada vez.' };
  }
}

function consejos() {
  const c = cocheActual();
  const f = c.ficha;
  const lista = [...usoConsejos[estado.uso], ...problemaConsejos[estado.problema]];
  if (estado.clase === 'S2' || estado.clase === 'X') lista.unshift('En S2/X, prioriza estabilidad, aero y frenos antes de añadir potencia.');
  lista.push(`Ficha ${c.nombre}: ${f.pesoKg} kg, ${f.potenciaCv} CV, ${Math.round(parPorTonelada(c))} Nm/t y reparto ${f.repartoPesoDelantero}/${100 - f.repartoPesoDelantero}.`);
  lista.push(f.traccionBuild === 'AWD' ? 'Como es AWD, usa diferencial delantero/central para corregir subviraje o salida.' : f.traccionBuild === 'FWD' ? 'Como es FWD, evita mucho bloqueo delantero y prioriza entrada limpia.' : 'Como es RWD, trata presión trasera y diferencial de aceleración con cambios pequeños.');
  if (relacionPesoPotencia(c) < 3.6) lista.push('Relación peso/potencia agresiva: no añadas potencia hasta que salida y frenada sean repetibles.');
  if (f.repartoPesoDelantero >= 56) lista.push('Mucho peso delante: ayuda con barra delantera algo más blanda, más caster y reparto AWD hacia atrás si aplica.');
  if (f.neumaticos === 'Stock' || f.neumaticos === 'Street') lista.push('Neumático limitado: los valores deben ser conservadores; la mejora de compuesto puede valer más que tocar potencia.');
  lista.push(`Prioridad de mejora: ${f.prioridadMejora}`);
  return lista;
}

function render() {
  const root = document.querySelector<HTMLDivElement>('#root');
  if (!root) return;
  const c = cocheActual();
  const visibles = reglajesVisibles();
  const piezas = [...new Set(visibles.filter((x) => x.puedeAparecerBloqueado).map((x) => x.piezaDesbloqueo).filter(Boolean))] as string[];
  root.innerHTML = `<main class="app-shell">
    <section class="hero card"><div><p class="eyebrow">Laboratorio personal de reglajes</p><h1>ForzaT6 - Tuning Lab</h1><p class="hero-copy">Genera una base de reglaje desde la ficha técnica de cada coche, diagnostica problemas de conducción y guarda tus builds favoritas sin intentar calcular combinaciones exactas de PI.</p></div><div class="hero-badge"><span>MVP</span><strong>FH6</strong></div></section>
    <section class="layout-grid"><form class="card control-panel"><div class="section-heading"><p class="eyebrow">Configuración</p><h2>Elige tu objetivo</h2></div>${select('coche', 'Selector de coche', coches.map((x) => x.nombre), estado.coche)}${select('clase', 'Clase objetivo', clases, estado.clase)}${select('uso', 'Tipo de uso', usos, estado.uso)}${select('problema', 'Problema a corregir', problemas, estado.problema)}<label><span>Notas personales por build</span><textarea id="notas" rows="5" placeholder="Ej.: probar en circuito urbano, revisar salida de curvas lentas...">${esc(estado.notas)}</textarea></label><div class="button-row"><button class="primary-button" type="button" id="generar">Generar reglaje</button><button class="secondary-button" type="button" id="guardar">Guardar build favorita</button></div></form>
    <aside class="card summary-card"><div class="section-heading"><p class="eyebrow">Perfil seleccionado</p><h2>${esc(c.nombre)}</h2></div><dl class="spec-list"><div><dt>Tracción build</dt><dd>${c.ficha.traccionBuild}</dd></div><div><dt>Clase base</dt><dd>${c.ficha.claseBase} ${c.ficha.piBase}</dd></div><div><dt>Peso</dt><dd>${c.ficha.pesoKg} kg</dd></div><div><dt>Potencia</dt><dd>${c.ficha.potenciaCv} CV</dd></div></dl><p class="car-note">${esc(c.nota)}</p><p class="scope-warning">Este MVP ya usa una ficha técnica editable por coche para calcular bases mejores; no calcula piezas exactas para alcanzar un PI.</p></aside></section>
    ${fichaTecnica(c)}${estado.generado ? resultados(visibles, piezas) : ''}${favoritas()}</main>`;
  enlazarEventos();
}
function select(id: string, label: string, opts: readonly string[], val: string) { return `<label><span>${label}</span><select id="${id}">${opts.map((o) => `<option value="${esc(o)}" ${o === val ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select></label>`; }
function fichaTecnica(c: Coche) {
  const f = c.ficha;
  const desbloqueos = Object.entries(f.piezasAjustables).filter(([, activo]) => activo).map(([pieza]) => pieza.replace(/([A-Z])/g, ' $1').toLowerCase());
  return `<section class="card ficha-card"><div class="section-heading horizontal"><div><p class="eyebrow">Ficha para tunear</p><h2>Datos que usa el generador</h2></div><span class="pill">${formato(relacionPesoPotencia(c), 2)} kg/CV · ${Math.round(parPorTonelada(c))} Nm/t</span></div><div class="ficha-grid">
    ${dato('Motor', `${f.motor} · ${f.aspiracion} ${formato(f.cilindradaL, 1)} L`)}${dato('Tracción', `Original ${f.traccionOriginal} · Build ${f.traccionBuild}`)}${dato('Reparto peso', `${f.repartoPesoDelantero}% delante / ${100 - f.repartoPesoDelantero}% detrás`)}${dato('Neumáticos', `${f.neumaticos} · ${f.anchoDelanteroMm}/${f.anchoTraseroMm} mm`)}${dato('Caja', `${f.marchas} marchas ajustables`)}${dato('Prioridad', f.prioridadMejora)}
    </div><div class="ficha-notes"><div><h3>Piezas ajustables marcadas</h3><p>${desbloqueos.length ? esc(desbloqueos.join(', ')) : 'Ninguna pieza ajustable marcada todavía.'}</p></div><div><h3>Notas específicas</h3><ul>${f.notasTuneo.map((nota) => `<li>${esc(nota)}</li>`).join('')}</ul></div></div></section>`;
}
function dato(label: string, value: string) { return `<article class="ficha-dato"><span>${esc(label)}</span><strong>${esc(value)}</strong></article>`; }
function resultados(visibles: ReglajeCalculado[], piezas: string[]) { return `<section class="results-stack"><section class="card"><div class="section-heading horizontal"><div><p class="eyebrow">Resultado</p><h2>Reglaje calculado desde ficha</h2></div><span class="pill">${estado.uso} · Clase ${estado.clase}</span></div><div class="tuning-sections">${secciones.map((s) => `<article class="tuning-section"><h3>${s}</h3><div class="setting-grid">${visibles.filter((rgl) => rgl.seccion === s).map(tarjeta).join('')}</div></article>`).join('')}</div></section><section class="two-column"><article class="card"><div class="section-heading"><p class="eyebrow">Corrección</p><h2>Consejos para probar</h2></div><ol class="advice-list">${consejos().map((x) => `<li>${esc(x)}</li>`).join('')}</ol></article><article class="card warning-card"><div class="section-heading"><p class="eyebrow">Ajustes bloqueados</p><h2>Piezas que suelen desbloquear reglajes</h2></div>${piezas.length ? `<ul class="parts-list">${piezas.map((p) => `<li>${esc(p)}: puede desbloquear ajustes relacionados.</li>`).join('')}</ul>` : '<p class="empty-state">Según la ficha de este coche, las piezas ajustables necesarias ya están marcadas como disponibles.</p>'}</article></section></section>`; }
function tarjeta(reglaje: ReglajeCalculado) { return `<div class="setting-card"><div class="setting-title"><strong>${esc(reglaje.nombreVisible)}</strong>${reglaje.puedeAparecerBloqueado ? '<span class="lock-tag">Puede estar bloqueado</span>' : ''}</div><p class="setting-value">${esc(reglaje.valorCalculado)}</p><p>${esc(reglaje.explicacion)}</p><p class="calc-note">${esc(reglaje.motivoCalculo)}</p><ul><li>Al subir: ${esc(reglaje.efectoAlSubir)}</li><li>Al bajar: ${esc(reglaje.efectoAlBajar)}</li></ul>${reglaje.piezaDesbloqueo ? `<small>Desbloqueo habitual: ${esc(reglaje.piezaDesbloqueo)}</small>` : ''}</div>`; }
function favoritas() { return `<section class="card favorites-card"><div class="section-heading horizontal"><div><p class="eyebrow">LocalStorage</p><h2>Builds favoritas guardadas</h2></div><span class="pill">${estado.favoritas.length} guardada(s)</span></div>${estado.favoritas.length === 0 ? '<p class="empty-state">Aún no hay builds favoritas. Configura un reglaje, añade notas y pulsa “Guardar build favorita”.</p>' : `<div class="favorites-list">${estado.favoritas.map((b) => `<article class="favorite-item"><div><h3>${esc(b.coche)}</h3><p>Clase ${b.claseObjetivo} · ${b.tipoUso} · ${b.problema}</p>${b.notas ? `<p class="favorite-notes">Notas: ${esc(b.notas)}</p>` : ''}<small>${new Date(b.fecha).toLocaleString('es-ES')}</small></div><button class="ghost-button" type="button" data-delete="${b.id}">Eliminar</button></article>`).join('')}</div>`}</section>`; }
function enlazarEventos() {
  document.querySelector<HTMLSelectElement>('#coche')?.addEventListener('change', (e) => { estado.coche = (e.target as HTMLSelectElement).value; render(); });
  document.querySelector<HTMLSelectElement>('#clase')?.addEventListener('change', (e) => { estado.clase = (e.target as HTMLSelectElement).value as ClaseObjetivo; render(); });
  document.querySelector<HTMLSelectElement>('#uso')?.addEventListener('change', (e) => { estado.uso = (e.target as HTMLSelectElement).value as TipoUso; render(); });
  document.querySelector<HTMLSelectElement>('#problema')?.addEventListener('change', (e) => { estado.problema = (e.target as HTMLSelectElement).value as Problema; render(); });
  document.querySelector<HTMLTextAreaElement>('#notas')?.addEventListener('input', (e) => { estado.notas = (e.target as HTMLTextAreaElement).value; });
  document.querySelector('#generar')?.addEventListener('click', () => { estado.generado = true; render(); });
  document.querySelector('#guardar')?.addEventListener('click', () => { estado.favoritas = [{ id: crypto.randomUUID(), coche: estado.coche, claseObjetivo: estado.clase, tipoUso: estado.uso, problema: estado.problema, notas: estado.notas.trim(), fecha: new Date().toISOString() }, ...estado.favoritas]; estado.notas = ''; estado.generado = true; persistir(); render(); });
  document.querySelectorAll<HTMLButtonElement>('[data-delete]').forEach((btn) => btn.addEventListener('click', () => { estado.favoritas = estado.favoritas.filter((b) => b.id !== btn.dataset.delete); persistir(); render(); }));
}

render();
