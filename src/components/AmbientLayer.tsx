import React, { useEffect, useRef } from "react";
import { useUXProfile } from "../context/UXProfileContext";
import { cn } from "../lib/utils";

export const AmbientLayer = () => {
  const { activeProfile, isDarkMode } = useUXProfile();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);
    resize();

    // Neural Flow
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    if (activeProfile.neural_background) {
      for (let i = 0; i < 50; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    }

    // Matrix Rain
    const columns = Math.floor(width / 20);
    const drops: number[] = [];
    if (activeProfile.matrix_rain_dark_only && isDarkMode) {
      for (let x = 0; x < columns; x++) {
        drops[x] = 1;
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Neural Flow
      if (activeProfile.neural_background) {
        ctx.fillStyle = isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)";
        ctx.strokeStyle = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
        ctx.lineWidth = 1;

        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          ctx.beginPath();
          ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
          ctx.fill();

          for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const dist = Math.hypot(node.x - other.x, node.y - other.y);
            if (dist < 150) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        }
      }

      // Matrix Rain
      if (activeProfile.matrix_rain_dark_only && isDarkMode) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "#0F0";
        ctx.font = "15px monospace";

        for (let i = 0; i < drops.length; i++) {
          const text = String.fromCharCode(Math.random() * 128);
          ctx.fillText(text, i * 20, drops[i] * 20);

          if (drops[i] * 20 > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeProfile, isDarkMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Canvas for complex particle effects */}
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 w-full h-full",
          activeProfile.blur_background_elements && "blur-sm opacity-50"
        )}
      />

      {/* Ambient Orbs */}
      {activeProfile.ambient_orbs && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-500/20 dark:bg-blue-600/20 blur-[100px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/20 dark:bg-purple-600/20 blur-[120px] animate-pulse delay-1000" />
        </>
      )}

      {/* Aurora Waves */}
      {activeProfile.large_ambient_waves && (
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/10 via-teal-500/10 to-cyan-600/10 dark:from-emerald-900/30 dark:via-teal-800/30 dark:to-cyan-900/30 blur-[100px] animate-pulse duration-10000" />
      )}

      {/* Cyber Grid Overlay */}
      {activeProfile.cyber_grid_overlay && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      )}

      {/* Sentient Canvas Silhouettes */}
      {activeProfile.floating_ai_silhouettes && (
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-zinc-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-zinc-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-zinc-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>
      )}
    </div>
  );
};
