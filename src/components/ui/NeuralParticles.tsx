'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
}

export default function NeuralParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Colores de neurotransmisores
    const colors = [
      'rgba(59, 130, 246, 0.6)', // Acetylcholine - Azul
      'rgba(249, 115, 22, 0.6)', // Dopamine - Naranja
      'rgba(168, 85, 247, 0.6)', // Serotonin - Púrpura
      'rgba(34, 197, 94, 0.6)',  // GABA - Verde
      'rgba(239, 68, 68, 0.6)',  // Synaptic - Rojo
    ];

    // Crear partículas iniciales
    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.3,
      life: Math.random() * 100,
      maxLife: 100 + Math.random() * 100,
    });

    // Inicializar partículas
    for (let i = 0; i < 50; i++) {
      particlesRef.current.push(createParticle());
    }

    // Función de animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Actualizar y dibujar partículas
      particlesRef.current.forEach((particle, index) => {
        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Rebotar en los bordes
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -1;
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy *= -1;
        }

        // Mantener dentro del canvas
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Dibujar partícula
        ctx.save();
        ctx.globalAlpha = particle.opacity * (1 - particle.life / particle.maxLife);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Efecto de glow
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = particle.size * 2;
        ctx.fill();
        ctx.restore();

        // Reemplazar partículas muertas
        if (particle.life > particle.maxLife) {
          particlesRef.current[index] = createParticle();
        }
      });

      // Dibujar conexiones entre partículas cercanas
      particlesRef.current.forEach((particle1, i) => {
        particlesRef.current.slice(i + 1).forEach((particle2) => {
          const dx = particle1.x - particle2.x;
          const dy = particle1.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.3;
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
