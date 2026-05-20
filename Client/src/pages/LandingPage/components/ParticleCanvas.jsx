import { useEffect, useRef } from "react";

const PARTICLE_COLORS = [
  "rgba(251,146,60,",
  "rgba(245,158,11,",
  "rgba(234,88,12,",
  "rgba(253,186,116,",
];

export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let W, H, particles;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const count = Math.floor((W * H) / 9000);
      particles = Array.from({ length: count }, () => ({
        x:     Math.random() * W,
        y:     Math.random() * H,
        r:     Math.random() * 1.8 + 0.4,
        vx:    (Math.random() - 0.5) * 0.35,
        vy:    (Math.random() - 0.5) * 0.35,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        alpha: Math.random() * 0.5 + 0.15,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouse.current;
      const CONNECT = 120, REPEL = 90;

      for (let i = 0; i < particles.length; i++) {
        const p  = particles[i];
        const dx = p.x - mx, dy = p.y - my;
        const d  = Math.sqrt(dx * dx + dy * dy);

        // Repel from cursor
        if (d < REPEL) {
          const force = (REPEL - d) / REPEL;
          p.x += (dx / d) * force * 2.2;
          p.y += (dy / d) * force * 2.2;
        }

        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q  = particles[j];
          const ed = Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2);
          if (ed < CONNECT) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(251,146,60,${0.12 * (1 - ed / CONNECT)})`;
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }

        // Connect to cursor
        if (d < CONNECT * 1.4) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(245,158,11,${0.2 * (1 - d / (CONNECT * 1.4))})`;
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove  = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = ()  => { mouse.current = { x: -9999, y: -9999 }; };

    window.addEventListener("resize",     resize);
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
