import useAppSelector from "@hooks/app-selector.hook";
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesComponent: React.FC = () => {
  const isDark = useAppSelector((store) => store.components.isDarkMode);
  const particlesInit = useCallback(async (engine: any) => {
    console.log(engine);
    await loadFull(engine);
  }, []);
  const particleParams: any = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: false,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "attract",
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40,
        },
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 0,
    },
    particles: {
      color: {
        value: isDark ? "#ffffff" : "#7f8c8d",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: false,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: "top",
        enable: true,
        outMode: "out",
        random: false,
        speed: 3,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 30,
      },
      opacity: {
        value: 0.9,
      },
      shape: {
        type: "edge",
      },
      size: {
        random: true,
        value: 3,
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      data-aos="fade-up"
      id="tsparticles"
      init={particlesInit}
      options={particleParams}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default ParticlesComponent;
