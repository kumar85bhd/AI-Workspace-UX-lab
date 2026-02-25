import React from "react";
import { motion } from "motion/react";
import { useUXProfile } from "../context/UXProfileContext";
import { cn } from "../lib/utils";

export const HeroSection = () => {
  const { activeProfile } = useUXProfile();

  const getAnimationConfig = () => {
    switch (activeProfile.hero_animation) {
      case "soft":
        return { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } };
      case "medium":
        return { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, type: "spring", bounce: 0.4 } };
      case "none":
        return { opacity: 1, y: 0, transition: { duration: 0 } };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  const initialConfig = () => {
    switch (activeProfile.hero_animation) {
      case "soft":
        return { opacity: 0, y: 20 };
      case "medium":
        return { opacity: 0, y: 40, scale: 0.95 };
      case "none":
        return { opacity: 1, y: 0 };
      default:
        return { opacity: 0, y: 20 };
    }
  };

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center z-10">
      <motion.div
        initial={initialConfig()}
        animate={getAnimationConfig()}
        className="flex flex-col items-center justify-center space-y-8"
      >
        <h1
          className={cn(
            "text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white",
            activeProfile.name === "Cyber Matrix" && "font-mono text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]",
            activeProfile.name === "Sentient Canvas" && "font-serif font-light tracking-wide opacity-90",
            activeProfile.name === "Holographic Flux" && "bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-cyan-500"
          )}
        >
          {activeProfile.name}
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-zinc-600 dark:text-zinc-400">
          Experience the dynamic visual behavior system. Switch profiles to see how the interface adapts its motion, layout, and ambient effects.
        </p>
        <div className="flex gap-4">
          <button
            className={cn(
              "px-8 py-3 rounded-full font-medium transition-all",
              "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200",
              activeProfile.name === "Cyber Matrix" && "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.5)] rounded-none border border-cyan-300",
              activeProfile.name === "Sentient Canvas" && "bg-transparent border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
          >
            Get Started
          </button>
        </div>
      </motion.div>
    </section>
  );
};
