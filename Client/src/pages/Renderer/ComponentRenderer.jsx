import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Features from "./components/Features.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Footer from "./components/Footer.jsx";
import CTA from "./components/CTA.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Pricing from "./components/Pricing.jsx";
import Stats from "./components/Stats.jsx";
import FAQ from "./components/FAQ.jsx";
import Contact from "./components/Contact.jsx";
import Gallery from "./components/Gallery.jsx";
import RichText from "./components/RichText.jsx";
import { ThemeContext } from "../../context/ThemeContext.jsx";

const componentMap = {
  navbar: Navbar,
  hero: Hero,
  features: Features,
  testimonials: Testimonials,
  footer: Footer,
  cta: CTA,
  about: About,
  services: Services,
  pricing: Pricing,
  stats: Stats,
  faq: FAQ,
  contact: Contact,
  gallery: Gallery,
  richtext: RichText,
};

export default function ComponentRenderer({ component,theme }) {
  const { type, props = {}, styles = {} } = component;
  const normalizedType = type?.toLowerCase().trim();

  const Comp = componentMap[normalizedType];
  if (!Comp) {
    return (
      <div className="p-6 border rounded-lg bg-yellow-50 text-yellow-700">
        <h3 className="font-semibold text-lg capitalize">
          {normalizedType} section
        </h3>
        <p className="text-sm">This section is not supported yet.</p>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={theme}>
      <Comp {...props} styles={styles} />
    </ThemeContext.Provider>
  )
}