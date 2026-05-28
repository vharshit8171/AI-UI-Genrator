import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Features from "./components/Features.jsx";
import CTA from "./components/CTA.jsx";
import Footer from "./components/Footer.jsx";
import Testimonials from "./components/Testimonials.jsx";
  
const componentMap = {
    navbar: Navbar,
    hero: Hero,
    features: Features,
    cta: CTA,
    footer: Footer,
    testimonials: Testimonials,
};

export default function ComponentRenderer({ component }) {
    const { type, props = {}, styles = {} } = component;
    const normalizedType = type?.toLowerCase().trim();

    const Comp = componentMap[normalizedType];
    if (!Comp) {
        return (
            <div className="p-6 border rounded-lg bg-yellow-50 text-yellow-700">
                <h3 className="font-semibold text-lg capitalize">
                    {normalizedType} section
                </h3>
                <p className="text-sm">
                    This section is not supported yet.
                </p>
            </div>
        );
    }
    return <Comp {...props} styles={styles} />;
}