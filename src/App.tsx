/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { UXProfileProvider } from "./context/UXProfileContext";
import { ProfileSelector } from "./components/ProfileSelector";
import { HeroSection } from "./components/HeroSection";
import { CardGrid } from "./components/CardGrid";
import { AmbientLayer } from "./components/AmbientLayer";

export default function App() {
  return (
    <UXProfileProvider>
      <div className="relative min-h-screen overflow-hidden">
        <AmbientLayer />
        <ProfileSelector />
        <div className="relative z-10 flex flex-col gap-12 pb-24">
          <HeroSection />
          <CardGrid />
        </div>
      </div>
    </UXProfileProvider>
  );
}
