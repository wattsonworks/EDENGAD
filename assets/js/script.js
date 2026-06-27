/* =================================================================
   EDEN & GAD — Save the Date · interaction engine
   ================================================================= */
'use strict';

/* -----------------------------------------------------------------
   CONFIG  — edit these before sharing the link
   ----------------------------------------------------------------- */
const CONFIG = {
  names: { en: 'Eden & Gad', he: 'עדן & גד' },

  /* The wedding: Sunday · 12 Av 5786 · 26 July 2026.
     Reception 19:30, Chuppah & Kiddushin 20:30 (Israel time). */
  dateISO: '2026-07-26T20:30:00+03:00',   // chuppah, Israel time (UTC+3, summer)

  /* RSVP — set the WhatsApp number in international format, no "+" / spaces.
     e.g. '972501234567'.  Leave empty to hide the RSVP button. */
  whatsapp: '',

  /* Calendar event */
  cal: {
    title: 'החתונה של עדן וגד · Eden & Gad Wedding',
    location: 'אולמי אלכסנדר, המסיק 2, עמק חפר',   // verify exact venue/address
    durationHours: 5,
  },

  /* "Want an invitation like this?" maker promo at the foot of the page */
  maker: { whatsapp: '972506787586', display: '050-678-7586' },
};

const I18N = {
  en: {
    loading: 'One moment…',
    enterHint: 'Tap here to enter',
    tapOpen: 'Tap to open',
    stdMini: 'SAVE THE DATE',
    namesMini: 'Eden & Gad',
    overline: 'With joy, we invite you to celebrate',
    invite2: 'the happiest day of our lives,',
    invite3: 'with God’s blessing, on Sunday · 12 Av 5786',
    dateLabel: '12 Av 5786 · 26.07.2026',
    revealLabel: 'A moment with us',
    scratchInstruct: 'Scratch the circle',
    scratchHint: 'Scratch to reveal',
    ntInv1: 'With joy and excitement',
    ntInv2: 'we invite you to celebrate with us',
    ntInv3: 'on our wedding day',
    ntDay: 'Sunday',
    ntHdate: '12 Av 5786',
    ntSched: 'Reception 19:30 · Chuppah & Kiddushin 20:30',
    ntVenue1: 'Alexander Halls',
    ntVenue2: 'HaMasik 2, Emek Hefer',
    ntClose1: 'We would love to see you and share with us',
    ntClose2: 'an evening of love, joy and blessing',
    templeVerse: 'In the courtyards of Your holiness…',
    cdDays: 'days', cdHours: 'hours', cdMins: 'mins', cdSecs: 'secs',
    scrollMore: 'Scroll for more',
    makerQ: 'Want an invitation like this?',
    quote: 'And it seemed to me that the land I walked upon, and the streets I passed through, and the whole world entire — are but a corridor leading to this house.',
    quoteAuthor: 'S. Y. Agnon',
    storyTitle: 'Our story, in light',
    storyText: 'From the first golden hour by the sea to a “yes” that changed everything — we can’t wait to celebrate the next chapter with you.',
    detailsTitle: 'We would love to see you',
    whenLabel: 'When', schedLabel: 'Schedule', whereLabel: 'Where',
    whenValue: 'Sunday · 26 July 2026',
    whenSub: '12 Av 5786',
    schedValue: 'Reception 19:30',
    schedSub: 'Chuppah & Kiddushin 20:30',
    whereValue: 'Alexander Halls',
    whereSub: 'HaMasik 2, Emek Hefer',
    addCal: 'Add to calendar',
    rsvp: 'RSVP on WhatsApp',
    footer: 'We can’t wait to see you · 26.07.2026',
  },
  he: {
    loading: 'רגע אחד…',
    enterHint: 'לחצו כאן לכניסה',
    tapOpen: 'הקליקו לפתיחה',
    stdMini: 'שמרו את התאריך',
    namesMini: 'עדן & גד',
    overline: 'נרגשים להזמינכם לחגוג עימנו',
    invite2: 'את היום המאושר בחיינו,',
    invite3: 'שיתקיים בעזרת ה׳ ביום ראשון, י״ב אב, התשפ״ו',
    dateLabel: 'י״ב באב התשפ״ו · 26.07.2026',
    revealLabel: 'רגע איתנו',
    scratchInstruct: 'גרדו את העיגול',
    scratchHint: 'גרדו כדי לחשוף',
    ntInv1: 'בשמחה ובהתרגשות',
    ntInv2: 'מזמינים אתכם לחגוג עמנו',
    ntInv3: 'ביום חתונתנו',
    ntDay: 'יום ראשון',
    ntHdate: 'י״ב באב תשפ״ו',
    ntSched: 'קבלת פנים 19:30 · חופה וקידושין 20:30',
    ntVenue1: 'אולמי אלכסנדר',
    ntVenue2: 'המסיק 2, עמק חפר',
    ntClose1: 'נשמח לראותכם ולחלוק עמכם',
    ntClose2: 'ערב של אהבה, שמחה וברכה',
    templeVerse: 'בְּחַצְרוֹת קׇדְשֶׁךָ…',
    cdDays: 'ימים', cdHours: 'שעות', cdMins: 'דקות', cdSecs: 'שניות',
    scrollMore: 'גללו להמשך',
    makerQ: 'רוצים הזמנה כזאת?',
    quote: 'וְדוֹמֶה הָיָה לִי שֶׁהָאָרֶץ שֶׁהָלַכְתִּי עָלֶיהָ וְהָרְחוֹבוֹת שֶׁעָבַרְתִּי בָּהֶם וְכָל הָעוֹלָם כֻּלּוֹ, אֵינָם אֶלָּא פְּרוֹזְדוֹר לְבַיִת זֶה.',
    quoteAuthor: 'ש״י עגנון',
    storyTitle: 'הסיפור שלנו, באור',
    storyText: 'משעת הזהב הראשונה מול הים ועד ה״כן״ ששינה הכול — אנחנו לא יכולים לחכות לחגוג איתכם את הפרק הבא.',
    detailsTitle: 'נשמח לראותכם',
    whenLabel: 'מתי', schedLabel: 'לוח זמנים', whereLabel: 'איפה',
    whenValue: 'יום ראשון · 26 ביולי 2026',
    whenSub: 'י״ב באב התשפ״ו',
    schedValue: 'קבלת פנים 19:30',
    schedSub: 'חופה וקידושין 20:30',
    whereValue: 'אולמי אלכסנדר',
    whereSub: 'המסיק 2, עמק חפר',
    addCal: 'הוספה ליומן',
    rsvp: 'אישור הגעה בוואטסאפ',
    footer: 'נשמח לראותכם · 26.07.2026',
  },
};

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* =================================================================
   PRELOADER — load the gate + every surprise, THEN reveal the gate
   ================================================================= */
