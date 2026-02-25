import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useUXProfile } from "../context/UXProfileContext";
import { cn } from "../lib/utils";

interface CardItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

export const CardItem: React.FC<CardItemProps> = ({ title, description, icon, index }) => {
  const { activeProfile, isDarkMode } = useUXProfile();
  const cardRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !activeProfile.card_tilt) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (activeProfile.card_tilt) {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const getCardStyle = () => {
    const style: React.CSSProperties = {};
    if (activeProfile.card_tilt && isHovered) {
      const tiltAmount = typeof activeProfile.card_tilt === "number" ? activeProfile.card_tilt : 15;
      // We apply tilt directly via motion style props below
    }
    return style;
  };

  const getGlowIntensity = () => {
    switch (activeProfile.glow_intensity) {
      case "high":
        return "shadow-[0_0_30px_rgba(0,255,255,0.4)]";
      case "medium":
        return "shadow-[0_0_20px_rgba(255,255,255,0.1)]";
      case "low":
        return "shadow-md";
      case "subtle":
        return "shadow-sm";
      default:
        return "";
    }
  };

  const tiltAmount = typeof activeProfile.card_tilt === "number" ? activeProfile.card_tilt : 15;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      layout={activeProfile.grid_motion !== "none"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: activeProfile.stagger ? index * 0.1 : 0,
      }}
      style={{
        rotateX: activeProfile.card_tilt && isHovered ? useTransform(rotateX, (v) => v * (tiltAmount / 15)) : 0,
        rotateY: activeProfile.card_tilt && isHovered ? useTransform(rotateY, (v) => v * (tiltAmount / 15)) : 0,
        transformPerspective: 1000,
      }}
      className={cn(
        "relative rounded-2xl p-6 transition-all duration-300",
        "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
        activeProfile.compact_density_mode ? "p-4" : "p-6",
        isHovered && activeProfile.hover_glow === "medium" && "shadow-[0_0_20px_rgba(100,100,255,0.2)]",
        isHovered && activeProfile.chromatic_hover_split && "shadow-[4px_0_10px_rgba(255,0,0,0.3),-4px_0_10px_rgba(0,255,255,0.3)]",
        activeProfile.glitch_border && isHovered && "border-red-500/50 dark:border-cyan-500/50",
        getGlowIntensity()
      )}
    >
      {/* Border Trace Effect */}
      {activeProfile.border_trace && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl border border-blue-500/50 dark:border-blue-400/50 pointer-events-none"
          layoutId="border-trace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Mouse Radial Highlight */}
      {activeProfile.mouse_radial_highlight && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-50"
          style={{
            background: `radial-gradient(circle at ${mouseX.get() * 100 + 50}% ${mouseY.get() * 100 + 50}%, rgba(255,255,255,0.1) 0%, transparent 60%)`,
          }}
        />
      )}

      <div className="relative z-10 flex flex-col gap-4">
        <div
          className={cn(
            "p-3 rounded-xl inline-flex w-fit",
            "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
            activeProfile.magnetic_icons && isHovered && "scale-110 transition-transform"
          )}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
