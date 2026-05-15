type ClaseObjetivo = 'D' | 'C' | 'B' | 'A' | 'S1' | 'S2' | 'X';
type TipoUso = 'Carretera' | 'Circuito' | 'Sprint' | 'Rally' | 'Drift' | 'Drag';
type Problema = 'Ninguno, solo base' | 'Subviraje' | 'Sobreviraje' | 'Falta de tracción' | 'Poca velocidad punta' | 'Frenada inestable';
type Seccion = 'Neumáticos' | 'Relación de marchas' | 'Alineamiento' | 'Barras estabilizadoras' | 'Muelles' | 'Amortiguación' | 'Aerodinámica' | 'Freno' | 'Diferencial';
type Traccion = 'RWD' | 'AWD' | 'FWD';
type TipoMotor = 'Delantero' | 'Central' | 'Trasero';
type Aspiracion = 'Atmosférico' | 'Turbo' | 'Biturbo' | 'Sobrealimentado' | 'Eléctrico';
type CompuestoNeumatico = 'Serie' | 'Calle' | 'Deportivos' | 'Competición semilisos' | 'Competición lisos' | 'Derrape' | 'Rally' | 'Todoterreno' | 'Nieve' | 'Aceleración';
type Vista = 'principal' | 'gestionar';

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
  potenciaKw: number;
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

interface Coche { id: string; nombre: string; traccion: Traccion; nota: string; ficha: FichaTecnica; creadoPorUsuario: boolean }
interface Reglaje { id: string; nombreVisible: string; seccion: Seccion; eje: string; valorRecomendado: string; explicacion: string; efectoAlSubir: string; efectoAlBajar: string; puedeAparecerBloqueado: boolean; piezaDesbloqueo?: string }
interface ReglajeCalculado extends Reglaje { valorCalculado: string; motivoCalculo: string }
interface BuildFavorita { id: string; coche: string; claseObjetivo: ClaseObjetivo; tipoUso: TipoUso; problema: Problema; notas: string; fecha: string }

const FAVORITES_KEY = 'forzat6-builds-favoritas';
const CARS_KEY = 'forzat6-coches-usuario';
const clases: ClaseObjetivo[] = ['D', 'C', 'B', 'A', 'S1', 'S2', 'X'];
const usos: TipoUso[] = ['Carretera', 'Circuito', 'Sprint', 'Rally', 'Drift', 'Drag'];
const problemas: Problema[] = ['Ninguno, solo base', 'Subviraje', 'Sobreviraje', 'Falta de tracción', 'Poca velocidad punta', 'Frenada inestable'];
const secciones: Seccion[] = ['Neumáticos', 'Relación de marchas', 'Alineamiento', 'Barras estabilizadoras', 'Muelles', 'Amortiguación', 'Aerodinámica', 'Freno', 'Diferencial'];
const tracciones: Traccion[] = ['FWD', 'RWD', 'AWD'];
const motores: TipoMotor[] = ['Delantero', 'Central', 'Trasero'];
const aspiraciones: Aspiracion[] = ['Atmosférico', 'Turbo', 'Biturbo', 'Sobrealimentado', 'Eléctrico'];
const compuestos: CompuestoNeumatico[] = ['Serie', 'Calle', 'Deportivos', 'Competición semilisos', 'Competición lisos', 'Derrape', 'Rally', 'Todoterreno', 'Nieve', 'Aceleración'];
const CV_POR_KW = 1.35962;
const compuestosLegacy: Record<string, CompuestoNeumatico> = {
  Stock: 'Serie',
  Street: 'Calle',
  Sport: 'Deportivos',
  'Semi-slick': 'Competición semilisos',
  Slick: 'Competición lisos',
  Drift: 'Derrape',
  Rally: 'Rally',
  Offroad: 'Todoterreno',
  Snow: 'Nieve',
  Drag: 'Aceleración',
};
const piezasLabels: Record<keyof PiezasAjustables, string> = {
  cajaCompleta: 'Caja completa',
  suspension: 'Suspensión',
  barras: 'Barras estabilizadoras',
  diferencial: 'Diferencial',
  frenos: 'Frenos',
  aeroDelantera: 'Aero delantera',
  aeroTrasera: 'Aero trasera',
};
const piezasBase: PiezasAjustables = { cajaCompleta: true, suspension: true, barras: true, diferencial: true, frenos: true, aeroDelantera: true, aeroTrasera: true };

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
  r('aero-trasera', 'Carga aerodinámica trasera', 'Aerodinámica', 'trasero', '72 kgf', 'Carga trasera para mantener estabilidad en apoyo rápido.', 'Más estabilidad y menos punta.', 'Más velocidad punta y trasera más viva.', 'Aero trasero ajustable'),
  r('equilibrio-frenada', 'Equilibrio de frenada', 'Freno', 'general', '52% delante', 'Reparte la frenada para estabilidad en entrada.', 'Más estabilidad, más riesgo de bloqueo delantero.', 'Más rotación, más riesgo de bloqueo trasero.', 'Frenos de carreras'),
  r('presion-frenado', 'Presión de frenado', 'Freno', 'general', '100%', 'Controla la fuerza máxima y la facilidad de bloqueo.', 'Más mordiente, más bloqueo.', 'Más modulación, menos mordiente.', 'Frenos de carreras'),
  r('diferencial-delantero-acel', 'Diferencial delantero - aceleración', 'Diferencial', 'delantero', '15%', 'Bloqueo suave para no empujar de morro.', 'Más tracción delantera, más subviraje.', 'Más giro, menos tracción.', 'Diferencial de carreras'),
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

