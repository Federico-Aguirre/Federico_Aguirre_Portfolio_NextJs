import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Config } from "./Config";
import homeStyle from "scss/pages/home.module.scss";

export const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div>
      <Particles
        className={homeStyle.myParticles}
        options={Config}
        init={particlesInit}
      />
    </div>
  );
};
