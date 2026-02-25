import React, { createContext, useContext, useState, ReactNode } from "react";
import { UXProfileName, uxProfiles, UXProfileConfig } from "../config/uxProfiles";

interface UXProfileContextType {
  activeProfileName: UXProfileName;
  activeProfile: UXProfileConfig;
  setProfile: (name: UXProfileName) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const UXProfileContext = createContext<UXProfileContextType | undefined>(undefined);

export const UXProfileProvider = ({ children }: { children: ReactNode }) => {
  const [activeProfileName, setActiveProfileName] = useState<UXProfileName>("Clean Core");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const activeProfile = uxProfiles[activeProfileName];

  return (
    <UXProfileContext.Provider
      value={{
        activeProfileName,
        activeProfile,
        setProfile: setActiveProfileName,
        isDarkMode,
        toggleDarkMode: () => setIsDarkMode((prev) => !prev),
      }}
    >
      <div className={isDarkMode ? "dark" : ""}>
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
          {children}
        </div>
      </div>
    </UXProfileContext.Provider>
  );
};

export const useUXProfile = () => {
  const context = useContext(UXProfileContext);
  if (context === undefined) {
    throw new Error("useUXProfile must be used within a UXProfileProvider");
  }
  return context;
};