(function preload() {
  const pre = $('#preloader');
  if (!pre) return;
  const fill = $('#preBarFill');
  const assets = ['bg.jpg', 'gate.webp', 'reveal.jpg', 'envbody.webp', 'envlid.webp',
                  'cardblank.webp', 'temple.webp'].map(f => 'assets/img/' + f);
  const total = assets.length;
  let loaded = 0, finished = false;

  function dismiss() {
    if (finished) return; finished = true;
    if (fill) fill.style.width = '100%';
    setTimeout(() => {
      pre.classList.add('done');
      setTimeout(() => { pre.style.display = 'none'; }, 900);
    }, 350);
  }
  function bump() {
    loaded++;
    if (fill) fill.style.width = Math.round(loaded / total * 100) + '%';
    if (loaded >= total) dismiss();
  }
  assets.forEach(src => { const img = new Image(); img.onload = bump; img.onerror = bump; img.src = src; });
  setTimeout(dismiss, 8000);   // safety: never hang
})();


/* =================================================================
   LANGUAGE
   ================================================================= */
function setLang(lang) {
  const dict = I18N[lang] || I18N.en;
  document.documentElement.lang = lang;
  document.documentElement.dir  = lang === 'he' ? 'rtl' : 'ltr';

  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] != null) el.textContent = dict[key];
  });

  // names swap (Hebrew vs English name spans)
  $$('.nt-en, .name-en').forEach(el => el.hidden = lang === 'he');
  $$('.nt-he, .name-he').forEach(el => el.hidden = lang !== 'he');

  $$('.lang-btn').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
  buildActionLinks();
  try { localStorage.setItem('eg_lang', lang); } catch (e) {}
}

