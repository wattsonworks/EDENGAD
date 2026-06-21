# Eden & Gad — Save the Date 💌

A scratch-to-reveal digital Save the Date, inspired by the envelope → scratch-card
reveal format. Built as a single static page (no build step, no dependencies).

**The wedding:** Motzaei Shabbat · **12 Av 5786 / 26 July 2026**
(after Shabbat) — taken from the couple's Havdalah keepsake card.

## The experience
1. **Envelope** — a blush envelope with the `E & G` monogram and a wax seal. Tap to open: the flap lifts and the card rises out.
2. **Scratch card** — a foil-covered circle over a black-and-white photo of the couple. Drag a finger / mouse to scratch it off (auto-clears past ~50%).
3. **Reveal** — sparkles fall over the photo, the names + date settle in, and a live **countdown** to the day begins.
4. **Our story** — an engagement-photo gallery, event details, *Add to calendar* (`.ics`) and *RSVP on WhatsApp*.

Bilingual **EN / עברית** (top-left toggle, with full RTL), an optional sound toggle (synthesised chimes — no audio files), and `prefers-reduced-motion` support that skips straight to the reveal.

## Before sharing — fill these in
Edit the `CONFIG` block at the top of [`assets/js/script.js`](assets/js/script.js):

| Field | Status |
|------|--------|
| `dateISO` | `2026-07-26T20:30:00+03:00` — **confirm the ceremony start time** |
| `whatsapp` | empty — add the RSVP number (e.g. `'972501234567'`) to show the RSVP button |
| `cal.location` | empty — add the venue once known |
| "Where" text | placeholder "Venue to be announced" in `I18N` (en/he) |

## Files
```
index.html
assets/css/style.css
assets/js/script.js
assets/img/   reveal.jpg (B&W scratch photo) · couple.jpg · ring.jpg · g1–g6.jpg
```

## Deploy (GitHub Pages)
Push to a repo and enable Pages on the default branch (root). `.nojekyll` is included.

---
*Private invitation — the page is `noindex, nofollow`.*