const coches: Coche[] = cargarCoches();
let estado = {
  cocheId: coches[0]?.id ?? '',
  clase: (coches[0]?.ficha.claseBase ?? 'B') as ClaseObjetivo,
  uso: 'Circuito' as TipoUso,
  problema: 'Ninguno, solo base' as Problema,
  notas: '',
  generado: false,
  favoritas: cargarFavoritas(),
  vista: 'principal' as Vista,
  editandoId: '' as string,
  mensaje: '' as string,
  error: '' as string,
};

function r(id: string, nombreVisible: string, seccion: Seccion, eje: string, valorRecomendado: string, explicacion: string, efectoAlSubir: string, efectoAlBajar: string, piezaDesbloqueo?: string): Reglaje {
  return { id, nombreVisible, seccion, eje, valorRecomendado, explicacion, efectoAlSubir, efectoAlBajar, puedeAparecerBloqueado: Boolean(piezaDesbloqueo), piezaDesbloqueo };
}
function esc(value: string | number) { return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c] ?? c); }
function cargarFavoritas(): BuildFavorita[] { return leerJson<BuildFavorita[]>(FAVORITES_KEY, []).filter(esFavoritaValida); }
function cargarCoches(): Coche[] { return leerJson<Coche[]>(CARS_KEY, []).map(normalizarCoche).filter((c): c is Coche => Boolean(c)); }
function leerJson<T>(key: string, fallback: T): T { try { return JSON.parse(localStorage.getItem(key) ?? JSON.stringify(fallback)) as T; } catch { return fallback; } }
function persistirFavoritas() { localStorage.setItem(FAVORITES_KEY, JSON.stringify(estado.favoritas)); }
function persistirCoches() { localStorage.setItem(CARS_KEY, JSON.stringify(coches)); }
function cocheActual() { return coches.find((c) => c.id === estado.cocheId); }
function formato(num: number, decimales = 1) { return Number.isFinite(num) ? num.toFixed(decimales).replace('.', ',') : '0'; }
function redondear(num: number, decimales = 0) { const factor = 10 ** decimales; return Math.round(num * factor) / factor; }
function kwACv(kw: number) { return kw * CV_POR_KW; }
function cvAKw(cv: number) { return cv / CV_POR_KW; }
function potenciaTexto(f: FichaTecnica) { return `${Math.round(f.potenciaKw)} kW / ${Math.round(f.potenciaCv)} CV`; }
function normalizarCompuesto(value: unknown): CompuestoNeumatico | undefined {
  if (!incluye(compuestos, value)) return typeof value === 'string' ? compuestosLegacy[value] : undefined;
  return value;
}
function clamp(num: number, min: number, max: number) { return Math.min(max, Math.max(min, num)); }
function relacionPesoPotencia(c: Coche) { return c.ficha.pesoKg / Math.max(1, c.ficha.potenciaCv); }
function parPorTonelada(c: Coche) { return c.ficha.parNm / Math.max(0.1, c.ficha.pesoKg / 1000); }
function idNuevo() { return crypto.randomUUID?.() ?? `coche-${Date.now()}-${Math.random().toString(16).slice(2)}`; }

