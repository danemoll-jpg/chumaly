/* =========================================================
   Chumaly — shared header, photo menu, footer, lightbox,
   swipe carousels and contact-form helpers.

   To add/rename a page in the menu, edit MENU below.
   To change the phone/email everywhere, edit CONTACT.
   ========================================================= */

const CONTACT = {
  phone: "770-926-5340",
  phoneLink: "+17709265340",
  email: "chumaly@gmail.com",
  location: "Anniston, Alabama",
  facebook: "https://www.facebook.com/Lydiachumachenkomoll",
  googleReviews: "https://share.google/ojZAVdN8wM13rMJ8e",
};

// Each menu item shows a photo tile. img paths are relative to the site root.
const MENU = [
  { group: "Maltese", items: [
    { href: "maltese-puppies.html", label: "Maltese Puppies", img: "images/thumbs/editor/photoroom-20260722-202757.jpg" },
    { href: "maltese-adults.html",  label: "Maltese Adults",  img: "images/thumbs/2203ae65-6c1e-4788-a1b1-525b2e380730.jpg" },
    { href: "our-breeders.html",    label: "Maltese Parents", img: "images/thumbs/73e39e27-f662-4e5d-9cff-03e3d9e9cc9b.jpg" },
  ]},
  { group: "Yorkies", items: [
    { href: "yorkie-puppies.html",  label: "Yorkie Puppies",  img: "images/thumbs/50571611-10218230301730675-4624571581740351488-n.jpg" },
    { href: "yorkie-adults.html",   label: "Yorkie Adults",   img: "images/thumbs/published/471463675-10235540531755607-6397753610116016302-n.jpg" },
    { href: "our-breeders1.html",   label: "Yorkie Parents",  img: "images/thumbs/capri-1.jpg" },
  ]},
  { group: "Photos & More", items: [
    { href: "index.html",            label: "Home",             img: "images/thumbs/jiin-baby-boy-tes-yea-081419.jpg" },
    { href: "gallery.html",          label: "Gallery",          img: "images/thumbs/468079965-10235139345326197-7368899303602741092-n.jpg" },
    { href: "pups-sold.html",        label: "Pups Sold",        img: "images/thumbs/557479128-10239213524898140-36556539784583854-n.jpg" },
    { href: "about-us.html",         label: "About Us",         img: "images/thumbs/published/e2652b9c-e072-481e-a5b4-54cd329f9aba.jpg" },
    { href: "health-guarantee.html", label: "Health Guarantee", img: "images/thumbs/barbie.jpg" },
    { href: "testimonial.html",      label: "Reviews",          img: "images/thumbs/monet-031822.jpg" },
    { href: "contact-form.html",     label: "Contact Us",       img: "images/thumbs/download.jpg" },
  ]},
];

// Links shown across the top of the header on computers (phones use the photo menu).
const TOP_LINKS = [
  ["maltese-puppies.html", "Maltese Puppies"],
  ["yorkie-puppies.html", "Yorkie Puppies"],
  ["gallery.html", "Gallery"],
  ["about-us.html", "About Us"],
  ["contact-form.html", "Contact Form"],
];

const currentPage = (location.pathname.split("/").pop() || "index.html").toLowerCase();

/* ---------- Header + photo menu ---------- */
function buildHeader() {
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <a class="logo" href="index.html" aria-label="Chumaly home">
      <span class="logo-name">Chumaly</span>
      <span class="logo-tag">Maltese &amp; Yorkies</span>
    </a>
    <nav class="top-links" aria-label="Main pages">
      ${TOP_LINKS.map(([href, label]) => `<a href="${href}"${href === currentPage ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
    </nav>
    <button class="menu-btn" type="button" aria-label="Open menu" aria-controls="site-menu" aria-expanded="false"><span></span></button>`;

  const groups = MENU.map(g => `
    <h2>${g.group}</h2>
    <ul class="tiles">
      ${g.items.map(i => `
        <li class="tile"><a href="${i.href}"${i.href === currentPage ? ' aria-current="page"' : ""}>
          <img src="${i.img}" alt="" loading="lazy" width="300" height="300"><span>${i.label}</span>
        </a></li>`).join("")}
    </ul>`).join("");

  const menu = document.createElement("nav");
  menu.className = "menu";
  menu.id = "site-menu";
  menu.setAttribute("aria-label", "Site menu");
  menu.innerHTML = `
    <div class="menu-top">
      <a class="logo" href="index.html"><span class="logo-name">Chumaly</span></a>
      <button class="menu-close" type="button" aria-label="Close menu">&times;</button>
    </div>
    ${groups}
    <div class="menu-contact btn-row">
      <a class="btn" href="sms:${CONTACT.phoneLink}">Text Us</a>
      <a class="btn btn-soft" href="tel:${CONTACT.phoneLink}">Call</a>
      <a class="btn btn-soft" href="mailto:${CONTACT.email}">Email</a>
    </div>`;

  document.body.prepend(header, menu);
  const skip = document.createElement("a");
  skip.className = "skip-link"; skip.href = "#main"; skip.textContent = "Skip to content";
  document.body.prepend(skip);

  const openBtn = header.querySelector(".menu-btn");
  const closeBtn = menu.querySelector(".menu-close");
  const setOpen = open => {
    menu.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    openBtn.setAttribute("aria-expanded", String(open));
    if (open) closeBtn.focus(); else openBtn.focus();
  };
  openBtn.addEventListener("click", () => setOpen(true));
  closeBtn.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && menu.classList.contains("open")) setOpen(false);
  });
}

