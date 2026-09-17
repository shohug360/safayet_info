/* ==========================================================================
   SITE CONTENT — Centralized data
   --------------------------------------------------------------------------
   All user-facing text lives here. Edit this file to update the website —
   no other HTML/CSS edits are needed for content changes.

   NOTE ON PLACEHOLDERS: Anything wrapped in brackets like [Placeholder]
   is a placeholder to be replaced with real information later.
   ========================================================================== */

const SITE_DATA = {
  /* ---- Browser / SEO ---- */
  meta: {
    title: "Al Safayat — Management Professional",
    description:
      "The personal portfolio of Al Safayat, a management professional focused on strategy, leadership, operations, and meaningful organizational impact."
  },

  /* ---- Navigation ---- */
  nav: {
    wordmark: "AL SAFAYAT",
    tagline: "Management Professional",
    links: [
      { label: "About",   target: "#about" },
      { label: "Expertise", target: "#expertise" },
      { label: "Experience", target: "#experience" },
      { label: "Philosophy", target: "#philosophy" },
      { label: "Contact", target: "#contact" }
    ]
  },

  /* ---- Hero ---- */
  hero: {
    eyebrow: "MANAGEMENT • STRATEGY • LEADERSHIP",
    headline: "Turning complexity into clarity, strategy into action.",
    supporting:
      "I'm Al Safayat, a management professional focused on strategic thinking, effective leadership, operational excellence, and turning ideas into meaningful results.",
    primaryCTA: {
      label: "Explore My Work",
      target: "#expertise"
    },
    secondaryCTA: {
      label: "Let's Connect",
      target: "#contact"
    },
    scrollHint: "Scroll"
  },

  /* ---- Decorative elements (marquee ticker) ---- */
  decor: {
    ticker: [
      "Management",
      "Strategy",
      "Leadership",
      "Operations",
      "Project Execution",
      "Team Development",
      "Business Growth",
      "Problem Solving"
    ],
    tickerSeparator: "✦"
  },

  /* ---- About ---- */
  about: {
    eyebrow: "About",
    headline: "A focus on meaningful, lasting results.",
    paragraphs: [
      "I'm Al Safayat, a management professional who believes strong organizations are built on clarity — clear strategy, clear roles, and clear communication.",
      "[Biography placeholder: Add a short professional biography here, covering background, what drives you, and the kind of impact you aim to create in your work.]",
      "[Accomplishments placeholder: Add a standout achievement, project, or philosophy of working worth highlighting to visitors.]"
    ],
    photoAlt: "Portrait of Al Safayat",
    photoPlaceholder: "[ Photo: Add portrait of Al Safayat here ]"
  },

  /* ---- Expertise ---- */
  expertise: {
    eyebrow: "Expertise",
    headline: "Where I focus my energy.",
    intro:
      "Eight disciplines that shape how I approach organizations, teams, and the work itself.",
    items: [
      {
        icon: "briefcase",
        title: "Management",
        description: "Turning people, process, and priorities into a rhythm of delivery that holds up under pressure."
      },
      {
        icon: "compass",
        title: "Leadership",
        description: "Building aligned teams where people know what matters, why it matters, and how they contribute."
      },
      {
        icon: "target",
        title: "Strategy",
        description: "Distilling ambiguity into a clear direction, then connecting that direction to everyday decisions."
      },
      {
        icon: "gears",
        title: "Operations",
        description: "Designing systems and workflows that are efficient, repeatable, and resilient to change."
      },
      {
        icon: "rocket",
        title: "Project Execution",
        description: "Driving initiatives from first idea to delivered result with discipline, momentum, and follow-through."
      },
      {
        icon: "users",
        title: "Team Development",
        description: "Growing people and capability so the team is stronger after every engagement than before."
      },
      {
        icon: "growth",
        title: "Business Growth",
        description: "Finding the levers that move the business forward and mobilizing effort behind them."
      },
      {
        icon: "puzzle",
        title: "Problem Solving",
        description: "Confronting hard problems head-on with structure, evidence, and a bias toward action."
      }
    ]
  },

  /* ---- Experience ---- */
  experience: {
    eyebrow: "Experience",
    headline: "A record built on impact.",
    intro:
      "A place for the professional journey to live. Timeline entries below are placeholders, ready for real roles and accomplishments.",
    items: [
      {
        role: "[Role / Title]",
        organization: "[Organization]",
        period: "[20XX — Present]",
        summary: "[Summary of responsibilities, scope, and the results delivered in this role.]",
        highlights: [
          "[Highlight 1 — a specific outcome or initiative]",
          "[Highlight 2 — a specific outcome or initiative]",
          "[Highlight 3 — a specific outcome or initiative]"
        ]
      },
      {
        role: "[Role / Title]",
        organization: "[Organization]",
        period: "[20XX — 20XX]",
        summary: "[Summary of responsibilities, scope, and the results delivered in this role.]",
        highlights: [
          "[Highlight 1 — a specific outcome or initiative]",
          "[Highlight 2 — a specific outcome or initiative]"
        ]
      }
    ]
  },

  /* ---- Philosophy ---- */
  philosophy: {
    eyebrow: "Philosophy",
    headline: "How I approach the work.",
    quote:
      "Complexity is the default. Clarity is the discipline. My job, in every engagement, is to make the path forward simple enough to act on — and to build the momentum that carries it through.",
    attribution: "Al Safayat",
    principles: [
      {
        title: "Clarity before action",
        description: "No plan survives contact with reality, but a team that knows its direction adapts fast."
      },
      {
        title: "People first, systems always",
        description: "Great systems fail without ownership; engaged people succeed with structure."
      },
      {
        title: "Results, not activity",
        description: "Busy is easy. Effective is harder. I measure my work by outcomes, not output."
      },
      {
        title: "Leave it better",
        description: "Every team I touch should be more capable at the end than it was at the start."
      }
    ]
  },

  /* ---- Contact ---- */
  contact: {
    eyebrow: "Contact",
    headline: "Let's build something meaningful.",
    intro:
      "Whether you're exploring collaboration, a partnership, or just want to talk strategy — I'd welcome the conversation.",
    email: {
      label: "Email",
      address: "hello@alsafayat.com" // [Placeholder email address]
    },
    socials: [
      { name: "LinkedIn",   url: "https://www.linkedin.com/" }, // [Placeholder URL]
      { name: "Twitter / X", url: "https://x.com/" },            // [Placeholder URL]
      { name: "Email",      url: "mailto:hello@alsafayat.com" }
    ],
    location: "[ City, Country ]" // [Placeholder location]
  },

  /* ---- Footer ---- */
  footer: {
    wordmark: "AL SAFAYAT",
    tagline: "Management • Strategy • Leadership",
    nav: [
      { label: "About",   target: "#about" },
      { label: "Expertise", target: "#expertise" },
      { label: "Experience", target: "#experience" },
      { label: "Philosophy", target: "#philosophy" },
      { label: "Contact", target: "#contact" }
    ],
    backToTop: "Back to top",
    copyright: "© 2026 Al Safayat. All rights reserved."
  }
};