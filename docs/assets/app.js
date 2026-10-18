// Bibliothèque Française — filtros do catálogo e lista pessoal (salva só no navegador do leitor).
(function () {
  const KEY = 'bibliotheque-francaise:v1';
  let store = { lido: {}, quero: {} };
  try { store = Object.assign(store, JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} };

  // marcações em qualquer página que tenha cards
  document.querySelectorAll('.obra').forEach(card => {
    const id = card.id;
    card.querySelectorAll('.mark').forEach(b => {
      const kind = b.dataset.kind;
      b.setAttribute('aria-pressed', store[kind][id] ? 'true' : 'false');
      b.addEventListener('click', () => {
        if (store[kind][id]) delete store[kind][id]; else store[kind][id] = Date.now();
        if (kind === 'lido' && store.lido[id]) delete store.quero[id];
        if (kind === 'quero' && store.quero[id]) delete store.lido[id];
        card.querySelectorAll('.mark').forEach(x => x.setAttribute('aria-pressed', store[x.dataset.kind][id] ? 'true' : 'false'));
        save(); if (document.getElementById('grid')) window.apply(false);
      });
    });
  });

  // cabeçalho fixo: a linha do portal rola para fora e os filtros ficam logo abaixo da parte que permanece
  const header = document.querySelector('.site-header'), eco = document.querySelector('.eco');
  const syncTopo = () => {
    if (!header) return;
    const e = eco ? eco.offsetHeight : 0;
    document.documentElement.style.setProperty('--eco', e + 'px');
    document.documentElement.style.setProperty('--topo', (header.offsetHeight - e) + 'px');
  };
  syncTopo(); window.addEventListener('resize', syncTopo);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncTopo);

  // menu em telas estreitas: o botão só aparece com JS; sem JS a lista de links fica visível
  const navToggle = document.getElementById('nav-toggle'), nav = document.getElementById('menu');
  if (navToggle && nav) {
    navToggle.hidden = false; nav.classList.add('closed');
    const setNav = open => { nav.classList.toggle('closed', !open); navToggle.setAttribute('aria-expanded', String(open)); };
    navToggle.addEventListener('click', () => setNav(nav.classList.contains('closed')));
    document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && !nav.classList.contains('closed')) { setNav(false); navToggle.focus(); } });
  }

  const grid = document.getElementById('grid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.obra'));
  const q = document.getElementById('q'), fonte = document.getElementById('fonte'), ordem = document.getElementById('ordem');
  const trilha = document.getElementById('trilha');
  const audio = document.getElementById('f-audio'), pdf = document.getElementById('f-pdf'), lista = document.getElementById('lista');
  const count = document.getElementById('count'), empty = document.getElementById('empty');
  const chipGroups = { etapa: new Set(), forma: new Set() };
  const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  document.querySelectorAll('.chip-btn').forEach(b => b.addEventListener('click', () => {
    const g = chipGroups[b.dataset.group], v = b.dataset.value;
    if (g.has(v)) g.delete(v); else g.add(v);
    b.setAttribute('aria-pressed', g.has(v) ? 'true' : 'false');
    apply(true);
  }));
  [q, fonte, trilha, ordem, audio, pdf, lista].forEach(el => el && el.addEventListener(el === q ? 'input' : 'change', () => apply(true)));

  function visible(c) {
    const d = c.dataset;
    if (chipGroups.etapa.size && !chipGroups.etapa.has(d.etapa)) return false;
    if (chipGroups.forma.size && !chipGroups.forma.has(d.forma)) return false;
    if (fonte.value && d.fonte !== fonte.value) return false;
    if (trilha && trilha.value && !(' ' + d.trilha + ' ').includes(' ' + trilha.value + ' ')) return false;
    if (audio.checked && d.audio !== '1') return false;
    if (pdf.checked && d.pdf !== '1') return false;
    if (lista.value === 'quero' && !store.quero[c.id]) return false;
    if (lista.value === 'lido' && !store.lido[c.id]) return false;
    if (lista.value === 'nao-lido' && store.lido[c.id]) return false;
    const t = norm(q.value.trim());
    return !t || t.split(/\s+/).every(w => d.q.includes(w));
  }
  const sorters = {
    sugerida: (a, b) => a.dataset.i - b.dataset.i,
    curtas: (a, b) => a.dataset.min - b.dataset.min,
    longas: (a, b) => b.dataset.min - a.dataset.min,
    titulo: (a, b) => a.dataset.t.localeCompare(b.dataset.t, 'it'),
  };
  function apply(push) {
    const shown = cards.filter(visible).sort(sorters[ordem.value] || sorters.sugerida);
    cards.forEach(c => { c.hidden = true; });
    shown.forEach(c => { c.hidden = false; grid.appendChild(c); });
    count.textContent = shown.length === 1 ? '1 obra' : shown.length + ' obras';
    empty.hidden = shown.length > 0;
    if (push) {
      const p = new URLSearchParams();
      if (chipGroups.etapa.size) p.set('etapa', [...chipGroups.etapa].join(','));
      if (chipGroups.forma.size) p.set('forma', [...chipGroups.forma].join(','));
      if (fonte.value) p.set('fonte', fonte.value);
      if (trilha && trilha.value) p.set('trilha', trilha.value);
      if (audio.checked) p.set('audio', '1');
      if (pdf.checked) p.set('pdf', '1');
      if (lista.value) p.set('lista', lista.value);
      if (ordem.value !== 'sugerida') p.set('ordem', ordem.value);
      if (q.value.trim()) p.set('q', q.value.trim());
      history.replaceState(null, '', (p.toString() ? '?' + p : location.pathname));
    }
    if (fBtn && fMore) setMore(!fMore.classList.contains('closed'));
    return shown;
  }
  window.apply = apply;

  // em telas estreitas, etapas, formas e opções extras ficam recolhidas atrás de "Mais filtros"
  const fBtn = document.getElementById('filtros-botao'), fMore = document.getElementById('filtros-mais');
  const extras = () => Object.values(chipGroups).reduce((n, s) => n + s.size, 0) + (audio.checked ? 1 : 0) + (pdf.checked ? 1 : 0) + (lista.value ? 1 : 0);
  function setMore(open) {
    if (!fBtn || !fMore) return;
    fMore.classList.toggle('closed', !open); fBtn.setAttribute('aria-expanded', String(open));
    const n = extras(); fBtn.textContent = (open ? 'Menos filtros' : 'Mais filtros') + (n ? ' (' + n + ')' : '');
  }
  if (fBtn && fMore) {
    fBtn.hidden = false;
    fBtn.addEventListener('click', () => setMore(fMore.classList.contains('closed')));
  }

  // estado inicial a partir da URL (links compartilháveis, ex.: catalogo.html?etapa=1&audio=1)
  const p = new URLSearchParams(location.search);
  ['etapa', 'forma'].forEach(g => (p.get(g) || '').split(',').filter(Boolean).forEach(v => {
    chipGroups[g].add(v);
    const b = document.querySelector(`.chip-btn[data-group="${g}"][data-value="${CSS.escape(v)}"]`);
    if (b) b.setAttribute('aria-pressed', 'true');
  }));
  if (p.get('fonte')) fonte.value = p.get('fonte');
  if (p.get('trilha') && trilha) trilha.value = p.get('trilha');
  if (p.get('audio')) audio.checked = true;
  if (p.get('pdf')) pdf.checked = true;
  if (p.get('lista')) lista.value = p.get('lista');
  if (p.get('ordem')) ordem.value = p.get('ordem');
  if (p.get('q')) q.value = p.get('q');
  if (fBtn && fMore) setMore(!window.matchMedia('(max-width: 640px)').matches || extras() > 0);
  apply(false);

  document.getElementById('limpar').addEventListener('click', () => {
    Object.values(chipGroups).forEach(s => s.clear());
    document.querySelectorAll('.chip-btn').forEach(b => b.setAttribute('aria-pressed', 'false'));
    q.value = ''; fonte.value = ''; if (trilha) trilha.value = ''; audio.checked = false; pdf.checked = false; lista.value = ''; ordem.value = 'sugerida';
    apply(true);
  });
  document.getElementById('sorteio').addEventListener('click', () => {
    const pool = apply(false).filter(c => !store.lido[c.id]);
    if (!pool.length) return;
    const c = pool[Math.floor(Math.random() * pool.length)];
    c.scrollIntoView({ behavior: 'smooth', block: 'center' });
    c.classList.add('flash'); setTimeout(() => c.classList.remove('flash'), 2200);
    const link = c.querySelector('h3'); if (link) link.setAttribute('tabindex', '-1'), link.focus({ preventScroll: true });
  });
})();
