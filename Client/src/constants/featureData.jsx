export const FEATURES = [
  {
    category: "AI Generation",
    items: [
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
          </svg>
        ),
        title: "Multi-Model Support",
        desc: "Switch between GPT-4, Claude, Gemini and more. Pick the best brain for every task without leaving the editor.",
        badge: "Core",
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
          </svg>
        ),
        title: "Smart Prompt Engine",
        desc: "Buildr auto-enhances your prompts with context, tone calibration, and structured instructions before sending.",
        badge: "Popular",
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
          </svg>
        ),
        title: "Structured Output Modes",
        desc: "Generate content as plain text, markdown, JSON, tables, or custom templates. Always get the format you need.",
        badge: null,
      },
    ],
  },
  {
    category: "Editor Experience",
    items: [
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        ),
        title: "Rich Text Editor",
        desc: "A distraction-free writing canvas with markdown shortcuts, inline formatting, and real-time word count.",
        badge: null,
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/>
          </svg>
        ),
        title: "Iterative Regeneration",
        desc: "Not quite right? Regenerate any section, tweak the tone, or ask Buildr to expand, shorten, or rewrite inline.",
        badge: "Popular",
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
          </svg>
        ),
        title: "Version History",
        desc: "Every generation is saved. Jump back to any previous version, compare side-by-side, and restore in one click.",
        badge: null,
      },
    ],
  },
  {
    category: "Workflow & Export",
    items: [
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        ),
        title: "One-Click Export",
        desc: "Export your content to Markdown, PDF, Notion, Google Docs, or plain text — wherever your workflow lives.",
        badge: "New",
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        ),
        title: "Template Library",
        desc: "50+ battle-tested prompt templates for blogs, emails, ads, product descriptions, and more — ready to customize.",
        badge: null,
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        ),
        title: "Team Workspaces",
        desc: "Invite collaborators, share projects, manage permissions, and keep everyone building from the same source of truth.",
        badge: "Coming Soon",
      },
    ],
  },
];

export const BADGE_STYLES = {
  Core: "bg-orange-500/15 text-orange-400 border border-orange-500/25",
  Popular: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
  New: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
  "Coming Soon": "bg-white/5 text-white/40 border border-white/10",
};

export const STATS = [
  { value: "9+", label: "AI Models" },
  { value: "50+", label: "Templates" },
  { value: "10x", label: "Faster Writing" },
  { value: "99.9%", label: "Uptime" },
];