import React from "react";
import { useUXProfile } from "../context/UXProfileContext";
import { UXProfileName, uxProfiles } from "../config/uxProfiles";
import { Moon, Sun } from "lucide-react";

export const ProfileSelector = () => {
  const { activeProfileName, setProfile, isDarkMode, toggleDarkMode } = useUXProfile();

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md p-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <select
        value={activeProfileName}
        onChange={(e) => setProfile(e.target.value as UXProfileName)}
        className="bg-transparent border-none outline-none text-sm font-medium cursor-pointer text-zinc-800 dark:text-zinc-200"
      >
        {Object.keys(uxProfiles).map((name) => (
          <option key={name} value={name} className="bg-white dark:bg-zinc-900">
            {name}
          </option>
        ))}
      </select>
      <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700" />
      <button
        onClick={toggleDarkMode}
        className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
};
