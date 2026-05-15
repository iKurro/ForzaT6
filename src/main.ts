type ClaseObjetivo = 'D' | 'C' | 'B' | 'A' | 'S1' | 'S2' | 'X';
type TipoUso = 'Carretera' | 'Circuito' | 'Sprint' | 'Rally' | 'Drift' | 'Drag';
type Problema = 'Ninguno, solo base' | 'Subviraje' | 'Sobreviraje' | 'Falta de tracción' | 'Poca velocidad punta' | 'Frenada inestable';
type Seccion = 'Neumáticos' | 'Relación de marchas' | 'Alineamiento' | 'Barras estabilizadoras' | 'Muelles' | 'Amortiguación' | 'Aerodinámica' | 'Freno' | 'Diferencial';

interface Coche { nombre: string; traccion: 'RWD' | 'AWD' | 'FWD'; nota: string }
interface Reglaje { id: string; nombreVisible: string; seccion: Seccion; eje: string; valorRecomendado: string; explicacion: string; efectoAlSubir: string; efectoAlBajar: string; puedeAparecerBloqueado: boolean; piezaDesbloqueo?: string }
interface BuildFavorita { id: string; coche: string; claseObjetivo: ClaseObjetivo; tipoUso: TipoUso; problema: Problema; notas: string; fecha: string }

const STORAGE_KEY = 'forzat6-builds-favoritas';
const coches: Coche[] = [
  { nombre: "1989 Nissan Silvia K's", traccion: 'RWD', nota: 'Base ligera y reactiva; vigila la tracción trasera al salir de curvas lentas.' },
  { nombre: 'Toyota Supra RZ 1998', traccion: 'RWD', nota: 'Potente en recta; agradece diferencial progresivo y marchas no demasiado cortas.' },
  { nombre: 'Nissan Skyline GT-R V-Spec 1997', traccion: 'AWD', nota: 'AWD estable; el diferencial central ayuda a rotar o estabilizar el coche.' },
  { nombre: 'Mazda RX-7 1997', traccion: 'RWD', nota: 'Muy ágil; evita endurecer demasiado la trasera si aparece sobreviraje.' },
  { nombre: 'BMW M3 E46 2005', traccion: 'RWD', nota: 'Equilibrado para circuito; funciona bien con suspensión ajustable y aero moderada.' },
  { nombre: 'Ford Mustang GT 2018', traccion: 'RWD', nota: 'Mucho par; prioriza tracción, frenada estable y una transmisión final algo larga.' },
];
const clases: ClaseObjetivo[] = ['D', 'C', 'B', 'A', 'S1', 'S2', 'X'];
const usos: TipoUso[] = ['Carretera', 'Circuito', 'Sprint', 'Rally', 'Drift', 'Drag'];
const problemas: Problema[] = ['Ninguno, solo base', 'Subviraje', 'Sobreviraje', 'Falta de tracción', 'Poca velocidad punta', 'Frenada inestable'];
const secciones: Seccion[] = ['Neumáticos', 'Relación de marchas', 'Alineamiento', 'Barras estabilizadoras', 'Muelles', 'Amortiguación', 'Aerodinámica', 'Freno', 'Diferencial'];

const reglajes: Reglaje[] = [
  r('presion-delantera', 'Presión delantera', 'Neumáticos', 'delantero', '2,1 bar', 'Equilibra agarre, temperatura y respuesta del eje delantero.', 'Más respuesta y menor temperatura, pero menos agarre si se excede.', 'Más huella y agarre potencial, con respuesta más blanda.'),
  r('presion-trasera', 'Presión trasera', 'Neumáticos', 'trasero', '2,1 bar', 'Mantiene tracción sin hacer lenta la trasera.', 'Trasera más viva y fría, con riesgo de perder tracción.', 'Mejora tracción y estabilidad si no se calienta demasiado.'),
  r('transmision-final', 'Transmisión final', 'Relación de marchas', 'general', '3,78', 'Ajuste global entre aceleración y velocidad punta.', 'Marchas más cortas: más aceleración y menos punta.', 'Marchas más largas: más punta y menos respuesta.', 'Caja de cambios ajustable o de carreras'),
  ...[1, 2, 3, 4, 5].map((n) => r(`marcha-${n}`, `${n}ª marcha`, 'Relación de marchas', 'general', ['3,20', '2,15', '1,55', '1,18', '0,94'][n - 1], 'Afinado individual cuando hay caja completa.', 'Acorta esa marcha y mejora salida.', 'Alarga esa marcha y mejora velocidad antes del cambio.', 'Caja ajustable completa o caja de carreras')),
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

function r(id: string, nombreVisible: string, seccion: Seccion, eje: string, valorRecomendado: string, explicacion: string, efectoAlSubir: string, efectoAlBajar: string, piezaDesbloqueo?: string): Reglaje {
  return { id, nombreVisible, seccion, eje, valorRecomendado, explicacion, efectoAlSubir, efectoAlBajar, puedeAparecerBloqueado: Boolean(piezaDesbloqueo), piezaDesbloqueo };
}
function esc(value: string) { return value.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c); }
function cargarFavoritas(): BuildFavorita[] { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as BuildFavorita[]; } catch { return []; } }
function persistir() { localStorage.setItem(STORAGE_KEY, JSON.stringify(estado.favoritas)); }
function cocheActual() { return coches.find((c) => c.nombre === estado.coche) ?? coches[0]; }
function reglajesVisibles() { const c = cocheActual(); return reglajes.filter((reglaje) => c.traccion === 'AWD' || (!reglaje.id.includes('delantero-acel') && reglaje.id !== 'diferencial-central')); }
function consejos() { const c = cocheActual(); const lista = [...usoConsejos[estado.uso], ...problemaConsejos[estado.problema]]; if (estado.clase === 'S2' || estado.clase === 'X') lista.unshift('En S2/X, prioriza estabilidad, aero y frenos antes de añadir potencia.'); lista.push(c.traccion === 'AWD' ? 'Como es AWD, usa diferencial delantero/central para corregir subviraje o salida.' : 'Como es RWD, trata presión trasera y diferencial de aceleración con cambios pequeños.'); return lista; }

