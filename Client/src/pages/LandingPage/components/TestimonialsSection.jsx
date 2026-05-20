import { TESTIMONIALS } from "../../../constants/landingData.jsx";

function TestimonialCard({ testimonial }) {
  return (
    <div className="relative group bg-white/2.5 border border-white/6 rounded-xs px-7 py-9 transition-all duration-300 cursor-default hover:bg-orange-500/6 hover:border-orange-500/25">

      <p className="text-4xl text-orange-500 mb-1 leading-none" style={{ fontFamily: "Syne, sans-serif" }}>"</p>

      <p className="text-white/60 text-[16px] leading-relaxed mb-6">
        {testimonial.text}
      </p>

      <div className="absolute bottom-0 left-5 flex items-center mb-1.5 gap-3">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-500 to-amber-500 flex items-center justify-center text-xs font-black text-[#0a0907] shrink-0"
          style={{ fontFamily: "Syne, sans-serif" }}>
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-white text-sm font-bold" style={{ fontFamily: "Syne, sans-serif" }}>
            {testimonial.name}
          </p>
          <p className="text-white/30 text-xs mt-0.5">{testimonial.role}</p>
        </div>
      </div>

    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="relative z-10 px-8 py-16">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <p className="text-[14px] text-orange-500 font-semibold tracking-[0.12em] uppercase mb-3.5">
            Loved by Builders
          </p>
          <h2 className="text-white font-black tracking-tight"
            style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)" }}>
            Don't take our word for it
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>

      </div>
    </section>
  );
}