function esFavoritaValida(value: unknown): value is BuildFavorita {
  const b = value as BuildFavorita;
  return Boolean(b && typeof b.id === 'string' && typeof b.coche === 'string' && incluye(clases, b.claseObjetivo) && incluye(usos, b.tipoUso) && incluye(problemas, b.problema) && typeof b.fecha === 'string');
}
function incluye<T extends string>(opts: readonly T[], value: unknown): value is T { return typeof value === 'string' && opts.includes(value as T); }
function num(value: unknown, min: number, max: number) { const n = Number(value); return Number.isFinite(n) && n >= min && n <= max ? n : undefined; }
function texto(value: unknown) { return typeof value === 'string' ? value.trim() : ''; }
function bool(value: unknown) { return typeof value === 'boolean' ? value : false; }
function normalizarCoche(value: unknown): Coche | null {
  const raw = value as Partial<Coche>;
  const ficha = raw?.ficha as Partial<FichaTecnica> | undefined;
  const piezas = ficha?.piezasAjustables as Partial<PiezasAjustables> | undefined;
  if (!raw || !ficha) return null;
  const nombre = texto(raw.nombre);
  const potenciaKwEntrada = num(ficha.potenciaKw, 1, 2500);
  const potenciaCvEntrada = num(ficha.potenciaCv, 1, 3000);
  const potenciaKw = potenciaKwEntrada ?? (potenciaCvEntrada !== undefined ? redondear(cvAKw(potenciaCvEntrada)) : undefined);
  const potenciaCv = potenciaKw !== undefined ? redondear(kwACv(potenciaKw)) : undefined;
  const neumaticos = normalizarCompuesto(ficha.neumaticos);
  const parNm = num(ficha.parNm, 1, 5000);
  const pesoKg = num(ficha.pesoKg, 100, 5000);
  const piBase = num(ficha.piBase, 0, 999);
  const repartoPesoDelantero = num(ficha.repartoPesoDelantero, 1, 99);
  const cilindradaL = num(ficha.cilindradaL, 0, 20);
  const anchoDelanteroMm = num(ficha.anchoDelanteroMm, 100, 600);
  const anchoTraseroMm = num(ficha.anchoTraseroMm, 100, 600);
  const marchas = num(ficha.marchas, 1, 10);
  if (!nombre || !incluye(clases, ficha.claseBase) || piBase === undefined || !incluye(motores, ficha.motor) || !incluye(aspiraciones, ficha.aspiracion) || potenciaKw === undefined || potenciaCv === undefined || parNm === undefined || pesoKg === undefined || repartoPesoDelantero === undefined || cilindradaL === undefined || !neumaticos || anchoDelanteroMm === undefined || anchoTraseroMm === undefined || !incluye(tracciones, ficha.traccionOriginal) || !incluye(tracciones, ficha.traccionBuild) || marchas === undefined) return null;
  return {
    id: texto(raw.id) || idNuevo(),
    nombre,
    traccion: ficha.traccionBuild,
    nota: texto(raw.nota),
    creadoPorUsuario: true,
    ficha: {
      claseBase: ficha.claseBase,
      piBase,
      motor: ficha.motor,
      aspiracion: ficha.aspiracion,
      potenciaKw,
      potenciaCv,
      parNm,
      pesoKg,
      repartoPesoDelantero,
      cilindradaL,
      neumaticos,
      anchoDelanteroMm,
      anchoTraseroMm,
      traccionOriginal: ficha.traccionOriginal,
      traccionBuild: ficha.traccionBuild,
      marchas: Math.round(marchas),
      piezasAjustables: {
        cajaCompleta: bool(piezas?.cajaCompleta),
        suspension: bool(piezas?.suspension),
        barras: bool(piezas?.barras),
        diferencial: bool(piezas?.diferencial),
        frenos: bool(piezas?.frenos),
        aeroDelantera: bool(piezas?.aeroDelantera),
        aeroTrasera: bool(piezas?.aeroTrasera),
      },
      prioridadMejora: texto(ficha.prioridadMejora),
      notasTuneo: Array.isArray(ficha.notasTuneo) ? ficha.notasTuneo.map(texto).filter(Boolean) : [],
    },
  };
}

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
function reglajesVisibles(c: Coche) {
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
  const slick = ['Competición semilisos', 'Competición lisos', 'Aceleración'].includes(f.neumaticos);

  switch (reglaje.id) {
    case 'presion-delantera': return { valorCalculado: `${formato(clamp(2.1 + (f.repartoPesoDelantero - 52) * 0.01 + (uso === 'Drag' ? 0.08 : 0) - (uso === 'Rally' ? 0.18 : 0) - (slick ? 0.06 : 0), 1.75, 2.35))} bar`, motivoCalculo: `Ajustado por ${f.repartoPesoDelantero}% de peso delantero, neumático ${f.neumaticos} y uso ${uso}.` };
    case 'presion-trasera': return { valorCalculado: `${formato(clamp(2.1 + (f.traccionBuild === 'RWD' ? -0.08 : f.traccionBuild === 'FWD' ? 0.04 : -0.03) - (parT > 330 ? 0.06 : 0) - (uso === 'Rally' ? 0.18 : 0) + (uso === 'Drag' ? -0.12 : 0) - (slick ? 0.05 : 0), 1.65, 2.3))} bar`, motivoCalculo: `Ajustado por tracción ${f.traccionBuild}, ${Math.round(parT)} N·m/t y uso ${uso}.` };
    case 'transmision-final': return { valorCalculado: formato(clamp(3.65 + (rpp > 4.5 ? 0.18 : -0.08) + (uso === 'Drag' || uso === 'Sprint' || problema === 'Poca velocidad punta' ? -0.22 : 0) + (uso === 'Circuito' ? 0.08 : 0), 3.05, 4.25), 2), motivoCalculo: `Calculado con ${formato(rpp, 2)} kg/CV, ${f.marchas} marchas y objetivo ${uso}.` };
    case 'camber-delantero': return { valorCalculado: `${formato(clamp(-1.0 - (aeroAlta ? 0.25 : 0) - (uso === 'Drift' ? 0.4 : 0) + (uso === 'Drag' ? 0.35 : 0), -2.2, -0.4))}°`, motivoCalculo: `Base según apoyo esperado para ${uso} y clase ${estado.clase}.` };
    case 'camber-trasero': return { valorCalculado: `${formato(clamp(-0.55 - (f.traccionBuild === 'RWD' && parT > 330 ? -0.15 : 0) - (uso === 'Drift' ? 0.25 : 0) + (uso === 'Drag' ? 0.35 : 0), -1.5, -0.1))}°`, motivoCalculo: `Protege tracción trasera con ${Math.round(parT)} N·m/t y uso ${uso}.` };
    case 'barra-delantera': return { valorCalculado: formato(clamp(50 + f.repartoPesoDelantero * 0.18 + (problema === 'Subviraje' ? -4 : 0) + (problema === 'Sobreviraje' ? 3 : 0) + (uso === 'Rally' ? -8 : 0), 25, 65), 2), motivoCalculo: `Ajustada por reparto ${f.repartoPesoDelantero}/${100 - f.repartoPesoDelantero} y diagnóstico ${problema}.` };
    case 'barra-trasera': return { valorCalculado: formato(clamp(45 + (50 - f.repartoPesoDelantero) * 0.25 + (problema === 'Subviraje' ? 4 : 0) + (problema === 'Sobreviraje' ? -5 : 0) + (uso === 'Rally' ? -8 : 0), 20, 65), 2), motivoCalculo: `Ajustada para rotación según reparto, tracción ${f.traccionBuild} y diagnóstico ${problema}.` };
    case 'muelle-delantero': return { valorCalculado: `${formato(clamp(baseMuelle * pesoDel * 1.85, 75, 180))} kgf/mm`, motivoCalculo: `Calculado desde ${peso} kg, ${f.repartoPesoDelantero}% delante y superficie ${uso}.` };
    case 'muelle-trasero': return { valorCalculado: `${formato(clamp(baseMuelle * pesoTras * 2.05 + (f.traccionBuild === 'RWD' && parT > 330 ? -6 : 0), 70, 185))} kgf/mm`, motivoCalculo: `Calculado desde ${peso} kg, tracción ${f.traccionBuild} y par disponible.` };
    case 'altura-delantera': return { valorCalculado: `${formato(clamp(13.8 + (uso === 'Rally' ? 5.2 : 0) + (peso > 1600 ? 0.7 : 0) + (uso === 'Drag' ? 0.8 : 0), 11.5, 22))} cm`, motivoCalculo: `Altura base por peso ${peso} kg y uso ${uso}.` };
    case 'altura-trasera': return { valorCalculado: `${formato(clamp(13.4 + (uso === 'Rally' ? 5.4 : 0) + (peso > 1600 ? 0.8 : 0) + (uso === 'Drag' ? 1.3 : 0), 11.5, 22.5))} cm`, motivoCalculo: `Altura trasera adaptada a tracción ${f.traccionBuild} y superficie ${uso}.` };
    case 'aero-delantera': return { valorCalculado: `${Math.round(clamp(45 + (aeroAlta ? 18 : 0) + (problema === 'Subviraje' ? 8 : 0) - (problema === 'Poca velocidad punta' ? 10 : 0), 35, 85))} kgf`, motivoCalculo: `Carga calculada por clase ${estado.clase}, uso ${uso} y diagnóstico ${problema}.` };
    case 'aero-trasera': return { valorCalculado: `${Math.round(clamp(58 + (aeroAlta ? 22 : 0) + (problema === 'Sobreviraje' ? 10 : 0) - (problema === 'Poca velocidad punta' ? 12 : 0), 40, 105))} kgf`, motivoCalculo: 'Carga trasera adaptada para estabilidad y punta.' };
    case 'equilibrio-frenada': return { valorCalculado: `${Math.round(clamp(f.repartoPesoDelantero + 1 + (problema === 'Frenada inestable' ? 2 : 0), 48, 58))}% delante`, motivoCalculo: `Reparto de freno según ${f.repartoPesoDelantero}% de peso delantero.` };
    case 'presion-frenado': return { valorCalculado: `${Math.round(clamp(100 - (peso > 1600 ? 4 : 0) - (problema === 'Frenada inestable' ? 6 : 0) + (uso === 'Circuito' ? 2 : 0), 88, 105))}%`, motivoCalculo: 'Presión modulada por peso, uso y estabilidad de frenada.' };
    case 'diferencial-delantero-acel': return { valorCalculado: `${f.traccionBuild === 'FWD' ? 28 : 14}%`, motivoCalculo: `Bloqueo delantero bajo para limitar subviraje en ${f.traccionBuild}.` };
    case 'diferencial-trasero-acel': return { valorCalculado: `${Math.round(clamp(18 + (parT > 330 ? -3 : 2) + (uso === 'Drift' ? 18 : 0) + (uso === 'Drag' ? 12 : 0), 10, 55))}%`, motivoCalculo: `Bloqueo trasero según ${Math.round(parT)} N·m/t y uso ${uso}.` };
    case 'diferencial-trasero-decel': return { valorCalculado: `${Math.round(clamp(28 + (problema === 'Frenada inestable' ? 5 : 0) + (uso === 'Drift' ? -8 : 0), 12, 45))}%`, motivoCalculo: 'Deceleración ajustada por estabilidad al levantar/frenar.' };
    case 'diferencial-central': return { valorCalculado: `${Math.round(clamp(62 + (problema === 'Subviraje' ? 8 : 0) - (problema === 'Sobreviraje' ? 4 : 0), 50, 80))}% hacia atrás`, motivoCalculo: `Reparto central para rotación AWD según diagnóstico ${problema}.` };
    default: return { valorCalculado: reglaje.valorRecomendado, motivoCalculo: 'Valor base; afínalo tras una tanda y cambia solo un parámetro cada vez.' };
  }
}