$$('.lang-btn').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));


/* =================================================================
   SOUND  (looping music + synthesised accent chimes)
   ================================================================= */
let soundOn = false, audioCtx = null;
const soundBtn = $('#soundBtn');
const bgm = $('#bgm');
const MUSIC_VOL = 0.5;

function ensureCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
}
function playMusic(fromStart) {
  if (!bgm) return;
  if (fromStart) { try { bgm.currentTime = 0; } catch (e) {} }   // ignite from the beginning
  bgm.volume = MUSIC_VOL * 0.4;
  bgm.play().then(() => {                                         // quick swell so it kicks in
    let v = bgm.volume;
    const id = setInterval(() => { v = Math.min(MUSIC_VOL, v + 0.08); bgm.volume = v;
      if (v >= MUSIC_VOL) clearInterval(id); }, 50);
  }).catch(() => {});
}
function setSound(on, fromStart) {
  soundOn = on;
  soundBtn.setAttribute('aria-pressed', String(on));
  if (on) { ensureCtx(); playMusic(fromStart); }
  else if (bgm) bgm.pause();
}
soundBtn.addEventListener('click', () => setSound(!soundOn, false));   // toggle resumes, doesn't restart

/* synth chimes removed — the looping music carries the whole vibe */
function chime() {}
function sparkleChime() {}


/* =================================================================
   ACT 0 — ENVELOPE
   ================================================================= */
/* --- ACT −1: the gate swings open, revealing the scratch card --- */
const gate = $('#gate');
const scratchScene = $('#scratch-scene');
let gateOpened = false;
function openGate() {
  if (gateOpened) return;
  gateOpened = true;
  setSound(true, true);      // ignite the music from its beginning on this first gesture
  gate.classList.add('open');
  setTimeout(() => gate.classList.add('gone'), 2300);
  setTimeout(() => { gate.style.display = 'none'; armScratch(); }, 2850);
}
if (gate) {
  gate.addEventListener('click', openGate);
  gate.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openGate(); }
  });
}

const scene = $('#envelope-scene');
const env3d = $('#envelope3d');
let opened = false;

/* --- cinematic open sequence: seal breaks → flap unfolds → card rises → fly-in --- */
function openEnvelope() {
  if (opened) return;
  opened = true;
  document.body.classList.add('opened');
  stopParallax();

  // 1. seal cracks + bursts
  spawnSealBurst();
  scene.classList.add('is-breaking');

  // 2. the lid folds up, opening the envelope
  setTimeout(() => scene.classList.add('is-open'), 300);

  // ...and a burst of doves flies out of it, carrying the note into view
  setTimeout(() => spawnDoves(), 380);

  // 3. gently lift the open envelope away & hand off to the card scene
  setTimeout(() => scene.classList.add('dismiss'), 2150);
  setTimeout(() => {
    document.body.classList.remove('locked');
    scene.style.display = 'none';
    revealCardScene();
  }, 2750);
}

/* show the countdown + scroll hints once the card scene is live */
function revealCardScene() {
  setTimeout(() => $('#countdown')?.classList.add('show'), 300);
  startCountdown();
  setTimeout(() => {
    $('#scrollDown')?.classList.add('show');      // persistent "scroll for more" cue
  }, 1100);
}

/* hide the persistent scroll arrow once the reader reaches the bottom */
window.addEventListener('scroll', () => {
  const sd = $('#scrollDown');
  if (!sd) return;
  const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 130;
  sd.classList.toggle('at-bottom', nearBottom);
}, { passive: true });

