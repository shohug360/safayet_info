/* ==========================================================================
   AL SAFAYAT — Renders all content from data.js and handles interactions.
   ========================================================================== */

(function () {
  "use strict";

  const D = SITE_DATA;

  /* ======================================================================
     Helpers
     ====================================================================== */
  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  /* Section eyebrows get an editorial index number: "01 · About" */
  function setSectionEyebrow(id, num, label) {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML =
        `<span class="eyebrow-num">${String(num).padStart(2, "0")} ·</span> ` +
        escapeHTML(label);
    }
  }

  /* ----------------------------------------------------------------------
     SVG icon library (stroke style, Feather-ish)
     ---------------------------------------------------------------------- */
  const ICONS = {
    briefcase:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    compass:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/></svg>',
    target:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    gears:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    rocket:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
    users:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    growth:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>',
    puzzle:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19.5 12a2.5 2.5 0 0 1-5 0 2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1-5 0"/><path d="M14.5 7.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1 0 5z"/><path d="M14.5 19a2.5 2.5 0 0 1 0 5 2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z"/><path d="M7 12a2.5 2.5 0 0 0-5 0 2.5 2.5 0 1 0 5 0z"/><path d="M19.5 12a2.5 2.5 0 0 1 5 0 2.5 2.5 0 1 1-5 0z"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>',
    external:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg>',
    up:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>'
  };

  const iconFor = (key) => ICONS[key] || "";

  /* ======================================================================
     Document meta
     ====================================================================== */
  document.title = D.meta.title;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute("content", D.meta.description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", D.meta.title);

  /* ======================================================================
     Navigation
     ====================================================================== */
  function renderNav() {
    const navList = document.getElementById("nav-list");
    if (!navList) return;

    /* Wordmark + tagline from data (tagline is a decorative aria label) */
    const wordmarkText = document.querySelector(".wordmark-text");
    if (wordmarkText) wordmarkText.textContent = D.nav.wordmark;
    const headerTag = document.querySelector(".site-header .wordmark");
    if (headerTag) headerTag.setAttribute("aria-label", D.nav.wordmark + " — " + D.nav.tagline);

    navList.innerHTML = D.nav.links
      .map(
        (link) =>
          `<li><a href="${link.target}">${escapeHTML(link.label)}</a></li>`
      )
      .join("");

    const toggle = document.getElementById("nav-toggle");
    const siteNav = document.getElementById("site-nav");

    navList.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (link && window.innerWidth <= 820) closeMobileNav(toggle, siteNav);
    });
  }

  function closeMobileNav(toggle, nav) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function initMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const siteNav = document.getElementById("site-nav");
    if (!toggle || !siteNav) return;

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      if (open) {
        closeMobileNav(toggle, siteNav);
      } else {
        siteNav.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });

    /* Close if a nav link is tapped */
    siteNav.addEventListener("click", (event) => {
      if (event.target.closest("a") && window.innerWidth <= 820) {
        closeMobileNav(toggle, siteNav);
      }
    });

    /* Close on Escape */
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMobileNav(toggle, siteNav);
    });
  }

  /* Header shadow on scroll */
  function initHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ======================================================================
     Hero
     ====================================================================== */
  function renderHero() {
    const D_hero = D.hero;
    setText("hero-eyebrow", D_hero.eyebrow);

    /* Insert editorial accents: shimmering "clarity", script italic "strategy" */
    const headline = D_hero.headline
      .replace(/clarity/, (match) => `<span class="gold-amp">${match}</span>`)
      .replace(/strategy/, (match) => `<em class="script-word">${match}</em>`);
    const headlineEl = document.getElementById("hero-headline");
    if (headlineEl) headlineEl.innerHTML = headline;

    setText("hero-support", D_hero.supporting);
    setText("hero-scroll-hint", D_hero.scrollHint);

    const actions = document.getElementById("hero-actions");
    if (actions) {
      actions.innerHTML =
        `<a class="btn btn-primary" href="${D_hero.primaryCTA.target}">${escapeHTML(D_hero.primaryCTA.label)}</a>` +
        `<a class="btn btn-secondary" href="${D_hero.secondaryCTA.target}">${escapeHTML(D_hero.secondaryCTA.label)}</a>`;
    }
  }

  /* ======================================================================
     About
     ====================================================================== */
  function renderAbout() {
    const D_about = D.about;
    setSectionEyebrow("about-eyebrow", 1, D_about.eyebrow);
    setText("about-headline", D_about.headline);

    const paragraphs = document.getElementById("about-paragraphs");
    if (paragraphs) {
      paragraphs.innerHTML = D_about.paragraphs
        .map((p) => `<p>${escapeHTML(p)}</p>`)
        .join("");
    }

    setText("photo-frame", D_about.photoPlaceholder);
    setText("photo-caption", D_about.photoAlt);
  }

  /* ======================================================================
     Expertise
     ====================================================================== */
  function renderExpertise() {
    const D_exp = D.expertise;
    setSectionEyebrow("expertise-eyebrow", 2, D_exp.eyebrow);
    setText("expertise-headline", D_exp.headline);
    setText("expertise-intro", D_exp.intro);

    const grid = document.getElementById("expertise-grid");
    if (!grid) return;

    grid.innerHTML = D_exp.items
      .map(
        (item, i) =>
          `<li class="expertise-card reveal" style="--reveal-delay:${i * 60}ms">
            <span class="card-index" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
            <span class="card-icon" aria-hidden="true">${iconFor(item.icon)}</span>
            <h3 class="card-title">${escapeHTML(item.title)}</h3>
            <p class="card-description">${escapeHTML(item.description)}</p>
          </li>`
      )
      .join("");
  }

  /* ======================================================================
     Experience / timeline
     ====================================================================== */
  function renderExperience() {
    const D_exp = D.experience;
    setSectionEyebrow("experience-eyebrow", 3, D_exp.eyebrow);
    setText("experience-headline", D_exp.headline);
    setText("experience-intro", D_exp.intro);

    const timeline = document.getElementById("timeline");
    if (!timeline) return;

    timeline.innerHTML = D_exp.items
      .map(
        (item, i) => `
        <li class="timeline-item reveal" style="--reveal-delay:${i * 80}ms">
          <span class="timeline-period">${escapeHTML(item.period)}</span>
          <h3 class="timeline-role">${escapeHTML(item.role)}</h3>
          <div class="timeline-org">${escapeHTML(item.organization)}</div>
          <p class="timeline-summary">${escapeHTML(item.summary)}</p>
          <ul class="timeline-highlights">
            ${item.highlights
              .map((h) => `<li>${escapeHTML(h)}</li>`)
              .join("")}
          </ul>
        </li>`
      )
      .join("");
  }

  /* ======================================================================
     Philosophy
     ====================================================================== */
  function renderPhilosophy() {
    const D_phil = D.philosophy;
    setSectionEyebrow("philosophy-eyebrow", 4, D_phil.eyebrow);
    setText("philosophy-headline", D_phil.headline);
    setText("philosophy-quote", D_phil.quote);
    setText("philosophy-attribution", D_phil.attribution);

    const principles = document.getElementById("principles");
    if (principles) {
      principles.innerHTML = D_phil.principles
        .map(
          (p) => `
          <li class="reveal">
            <h3>${escapeHTML(p.title)}</h3>
            <p>${escapeHTML(p.description)}</p>
          </li>`
        )
        .join("");
    }
  }

  /* ======================================================================
     Contact
     ====================================================================== */
  function renderContact() {
    const D_con = D.contact;
    setSectionEyebrow("contact-eyebrow", 5, D_con.eyebrow);
    setText("contact-headline", D_con.headline);
    setText("contact-intro", D_con.intro);

    const channels = document.getElementById("contact-channels");
    if (channels) {
      channels.innerHTML = D_con.socials
        .map((s) => {
          const isMail = s.url.startsWith("mailto:");
          const icon = isMail ? iconFor("mail") : iconFor("external");
          return `<a class="channel-chip" href="${escapeHTML(s.url)}" target="${isMail ? "_self" : "_blank"}" rel="${isMail ? "" : "noopener"}">
            ${icon}<span>${escapeHTML(s.name)}</span>
          </a>`;
        })
        .join("");
    }

    /* Location line (created defensively in case the markup is edited) */
    if (D_con.location) {
      let el = document.getElementById("contact-location");
      if (!el) {
        el = document.createElement("div");
        el.id = "contact-location";
        el.className = "contact-location";
        const container = document.querySelector(".contact-inner");
        if (container) container.appendChild(el);
      }
      if (el) el.textContent = D_con.location;
    }
  }

  /* ======================================================================
     Footer
     ====================================================================== */
  function renderFooter() {
    const D_footer = D.footer;
    setText("footer-wordmark", D_footer.wordmark);
    setText("footer-tagline", D_footer.tagline);
    setText("footer-copyright", D_footer.copyright);
    setText("footer-back-to-top", D_footer.backToTop);

    const footerNav = document.querySelector(".footer-nav ul");
    if (!footerNav) {
      const nav = document.querySelector(".footer-nav");
      if (nav) {
        const ul = document.createElement("ul");
        ul.innerHTML = D_footer.nav
          .map(
            (link) =>
              `<li><a href="${link.target}">${escapeHTML(link.label)}</a></li>`
          )
          .join("");
        nav.appendChild(ul);
      }
    }

    /* Add an arrow to the back-to-top link */
    const topLink = document.getElementById("footer-top-link");
    if (topLink) {
      const arrow = document.createElement("span");
      arrow.className = "footer-top-icon";
      arrow.innerHTML = iconFor("up");
      topLink.prepend(arrow);
    }
  }

  /* ======================================================================
     Marquee ticker
     ====================================================================== */
  function renderTicker() {
    const track = document.getElementById("ticker-track");
    if (!track) return;
    const { ticker, tickerSeparator } = D.decor || {};
    if (!ticker || !ticker.length) return;

    /* 4 identical groups; translateX(-50%) loops seamlessly */
    track.innerHTML = Array.from({ length: 4 }, () => {
      const inner = ticker
        .map((t) => `<span>${escapeHTML(t)}</span>`)
        .join(`<span class="ticker-sep">${escapeHTML(tickerSeparator)}</span>`);
      return `<div class="ticker-group">${inner}</div>`;
    }).join("");
  }

  /* ======================================================================
     Hero parallax (uses the independent `translate` property so it never
     fights the orbit ring's rotate animation or the wordmark centering)
     ====================================================================== */
  function initParallax() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const wordmark = document.querySelector(".hero-wordmark");
    const orbit = document.querySelector(".hero-orbit");
    if (!wordmark && !orbit) return;

    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      if (wordmark) wordmark.style.translate = `0 ${y * 0.1}px`;
      if (orbit) orbit.style.translate = `0 ${y * 0.05}px`;
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  /* ======================================================================
     Reveal-on-scroll animation (Intersection Observer)
     ====================================================================== */
  function initReveal() {
    const targets = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* ======================================================================
     Active section highlighting in nav (optional polish)
     ====================================================================== */
  function initActiveNav() {
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(
      '.site-nav .nav-list a[href^="#"]'
    );
    if (!sections.length || !navLinks.length) return;

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const active = link.getAttribute("href") === "#" + id;
            link.classList.toggle("is-active", active);
          });
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => spy.observe(section));
  }

  /* ======================================================================
     Init — apply page metadata early (before DOMContentLoaded),
     render content on DOM ready
     ====================================================================== */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    renderNav();
    initMobileNav();
    initHeaderScroll();
    renderHero();
    renderAbout();
    renderExpertise();
    renderExperience();
    renderPhilosophy();
    renderContact();
    renderFooter();
    renderTicker();
    initParallax();
    initReveal();
    initActiveNav();
  }
})();