"use client";

import React, { memo, useEffect, useRef } from "react";

export interface GoldParticleFieldProps {
  enabled?: boolean;
  density?: "low" | "medium" | "high";
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  size: number;
  speed: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
  timeOffset: number;
}

const GoldParticleField = memo<GoldParticleFieldProps>(({
  enabled = true,
  density = "high",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Sacred densities (Fibonacci-aligned counts)
    const particleCounts = {
      low: 27,
      medium: 54,
      high: 108,
    };
    const count = particleCounts[density];

    const colors = ["#FFD700", "#D4A017", "#FFF8DC", "#FBBF24"];
    const PHI = 1.618033988749895;

    // Initialize particles
    const createParticle = (isInitial = false): Particle => {
      const size = Math.random() * (PHI * 3 - 1) + 1; // 1px to 4.85px
      const speed = Math.random() * 0.8 + 0.2; // 0.2 to 1.0
      const opacity = Math.random() * (0.618 - 0.1) + 0.1; // 0.1 to 0.618
      const amplitude = Math.random() * (PHI * 10 - 2) + 2; // 2px to 16.18px
      const frequency = Math.random() * 0.02 + 0.005;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random() * width;
      const y = isInitial ? Math.random() * height : height + 10;
      
      return {
        x,
        y,
        baseX: x,
        size,
        speed,
        amplitude,
        frequency,
        color,
        opacity,
        timeOffset: Math.random() * 1000,
      };
    };

    for (let i = 0; i < count; i++) {
      particles.push(createParticle(true));
    }

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Performance & Animation tracking variables
    let lastTime = performance.now();
    let fps = 60;
    let frameCount = 0;
    let fpsInterval = lastTime;

    const render = () => {
      frameCount++;
      const now = performance.now();
      lastTime = now;

      // Track FPS
      if (now - fpsInterval >= 1000) {
        fps = Math.round((frameCount * 1000) / (now - fpsInterval));
        frameCount = 0;
        fpsInterval = now;
      }

      // Performance Throttling: If FPS drops below 30, skip frame draws to maintain UI responsiveness
      if (fps < 30 && frameCount % 2 === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Sinusoidal wave motion horizontally
        p.timeOffset += p.frequency;
        p.x = p.baseX + Math.sin(p.timeOffset) * p.amplitude;
        
        // Rise upward
        p.y -= p.speed;

        // Fade opacity out at borders
        let currentOpacity = p.opacity;
        if (p.y < height * 0.2) {
          currentOpacity = p.opacity * (p.y / (height * 0.2));
        }

        // Draw particle
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.globalAlpha = currentOpacity;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Recycle particle when exiting top
        if (p.y < -10) {
          Object.assign(p, createParticle(false));
        }
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled, density]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] select-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
});

GoldParticleField.displayName = "GoldParticleField";
export default GoldParticleField;
