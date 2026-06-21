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
     Reception 19:00, Chuppah & Kiddushin 20:00 (Israel time). */
  dateISO: '2026-07-26T20:00:00+03:00',   // chuppah, Israel time (UTC+3, summer)

  /* RSVP — set the WhatsApp number in international format, no "+" / spaces.
     e.g. '972501234567'.  Leave empty to hide the RSVP button. */
  whatsapp: '',

  /* Calendar event */
  cal: {
    title: 'החתונה של עדן וגד · Eden & Gad Wedding',
    location: 'אולמי אלכסנדר, המסילה 2, עמק חפר',   // verify exact venue/address
    durationHours: 5,
  },
};

const I18N = {
  en: {
    enterHint: 'Tap to enter',
    tapOpen: 'Tap to open',
    stdMini: 'SAVE THE DATE',
    namesMini: 'Eden & Gad',
    overline: 'With joy, we invite you to celebrate',
    invite2: 'the happiest day of our lives,',
    invite3: 'with God’s blessing, on Sunday',
    dateLabel: '12 Av 5786 · 26.07.2026',
    revealLabel: 'A moment with us',
    scratchHint: 'Scratch to reveal',
    cdDays: 'days', cdHours: 'hours', cdMins: 'mins', cdSecs: 'secs',
    scrollMore: 'Scroll for more',
    quote: 'And it seemed to me that the land I walked upon, and the streets I passed through, and the whole world entire — are but a corridor leading to this house.',
    quoteAuthor: 'S. Y. Agnon',
    storyTitle: 'Our story, in light',
    storyText: 'From the first golden hour by the sea to a “yes” that changed everything — we can’t wait to celebrate the next chapter with you.',
    detailsTitle: 'We would love to see you',
    whenLabel: 'When', schedLabel: 'Schedule', whereLabel: 'Where',
    whenValue: 'Sunday · 26 July 2026',
    whenSub: '12 Av 5786',
    schedValue: 'Reception 19:00',
    schedSub: 'Chuppah & Kiddushin 20:00',
    whereValue: 'Alexander Halls',
    whereSub: 'HaMesila 2, Emek Hefer',
    addCal: 'Add to calendar',
    rsvp: 'RSVP on WhatsApp',
    footer: 'We can’t wait to see you · 26.07.2026',
  },
  he: {
    enterHint: 'הקליקו לכניסה',
    tapOpen: 'הקליקו לפתיחה',
    stdMini: 'שמרו את התאריך',
    namesMini: 'עדן & גד',
    overline: 'נרגשים להזמינכם לחגוג עימנו',
    invite2: 'את היום המאושר בחיינו,',
    invite3: 'שיתקיים בעזרת ה׳ ביום ראשון',
    dateLabel: 'י״ב באב התשפ״ו · 26.07.2026',
    revealLabel: 'רגע איתנו',
    scratchHint: 'גרדו כדי לחשוף',
    cdDays: 'ימים', cdHours: 'שעות', cdMins: 'דקות', cdSecs: 'שניות',
    scrollMore: 'גללו להמשך',
    quote: 'וְדוֹמֶה הָיָה לִי שֶׁהָאָרֶץ שֶׁהָלַכְתִּי עָלֶיהָ וְהָרְחוֹבוֹת שֶׁעָבַרְתִּי בָּהֶם וְכָל הָעוֹלָם כֻּלּוֹ, אֵינָם אֶלָּא פְּרוֹזְדוֹר לְבַיִת זֶה.',
    quoteAuthor: 'ש״י עגנון',
    storyTitle: 'הסיפור שלנו, באור',
    storyText: 'משעת הזהב הראשונה מול הים ועד ה״כן״ ששינה הכול — אנחנו לא יכולים לחכות לחגוג איתכם את הפרק הבא.',
    detailsTitle: 'נשמח לראותכם',
    whenLabel: 'מתי', schedLabel: 'לוח זמנים', whereLabel: 'איפה',
    whenValue: 'יום ראשון · 26 ביולי 2026',
    whenSub: 'י״ב באב התשפ״ו',
    schedValue: 'קבלת פנים 19:00',
    schedSub: 'חופה וקידושין 20:00',
    whereValue: 'אולמי אלכסנדר',
    whereSub: 'המסילה 2, עמק חפר',
    addCal: 'הוספה ליומן',
    rsvp: 'אישור הגעה בוואטסאפ',
    footer: 'נשמח לראותכם · 26.07.2026',
  },
};

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


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

  // names swap (only if the inline names exist)
  const nEn = $('.name-en'), nHe = $('.name-he');
  if (nEn) nEn.hidden = lang === 'he';
  if (nHe) nHe.hidden = lang !== 'he';

  $$('.lang-btn').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
  buildActionLinks();
  try { localStorage.setItem('eg_lang', lang); } catch (e) {}
}

$$('.lang-btn').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));


/* =================================================================
   SOUND  (synthesised — no audio files needed)
   ================================================================= */
let soundOn = false, audioCtx = null;
const soundBtn = $('#soundBtn');

soundBtn.addEventListener('click', () => {
  soundOn = !soundOn;
  soundBtn.setAttribute('aria-pressed', String(soundOn));
  if (soundOn) {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    chime(660, 0.18); setTimeout(() => chime(880, 0.2), 110);
  }
});

function chime(freq, gain = 0.15) {
  if (!soundOn || !audioCtx) return;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = 'sine'; o.frequency.value = freq;
  g.gain.setValueAtTime(0, audioCtx.currentTime);
  g.gain.linearRampToValueAtTime(gain, audioCtx.currentTime + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.1);
  o.connect(g); g.connect(audioCtx.destination);
  o.start(); o.stop(audioCtx.currentTime + 1.2);
}
function sparkleChime() {
  [784, 988, 1175, 1568].forEach((f, i) => setTimeout(() => chime(f, 0.12), i * 90));
}


/* =================================================================
   ACT 0 — ENVELOPE
   ================================================================= */
/* --- ACT −1: the gate parts to the sides, revealing the envelope --- */
const gate = $('#gate');
let gateOpened = false;
function openGate() {
  if (gateOpened) return;
  gateOpened = true;
  gate.classList.add('open');
  chime(329.63, 0.13); setTimeout(() => chime(440, 0.13), 400); setTimeout(() => chime(587.33, 0.13), 1400);
  setTimeout(() => gate.classList.add('gone'), 2300);
  setTimeout(() => { gate.style.display = 'none'; }, 2850);
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
  chime(392, 0.14);

  // 2. the lid folds up, opening the envelope
  setTimeout(() => { scene.classList.add('is-open'); chime(523.25, 0.15); }, 300);
  setTimeout(() => chime(659.25, 0.15), 1000);  // chime as it passes edge-on

  // 3. gently lift the open envelope away & hand off to the card scene
  setTimeout(() => scene.classList.add('dismiss'), 2150);
  setTimeout(() => {
    document.body.classList.remove('locked');
    scene.style.display = 'none';
    armScratch();
  }, 2750);
}

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
  canvas.classList.add('cleared');
  document.body.classList.add('revealed');

  spawnSparkles();
  sparkleChime();

  // staged text + countdown
  setTimeout(() => $('#countdown').classList.add('show'), 350);
  startCountdown();

  setTimeout(() => {
    const cue = $('#scrollCue');
    cue.hidden = false;
    requestAnimationFrame(() => cue.classList.add('show'));
  }, 1300);
}

$('#scrollCue')?.addEventListener('click', () =>
  ($('#temple') || $('#story')).scrollIntoView({ behavior: 'smooth' }));


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
