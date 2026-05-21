export const PLANS = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for trying out Buildr.",
    cta: "Get Started Free",
    highlighted: false,
    features: [
      { text: "3 sites",                   included: true  },
      { text: "25 AI generations / month", included: true  },
      { text: "Buildr subdomain",          included: true  },
      { text: "1 GB bandwidth",            included: true  },
      { text: "Custom domain",             included: false },
      { text: "Remove Buildr branding",    included: false },
      { text: "Priority support",          included: false },
      { text: "Team members",             included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 19,
    yearlyPrice: 15,
    description: "For creators and solo builders shipping fast.",
    cta: "Start Pro Trial",
    highlighted: true,
    badge: "Most Popular",
    features: [
      { text: "Unlimited sites",             included: true },
      { text: "500 AI generations / month",  included: true },
      { text: "Custom domain",               included: true },
      { text: "50 GB bandwidth",             included: true },
      { text: "Remove Buildr branding",      included: true },
      { text: "Priority support",            included: true },
      { text: "Team members",               included: false },
      { text: "White-label exports",         included: false },
    ],
  },
  {
    id: "team",
    name: "Team",
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: "For agencies and growing teams.",
    cta: "Start Team Trial",
    highlighted: false,
    features: [
      { text: "Unlimited sites",            included: true },
      { text: "Unlimited AI generations",   included: true },
      { text: "Custom domain",              included: true },
      { text: "500 GB bandwidth",           included: true },
      { text: "Remove Buildr branding",     included: true },
      { text: "Priority support",           included: true },
      { text: "Up to 10 team members",      included: true },
      { text: "White-label exports",        included: true },
    ],
  },
];

export const FAQS = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes. You can upgrade or downgrade at any time. Changes take effect immediately and we'll prorate the billing.",
  },
  {
    q: "What counts as an AI generation?",
    a: "Each time you generate or significantly regenerate a page using the AI prompt, it counts as one generation. Edits in the visual editor don't count.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 14-day money-back guarantee on all paid plans, no questions asked.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Pro and Team plans come with a 7-day free trial. No credit card required to start.",
  },
];

export const LOGOS = ["Vercel", "Stripe", "Linear", "Notion", "Figma", "Raycast"];
