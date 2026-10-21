"use client";

import { useRef, useEffect } from "react";

export function PhysicsDroplet() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();
    let lastScrollY = window.scrollY;

    // Fluid droplet physical state
    const anchorX = 40;
    const anchorY = 32;
    let posX = anchorX;
    let posY = anchorY;
    let vx = 0;
    let vy = 0;

    // Physical constants
    const stiffness = 160; // Spring restorative tension
    const damping = 12;    // Fluid internal viscosity
    const baseRadius = 14; // Core droplet radius

    // Interactive pointer state
    let isDragging = false;
    let mouseCanvasX = -100;
    let mouseCanvasY = -100;

    // Jiggle harmonic phase
    let wobblePhase = 0;
    let wobbleAmp = 0;

    // Track scroll velocity and inject physical inertia
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaScroll = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Vertical momentum impulse proportional to scroll speed
      // Positive scroll (down) causes droplet to pull downward and stretch
      const scrollImpulse = deltaScroll * 0.28;
      vy += Math.max(-25, Math.min(25, scrollImpulse));
      wobbleAmp = Math.min(wobbleAmp + Math.abs(deltaScroll) * 0.08, 6.0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Pointer events on canvas
    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseCanvasX = e.clientX - rect.left;
      mouseCanvasY = e.clientY - rect.top;

      const dx = mouseCanvasX - posX;
      const dy = mouseCanvasY - posY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (isDragging) {
        // Direct liquid drag stretch
        posX = mouseCanvasX;
        posY = mouseCanvasY;
        vx = 0;
        vy = 0;
      } else if (dist < 45) {
        // Subtle magnetic fluid pull towards cursor
        const pullFactor = (1 - dist / 45) * 0.8;
        vx += dx * pullFactor;
        vy += dy * pullFactor;
        wobbleAmp = Math.min(wobbleAmp + 1.5, 4.0);
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const dx = clickX - posX;
      const dy = clickY - posY;

      if (Math.sqrt(dx * dx + dy * dy) < baseRadius * 1.8) {
        isDragging = true;
      }
    };

    const handlePointerUp = () => {
      if (isDragging) {
        isDragging = false;
        // Impart release snap impulse
        wobbleAmp = 5.0;
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);

    // ─── 60 FPS Physics Simulation & Fluid Render Loop ─────────────────────
    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.033); // clamp to max 30ms step
      lastTime = currentTime;

      // 1. Spring-Damper Numerical Integration (Hooke's law with fluid friction)
      if (!isDragging) {
        const dx = posX - anchorX;
        const dy = posY - anchorY;

        const forceX = -stiffness * dx - damping * vx;
        const forceY = -stiffness * dy - damping * vy;

        vx += forceX * dt;
        vy += forceY * dt;

        posX += vx * dt;
        posY += vy * dt;
      }

      // 2. Wobble / Capillary Surface Wave Decay
      wobblePhase += dt * 14;
      wobbleAmp *= Math.exp(-dt * 3.5);

      // 3. Clear and compute canvas transform
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Velocity magnitude and orientation angle
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx);

      // Fluid Volume Conservation (Squash & Stretch)
      // When moving fast, stretch parallel to velocity and compress perpendicular
      const stretch = Math.min(1 + speed * 0.012, 1.8);
      const compress = 1 / Math.sqrt(stretch);

      ctx.save();
      ctx.translate(posX, posY);
      ctx.rotate(angle);

      // Fluid Meniscus / Stem connection back to origin if stretched far
      const distFromAnchor = Math.sqrt((posX - anchorX) ** 2 + (posY - anchorY) ** 2);
      if (distFromAnchor > 8) {
        ctx.save();
        // Counter-rotate to draw connector in world space
        ctx.rotate(-angle);
        ctx.beginPath();
        ctx.moveTo(anchorX - posX - 2, anchorY - posY);
        ctx.quadraticCurveTo(0, 0, 0, -baseRadius * 0.4);
        ctx.lineTo(0, baseRadius * 0.4);
        ctx.quadraticCurveTo(0, 0, anchorX - posX + 2, anchorY - posY);
        ctx.closePath();
        ctx.fillStyle = "rgba(44, 85, 69, 0.18)";
        ctx.fill();
        ctx.restore();
      }

      // 4. Draw Organic Fluid Droplet Geometry with Surface Capillary Jiggle
      ctx.beginPath();
      const points = 24;
      for (let i = 0; i <= points; i++) {
        const theta = (i / points) * Math.PI * 2;
        // Base deformed ellipse
        let rx = baseRadius * stretch;
        let ry = baseRadius * compress;

        // Add harmonic capillary jiggle ripples
        const harmonic = Math.sin(theta * 3 + wobblePhase) * wobbleAmp;
        rx += harmonic * 0.7;
        ry += harmonic * 0.7;

        // Front teardrop elongation
        const elongation = Math.cos(theta) > 0 ? 1 + (Math.cos(theta) * speed * 0.008) : 1;
        const px = Math.cos(theta) * rx * elongation;
        const py = Math.sin(theta) * ry;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Fluid radial gradient: deep forest pine (#2C5545) with luminous emerald core (#10B981)
      const grad = ctx.createRadialGradient(-3, -3, 2, 0, 0, baseRadius * stretch * 1.2);
      grad.addColorStop(0, "#34D399"); // bright emerald highlight
      grad.addColorStop(0.35, "#10B981");
      grad.addColorStop(0.85, "#2C5545");
      grad.addColorStop(1, "#1E3D32");

      ctx.fillStyle = grad;
      ctx.shadowColor = "rgba(16, 185, 129, 0.4)";
      ctx.shadowBlur = Math.min(12, 6 + speed * 0.15);
      ctx.fill();

      // 5. Glossy Specular Surface Reflection (Simulating liquid glass / mercury shine)
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(-baseRadius * 0.3, -baseRadius * 0.35, baseRadius * 0.35, baseRadius * 0.18, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
      ctx.shadowBlur = 0;
      ctx.fill();
      ctx.restore();

      // 6. Secondary Micro-Droplet that detaches during rapid acceleration
      if (speed > 18 || distFromAnchor > 22) {
        const satelliteDist = -baseRadius * stretch - (speed * 0.35);
        const satRadius = Math.max(2, baseRadius * 0.22);
        ctx.beginPath();
        ctx.arc(satelliteDist, 0, satRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(16, 185, 129, 0.85)";
        ctx.fill();
      }

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
    };
  }, []);

  return (
    <div className="relative my-4 flex items-center gap-3 select-none">
      <canvas
        ref={canvasRef}
        width={160}
        height={68}
        className="w-[160px] h-[68px] cursor-grab active:cursor-grabbing touch-none"
        title="Interactive physics droplet (scroll or drag)"
      />
      <div className="flex flex-col text-[11px] font-mono text-[var(--color-muted)] leading-tight opacity-75">
        <span className="font-medium text-[var(--color-accent)] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block" />
          Kinetic Telemetry Bead
        </span>
        <span className="text-[10px]">Scroll-coupled fluid mechanics</span>
      </div>
    </div>
  );
}
