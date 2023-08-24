import useBreakpoints from "@hooks/breakpoints.hook";
import useThemeStyle from "@hooks/theme-style.hook";
import React, { useCallback, useEffect, useState } from "react";

interface IFloatingDivs {
  data: { icon: React.ReactNode; name: string }[];
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

const FloatingImages: React.FC<IFloatingDivs> = (props) => {
  const { data } = props;

  const { validateTheme } = useThemeStyle();
  const theme = validateTheme(
    "text-slate-700 bg-slate-300 shadow-md",
    "text-slate-50 bg-slate-700"
  );

  const border = validateTheme(" border-slate-200", "border-slate-500 ");

  const { xs, sm } = useBreakpoints();

  const [particles, setParticles] = useState<Particle[]>([]);
  const [draggedParticle, setDraggedParticle] = useState<number | null>(null);

  const particleSize = !xs && !sm ? 100 : 20;

  const loadParticles = useCallback(() => {
    const numParticles = data.length;
    const particleContainer = document.querySelector(
      ".particle-container"
    ) as HTMLElement;

    const newParticles: Particle[] = [];

    for (let i = 0; i < numParticles; i++) {
      let particle: Particle | null = null;
      let collides = true;

      while (collides) {
        particle = {
          id: i,
          x: Math.random() * (particleContainer.clientWidth - particleSize),
          y: Math.random() * (particleContainer.clientHeight - particleSize),
        };

        collides = false; // Set collides to false initially
        for (const existingParticle of newParticles) {
          const distance = Math.sqrt(
            (particle.x - existingParticle.x) ** 2 +
              (particle.y - existingParticle.y) ** 2
          );
          if (distance < particleSize * 2) {
            collides = true;
            break; // Exit the loop if collision is detected
          }
          console.log("loop");
        }
      }

      if (particle) {
        newParticles.push(particle);
      }
    }

    setParticles(newParticles);
  }, [data]);
  useEffect(() => {
    if (!xs && !xs) {
      loadParticles();
    }
  }, [xs, sm]);

  const handleMouseDown = (particleId: number) => {
    setDraggedParticle(particleId);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (draggedParticle !== null) {
      const particleSize = 20;
      const particleContainer = document.querySelector(
        ".particle-container"
      ) as HTMLElement;
      const mouseX =
        event.clientX - particleContainer.getBoundingClientRect().left;
      const mouseY =
        event.clientY - particleContainer.getBoundingClientRect().top;

      const updatedParticles = particles.map((particle) => {
        if (particle.id === draggedParticle) {
          const newX = Math.max(
            0,
            Math.min(
              particleContainer.clientWidth - particleSize,
              mouseX - particleSize / 2
            )
          );
          const newY = Math.max(
            0,
            Math.min(
              particleContainer.clientHeight - particleSize,
              mouseY - particleSize / 2
            )
          );
          return {
            ...particle,
            x: newX,
            y: newY,
          };
        }
        return particle;
      });

      setParticles(updatedParticles);
    }
  };

  const handleMouseUp = () => {
    setDraggedParticle(null);
  };

  if (sm || xs) {
    return (
      <div className="grid gap-5 grid-cols-3 p-[1.2em] pb-[20vh]">
        {data.map((particle) => (
          <div
            key={particle.name}
            className={`${theme} ${border} border-t-2 border-r-2 relative rounded-md min-w-[100px] min-h-[100px] flex flex-col scale-100 cursor-pointer items-center justify-center p-3 aspect-square `}
          >
            {particle.icon}
            <b className="font-mono">{particle.name}</b>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="particle-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {particles.map((particle) => (
        <div
          onMouseDown={() => handleMouseDown(particle.id)}
          key={particle.id}
          className={`particle ${theme} ${border} border-t-2 border-r-2 rounded-md min-w-[100px] min-h-[100px] flex flex-col scale-100 cursor-pointer items-center justify-center p-3 aspect-square `}
          style={{
            top: particle.y + "px",
            left: particle.x + "px",
            width: xs || sm ? 50 : 150 + "px",
            height: xs || sm ? 50 : 150 + "px",
          }}
        >
          {data[particle.id].icon}
          <b className="font-mono">{data[particle.id].name}</b>
        </div>
      ))}
    </div>
  );
};

export default FloatingImages;