function consejos(c: Coche) {
  const f = c.ficha;
  const lista = [...usoConsejos[estado.uso], ...problemaConsejos[estado.problema]];
  if (estado.clase === 'S2' || estado.clase === 'X') lista.unshift('En S2/X, prioriza estabilidad, aero y frenos antes de añadir potencia.');
  lista.push(`Ficha ${c.nombre}: ${f.pesoKg} kg, ${potenciaTexto(f)}, ${Math.round(parPorTonelada(c))} N·m/t y reparto ${f.repartoPesoDelantero}/${100 - f.repartoPesoDelantero}.`);
  lista.push(f.traccionBuild === 'AWD' ? 'Como es AWD, usa diferencial delantero/central para corregir subviraje o salida.' : f.traccionBuild === 'FWD' ? 'Como es FWD, evita mucho bloqueo delantero y prioriza entrada limpia.' : 'Como es RWD, trata presión trasera y diferencial de aceleración con cambios pequeños.');
  if (relacionPesoPotencia(c) < 3.6) lista.push('Relación peso/potencia agresiva: no añadas potencia hasta que salida y frenada sean repetibles.');
  if (f.repartoPesoDelantero >= 56) lista.push('Mucho peso delante: ayuda con barra delantera algo más blanda, más caster y reparto AWD hacia atrás si aplica.');
  if (f.neumaticos === 'Serie' || f.neumaticos === 'Calle') lista.push('Neumático limitado: los valores deben ser conservadores; la mejora de compuesto puede valer más que tocar potencia.');
  lista.push(`Prioridad de mejora: ${f.prioridadMejora || 'pendiente de definir en la ficha del coche.'}`);
  return lista;
}

function render() {
  const root = document.querySelector<HTMLDivElement>('#root');
  if (!root) return;
  const c = cocheActual();
  root.innerHTML = `<main class="app-shell">
    <section class="hero card"><div><p class="eyebrow">Laboratorio personal de reglajes</p><h1>ForzaT6 - Tuning Lab</h1><p class="hero-copy">La app empieza sin coches predefinidos: añade tus propios coches, guarda sus fichas en localStorage y genera bases de reglaje desde datos sacados del juego.</p><div class="button-row"><button class="primary-button" type="button" id="ir-anadir">Añadir coche</button><button class="secondary-button" type="button" id="ir-gestionar">Gestionar coches</button></div></div><div class="hero-badge"><span>MVP</span><strong>FH6</strong></div></section>
    ${estado.mensaje ? `<p class="toast success">${esc(estado.mensaje)}</p>` : ''}${estado.error ? `<p class="toast error">${esc(estado.error)}</p>` : ''}
    ${estado.vista === 'gestionar' ? gestionarCoches() : pantallaPrincipal(c)}
    ${favoritas()}
  </main>`;
  enlazarEventos();
}

