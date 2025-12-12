"use client";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Config } from "../../../../components/(particlejsConfig)/Config";
import homeStyle from "scss/pages/home.module.scss";

export default function ParticlesClient() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div
      className={homeStyle.particlesContainer}
    >
      <Particles
        className={homeStyle.myParticles}
        init={particlesInit}
        options={Config}
      />
    </div>
  );
}