/* the sun rises from behind the temple as that section scrolls up through the view */
(() => {
  const sun = $('[data-temple-sun]');
  const wrap = sun && sun.closest('.temple-wrap');
  if (!sun || !wrap) return;
  if (prefersReduced) { sun.style.setProperty('--p', '0.6'); return; }   // static risen sun
  let ticking = false;
  const update = () => {
    ticking = false;
    const r = wrap.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const center = r.top + r.height / 2;                 // section centre vs viewport
    let p = (vh * 0.92 - center) / (vh * 0.92 - vh * 0.28);
    p = p < 0 ? 0 : p > 1 ? 1 : p;
    sun.style.setProperty('--p', p.toFixed(3));
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();

scene.addEventListener('click', openEnvelope);
scene.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnvelope(); }
});

/* seal-break particles */
function spawnSealBurst() {
  const host = $('#sealBurst');
  if (!host || prefersReduced) return;
  for (let i = 0; i < 11; i++) {
    const b = document.createElement('span');
    b.className = 'burst-bit';
    const ang = (Math.PI * 2 * i / 11) + Math.random() * 0.5;
    const dist = 22 + Math.random() * 28;
    const sz = 4 + Math.random() * 4;
    b.style.width = b.style.height = sz.toFixed(1) + 'px';
    b.style.setProperty('--bx', (Math.cos(ang) * dist).toFixed(1) + 'px');
    b.style.setProperty('--by', (Math.sin(ang) * dist).toFixed(1) + 'px');
    host.appendChild(b);
  }
}

/* a burst of white doves flies out of the opening envelope, revealing the note */
const DOVE_SVG =
  '<svg viewBox="-50 -46 100 92" class="dove-svg" aria-hidden="true">' +
    '<g class="wings">' +
      '<path d="M-3 -1 C-22 -30 -40 -29 -46 -13 C-30 -9 -16 -1 -3 6 Z"/>' +
      '<path d="M3 -1 C22 -30 40 -29 46 -13 C30 -9 16 -1 3 6 Z"/>' +
    '</g>' +
    '<ellipse cx="0" cy="7" rx="5.4" ry="15"/>' +
    '<circle cx="0" cy="-12" r="4.5"/>' +
    '<path d="M-4 19 L0 31 L4 19 Z"/>' +
  '</svg>';

function spawnDoves() {
  const host = $('#doveBurst');
  if (!host || prefersReduced) return;
  host.innerHTML = '';
  const N = 11;
  for (let i = 0; i < N; i++) {
    const d = document.createElement('span');
    d.className = 'dove';
    d.innerHTML = DOVE_SVG;
    const spread = (i / (N - 1) - 0.5) * 2;          // -1 … 1 (left → right)
    const angle  = spread * 1.18;                     // radians off straight-up (±~68°)
    const dist   = 48 + Math.random() * 38;
    const dx = Math.sin(angle) * dist;
    const dy = -(Math.cos(angle) * dist) - 8;         // upward bias — released into the sky
    d.style.setProperty('--sz',   (30 + Math.random() * 20).toFixed(0) + 'px');
    d.style.setProperty('--dx',   dx.toFixed(1) + 'vw');
    d.style.setProperty('--dy',   dy.toFixed(1) + 'vh');
    d.style.setProperty('--rot0', (spread * 9).toFixed(1) + 'deg');
    d.style.setProperty('--rot',  (spread * 24 + (Math.random() * 10 - 5)).toFixed(1) + 'deg');
    d.style.setProperty('--sc',   (0.85 + Math.random() * 0.5).toFixed(2));
    d.style.setProperty('--dur',  (1.5 + Math.random() * 0.7).toFixed(2) + 's');
    d.style.setProperty('--delay',(i * 0.045 + Math.random() * 0.05).toFixed(2) + 's');
    d.style.setProperty('--flap', (0.26 + Math.random() * 0.12).toFixed(2) + 's');
    host.appendChild(d);
  }
  setTimeout(() => { host.innerHTML = ''; }, 3200);
}