function pantallaPrincipal(c?: Coche) {
  if (!c) return `<section class="card empty-panel"><p class="eyebrow">Garaje vacío</p><h2>No hay coches todavía. Añade tu primer coche para generar reglajes.</h2><p class="empty-state">Usa el botón “Añadir coche” para abrir Gestionar coches y crear una ficha manual. Las builds favoritas antiguas seguirán apareciendo abajo para que puedas eliminarlas si apuntan a coches que ya no existen.</p><button class="primary-button" type="button" id="empty-add">Añadir coche</button></section>`;
  const visibles = reglajesVisibles(c);
  const piezas = [...new Set(visibles.filter((x) => x.puedeAparecerBloqueado).map((x) => x.piezaDesbloqueo).filter(Boolean))] as string[];
  return `<section class="layout-grid"><form class="card control-panel"><div class="section-heading"><p class="eyebrow">Configuración</p><h2>Elige tu objetivo</h2></div>${select('coche', 'Selector de coche', coches.map((x) => [x.id, x.nombre]), estado.cocheId)}${select('clase', 'Clase objetivo', clases.map((x) => [x, x]), estado.clase)}${select('uso', 'Tipo de uso', usos.map((x) => [x, x]), estado.uso)}${select('problema', 'Problema a corregir', problemas.map((x) => [x, x]), estado.problema)}<label><span>Notas personales por build</span><textarea id="notas" rows="5" placeholder="Ej.: probar en circuito urbano, revisar salida de curvas lentas...">${esc(estado.notas)}</textarea></label><div class="button-row"><button class="primary-button" type="button" id="generar">Generar reglaje</button><button class="secondary-button" type="button" id="guardar">Guardar build favorita</button></div></form>
    <aside class="card summary-card"><div class="section-heading"><p class="eyebrow">Perfil seleccionado</p><h2>${esc(c.nombre)}</h2></div><dl class="spec-list"><div><dt>Tracción build</dt><dd>${c.ficha.traccionBuild}</dd></div><div><dt>Clase base</dt><dd>${c.ficha.claseBase} ${c.ficha.piBase}</dd></div><div><dt>Peso</dt><dd>${c.ficha.pesoKg} kg</dd></div><div><dt>Potencia</dt><dd>${potenciaTexto(c.ficha)}</dd></div></dl><p class="car-note">${esc(c.nota || 'Sin notas generales todavía.')}</p><div class="button-row"><button class="secondary-button" type="button" data-edit="${esc(c.id)}">Editar coche</button><button class="secondary-button" type="button" data-duplicate="${esc(c.id)}">Duplicar coche</button></div><p class="scope-warning">Este MVP usa fichas manuales por coche; no calcula piezas exactas para alcanzar un PI.</p></aside></section>
    ${fichaTecnica(c)}${estado.generado ? resultados(visibles, piezas, c) : ''}`;
}
function select(id: string, label: string, opts: readonly (readonly [string, string])[], val: string) { return `<label><span>${label}</span><select id="${id}">${opts.map(([value, text]) => `<option value="${esc(value)}" ${value === val ? 'selected' : ''}>${esc(text)}</option>`).join('')}</select></label>`; }
function fichaTecnica(c: Coche) {
  const f = c.ficha;
  const desbloqueos = Object.entries(f.piezasAjustables).filter(([, activo]) => activo).map(([pieza]) => piezasLabels[pieza as keyof PiezasAjustables].toLowerCase());
  return `<section class="card ficha-card"><div class="section-heading horizontal"><div><p class="eyebrow">Ficha para tunear</p><h2>Datos que usa el generador</h2></div><span class="pill">${formato(relacionPesoPotencia(c), 2)} kg/CV · ${Math.round(parPorTonelada(c))} N·m/t</span></div><div class="ficha-grid">
    ${dato('Motor', `${f.motor} · ${f.aspiracion} ${formato(f.cilindradaL, 1)} L`)}${dato('Potencia', potenciaTexto(f))}${dato('Tracción', `Original ${f.traccionOriginal} · Build ${f.traccionBuild}`)}${dato('Reparto peso', `${f.repartoPesoDelantero}% delante / ${100 - f.repartoPesoDelantero}% detrás`)}${dato('Neumáticos', `${f.neumaticos} · ${f.anchoDelanteroMm}/${f.anchoTraseroMm} mm`)}${dato('Caja', `${f.marchas} marchas`)}${dato('Prioridad', f.prioridadMejora || 'Pendiente')}
    </div><div class="ficha-notes"><div><h3>Piezas ajustables disponibles</h3><p>${desbloqueos.length ? esc(desbloqueos.join(', ')) : 'Ninguna pieza ajustable marcada todavía.'}</p></div><div><h3>Notas específicas</h3>${f.notasTuneo.length ? `<ul>${f.notasTuneo.map((nota) => `<li>${esc(nota)}</li>`).join('')}</ul>` : '<p>Sin notas específicas todavía.</p>'}</div></div></section>`;
}
function dato(label: string, value: string) { return `<article class="ficha-dato"><span>${esc(label)}</span><strong>${esc(value)}</strong></article>`; }
function resultados(visibles: ReglajeCalculado[], piezas: string[], c: Coche) { return `<section class="results-stack"><section class="card"><div class="section-heading horizontal"><div><p class="eyebrow">Resultado</p><h2>Reglaje calculado desde ficha</h2></div><span class="pill">${estado.uso} · Clase ${estado.clase}</span></div><div class="tuning-sections">${secciones.map((s) => `<article class="tuning-section"><h3>${s}</h3><div class="setting-grid">${visibles.filter((rgl) => rgl.seccion === s).map(tarjeta).join('')}</div></article>`).join('')}</div></section><section class="two-column"><article class="card"><div class="section-heading"><p class="eyebrow">Corrección</p><h2>Consejos para probar</h2></div><ol class="advice-list">${consejos(c).map((x) => `<li>${esc(x)}</li>`).join('')}</ol></article><article class="card warning-card"><div class="section-heading"><p class="eyebrow">Ajustes bloqueados</p><h2>Piezas que suelen desbloquear reglajes</h2></div>${piezas.length ? `<ul class="parts-list">${piezas.map((p) => `<li>${esc(p)}: puede desbloquear ajustes relacionados.</li>`).join('')}</ul>` : '<p class="empty-state">Según la ficha de este coche, las piezas ajustables necesarias ya están marcadas como disponibles.</p>'}</article></section></section>`; }
function tarjeta(reglaje: ReglajeCalculado) { return `<div class="setting-card"><div class="setting-title"><strong>${esc(reglaje.nombreVisible)}</strong>${reglaje.puedeAparecerBloqueado ? '<span class="lock-tag">Puede estar bloqueado</span>' : ''}</div><p class="setting-value">${esc(reglaje.valorCalculado)}</p><p>${esc(reglaje.explicacion)}</p><p class="calc-note">${esc(reglaje.motivoCalculo)}</p><ul><li>Al subir: ${esc(reglaje.efectoAlSubir)}</li><li>Al bajar: ${esc(reglaje.efectoAlBajar)}</li></ul>${reglaje.piezaDesbloqueo ? `<small>Desbloqueo habitual: ${esc(reglaje.piezaDesbloqueo)}</small>` : ''}</div>`; }
function favoritas() {
  return `<section class="card favorites-card"><div class="section-heading horizontal"><div><p class="eyebrow">LocalStorage</p><h2>Builds favoritas guardadas</h2></div><span class="pill">${estado.favoritas.length} guardada(s)</span></div>${estado.favoritas.length === 0 ? '<p class="empty-state">Aún no hay builds favoritas. Configura un reglaje, añade notas y pulsa “Guardar build favorita”.</p>' : `<div class="favorites-list">${estado.favoritas.map((b) => {
    const existe = coches.some((c) => c.nombre === b.coche || c.id === b.coche);
    return `<article class="favorite-item ${existe ? '' : 'missing-favorite'}"><div><h3>${esc(b.coche)}</h3><p>Clase ${b.claseObjetivo} · ${b.tipoUso} · ${b.problema}${existe ? '' : ' · Coche no encontrado'}</p>${b.notas ? `<p class="favorite-notes">Notas: ${esc(b.notas)}</p>` : ''}<small>${new Date(b.fecha).toLocaleString('es-ES')}</small></div><button class="ghost-button" type="button" data-delete-favorite="${esc(b.id)}">Eliminar</button></article>`;
  }).join('')}</div>`}</section>`;
}

