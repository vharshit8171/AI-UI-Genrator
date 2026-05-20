export const LAYERS = [
  { id: 1, label: "Hero Section",    icon: "⊞", children: [
    { id: 11, label: "Heading",      icon: "T"  },
    { id: 12, label: "Subheading",   icon: "T"  },
    { id: 13, label: "CTA Button",   icon: "⬜" },
  ]},
  { id: 2, label: "Features Grid",   icon: "⊞", children: [
    { id: 21, label: "Feature Card 1", icon: "⬜" },
    { id: 22, label: "Feature Card 2", icon: "⬜" },
    { id: 23, label: "Feature Card 3", icon: "⬜" },
  ]},
  { id: 3, label: "Testimonials",    icon: "⊞", children: [] },
  { id: 4, label: "CTA Block",       icon: "⊞", children: [] },
  { id: 5, label: "Footer",          icon: "⊞", children: [] },
];

export const DEVICES = [
  { id: "desktop", label: "Desktop", icon: "🖥", width: "100%"  },
  { id: "tablet",  label: "Tablet",  icon: "⬜", width: "768px" },
  { id: "mobile",  label: "Mobile",  icon: "📱", width: "390px" },
];
