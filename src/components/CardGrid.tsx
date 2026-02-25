import React from "react";
import { motion } from "motion/react";
import { useUXProfile } from "../context/UXProfileContext";
import { CardItem } from "./CardItem";
import { Activity, Box, Cpu, Database, Globe, Layers, Shield, Zap } from "lucide-react";
import { cn } from "../lib/utils";

const CARDS_DATA = [
  { title: "Core Architecture", description: "Scalable foundation for modern applications.", icon: <Box size={24} /> },
  { title: "Data Processing", description: "High-throughput data pipelines and analytics.", icon: <Database size={24} /> },
  { title: "Global Edge", description: "Distributed content delivery network.", icon: <Globe size={24} /> },
  { title: "Security Layers", description: "Multi-tiered protection protocols.", icon: <Shield size={24} /> },
  { title: "Neural Networks", description: "Advanced machine learning models.", icon: <Cpu size={24} /> },
  { title: "Real-time Activity", description: "Live monitoring and metrics.", icon: <Activity size={24} /> },
  { title: "Microservices", description: "Decoupled service architecture.", icon: <Layers size={24} /> },
  { title: "Lightning Fast", description: "Optimized performance tuning.", icon: <Zap size={24} /> },
];

export const CardGrid = () => {
  const { activeProfile } = useUXProfile();

  return (
    <motion.div
      layout={activeProfile.grid_motion !== "none"}
      className={cn(
        "grid gap-6 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        activeProfile.compact_data_wall
          ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      )}
    >
      {CARDS_DATA.map((card, index) => (
        <CardItem
          key={card.title}
          title={card.title}
          description={card.description}
          icon={card.icon}
          index={index}
        />
      ))}
    </motion.div>
  );
};
