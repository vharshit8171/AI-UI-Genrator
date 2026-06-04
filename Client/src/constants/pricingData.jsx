import { Zap, Shield, Crown, Check, X } from "lucide-react";

export const PLANS = [
  {
    id: 1,
    name: "Starter Pack",
    tagline: "Dip your toes in AI-powered creation",
    credits: 100,
    price: 99,
    originalPrice: null,
    discount: null,
    pack: "STARTER",
    highlighted: false,
    badge: null,
    icon: Zap,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    description:
      "Perfect for individuals and hobbyists looking to explore AI-powered UI's generation without a big commitment.",
    cta: "Get Started",
    ctaVariant: "outline",
    popular: false,
    creditsPerDollar: (100 / 99).toFixed(2),

    features: [
      {
        text: "100 Credits included",
        included: true,
        tooltip: "Each generation costs approximately 1-5 credits",
      },
      {
        text: "AI UI generation",
        included: true,
        tooltip: "Generate full websites using AI",
      },
      {
        text: "Export source code",
        included: true,
        tooltip: "Download your generated website code",
      },
      {
        text: "Basic templates",
        included: true,
        tooltip: "Access to 10+ starter templates",
      },
      {
        text: "Priority queue",
        included: false,
        tooltip: "Faster generation times",
      },
      {
        text: "Dedicated support",
        included: false,
        tooltip: "Get priority customer support",
      },
    ],

    limits: {
      generationsPerDay: 5,
      maxComponentsPerPage: 5,
      storageGB: 1,
      teamMembers: 1,
    },

    meta: {
      isOneTimePurchase: true,
      creditsExpiry: "Never",
      supportLevel: "Community",
    },
  },

  {
    id: 2,
    name: "Pro Pack",
    tagline: "The sweet spot for serious builders",
    credits: 300,
    price: 249,
    originalPrice: 299,
    discount: "17% OFF",
    pack: "PRO",
    highlighted: true,
    badge: "Most Popular",
    icon: Shield,
    color: "violet",
    gradient: "from-violet-500 to-purple-600",
    description:
      "Ideal for freelancers and small teams who need more power, faster generation, and premium features for client projects.",
    cta: "Buy Pro Pack",
    ctaVariant: "default",
    popular: true,
    creditsPerDollar: (300 / 249).toFixed(2),

    features: [
      {
        text: "300 Credits included",
        included: true,
        tooltip: "3x more credits than Starter",
      },
      {
        text: "AI UI generation",
        included: true,
        tooltip: "Generate full websites using AI",
      },
      {
        text: "Export source code",
        included: true,
        tooltip: "Download your generated website code",
      },
      {
        text: "Premium templates",
        included: true,
        tooltip: "Access to 50+ premium templates",
      },
      {
        text: "Priority queue",
        included: true,
        tooltip: "Skip the line — 2x faster generation",
      },
      {
        text: "Dedicated support",
        included: false,
        tooltip: "Get priority customer support",
      },
    ],

    limits: {
      generationsPerDay: 15,
      maxComponentsPerPage: 20,
      storageGB: 10,
      teamMembers: 3,
    },

    meta: {
      isOneTimePurchase: true,
      creditsExpiry: "Never",
      supportLevel: "Email",
    },
  },

  {
    id: 3,
    name: "Premium Pack",
    tagline: "Unlimited power for pros & agencies",
    credits: 700,
    price: 499,
    originalPrice: 699,
    discount: "29% OFF",
    pack: "PREMIUM",
    highlighted: false,
    badge: "Best Value",
    icon: Crown,
    color: "amber",
    gradient: "from-amber-500 to-orange-500",
    description:
      "Built for agencies, studios, and power users who need maximum credits, team collaboration, and white-glove support.",
    cta: "Buy Premium Pack",
    ctaVariant: "outline",
    popular: false,
    creditsPerDollar: (700 / 499).toFixed(2),

    features: [
      {
        text: "700 Credits included",
        included: true,
        tooltip: "7x more credits than Starter",
      },
      {
        text: "AI UI generation",
        included: true,
        tooltip: "Generate full websites using AI",
      },
      {
        text: "Export source code",
        included: true,
        tooltip: "Download your generated website code",
      },
      {
        text: "All premium templates",
        included: true,
        tooltip: "Full access to all 100+ templates",
      },
      {
        text: "Priority queue",
        included: true,
        tooltip: "Highest priority — 3x faster generation",
      },
      {
        text: "Dedicated support",
        included: true,
        tooltip: "24/7 priority support with dedicated manager",
      },
    ],

    limits: {
      generationsPerDay: 30,
      maxComponentsPerPage: 100,
      storageGB: 30,
      teamMembers: 10,
    },

    meta: {
      isOneTimePurchase: true,
      creditsExpiry: "Never",
      refundPolicy: "14-day money back guarantee",
      supportLevel: "Dedicated",
    },
  },
];

export const FAQS = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes. You can upgrade or downgrade at any time. Changes take effect immediately and we'll prorate the billing. No long-term commitments or contracts.",
  },
  {
    q: "What counts as an AI generation?",
    a: "Each time you generate or significantly regenerate a page using the AI prompt, it counts as one generation. Edits in the visual editor don't count.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer refunds within 14 days of purchase if you haven't used more than 20% of the credits. Just contact support with your order details.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes, we offer a free trial with 30 credits so you can test out the AI generation and see if it's right for you before committing to a paid plan.",
  },
];

export const LOGOS = ["Vercel", "Stripe", "Linear", "Notion", "Figma", "Raycast"];