/* ---------- Footer + sticky phone action bar ---------- */
function buildFooter() {
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <img class="divider" src="images/published/f995273f026e454365101e25b327d744.gif" alt="" width="255" height="76" loading="lazy">
    <div class="footer-title">We would love to have you visit soon!</div>
    <div><a href="tel:${CONTACT.phoneLink}">${CONTACT.phone}</a> &middot; <a href="mailto:${CONTACT.email}">${CONTACT.email}</a></div>
    <div>${CONTACT.location}</div>
    <div class="social">
      <a href="${CONTACT.facebook}" target="_blank" rel="noopener">Facebook</a>
      <a href="${CONTACT.googleReviews}" target="_blank" rel="noopener">Google Reviews</a>
    </div>
    <div>&copy; ${new Date().getFullYear()} Chumaly Maltese &amp; Yorkies</div>`;
  document.body.append(footer);

  const bar = document.createElement("nav");
  bar.className = "action-bar";
  bar.setAttribute("aria-label", "Quick contact");
  bar.innerHTML = `
    <a href="sms:${CONTACT.phoneLink}"><span aria-hidden="true">💬</span>Text</a>
    <a href="tel:${CONTACT.phoneLink}"><span aria-hidden="true">📞</span>Call</a>
    <a href="contact-form.html"><span aria-hidden="true">🐾</span>Inquire</a>`;
  document.body.append(bar);
}

/* ---------- Swipe carousels on dog cards ---------- */
function initCarousels() {
  document.querySelectorAll(".slides").forEach(track => {
    const slides = track.children;
    if (slides.length < 2) return;
    const dots = document.createElement("div");
    dots.className = "dots";
    [...slides].forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Photo ${i + 1} of ${slides.length}`);
      b.addEventListener("click", () => track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" }));
      dots.append(b);
    });
    track.after(dots);
    const update = () => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      [...dots.children].forEach((d, j) => d.setAttribute("aria-current", String(i === j)));
    };
    track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    update();
  });
}

/* ---------- Lightbox: tap any photo link to view full size, swipe between ---------- */
function initLightbox() {
  const links = [...document.querySelectorAll("a[data-lightbox]")];
  if (!links.length) return;

  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Photo viewer");
  box.innerHTML = `
    <img alt="">
    <div class="lb-caption"></div>
    <button class="lb-close" type="button" aria-label="Close">&times;</button>
    <button class="lb-prev" type="button" aria-label="Previous photo">&#8249;</button>
    <button class="lb-next" type="button" aria-label="Next photo">&#8250;</button>
    <div class="lb-count"></div>`;
  document.body.append(box);

  const img = box.querySelector("img");
  const caption = box.querySelector(".lb-caption");
  const count = box.querySelector(".lb-count");
  let group = [], index = 0, lastFocus = null;

  const show = i => {
    index = (i + group.length) % group.length;
    const a = group[index];
    img.src = a.href;
    img.alt = a.querySelector("img")?.alt || "";
    caption.textContent = a.dataset.caption || "";
    count.textContent = group.length > 1 ? `${index + 1} / ${group.length}` : "";
    box.querySelector(".lb-prev").hidden = box.querySelector(".lb-next").hidden = group.length < 2;
  };
  const open = a => {
    group = links.filter(l => l.dataset.lightbox === a.dataset.lightbox);
    lastFocus = a;
    box.classList.add("open");
    document.body.classList.add("menu-open");
    show(group.indexOf(a));
    box.querySelector(".lb-close").focus();
  };
  const close = () => {
    box.classList.remove("open");
    document.body.classList.remove("menu-open");
    img.removeAttribute("src");
    lastFocus?.focus();
  };

  links.forEach(a => a.addEventListener("click", e => { e.preventDefault(); open(a); }));
  box.querySelector(".lb-close").addEventListener("click", close);
  box.querySelector(".lb-prev").addEventListener("click", () => show(index - 1));
  box.querySelector(".lb-next").addEventListener("click", () => show(index + 1));
  box.addEventListener("click", e => { if (e.target === box) close(); });
  document.addEventListener("keydown", e => {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });

  // Swipe left/right on phones
  let startX = null;
  box.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", e => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    startX = null;
  });
}

