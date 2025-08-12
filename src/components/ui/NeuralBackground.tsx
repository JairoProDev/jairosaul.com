'use client';

import { useEffect, useRef } from 'react';

interface NeuralBackgroundProps {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  theme?: 'genetic' | 'neural' | 'robotic' | 'hybrid';
}

export default function NeuralBackground({ 
  className = '', 
  intensity = 'medium',
  theme = 'hybrid' 
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = {
      genetic: ['#10b981', '#059669', '#047857'],
      neural: ['#3b82f6', '#1d4ed8', '#1e40af'],
      robotic: ['#8b5cf6', '#7c3aed', '#6d28d9'],
      hybrid: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b']
    };

    const themeColors = colors[theme];
    const intensityMultiplier = intensity === 'low' ? 0.5 : intensity === 'medium' ? 1 : 1.5;

    // Circuitos principales
    const circuits: Array<{
      points: Array<{x: number, y: number}>;
      color: string;
      width: number;
      opacity: number;
      pulse: number;
      pulseSpeed: number;
    }> = [];

    // Crear circuitos principales
    const circuitCount = Math.floor(8 * intensityMultiplier);
    for (let i = 0; i < circuitCount; i++) {
      const points: Array<{x: number, y: number}> = [];
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * canvas.height;
      
      points.push({x: startX, y: startY});
      
      // Crear camino de circuito con líneas rectas y ángulos
      let currentX = startX;
      let currentY = startY;
      const segments = 5 + Math.floor(Math.random() * 8);
      
      for (let j = 0; j < segments; j++) {
        const direction = Math.floor(Math.random() * 4); // 0: right, 1: down, 2: left, 3: up
        const length = 50 + Math.random() * 150;
        
        switch (direction) {
          case 0: currentX += length; break;
          case 1: currentY += length; break;
          case 2: currentX -= length; break;
          case 3: currentY -= length; break;
        }
        
        // Mantener dentro del canvas
        currentX = Math.max(0, Math.min(canvas.width, currentX));
        currentY = Math.max(0, Math.min(canvas.height, currentY));
        
        points.push({x: currentX, y: currentY});
      }
      
      circuits.push({
        points,
        color: themeColors[Math.floor(Math.random() * themeColors.length)],
        width: 1 + Math.random() * 2,
        opacity: 0.5 + Math.random() * 0.2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02
      });
    }

    // Nodos de conexión
    const nodes: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      pulse: number;
      pulseSpeed: number;
      connections: number[];
    }> = [];

    // Crear nodos en puntos de intersección
    circuits.forEach((circuit, circuitIndex) => {
      circuit.points.forEach((point, pointIndex) => {
        if (pointIndex > 0) {
          nodes.push({
            x: point.x,
            y: point.y,
            size: 3 + Math.random() * 4,
            color: circuit.color,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03,
            connections: [circuitIndex]
          });
        }
      });
    });

    // Patrones de PCB (Printed Circuit Board)
    const pcbPatterns: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
      opacity: number;
    }> = [];

    // Crear patrones de PCB
    const pcbCount = Math.floor(6 * intensityMultiplier);
    for (let i = 0; i < pcbCount; i++) {
      pcbPatterns.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 100 + Math.random() * 200,
        height: 60 + Math.random() * 120,
        color: themeColors[Math.floor(Math.random() * themeColors.length)],
        opacity: 0.05 + Math.random() * 0.1
      });
    }

    function drawCircuit(ctx: CanvasRenderingContext2D, circuit: typeof circuits[0]) {
      ctx.save();
      ctx.strokeStyle = circuit.color;
      ctx.lineWidth = circuit.width;
      ctx.globalAlpha = circuit.opacity * (0.7 + 0.3 * Math.sin(circuit.pulse));
      
      ctx.beginPath();
      ctx.moveTo(circuit.points[0].x, circuit.points[0].y);
      
      for (let i = 1; i < circuit.points.length; i++) {
        ctx.lineTo(circuit.points[i].x, circuit.points[i].y);
      }
      
      ctx.stroke();
      ctx.restore();
    }

    function drawNode(ctx: CanvasRenderingContext2D, node: typeof nodes[0]) {
      ctx.save();
      ctx.fillStyle = node.color;
      ctx.globalAlpha = 0.2 + 0.1 * Math.sin(node.pulse);
      
      // Nodo principal
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Anillo exterior
      ctx.globalAlpha = 0.2 + 0.1 * Math.sin(node.pulse);
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size * 2, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.restore();
    }

    function drawPCBPattern(ctx: CanvasRenderingContext2D, pattern: typeof pcbPatterns[0]) {
      ctx.save();
      ctx.strokeStyle = pattern.color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = pattern.opacity;
      
      // Líneas horizontales
      for (let y = pattern.y; y < pattern.y + pattern.height; y += 10) {
        ctx.beginPath();
        ctx.moveTo(pattern.x, y);
        ctx.lineTo(pattern.x + pattern.width, y);
        ctx.stroke();
      }
      
      // Líneas verticales
      for (let x = pattern.x; x < pattern.x + pattern.width; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, pattern.y);
        ctx.lineTo(x, pattern.y + pattern.height);
        ctx.stroke();
      }
      
      ctx.restore();
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dibujar patrones de PCB
      pcbPatterns.forEach(pattern => {
        drawPCBPattern(ctx, pattern);
      });
      
      // Dibujar circuitos
      circuits.forEach(circuit => {
        circuit.pulse += circuit.pulseSpeed;
        drawCircuit(ctx, circuit);
      });
      
      // Dibujar nodos
      nodes.forEach(node => {
        node.pulse += node.pulseSpeed;
        drawNode(ctx, node);
      });
      
      // Conexiones entre nodos cercanos
      nodes.forEach((node1, i) => {
        nodes.slice(i + 1).forEach(node2 => {
          const distance = Math.sqrt((node1.x - node2.x) ** 2 + (node1.y - node2.y) ** 2);
          if (distance < 80) {
            ctx.save();
            ctx.strokeStyle = node1.color;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = 0.1 * (1 - distance / 80);
            ctx.beginPath();
            ctx.moveTo(node1.x, node1.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });
      
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [intensity, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}
