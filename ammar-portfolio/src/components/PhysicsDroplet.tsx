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

    // Responsive Canvas Resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initial resting anchor: bottom-left floating dock (x: 52, y: innerHeight - 56)
    const getHomeAnchor = () => ({
      x: 52,
      y: window.innerHeight - 56,
    });

    let home = getHomeAnchor();
    let posX = home.x;
    let posY = home.y;
    let vx = 0;
    let vy = 0;

    // Physical constants (Tuned for silky, organic fluid dynamics)
    const stiffness = 85;  // Smooth, gentle spring return
    const damping = 11;    // High internal fluid viscosity prevents harsh oscillations
    const baseRadius = 15; // Natural droplet size

    // Dragging and interaction state
    let isDragging = false;
    let pointerX = -100;
    let pointerY = -100;
    let lastPointerX = 0;
    let lastPointerY = 0;

    // Harmonic surface capillary jiggle
    let wobblePhase = 0;
    let wobbleAmp = 0;

    // Track scroll velocity across the entire page and impart realistic vertical inertia
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaScroll = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (!isDragging) {
        // Vertical momentum impulse proportional to scroll speed
        const impulse = deltaScroll * 0.28;
        vy += Math.max(-28, Math.min(28, impulse));
        wobbleAmp = Math.min(wobbleAmp + Math.abs(deltaScroll) * 0.08, 6.0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Pointer move listener
    const handlePointerMove = (e: MouseEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;

      const dx = pointerX - posX;
      const dy = pointerY - posY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (isDragging) {
        document.body.style.cursor = "grabbing";
        // Compute drag velocity for natural release fling
        const dt = Math.max(0.001, (performance.now() - lastTime) / 1000);
        vx = (pointerX - lastPointerX) / dt * 0.15;
        vy = (pointerY - lastPointerY) / dt * 0.15;
        lastPointerX = pointerX;
        lastPointerY = pointerY;

        posX = pointerX;
        posY = pointerY;
        wobbleAmp = Math.min(wobbleAmp + 0.3, 5.0);
      } else if (dist < baseRadius * 2.4) {
        document.body.style.cursor = "grab";
        // Gentle magnetic fluid stretch towards nearby pointer
        const pullFactor = (1 - dist / 55) * 0.45;
        vx += dx * pullFactor;
        vy += dy * pullFactor;
        wobbleAmp = Math.min(wobbleAmp + 0.5, 3.5);
      } else {
        if (document.body.style.cursor === "grab" || document.body.style.cursor === "grabbing") {
          document.body.style.cursor = "";
        }
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      const dx = e.clientX - posX;
      const dy = e.clientY - posY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < baseRadius * 2.4) {
        isDragging = true;
        document.body.style.cursor = "grabbing";
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;
        wobbleAmp = 4.0;
      }
    };

    const handlePointerUp = () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.cursor = "";
        // Release snap impulse with fluid jiggle
        wobbleAmp = 5.5;
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mouseup", handlePointerUp);

    // ─── 60 FPS Fluid Physics Simulation & Canvas Rendering Loop ───────────
    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.033);
      lastTime = currentTime;

      // Update resting anchor in case of window resize or view adjustments
      home = getHomeAnchor();

      // 1. Spring-Damper Numerical Integration (Returns smoothly to home when released)
      if (!isDragging) {
        const dx = posX - home.x;
        const dy = posY - home.y;

        const forceX = -stiffness * dx - damping * vx;
        const forceY = -stiffness * dy - damping * vy;

        vx += forceX * dt;
        vy += forceY * dt;

        posX += vx * dt;
        posY += vy * dt;
      }

      // 2. Wobble & Capillary Surface Wave Decay
      wobblePhase += dt * 14;
      wobbleAmp *= Math.exp(-dt * 3.2);

      // 3. Clear entire viewport canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Speed magnitude and orientation angle
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx);

      // Volume-Conserving Squash & Stretch (True fluid hydrodynamics)
      const stretch = Math.min(1 + speed * 0.014, 1.9);
      const compress = 1 / Math.sqrt(stretch);

      ctx.save();
      ctx.translate(posX, posY);
      ctx.rotate(angle);

      // Elastic Fluid Meniscus Tether if pulled away from resting home
      const distFromHome = Math.sqrt((posX - home.x) ** 2 + (posY - home.y) ** 2);
      if (distFromHome > 12 && !isDragging) {
        ctx.save();
        ctx.rotate(-angle);
        ctx.beginPath();
        ctx.moveTo(home.x - posX - 1.5, home.y - posY);
        ctx.quadraticCurveTo(0, 0, 0, -baseRadius * 0.35);
        ctx.lineTo(0, baseRadius * 0.35);
        ctx.quadraticCurveTo(0, 0, home.x - posX + 1.5, home.y - posY);
        ctx.closePath();
        ctx.fillStyle = "rgba(44, 85, 69, 0.16)";
        ctx.fill();
        ctx.restore();
      }

      // 4. Draw Organic Fluid Droplet Geometry with Surface Jiggle
      ctx.beginPath();
      const points = 28;
      for (let i = 0; i <= points; i++) {
        const theta = (i / points) * Math.PI * 2;
        let rx = baseRadius * stretch;
        let ry = baseRadius * compress;

        // Harmonic surface capillary ripple
        const harmonic = Math.sin(theta * 3 + wobblePhase) * wobbleAmp;
        rx += harmonic * 0.65;
        ry += harmonic * 0.65;

        // Teardrop aerodynamic tapering in direction of movement
        const elongation = Math.cos(theta) > 0 ? 1 + Math.cos(theta) * speed * 0.009 : 1;
        const px = Math.cos(theta) * rx * elongation;
        const py = Math.sin(theta) * ry;

        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Fluid Gradient: deep forest pine (#2C5545) with luminous emerald core (#10B981)
      const grad = ctx.createRadialGradient(-3, -3, 2, 0, 0, baseRadius * stretch * 1.25);
      grad.addColorStop(0, "#34D399"); // bright highlight
      grad.addColorStop(0.35, "#10B981");
      grad.addColorStop(0.85, "#2C5545");
      grad.addColorStop(1, "#1E3D32");

      ctx.fillStyle = grad;
      ctx.shadowColor = "rgba(16, 185, 129, 0.4)";
      ctx.shadowBlur = Math.min(14, 6 + speed * 0.15);
      ctx.fill();

      // 5. Glossy Specular Surface Reflection (Liquid glass / mercury shine)
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(-baseRadius * 0.3, -baseRadius * 0.35, baseRadius * 0.38, baseRadius * 0.18, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.shadowBlur = 0;
      ctx.fill();
      ctx.restore();

      // 6. Trailing Satellite Micro-Droplet under high velocity
      if (speed > 16 || isDragging) {
        const satelliteDist = -baseRadius * stretch - Math.min(28, speed * 0.32);
        const satRadius = Math.max(2.2, baseRadius * 0.22);
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
      document.body.style.cursor = "";
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mouseup", handlePointerUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40 select-none"
      style={{ pointerEvents: "none" }}
    />
  );
}