/* ---------- Contact form: prefill "puppy of interest" from ?puppy=Name ---------- */
function initForms() {
  const params = new URLSearchParams(location.search);
  const puppy = params.get("puppy");
  const field = document.querySelector("#puppy-interest");
  if (puppy && field) field.value = puppy;
  const breed = params.get("breed");
  const breedField = document.querySelector("#breed");
  if (breed && breedField) breedField.value = breed;

  // Health guarantee: fill today's date
  document.querySelectorAll("input[type=date][data-today]").forEach(i => {
    if (!i.value) i.value = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in local time
  });
}

/* ---------- Editable content (photos, puppies, reviews) ----------
   The lists live in the data/ folder and are edited through Pages CMS
   (see ADMIN-GUIDE.md). This turns them into the page. */
const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Small thumbnail if one exists, else a resized copy from Netlify, else the original photo.
function photoImg(path, alt, w, h) {
  const file = path.replace(/^\/?images\//, "");
  const tries = [`images/thumbs/${file}`, `/.netlify/images?url=/${path}&w=800`, path];
  return `<img src="${esc(tries[0])}" data-tries="${esc(JSON.stringify(tries.slice(1)))}" alt="${esc(alt)}" loading="lazy" width="${w}" height="${h}" onerror="const t=JSON.parse(this.dataset.tries||'[]');if(t.length){this.src=t.shift();this.dataset.tries=JSON.stringify(t)}">`;
}

const RENDERERS = {
  gallery: (d, el) => (d.photos || []).map(p =>
    `<li><figure style="margin:0"><a href="${esc(p)}" data-lightbox="gallery">${photoImg(p, "Chumaly puppy", 400, 400)}</a></figure></li>`).join(""),
  sold: (d, el) => (d.photos || []).map(p =>
    `<li><figure style="margin:0"><a href="${esc(p)}" data-lightbox="sold">${photoImg(p, "Chumaly puppy with new owner", 400, 400)}</a></figure></li>`).join(""),
  puppies: (d, el) => (d.puppies || []).map(p => {
    const id = String(p.name).toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const slides = (p.photos || []).map(src =>
      `<a href="${esc(src)}" data-lightbox="${esc(id)}" data-caption="${esc(p.name)}">${photoImg(src, p.name, 600, 510)}</a>`).join("");
    const q = `contact-form.html?puppy=${encodeURIComponent(p.name)}&amp;breed=${el.dataset.breed || ""}`;
    return `<article class="card" id="${esc(id)}">
  ${slides ? `<div class="slides">${slides}</div>` : ""}
  <div class="card-body">
    <h3>${esc(p.name)}</h3>
    ${p.badge ? `<div class="badge-wrap"><span class="badge">${esc(p.badge)}</span></div>` : ""}
    <p>${esc(p.description)}</p>
    <div class="btn-row"><a class="btn" href="${q}">Ask about ${esc(p.name)}</a></div>
  </div>
</article>`;
  }).join(""),
  reviews: (d, el) => (d.reviews || []).map(r =>
    `<blockquote class="review"><p>${esc(r.text)}</p><footer>&mdash; ${esc(r.name)}${r.date ? `, <span>${esc(new Date(r.date + "T12:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" }))}</span>` : ""}</footer></blockquote>`).join(""),
};

async function renderContent() {
  const jobs = [...document.querySelectorAll("[data-content]")].map(async el => {
    const kind = el.dataset.content;
    const src = el.dataset.src || kind;
    try {
      const res = await fetch(`data/${src}.json`, { cache: "no-cache" });
      if (!res.ok) throw new Error(res.status);
      el.innerHTML = RENDERERS[kind](await res.json(), el);
    } catch (e) {
      console.warn("Could not load", src, e);
    }
  });
  await Promise.all(jobs);
}

buildHeader();
buildFooter();
renderContent().then(() => {
  initCarousels();
  initLightbox();
});
initForms();