function gestionarCoches() {
  const editando = coches.find((c) => c.id === estado.editandoId);
  const base = editando ?? cocheVacio();
  return `<section class="management-stack"><section class="card"><div class="section-heading horizontal"><div><p class="eyebrow">Gestionar coches</p><h2>${editando ? 'Editar coche' : 'Añadir coche'}</h2></div><div class="button-row"><button class="secondary-button" type="button" id="volver-principal">Volver al generador</button><button class="secondary-button" type="button" id="exportar">Exportar coches a JSON</button><label class="import-button secondary-button"><span>Importar coches desde JSON</span><input id="importar" type="file" accept="application/json,.json"></label></div></div>${formularioCoche(base, Boolean(editando))}</section>
  <section class="card"><div class="section-heading horizontal"><div><p class="eyebrow">Garaje local</p><h2>Coches guardados</h2></div><span class="pill">${coches.length} coche(s)</span></div>${coches.length ? `<div class="car-list">${coches.map(tarjetaCocheGestion).join('')}</div>` : '<p class="empty-state">No hay coches todavía. Añade tu primer coche para generar reglajes.</p>'}</section></section>`;
}
function cocheVacio(): Coche {
  return { id: '', nombre: '', traccion: 'RWD', nota: '', creadoPorUsuario: true, ficha: { claseBase: 'B', piBase: 600, motor: 'Delantero', aspiracion: 'Atmosférico', potenciaKw: 74, potenciaCv: 101, parNm: 150, pesoKg: 1200, repartoPesoDelantero: 50, cilindradaL: 2, neumaticos: 'Serie', anchoDelanteroMm: 205, anchoTraseroMm: 205, traccionOriginal: 'RWD', traccionBuild: 'RWD', marchas: 6, piezasAjustables: { ...piezasBase }, prioridadMejora: '', notasTuneo: [] } };
}
function formularioCoche(c: Coche, editando: boolean) {
  const f = c.ficha;
  return `<form id="car-form" class="car-form"><input type="hidden" name="id" value="${esc(c.id)}"><div class="form-section"><h3>Datos básicos</h3><div class="form-grid">${input('nombre', 'Nombre del coche', c.nombre, 'text', true)}${selectForm('claseBase', 'Clase base', clases, f.claseBase)}${input('piBase', 'PI base', f.piBase, 'number', true)}${selectForm('traccionOriginal', 'Tracción original', tracciones, f.traccionOriginal)}${selectForm('traccionBuild', 'Tracción del build', tracciones, f.traccionBuild)}</div></div>
    <div class="form-section"><h3>Motor</h3><div class="form-grid">${selectForm('motor', 'Posición del motor', motores, f.motor)}${selectForm('aspiracion', 'Aspiración', aspiraciones, f.aspiracion)}${input('potenciaKw', 'Potencia en kW', f.potenciaKw, 'number', true)}${input('parNm', 'Par en N·m', f.parNm, 'number', true)}${input('pesoKg', 'Peso en kg', f.pesoKg, 'number', true)}${input('repartoPesoDelantero', 'Reparto de peso delantero en %', f.repartoPesoDelantero, 'number', true)}${input('cilindradaL', 'Cilindrada en litros', f.cilindradaL, 'number', true, '0.1')}</div></div>
    <div class="form-section"><h3>Neumáticos y caja</h3><div class="form-grid">${selectForm('neumaticos', 'Compuesto de neumáticos', compuestos, f.neumaticos)}${input('anchoDelanteroMm', 'Ancho neumático delantero en mm', f.anchoDelanteroMm, 'number', true)}${input('anchoTraseroMm', 'Ancho neumático trasero en mm', f.anchoTraseroMm, 'number', true)}${input('marchas', 'Número de marchas', f.marchas, 'number', true)}</div></div>
    <div class="form-section"><h3>Piezas ajustables disponibles</h3><div class="check-grid">${(Object.keys(piezasLabels) as (keyof PiezasAjustables)[]).map((key) => `<label class="check-label"><input type="checkbox" name="${key}" ${f.piezasAjustables[key] ? 'checked' : ''}> <span>${piezasLabels[key]}</span></label>`).join('')}</div></div>
    <div class="form-section"><h3>Notas</h3>${input('prioridadMejora', 'Prioridad de mejora', f.prioridadMejora, 'text')}<label><span>Notas específicas de tuneo</span><textarea name="notasTuneo" rows="5" placeholder="Una nota por línea">${esc(f.notasTuneo.join('\n'))}</textarea></label><label><span>Resumen visible del coche</span><textarea name="nota" rows="3" placeholder="Ej.: base estable, vigilar salida en curvas lentas...">${esc(c.nota)}</textarea></label></div><div class="button-row"><button class="primary-button" type="submit">${editando ? 'Guardar cambios' : 'Guardar coche'}</button>${editando ? '<button class="secondary-button" type="button" id="cancelar-edicion">Cancelar edición</button>' : ''}</div></form>`;
}
function input(name: string, label: string, value: string | number, type = 'text', required = false, step = '1') { return `<label><span>${label}</span><input name="${name}" type="${type}" value="${esc(value)}" ${required ? 'required' : ''} ${type === 'number' ? `step="${step}"` : ''}></label>`; }
function selectForm<T extends string>(name: string, label: string, opts: readonly T[], value: T) { return `<label><span>${label}</span><select name="${name}">${opts.map((opt) => `<option value="${esc(opt)}" ${opt === value ? 'selected' : ''}>${esc(opt)}</option>`).join('')}</select></label>`; }
function tarjetaCocheGestion(c: Coche) { return `<article class="car-admin-item"><div><h3>${esc(c.nombre)}</h3><p>${c.ficha.claseBase} ${c.ficha.piBase} · ${c.ficha.traccionBuild} · ${potenciaTexto(c.ficha)} · ${c.ficha.pesoKg} kg</p></div><div class="button-row"><button class="secondary-button" type="button" data-edit="${esc(c.id)}">Editar</button><button class="secondary-button" type="button" data-duplicate="${esc(c.id)}">Duplicar coche</button><button class="ghost-button" type="button" data-delete-car="${esc(c.id)}">Borrar</button></div></article>`; }