function render() {
  const root = document.querySelector<HTMLDivElement>('#root');
  if (!root) return;
  const c = cocheActual();
  const visibles = reglajesVisibles();
  const piezas = [...new Set(visibles.map((x) => x.piezaDesbloqueo).filter(Boolean))] as string[];
  root.innerHTML = `<main class="app-shell">
    <section class="hero card"><div><p class="eyebrow">Laboratorio personal de reglajes</p><h1>ForzaT6 - Tuning Lab</h1><p class="hero-copy">Genera una base de reglaje, diagnostica problemas de conducción y guarda tus builds favoritas sin intentar calcular combinaciones exactas de PI.</p></div><div class="hero-badge"><span>MVP</span><strong>FH6</strong></div></section>
    <section class="layout-grid"><form class="card control-panel"><div class="section-heading"><p class="eyebrow">Configuración</p><h2>Elige tu objetivo</h2></div>${select('coche', 'Selector de coche', coches.map((x) => x.nombre), estado.coche)}${select('clase', 'Clase objetivo', clases, estado.clase)}${select('uso', 'Tipo de uso', usos, estado.uso)}${select('problema', 'Problema a corregir', problemas, estado.problema)}<label><span>Notas personales por build</span><textarea id="notas" rows="5" placeholder="Ej.: probar en circuito urbano, revisar salida de curvas lentas...">${esc(estado.notas)}</textarea></label><div class="button-row"><button class="primary-button" type="button" id="generar">Generar reglaje</button><button class="secondary-button" type="button" id="guardar">Guardar build favorita</button></div></form>
    <aside class="card summary-card"><div class="section-heading"><p class="eyebrow">Perfil seleccionado</p><h2>${esc(c.nombre)}</h2></div><dl class="spec-list"><div><dt>Tracción</dt><dd>${c.traccion}</dd></div><div><dt>Clase</dt><dd>${estado.clase}</dd></div><div><dt>Uso</dt><dd>${estado.uso}</dd></div><div><dt>Diagnóstico</dt><dd>${estado.problema}</dd></div></dl><p class="car-note">${esc(c.nota)}</p><p class="scope-warning">Este MVP ofrece orientación de reglajes y piezas que desbloquean ajustes; no calcula piezas exactas para alcanzar un PI.</p></aside></section>
    ${estado.generado ? resultados(visibles, piezas) : ''}${favoritas()}</main>`;
  enlazarEventos();
}
function select(id: string, label: string, opts: readonly string[], val: string) { return `<label><span>${label}</span><select id="${id}">${opts.map((o) => `<option value="${esc(o)}" ${o === val ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select></label>`; }
function resultados(visibles: Reglaje[], piezas: string[]) { return `<section class="results-stack"><section class="card"><div class="section-heading horizontal"><div><p class="eyebrow">Resultado</p><h2>Reglaje base recomendado</h2></div><span class="pill">${estado.uso} · Clase ${estado.clase}</span></div><div class="tuning-sections">${secciones.map((s) => `<article class="tuning-section"><h3>${s}</h3><div class="setting-grid">${visibles.filter((rgl) => rgl.seccion === s).map(tarjeta).join('')}</div></article>`).join('')}</div></section><section class="two-column"><article class="card"><div class="section-heading"><p class="eyebrow">Corrección</p><h2>Consejos para probar</h2></div><ol class="advice-list">${consejos().map((x) => `<li>${esc(x)}</li>`).join('')}</ol></article><article class="card warning-card"><div class="section-heading"><p class="eyebrow">Ajustes bloqueados</p><h2>Piezas que suelen desbloquear reglajes</h2></div><ul class="parts-list">${piezas.map((p) => `<li>${esc(p)}: puede desbloquear ajustes relacionados.</li>`).join('')}</ul></article></section></section>`; }
function tarjeta(reglaje: Reglaje) { return `<div class="setting-card"><div class="setting-title"><strong>${esc(reglaje.nombreVisible)}</strong>${reglaje.puedeAparecerBloqueado ? '<span class="lock-tag">Puede estar bloqueado</span>' : ''}</div><p class="setting-value">${esc(reglaje.valorRecomendado)}</p><p>${esc(reglaje.explicacion)}</p><ul><li>Al subir: ${esc(reglaje.efectoAlSubir)}</li><li>Al bajar: ${esc(reglaje.efectoAlBajar)}</li></ul>${reglaje.piezaDesbloqueo ? `<small>Desbloqueo habitual: ${esc(reglaje.piezaDesbloqueo)}</small>` : ''}</div>`; }
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