/* ambient floating petals / sparkles behind the envelope */
function spawnPetals() {
  const host = $('#petals');
  if (!host || prefersReduced) return;
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('span');
    const star = Math.random() > 0.5;
    p.className = 'petal ' + (star ? 'star' : 'dot');
    const size = star ? (9 + Math.random() * 8) : (4 + Math.random() * 7);
    if (star) { p.textContent = '✦'; p.style.fontSize = size + 'px'; }
    else { p.style.width = p.style.height = size + 'px'; }
    p.style.left = (Math.random() * 100) + '%';
    p.style.setProperty('--op', (0.4 + Math.random() * 0.5).toFixed(2));
    p.style.setProperty('--sway', ((Math.random() * 2 - 1) * 44).toFixed(0) + 'px');
    p.style.setProperty('--spin', ((Math.random() * 2 - 1) * 230).toFixed(0) + 'deg');
    p.style.animation = `floatUp ${(9 + Math.random() * 9).toFixed(1)}s linear ${(-Math.random() * 16).toFixed(1)}s infinite`;
    host.appendChild(p);
  }
}

/* subtle 3D parallax tilt of the envelope (mouse + device tilt) before it opens */
let parallaxOn = true;
function setTilt(rx, ry) {
  if (!parallaxOn || !env3d) return;
  env3d.style.setProperty('--rx', rx.toFixed(2) + 'deg');
  env3d.style.setProperty('--ry', ry.toFixed(2) + 'deg');
}
function stopParallax() {
  parallaxOn = false;
  if (env3d) { env3d.style.setProperty('--rx', '0deg'); env3d.style.setProperty('--ry', '0deg'); }
}
if (!prefersReduced) {
  window.addEventListener('mousemove', e => {
    const cx = innerWidth / 2, cy = innerHeight / 2;
    setTilt(((e.clientY - cy) / cy) * -6, ((e.clientX - cx) / cx) * 7);
  });
  window.addEventListener('deviceorientation', e => {
    setTilt(Math.max(-8, Math.min(8, ((e.beta || 0) - 40) * -0.18)),
            Math.max(-8, Math.min(8, (e.gamma || 0) * 0.4)));
  });
}


/* =================================================================
   ACT 1 — SCRATCH CARD
   ================================================================= */
const circle   = $('#revealCircle');
const canvas   = $('#scratch');
const hint     = $('#scratchHint');
const sparkLay = $('#sparkleLayer');
let ctx, scratching = false, lastPt = null, revealed = false, scratchArmed = false, foilReady = false;

/* Paint the foil immediately at boot (behind the closed envelope) so the photo
   can never flash uncovered while the canvas is still being prepared. */
function setupFoil() {
  if (prefersReduced || revealed) return;
  const dpr  = Math.min(window.devicePixelRatio || 1, 2.5);
  const rect = circle.getBoundingClientRect();
  const w = Math.round(rect.width), h = Math.round(rect.height);
  if (!w || !h) return;
  canvas.width = w * dpr; canvas.height = h * dpr;
  canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
  ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);   // setTransform (not scale) so repaints don't compound
  paintFoil(w, h);
  foilReady = true;
}

/* Attach the scratch listeners once the envelope is open and the card is live. */
function armScratch() {
  if (scratchArmed) return;
  scratchArmed = true;
  if (prefersReduced) { finishReveal(); return; }   // skip the manual scratch
  if (!foilReady) setupFoil();
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
}

/* Keep the foil sized to the circle if the viewport changes before reveal. */
window.addEventListener('resize', () => { if (!revealed && !scratching) setupFoil(); });

