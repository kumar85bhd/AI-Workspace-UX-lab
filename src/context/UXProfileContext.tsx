import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
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

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

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
      <div className="min-h-screen transition-colors duration-300">
        {children}
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
