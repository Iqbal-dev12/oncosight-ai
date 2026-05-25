import React, { useEffect, useRef } from 'react';

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor(window.innerWidth / 15), 100);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.04)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 210, 255, ${p.alpha})`;
        ctx.fill();

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce borders
        if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
        if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 select-none overflow-hidden bg-black">
      {/* Dynamic Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />

      {/* Cybernetic Moving Grid */}
      <div className="cyber-grid cyber-grid-moving absolute inset-0 opacity-40" />

      {/* Scanning lines effect */}
      <div className="scanlines absolute inset-0 pointer-events-none" />

      {/* Glowing Ambient Light Orbs */}
      <div className="glow-orb-blue -left-48 -top-48 animate-pulse-glow" />
      <div className="glow-orb-purple -right-48 bottom-0" style={{ animationDelay: '1s' }} className="glow-orb-purple -right-48 bottom-0 animate-pulse-glow" />
      <div className="glow-orb-blue left-1/3 top-1/2 opacity-20" />

      {/* Hologram Overlay Dots */}
      <div className="hologram-dots absolute inset-0 opacity-20" />
      
      {/* Dark vignetting overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
    </div>
  );
}
