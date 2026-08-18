/* ============================================================================
 *  UNDANGAN DIGITAL — MESIN RENDER
 *
 *  File ini membaca config.js lalu membangun seluruh halaman.
 *  Kamu TIDAK perlu mengedit file ini. Cukup ubah assets/js/config.js
 * ========================================================================== */

(function () {
  "use strict";

  // Mode preview dari editor.html: config diambil dari sessionStorage, bukan dari config.js
  const IS_PREVIEW = new URLSearchParams(location.search).get("preview") === "1";
  if (IS_PREVIEW) {
    try {
      const raw = sessionStorage.getItem("undangan_preview_config");
      if (raw) window.CONFIG = JSON.parse(raw);
    } catch (e) { /* abaikan, pakai config.js biasa */ }
  }

  const C = window.CONFIG || {};
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ── Helper ─────────────────────────────────────────────────────────── */

  // Ambil nilai bersarang dengan aman: get("cover.eyebrow")
  const get = (path, fallback = "") =>
    path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), C) ?? fallback;

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const HARI  = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                 "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  function formatTanggal(iso) {
    const [y, m, d] = String(iso).split("-").map(Number);
    if (!y || !m || !d) return iso;
    const dt = new Date(Date.UTC(y, m - 1, d));
    return `${HARI[dt.getUTCDay()]}, ${d} ${BULAN[m - 1]} ${y}`;
  }

  // "2026-08-23" + "08:00" + "+07:00" -> objek Date
  function toDate(date, time, offset = "+07:00") {
    return new Date(`${date}T${(time || "00:00").padStart(5, "0")}:00${offset}`);
  }

  const pad = (n) => String(n).padStart(2, "0");

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("is-shown");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("is-shown"), 2400);
  }


  /* ── Ornamen SVG ────────────────────────────────────────────────────── */
  const ORNAMENTS = {
    geometric: `<svg viewBox="0 0 200 34" fill="none" stroke="currentColor" stroke-width="1" stroke-linejoin="round">
      <rect x="88" y="5" width="24" height="24"/>
      <rect x="88" y="5" width="24" height="24" transform="rotate(45 100 17)"/>
      <circle cx="100" cy="17" r="3.6"/>
      <path d="M74 17H36M126 17h38" stroke-linecap="round"/>
      <path d="M30 17l4-4 4 4-4 4z" fill="currentColor" stroke="none"/>
      <path d="M166 17l4-4 4 4-4 4z" fill="currentColor" stroke="none"/>
      <path d="M8 17h14M178 17h14" stroke-linecap="round" opacity=".55"/>
    </svg>`,

    floral: `<svg viewBox="0 0 200 34" fill="none" stroke="currentColor" stroke-width="1">
      <path d="M100 3c0 8-3.5 12-8 14 4.5 2 8 6 8 14 0-8 3.5-12 8-14-4.5-2-8-6-8-14z" fill="currentColor" stroke="none"/>
      <path d="M87 17c-14 0-22-7-38-7M113 17c14 0 22-7 38-7" stroke-linecap="round"/>
      <path d="M70 12c-4-4-10-4-13 0 4 4 10 4 13 0zM130 12c4-4 10-4 13 0-4 4-10 4-13 0z" fill="currentColor" stroke="none" opacity=".8"/>
      <path d="M55 17c-5 3-11 2-14-2 5-3 11-2 14 2zM145 17c5 3 11 2 14-2-5-3-11-2-14 2z" fill="currentColor" stroke="none" opacity=".6"/>
      <circle cx="34" cy="17" r="2" fill="currentColor" stroke="none"/>
      <circle cx="166" cy="17" r="2" fill="currentColor" stroke="none"/>
    </svg>`,

    minimal: `<svg viewBox="0 0 200 34" fill="none" stroke="currentColor" stroke-width="1">
      <path d="M100 11l6 6-6 6-6-6z"/>
      <path d="M88 17H30M112 17h58" stroke-linecap="round" opacity=".7"/>
    </svg>`,
  };

  const ORNAMENT_MINI = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.2">
    <path d="M10 3l7 7-7 7-7-7z"/></svg>`;


  /* ══════════════════════════════════════════════════════════════════════
     1. TEMA & META
     ══════════════════════════════════════════════════════════════════════ */
  function applyTheme() {
    const t = C.theme || {};
    const preset = t.preset || "sage";
    document.body.dataset.theme = preset;

    if (preset === "custom" && t.colors) {
      const map = { primary: "--c-primary", secondary: "--c-secondary", bg: "--c-bg",
                    surface: "--c-surface", text: "--c-text", muted: "--c-muted" };
      for (const [k, v] of Object.entries(map)) {
        if (t.colors[k]) document.body.style.setProperty(v, t.colors[k]);
      }
    }

    // Muat font dari Google Fonts sesuai config
    const fonts = [t.fontDisplay, t.fontScript, t.fontBody, t.fontArabic].filter(Boolean);
    if (fonts.length) {
      const fam = fonts.map((f) => `family=${f.trim().replace(/\s+/g, "+")}:wght@300;400;500;600;700`).join("&");
      $("#font-link").href = `https://fonts.googleapis.com/css2?${fam}&display=swap`;
    }
    const set = (v, val) => val && document.documentElement.style.setProperty(v, `"${val}"`);
    set("--f-display", t.fontDisplay);
    set("--f-script", t.fontScript);
    set("--f-body", t.fontBody);
    set("--f-arabic", t.fontArabic);

    // Motif latar cover
    const sec = getComputedStyle(document.body).getPropertyValue("--c-secondary").trim() || "#B08D57";
    document.body.style.setProperty("--pattern", `url("data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" viewBox="0 0 92 92" fill="none" stroke="${sec}" stroke-width="1">
        <rect x="27" y="27" width="38" height="38"/><rect x="27" y="27" width="38" height="38" transform="rotate(45 46 46)"/>
        <circle cx="46" cy="46" r="6"/><rect x="-19" y="-19" width="38" height="38" transform="rotate(45 0 0)"/>
        <rect x="73" y="-19" width="38" height="38" transform="rotate(45 92 0)"/>
        <rect x="-19" y="73" width="38" height="38" transform="rotate(45 0 92)"/>
        <rect x="73" y="73" width="38" height="38" transform="rotate(45 92 92)"/>
      </svg>`)}")`);

    // Ornamen
    const svg = ORNAMENTS[t.ornament] || ORNAMENTS.geometric;
    $$("[data-ornament]").forEach((el) => (el.innerHTML = svg));
    $$("[data-ornament-mini]").forEach((el) => (el.innerHTML = ORNAMENT_MINI));
  }

  function applyMeta() {
    const m = C.meta || {};
    if (m.title) {
      document.title = m.title;
      $('meta[property="og:title"]').content = m.title;
    }
    if (m.description) {
      $('meta[name="description"]').content = m.description;
      $('meta[property="og:description"]').content = m.description;
    }
    if (m.ogImage) $('meta[property="og:image"]').content = new URL(m.ogImage, location.href).href;
    if (m.favicon) $('link[rel="icon"]').href = m.favicon;

    const primary = getComputedStyle(document.body).getPropertyValue("--c-primary").trim();
    if (primary) $('meta[name="theme-color"]').content = primary;
  }


  /* ══════════════════════════════════════════════════════════════════════
     2. BINDING TEKS SEDERHANA  (data-bind="a.b.c")
     ══════════════════════════════════════════════════════════════════════ */
  // Nama di cover & penutup. Kalau salah satu dikosongkan (acara dengan satu
  // tokoh utama: khitanan, aqiqah, wisuda), tanda "&" ikut disembunyikan.
  function coverNames() {
    const order = get("cover.nameOrder", "bride-first");
    const a = String(get("cover.groomShort", "")).trim();
    const b = String(get("cover.brideShort", "")).trim();
    const pair = order === "groom-first" ? [a, b] : [b, a];
    return pair.filter(Boolean);
  }

  function bindText() {
    const names = coverNames();
    const extra = { "cover.nameA": names[0] || "", "cover.nameB": names[1] || "" };

    $$("[data-bind]").forEach((el) => {
      const key = el.dataset.bind;
      const val = key in extra ? extra[key] : get(key);
      el.textContent = val;
      if (!val) el.setAttribute("data-empty", "");
    });

    if (names.length < 2) {
      $(".cover__amp")?.setAttribute("hidden", "");
      $('[data-bind="cover.nameB"]')?.setAttribute("hidden", "");
    }
  }

  // Sembunyikan section yang enabled:false
  function applyVisibility() {
    $$("[data-section]").forEach((el) => {
      const key = el.dataset.section;
      const cfg = C[key];
      if (cfg && cfg.enabled === false) el.hidden = true;
    });
  }


  /* ══════════════════════════════════════════════════════════════════════
     3. NAMA TAMU DARI URL   ?to=Nama  /  ?kepada=Nama  /  ?nama=Nama
     ══════════════════════════════════════════════════════════════════════ */
  function guestName() {
    const q = new URLSearchParams(location.search);
    const raw = q.get("to") || q.get("kepada") || q.get("nama") || q.get("guest") || "";
    return raw.trim() || get("cover.guestDefault", "Bapak / Ibu / Saudara/i");
  }

  function renderGuest() {
    $("#guest-name").textContent = guestName();
  }


  /* ══════════════════════════════════════════════════════════════════════
     4. MEMPELAI
     ══════════════════════════════════════════════════════════════════════ */
  function renderCouple() {
    const c = C.couple || {};
    const box = $("#couple-list");
    if (!box) return;

    const person = (p) => {
      if (!p) return "";
      const photo = c.showPhotos && p.photo
        ? `<img class="person__photo" src="${esc(p.photo)}" alt="${esc(p.fullName)}" loading="lazy">` : "";
      const parents = (p.fatherName || p.motherName)
        ? `<p class="person__parents">${esc(p.childOrder || "")}<br>
             <strong>${esc(p.fatherName || "")}</strong>${p.fatherName && p.motherName ? " &amp; " : ""}
             <strong>${esc(p.motherName || "")}</strong></p>` : "";
      const ig = p.instagram
        ? `<a class="person__ig" href="https://instagram.com/${esc(p.instagram.replace(/^@/, ""))}" target="_blank" rel="noopener">
             <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
               <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
             </svg>@${esc(p.instagram.replace(/^@/, ""))}</a>` : "";

      return `<div class="person reveal">
        ${photo}
        <p class="person__label">${esc(p.label || "")}</p>
        <h3 class="person__name">${esc(p.fullName || "")}</h3>
        ${parents}${ig}
      </div>`;
    };

    const pair = c.order === "bride-first" ? [c.bride, c.groom] : [c.groom, c.bride];
    // Hanya tampilkan yang punya nama — mendukung acara dengan satu tokoh utama
    const people = pair.filter((p) => p && String(p.fullName || "").trim());

    box.innerHTML = people
      .map(person)
      .join(people.length > 1 ? `<div class="couple__amp reveal">&amp;</div>` : "");
  }


  /* ══════════════════════════════════════════════════════════════════════
     5. ACARA
     ══════════════════════════════════════════════════════════════════════ */
  function calendarUrl(ev) {
    const off = get("countdown.utcOffset", "+07:00");
    const start = toDate(ev.date, ev.timeStart, off);
    const end = toDate(ev.date, ev.timeEnd || ev.timeStart, off);
    if (isNaN(start)) return "";
    if (isNaN(end) || end <= start) end.setTime(start.getTime() + 2 * 3600 * 1000);

    const fmt = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
    const p = new URLSearchParams({
      action: "TEMPLATE",
      text: `${ev.name} — ${get("cover.groomShort")} & ${get("cover.brideShort")}`,
      dates: `${fmt(start)}/${fmt(end)}`,
      details: get("meta.description", ""),
      location: [ev.venueName, ev.venueAddress].filter(Boolean).join(", "),
    });
    return `https://calendar.google.com/calendar/render?${p}`;
  }

  function renderEvents() {
    const e = C.events || {};
    const box = $("#events-list");
    if (!box || !Array.isArray(e.list)) return;

    box.innerHTML = e.list.map((ev) => {
      const time = [ev.timeStart, ev.timeEnd].filter(Boolean).join(" – ");
      const actions = [];

      if (ev.mapsUrl) actions.push(
        `<a class="btn btn--outline btn--sm" href="${esc(ev.mapsUrl)}" target="_blank" rel="noopener">
           <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
             <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>
           </svg>${esc(e.mapsButtonText || "Lihat Lokasi")}</a>`);

      if (e.calendarButton !== false) {
        const cal = calendarUrl(ev);
        if (cal) actions.push(
          `<a class="btn btn--outline btn--sm" href="${esc(cal)}" target="_blank" rel="noopener">
             <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
               <rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>
             </svg>${esc(e.calendarButtonText || "Simpan ke Kalender")}</a>`);
      }

      return `<article class="card event reveal">
        <h3 class="event__name">${esc(ev.name || "")}</h3>
        <div class="event__rule"></div>
        <p class="event__date">${esc(formatTanggal(ev.date))}</p>
        ${time ? `<p class="event__time">${esc(time)} ${esc(ev.timezone || "")}</p>` : ""}
        ${ev.venueName ? `<p class="event__venue">${esc(ev.venueName)}</p>` : ""}
        ${ev.venueAddress ? `<p class="event__addr">${esc(ev.venueAddress)}</p>` : ""}
        ${ev.note ? `<p class="event__note">${esc(ev.note)}</p>` : ""}
        ${actions.length ? `<div class="event__actions">${actions.join("")}</div>` : ""}
      </article>`;
    }).join("");
  }


  /* ══════════════════════════════════════════════════════════════════════
     6. HITUNG MUNDUR
     ══════════════════════════════════════════════════════════════════════ */
  function renderCountdown() {
    const cd = C.countdown || {};
    const box = $("#countdown");
    if (!box || cd.enabled === false) return;

    const target = new Date(`${cd.target}${cd.utcOffset || "+07:00"}`);
    if (isNaN(target)) { box.innerHTML = ""; return; }

    const L = cd.labels || { days: "Hari", hours: "Jam", minutes: "Menit", seconds: "Detik" };
    box.innerHTML = ["days", "hours", "minutes", "seconds"].map((k) =>
      `<div class="cd"><div class="cd__num" data-cd="${k}">00</div><div class="cd__label">${esc(L[k])}</div></div>`
    ).join("");

    const cells = Object.fromEntries(["days", "hours", "minutes", "seconds"]
      .map((k) => [k, $(`[data-cd="${k}"]`, box)]));

    const tick = () => {
      let diff = target - Date.now();
      if (diff <= 0) {
        box.innerHTML = `<span class="countdown--done">${esc(cd.finishedText || "")}</span>`;
        clearInterval(timer);
        return;
      }
      const s = Math.floor(diff / 1000);
      cells.days.textContent    = pad(Math.floor(s / 86400));
      cells.hours.textContent   = pad(Math.floor(s / 3600) % 24);
      cells.minutes.textContent = pad(Math.floor(s / 60) % 60);
      cells.seconds.textContent = pad(s % 60);
    };
    tick();
    const timer = setInterval(tick, 1000);
  }


  /* ══════════════════════════════════════════════════════════════════════
     7. ADAB, KISAH, GALERI
     ══════════════════════════════════════════════════════════════════════ */
  function renderAdab() {
    const items = get("adab.items", []);
    const box = $("#adab-list");
    if (box) box.innerHTML = items.map((t) => `<li class="reveal">${esc(t)}</li>`).join("");
  }

  function renderStory() {
    const items = get("story.items", []);
    const box = $("#story-list");
    if (!box) return;
    box.innerHTML = items.map((s) => `<div class="story__item reveal">
      ${s.date ? `<p class="story__date">${esc(s.date)}</p>` : ""}
      ${s.title ? `<h3 class="story__title">${esc(s.title)}</h3>` : ""}
      ${s.text ? `<p class="story__text">${esc(s.text)}</p>` : ""}
    </div>`).join("");
  }

  function renderGallery() {
    const g = C.gallery || {};
    const box = $("#gallery-list");
    if (!box) return;
    const imgs = (g.images || []).filter(Boolean);
    if (!imgs.length) { const s = box.closest("[data-section]"); if (s) s.hidden = true; return; }

    box.innerHTML = imgs.map((src, i) =>
      `<figure class="gallery__item reveal"><img src="${esc(src)}" alt="Galeri ${i + 1}" loading="lazy"></figure>`
    ).join("");

    box.addEventListener("click", (e) => {
      const img = e.target.closest("img");
      if (!img) return;
      const lb = document.createElement("div");
      lb.className = "lightbox";
      lb.innerHTML = `<img src="${esc(img.src)}" alt="">`;
      lb.addEventListener("click", () => lb.remove());
      document.body.appendChild(lb);
    });
  }


  /* ══════════════════════════════════════════════════════════════════════
     8. AMPLOP DIGITAL
     ══════════════════════════════════════════════════════════════════════ */
  function renderGift() {
    const g = C.gift || {};
    const box = $("#gift-list");
    const btn = $("#gift-toggle");
    if (!box || !btn) return;

    const accounts = (g.accounts || []).filter((a) => a && a.number);
    const addr = g.address || {};

    box.innerHTML =
      accounts.map((a) => `<div class="card bank">
        ${a.logo ? `<img src="${esc(a.logo)}" alt="${esc(a.bank)}" style="height:26px;margin:0 auto .6rem">` : ""}
        <p class="bank__name">${esc(a.bank || "")}</p>
        <p class="bank__num">${esc(a.number)}</p>
        <p class="bank__holder">a.n. ${esc(a.holder || "")}</p>
        <button type="button" class="btn btn--outline btn--sm" data-copy="${esc(a.number)}">
          <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>
          </svg>${esc(g.copyText || "Salin")}</button>
      </div>`).join("") +
      (addr.enabled && addr.detail ? `<div class="card bank">
        <p class="bank__name">${esc(addr.label || "Kirim Hadiah")}</p>
        <p class="bank__holder" style="font-size:.95rem;color:var(--c-text);margin-top:.5rem">${esc(addr.name || "")}</p>
        <p class="bank__holder" style="margin-top:.3rem">${esc(addr.detail)}</p>
        <button type="button" class="btn btn--outline btn--sm" data-copy="${esc(addr.detail)}">
          ${esc(g.copyText || "Salin")}</button>
      </div>` : "");

    btn.addEventListener("click", () => {
      const open = !box.hidden;
      box.hidden = open;
      if (!open) requestAnimationFrame(() => {
        $$(".reveal", box).forEach((el) => el.classList.add("is-in"));
        box.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });

    box.addEventListener("click", async (e) => {
      const b = e.target.closest("[data-copy]");
      if (!b) return;
      const text = b.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch {}
        ta.remove();
      }
      toast(g.copiedText || "Tersalin!");
    });
  }


  /* ══════════════════════════════════════════════════════════════════════
     9. RSVP & BUKU TAMU
     ══════════════════════════════════════════════════════════════════════ */

  // GET lewat JSONP supaya bebas masalah CORS dengan Google Apps Script
  function jsonp(url, timeout = 12000) {
    return new Promise((resolve, reject) => {
      const cb = "__wcb" + Math.random().toString(36).slice(2);
      const s = document.createElement("script");
      const t = setTimeout(() => { cleanup(); reject(new Error("timeout")); }, timeout);
      const cleanup = () => { clearTimeout(t); delete window[cb]; s.remove(); };
      window[cb] = (data) => { cleanup(); resolve(data); };
      s.onerror = () => { cleanup(); reject(new Error("network")); };
      s.src = url + (url.includes("?") ? "&" : "?") + "callback=" + cb;
      document.head.appendChild(s);
    });
  }

  function timeAgo(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return "";
    const s = Math.floor((Date.now() - d) / 1000);
    if (s < 60) return "baru saja";
    if (s < 3600) return `${Math.floor(s / 60)} menit lalu`;
    if (s < 86400) return `${Math.floor(s / 3600)} jam lalu`;
    if (s < 2592000) return `${Math.floor(s / 86400)} hari lalu`;
    return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
  }

  let allWishes = [];
  let shown = 0;

  function renderWishes() {
    const w = C.wishes || {};
    const box = $("#wishes-list");
    const more = $("#wishes-more");
    if (!box) return;

    if (!allWishes.length) {
      box.innerHTML = `<p class="wishes__empty">${esc(w.emptyText || "Belum ada ucapan.")}</p>`;
      more.hidden = true;
      return;
    }

    const per = Number(w.perPage) || 5;
    shown = Math.min(shown || per, allWishes.length);

    box.innerHTML = allWishes.slice(0, shown).map((x) => {
      const hadir = String(x.attendance || "").toLowerCase();
      const isNo = hadir.includes("tidak") || hadir.includes("berhalangan");
      return `<article class="wish">
        <div class="wish__head">
          <span class="wish__name">${esc(x.name || "Tamu")}</span>
          <span class="wish__time">${esc(timeAgo(x.timestamp))}</span>
        </div>
        ${x.attendance ? `<span class="wish__badge${isNo ? " wish__badge--no" : ""}">${esc(x.attendance)}</span>` : ""}
        ${x.message ? `<p class="wish__text">${esc(x.message)}</p>` : ""}
      </article>`;
    }).join("");

    more.hidden = shown >= allWishes.length;
    more.textContent = `Lihat lebih banyak (${allWishes.length - shown})`;
  }

  async function loadWishes() {
    const endpoint = get("rsvp.endpoint", "").trim();
    if (!endpoint || get("wishes.enabled") === false) {
      renderWishes();
      return;
    }
    try {
      const res = await jsonp(endpoint);
      allWishes = Array.isArray(res) ? res : (res && res.data) || [];
      allWishes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } catch {
      allWishes = [];
    }
    renderWishes();
  }

  function setupRsvp() {
    const r = C.rsvp || {};
    const L = r.labels || {};
    const form = $("#rsvp-form");
    if (!form) return;

    // Placeholder & label tombol
    $("#f-name").placeholder = L.namePlaceholder || "";
    $("#f-message").placeholder = L.messagePlaceholder || "";
    $("#rsvp-submit").textContent = L.submit || "Kirim";

    // Isi otomatis nama tamu dari ?to=
    const q = new URLSearchParams(location.search);
    if (q.get("to") || q.get("kepada") || q.get("nama")) $("#f-name").value = guestName();

    // Pilihan kehadiran
    $("#f-attend").innerHTML = [
      { v: L.optionYes || "Hadir", d: true },
      { v: L.optionNo || "Tidak hadir", d: false },
    ].map((o, i) => `<label class="choice">
        <input type="radio" name="attendance" value="${esc(o.v)}"${i === 0 ? " checked" : ""}>
        <span>${esc(o.v)}</span></label>`).join("");

    const countWrap = $("#f-count-wrap");
    if (r.showGuestCount === false) countWrap.hidden = true;

    const syncCount = () => {
      if (r.showGuestCount === false) return;
      const val = form.querySelector('input[name="attendance"]:checked')?.value || "";
      countWrap.hidden = val === (L.optionNo || "Tidak hadir");
    };
    $("#f-attend").addEventListener("change", syncCount);
    syncCount();

    const note = $("#rsvp-note");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nameEl = $("#f-name");
      if (!nameEl.value.trim()) {
        nameEl.classList.add("is-invalid");
        nameEl.focus();
        note.className = "form__note is-err";
        note.textContent = "Nama wajib diisi.";
        return;
      }
      nameEl.classList.remove("is-invalid");

      const payload = {
        name: nameEl.value.trim(),
        attendance: form.querySelector('input[name="attendance"]:checked')?.value || "",
        guests: countWrap.hidden ? "0" : $("#f-count").value,
        message: $("#f-message").value.trim(),
        guestSlug: new URLSearchParams(location.search).get("to") || "",
      };

      const endpoint = (r.endpoint || "").trim();
      const btn = $("#rsvp-submit");
      btn.disabled = true;
      btn.textContent = L.sending || "Mengirim...";
      note.className = "form__note";
      note.textContent = "";

      // Tanpa endpoint -> arahkan ke WhatsApp
      if (!endpoint) {
        const wa = (r.whatsappFallback || "").replace(/\D/g, "");
        const text =
          `Assalamu'alaikum, saya ${payload.name}.\n` +
          `Konfirmasi kehadiran: ${payload.attendance}\n` +
          (payload.guests !== "0" ? `Jumlah tamu: ${payload.guests} orang\n` : "") +
          (payload.message ? `\nUcapan:\n${payload.message}` : "");
        window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
        btn.disabled = false;
        btn.textContent = L.submit || "Kirim";
        note.className = "form__note is-ok";
        note.textContent = "Silakan lanjutkan di WhatsApp.";
        return;
      }

      try {
        await fetch(endpoint, {
          method: "POST",
          // URLSearchParams -> permintaan sederhana, tidak memicu preflight CORS
          body: new URLSearchParams(payload),
        });
      } catch {
        // Jaring pengaman kalau browser memblokir respons: kirim tanpa membaca balasan
        try {
          await fetch(endpoint, { method: "POST", mode: "no-cors", body: new URLSearchParams(payload) });
        } catch {
          btn.disabled = false;
          btn.textContent = L.submit || "Kirim";
          note.className = "form__note is-err";
          note.textContent = L.error || "Gagal mengirim.";
          return;
        }
      }

      btn.disabled = false;
      btn.textContent = L.submit || "Kirim";
      note.className = "form__note is-ok";
      note.textContent = L.success || "Terima kasih!";
      $("#f-message").value = "";

      // Tampilkan ucapan baru langsung tanpa menunggu server
      if (payload.message) {
        allWishes.unshift({ ...payload, timestamp: new Date().toISOString() });
        shown = 0;
        renderWishes();
      }
      setTimeout(loadWishes, 2500);
    });

    $("#wishes-more")?.addEventListener("click", () => {
      shown += Number(get("wishes.perPage", 5)) || 5;
      renderWishes();
    });
  }


  /* ══════════════════════════════════════════════════════════════════════
     10. MUSIK
     ══════════════════════════════════════════════════════════════════════ */
  let audio = null;
  function setupMusic() {
    const m = C.music || {};
    if (!m.enabled || !m.url) return;

    audio = $("#bgm");
    audio.src = m.url;
    const btn = $("#music-btn");
    btn.hidden = false;

    btn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().then(() => btn.classList.add("is-playing")).catch(() => toast("Musik tidak dapat diputar."));
      } else {
        audio.pause();
        btn.classList.remove("is-playing");
      }
    });
  }

  function playMusic() {
    if (!audio) return;
    audio.volume = 0;
    audio.play().then(() => {
      $("#music-btn").classList.add("is-playing");
      // Naikkan volume perlahan
      let v = 0;
      const fade = setInterval(() => {
        v = Math.min(1, v + 0.04);
        audio.volume = v;
        if (v >= 1) clearInterval(fade);
      }, 60);
    }).catch(() => {});
  }


  /* ══════════════════════════════════════════════════════════════════════
     11. SHARE & FOOTER
     ══════════════════════════════════════════════════════════════════════ */
  function setupFooter() {
    const f = C.footer || {};
    const btn = $("#share-btn");

    if (f.shareButton !== false && btn) {
      btn.hidden = false;
      btn.innerHTML = `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/>
          <path d="m8.4 10.8 7.2-4.2M8.4 13.2l7.2 4.2"/>
        </svg><span>${esc(f.shareButtonText || "Bagikan Undangan")}</span>`;

      btn.addEventListener("click", async () => {
        const link = location.origin + location.pathname;
        const text = String(f.shareTemplate || "{link}").replace("{link}", link);
        if (navigator.share) {
          try { await navigator.share({ title: document.title, text }); return; } catch {}
        }
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      });
    }

    const credit = $("#foot-credit");
    if (credit) {
      const name = f.creditName
        ? (f.creditUrl ? ` <a href="${esc(f.creditUrl)}" target="_blank" rel="noopener">${esc(f.creditName)}</a>`
                       : ` ${esc(f.creditName)}`)
        : "";
      credit.innerHTML = esc(f.credit || "") + name;
    }

    const cn = $("#closing-names");
    if (cn) cn.textContent = coverNames().join(" & ");
  }


  /* ══════════════════════════════════════════════════════════════════════
     12. ANIMASI SCROLL
     ══════════════════════════════════════════════════════════════════════ */
  function setupReveal() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    $$(".reveal").forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
      io.observe(el);
    });
  }


  /* ══════════════════════════════════════════════════════════════════════
     13. BUKA UNDANGAN
     ══════════════════════════════════════════════════════════════════════ */
  function setupOpen() {
    const btn = $("#open-invitation");
    const cover = $("#cover");
    const content = $("#content");

    const open = (withMusic = true) => {
      cover.classList.add("is-open");
      document.body.classList.remove("is-locked");
      content.setAttribute("aria-hidden", "false");
      content.classList.add("is-visible");
      window.scrollTo({ top: 0 });
      if (withMusic) playMusic();
      setupReveal();
      setTimeout(() => { cover.style.display = "none"; }, 900);
    };

    btn.addEventListener("click", () => open(true));

    // Di mode preview, undangan langsung terbuka tanpa musik
    if (IS_PREVIEW) setTimeout(() => open(false), 400);
  }


  /* ══════════════════════════════════════════════════════════════════════
     JALANKAN
     ══════════════════════════════════════════════════════════════════════ */
  function init() {
    if (!window.CONFIG) {
      document.body.innerHTML =
        '<div style="padding:2rem;font-family:sans-serif;line-height:1.6">' +
        "<h2>config.js tidak ditemukan</h2><p>Pastikan file <code>assets/js/config.js</code> ada " +
        "dan tidak ada kesalahan penulisan (koma atau kurung yang kurang).</p></div>";
      return;
    }

    applyTheme();
    applyMeta();
    applyVisibility();
    bindText();
    renderGuest();
    renderCouple();
    renderEvents();
    renderCountdown();
    renderAdab();
    renderStory();
    renderGallery();
    renderGift();
    setupRsvp();
    setupMusic();
    setupFooter();
    loadWishes();
    setupOpen();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