function paintFoil(w, h) {
  // gilded cream / kraft foil
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0,   '#dcc9a4');
  g.addColorStop(0.45,'#ece0c2');
  g.addColorStop(0.5, '#f6efdb');
  g.addColorStop(0.55,'#ece0c2');
  g.addColorStop(1,   '#cdba93');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // warm speckle texture
  for (let i = 0; i < (w * h) / 90; i++) {
    ctx.fillStyle = Math.random() > 0.5
      ? `rgba(250,240,210,${Math.random() * 0.14})`
      : `rgba(150,120,70,${Math.random() * 0.10})`;
    ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
  }
  // subtle ring + sparkle glyph
  ctx.strokeStyle = 'rgba(150,120,70,.32)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(w/2, h/2, Math.min(w,h)/2 - 10, 0, Math.PI*2); ctx.stroke();
  ctx.fillStyle = 'rgba(150,120,70,.45)';
  ctx.font = `${Math.round(w*0.13)}px serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('✶', w*0.5, h*0.5);
}

function ptFrom(e) {
  const r = canvas.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
}
function onDown(e) {
  if (revealed) return;
  scratching = true; lastPt = ptFrom(e);
  try { canvas.setPointerCapture?.(e.pointerId); } catch (err) {}
  scratchAt(lastPt.x, lastPt.y);
  hint.classList.add('hidden');
  $('#scratchGuide')?.classList.add('hidden');
}
function onMove(e) {
  if (!scratching || revealed) return;
  const p = ptFrom(e);
  // interpolate for smooth stroke
  const dist = Math.hypot(p.x - lastPt.x, p.y - lastPt.y);
  const steps = Math.max(1, Math.floor(dist / 4));
  for (let i = 1; i <= steps; i++) {
    scratchAt(lastPt.x + (p.x - lastPt.x) * i / steps,
              lastPt.y + (p.y - lastPt.y) * i / steps);
  }
  lastPt = p;
}
function onUp() {
  if (!scratching) return;
  scratching = false;
  if (!revealed && scratchedRatio() > 0.5) finishReveal();
}
function scratchAt(x, y) {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(0,0,0,1)';        // fully opaque so foil clears completely
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
}

let lastCheck = 0;
function scratchedRatio() {
  const w = canvas.width, h = canvas.height;
  const img = ctx.getImageData(0, 0, w, h).data;
  let clear = 0, total = 0;
  const step = 16 * 4;                    // sample sparsely for speed
  for (let i = 3; i < img.length; i += step) { total++; if (img[i] < 40) clear++; }
  return clear / total;
}

// live finish check while dragging (throttled)
canvas?.addEventListener('pointermove', () => {
  const now = performance.now();
  if (revealed || !ctx || now - lastCheck < 220) return;
  lastCheck = now;
  if (scratchedRatio() > 0.5) finishReveal();
});

function finishReveal() {
  if (revealed) return;
  revealed = true;
  hint.classList.add('hidden');
  $('#scratchGuide')?.classList.add('hidden');
  canvas.classList.add('cleared');
  document.body.classList.add('revealed');

  spawnSparkles();

  // the scratch is revealed — dismiss it, then OPEN the envelope on its own
  // so it flows straight into the invitation (no second tap needed)
  setTimeout(() => scratchScene && scratchScene.classList.add('dismiss'), 1500);
  setTimeout(() => { if (scratchScene) scratchScene.style.display = 'none'; }, 2400);
  setTimeout(() => openEnvelope(), 2600);
}

/* tapping the persistent cue gently advances the reader down the page */
$('#scrollDown')?.addEventListener('click', () =>
  window.scrollBy({ top: Math.round(window.innerHeight * 0.85), behavior: 'smooth' }));


/* =================================================================
   SPARKLES over the revealed photo
   ================================================================= */
function spawnSparkles() {
  if (prefersReduced) return;
  const N = 22;
  for (let i = 0; i < N; i++) {
    const s = document.createElement('span');
    const star = Math.random() > 0.45;
    s.className = 'spark' + (star ? ' star' : '');
    const x = Math.random() * 100;
    s.style.left = x + '%';
    const size = 4 + Math.random() * 6;
    s.style.width = s.style.height = size + 'px';

    if (Math.random() > 0.5) {           // falling
      s.style.top = '-6px';
      s.style.setProperty('--fall', (60 + Math.random() * 150) + 'px');
      s.style.animation = `fall ${2.6 + Math.random()*2.6}s linear ${Math.random()*3}s infinite`;
    } else {                             // twinkle in place
      s.style.top = (Math.random() * 100) + '%';
      s.style.animation = `twinkle ${1.8 + Math.random()*2}s ease-in-out ${Math.random()*2}s infinite`;
    }
    sparkLay.appendChild(s);
  }
}


/* =================================================================
   COUNTDOWN
   ================================================================= */
let cdTimer = null;
function startCountdown() {
  if (cdTimer) return;
  const target = new Date(CONFIG.dateISO).getTime();
  const els = {
    days:  $('[data-cd="days"]'),  hours: $('[data-cd="hours"]'),
    mins:  $('[data-cd="mins"]'),  secs:  $('[data-cd="secs"]'),
  };
  const tick = () => {
    let diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / 864e5); diff -= d * 864e5;
    const h = Math.floor(diff / 36e5);  diff -= h * 36e5;
    const m = Math.floor(diff / 6e4);   diff -= m * 6e4;
    const s = Math.floor(diff / 1e3);
    els.days.textContent  = d;
    els.hours.textContent = String(h).padStart(2, '0');
    els.mins.textContent  = String(m).padStart(2, '0');
    els.secs.textContent  = String(s).padStart(2, '0');
  };
  tick();
  cdTimer = setInterval(tick, 1000);
}


/* =================================================================
   CALENDAR (.ics) + RSVP links
   ================================================================= */
function buildActionLinks() {
  // RSVP
  const rsvp = $('#rsvpBtn');
  if (CONFIG.whatsapp) {
    const lang = document.documentElement.lang === 'he' ? 'he' : 'en';
    const msg = lang === 'he'
      ? `שלום! נשמח לאשר הגעה לחתונה של עדן וגד 🤍`
      : `Hi! We'd love to come to Eden & Gad's wedding 🤍`;
    rsvp.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
    rsvp.style.display = '';
  } else {
    rsvp.style.display = 'none';
  }

  // .ics calendar file (data URI)
  const cal = $('#calBtn');
  const start = new Date(CONFIG.dateISO);
  const end   = new Date(start.getTime() + CONFIG.cal.durationHours * 36e5);
  const fmt = dt => dt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//EdenGad//SaveTheDate//EN',
    'BEGIN:VEVENT',
    'UID:edengad-2026-07-26@savethedate',
    'DTSTAMP:' + fmt(start),
    'DTSTART:' + fmt(start),
    'DTEND:'   + fmt(end),
    'SUMMARY:' + CONFIG.cal.title,
    CONFIG.cal.location ? 'LOCATION:' + CONFIG.cal.location : '',
    'DESCRIPTION:Save the date — Eden & Gad are getting married!',
    'END:VEVENT', 'END:VCALENDAR',
  ].filter(Boolean).join('\r\n');
  cal.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);

  // "Want an invitation like this?" — maker WhatsApp link (prefill matches the language)
  const maker = $('#makerLink');
  if (maker && CONFIG.maker?.whatsapp) {
    const lang = document.documentElement.lang === 'he' ? 'he' : 'en';
    const mmsg = lang === 'he'
      ? 'היי! ראיתי הזמנה דיגיטלית כזו ואשמח לפרטים 🤍'
      : 'Hi! I saw a digital invitation like this and would love some details 🤍';
    maker.href = `https://wa.me/${CONFIG.maker.whatsapp}?text=${encodeURIComponent(mmsg)}`;
  }
}


/* =================================================================
   SCROLL REVEALS
   ================================================================= */
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  });
}, { threshold: 0.15 });
$$('.reveal-on-scroll').forEach(el => io.observe(el));


/* =================================================================
   BOOT
   ================================================================= */
(function boot() {
  document.body.classList.add('locked');
  let lang = 'he';                                   // Hebrew is the default
  try { lang = localStorage.getItem('eg_lang') || 'he'; } catch (e) {}
  setLang(lang);
  buildActionLinks();
  spawnPetals();
  // paint the foil now, behind the closed envelope, so the photo never flashes
  setupFoil();
  // re-paint once webfonts settle (the foil hint glyph uses a serif face)
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!revealed && !scratchArmed) setupFoil(); });
})();