function guardarDesdeFormulario(form: HTMLFormElement) {
  const data = new FormData(form);
  const coche = normalizarCoche({
    id: texto(data.get('id')) || idNuevo(),
    nombre: data.get('nombre'),
    nota: data.get('nota'),
    creadoPorUsuario: true,
    ficha: {
      claseBase: data.get('claseBase'), piBase: data.get('piBase'), motor: data.get('motor'), aspiracion: data.get('aspiracion'), potenciaKw: data.get('potenciaKw'), parNm: data.get('parNm'), pesoKg: data.get('pesoKg'), repartoPesoDelantero: data.get('repartoPesoDelantero'), cilindradaL: data.get('cilindradaL'), neumaticos: data.get('neumaticos'), anchoDelanteroMm: data.get('anchoDelanteroMm'), anchoTraseroMm: data.get('anchoTraseroMm'), traccionOriginal: data.get('traccionOriginal'), traccionBuild: data.get('traccionBuild'), marchas: data.get('marchas'), prioridadMejora: data.get('prioridadMejora'), notasTuneo: texto(data.get('notasTuneo')).split('\n').map((x) => x.trim()).filter(Boolean),
      piezasAjustables: Object.fromEntries(Object.keys(piezasLabels).map((key) => [key, data.has(key)])),
    },
  });
  if (!coche) { estado.error = 'Revisa el formulario: faltan datos obligatorios o algún número está fuera de rango.'; estado.mensaje = ''; render(); return; }
  const index = coches.findIndex((x) => x.id === coche.id);
  if (index >= 0) coches[index] = coche; else coches.unshift(coche);
  estado.cocheId = coche.id;
  estado.clase = coche.ficha.claseBase;
  estado.editandoId = '';
  estado.mensaje = index >= 0 ? 'Coche actualizado correctamente.' : 'Coche añadido correctamente.';
  estado.error = '';
  persistirCoches();
  render();
}
function duplicarCoche(id: string) {
  const original = coches.find((c) => c.id === id);
  if (!original) return;
  const copia: Coche = structuredClone(original);
  copia.id = idNuevo();
  copia.nombre = `${original.nombre} (copia)`;
  coches.unshift(copia);
  estado.cocheId = copia.id;
  estado.editandoId = copia.id;
  estado.vista = 'gestionar';
  estado.mensaje = 'Coche duplicado. Puedes modificar la copia.';
  estado.error = '';
  persistirCoches();
  render();
}
function borrarCoche(id: string) {
  const coche = coches.find((c) => c.id === id);
  if (!coche || !confirm(`¿Borrar "${coche.nombre}"? Las builds favoritas que lo referencien quedarán marcadas como coche no encontrado.`)) return;
  coches.splice(coches.findIndex((c) => c.id === id), 1);
  if (estado.cocheId === id) estado.cocheId = coches[0]?.id ?? '';
  if (estado.editandoId === id) estado.editandoId = '';
  estado.mensaje = 'Coche borrado correctamente.';
  estado.error = '';
  persistirCoches();
  render();
}
function exportarCoches() {
  const blob = new Blob([JSON.stringify({ version: 2, coches }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `forzat6-coches-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
function importarCoches(file: File) {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    try {
      const raw = JSON.parse(String(reader.result));
      const lista = Array.isArray(raw) ? raw : raw?.coches;
      if (!Array.isArray(lista)) throw new Error('El JSON debe ser un array de coches o un objeto con la propiedad "coches".');
      const importados = lista.map(normalizarCoche);
      if (importados.some((c) => !c)) throw new Error('Uno o más coches no tienen el formato requerido.');
      coches.splice(0, coches.length, ...(importados as Coche[]));
      estado.cocheId = coches[0]?.id ?? '';
      estado.editandoId = '';
      estado.mensaje = `Importación completada: ${coches.length} coche(s) cargado(s).`;
      estado.error = '';
      persistirCoches();
    } catch (error) {
      estado.error = error instanceof Error ? `No se pudo importar el JSON: ${error.message}` : 'No se pudo importar el JSON: formato no válido.';
      estado.mensaje = '';
    }
    render();
  });
  reader.addEventListener('error', () => { estado.error = 'No se pudo leer el archivo JSON seleccionado.'; estado.mensaje = ''; render(); });
  reader.readAsText(file);
}

function enlazarEventos() {
  document.querySelector('#ir-anadir')?.addEventListener('click', () => { estado.vista = 'gestionar'; estado.editandoId = ''; estado.mensaje = ''; estado.error = ''; render(); });
  document.querySelector('#empty-add')?.addEventListener('click', () => { estado.vista = 'gestionar'; estado.editandoId = ''; render(); });
  document.querySelector('#ir-gestionar')?.addEventListener('click', () => { estado.vista = 'gestionar'; render(); });
  document.querySelector('#volver-principal')?.addEventListener('click', () => { estado.vista = 'principal'; estado.editandoId = ''; render(); });
  document.querySelector<HTMLSelectElement>('#coche')?.addEventListener('change', (e) => { estado.cocheId = (e.target as HTMLSelectElement).value; estado.generado = false; render(); });
  document.querySelector<HTMLSelectElement>('#clase')?.addEventListener('change', (e) => { estado.clase = (e.target as HTMLSelectElement).value as ClaseObjetivo; render(); });
  document.querySelector<HTMLSelectElement>('#uso')?.addEventListener('change', (e) => { estado.uso = (e.target as HTMLSelectElement).value as TipoUso; render(); });
  document.querySelector<HTMLSelectElement>('#problema')?.addEventListener('change', (e) => { estado.problema = (e.target as HTMLSelectElement).value as Problema; render(); });
  document.querySelector<HTMLTextAreaElement>('#notas')?.addEventListener('input', (e) => { estado.notas = (e.target as HTMLTextAreaElement).value; });
  document.querySelector('#generar')?.addEventListener('click', () => { estado.generado = true; render(); });
  document.querySelector('#guardar')?.addEventListener('click', () => { const c = cocheActual(); if (!c) return; estado.favoritas = [{ id: idNuevo(), coche: c.nombre, claseObjetivo: estado.clase, tipoUso: estado.uso, problema: estado.problema, notas: estado.notas.trim(), fecha: new Date().toISOString() }, ...estado.favoritas]; estado.notas = ''; estado.generado = true; persistirFavoritas(); render(); });
  document.querySelectorAll<HTMLButtonElement>('[data-delete-favorite]').forEach((btn) => btn.addEventListener('click', () => { estado.favoritas = estado.favoritas.filter((b) => b.id !== btn.dataset.deleteFavorite); persistirFavoritas(); render(); }));
  document.querySelectorAll<HTMLButtonElement>('[data-edit]').forEach((btn) => btn.addEventListener('click', () => { estado.vista = 'gestionar'; estado.editandoId = btn.dataset.edit ?? ''; estado.mensaje = ''; estado.error = ''; render(); }));
  document.querySelectorAll<HTMLButtonElement>('[data-duplicate]').forEach((btn) => btn.addEventListener('click', () => duplicarCoche(btn.dataset.duplicate ?? '')));
  document.querySelectorAll<HTMLButtonElement>('[data-delete-car]').forEach((btn) => btn.addEventListener('click', () => borrarCoche(btn.dataset.deleteCar ?? '')));
  document.querySelector('#cancelar-edicion')?.addEventListener('click', () => { estado.editandoId = ''; render(); });
  document.querySelector<HTMLFormElement>('#car-form')?.addEventListener('submit', (e) => { e.preventDefault(); guardarDesdeFormulario(e.currentTarget as HTMLFormElement); });
  document.querySelector('#exportar')?.addEventListener('click', exportarCoches);
  document.querySelector<HTMLInputElement>('#importar')?.addEventListener('change', (e) => { const file = (e.target as HTMLInputElement).files?.[0]; if (file) importarCoches(file); });
}

render();
