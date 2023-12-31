import Botika from "@assets/botikav2.png";
import MemaChat from "@assets/memachat.png";
import MetaCare from "@assets/metacare.png";
import NuxtIG from "@assets/nuxtig.png";
import Ones from "@assets/onems.png";
import Playfriends from "@assets/playfriends.png";
import TraQR from "@assets/traqr.png";

import useBreakpoints from "@hooks/breakpoints.hook";
import useThemeStyle from "@hooks/theme-style.hook";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import PaginationDots from "./carousel-dots.component";

interface IProject {
  name: string;
  src: StaticImageData;
  description: string;
  icons: React.ReactNode[];
  link: string;
}

const styles = {
  root: {
    padding: "0 50px",
  },
};

const projects: IProject[] = [
  {
    name: "Playfriends - Play with content creators.",
    src: Playfriends,
    description: "Play with content creators",
    icons: [],
    link: "",
  },
  {
    name: "Mema Chat App CMS",
    src: MemaChat,
    description: "Web based for admin of mema chat mobile app",
    icons: [],
    link: "",
  },
  {
    name: "MetaCare",
    src: MetaCare,
    description: "E-Commerce appp",
    icons: [],
    link: "",
  },
  {
    name: "Online School Management",
    src: Ones,
    description: "Thesis Project - Online School Management Webbase. 😎",
    icons: [],
    link: "",
  },
  {
    name: "NuxtIG - Basic Instagram clone app🤩",
    src: NuxtIG,
    description: "Personal project",
    icons: [],
    link: "",
  },
  {
    name: "Violation Ticketing System",
    src: TraQR,
    description:
      "Personal project - Web based app for road violator with QR Code.",
    icons: [],
    link: "",
  },
  {
    name: "Pharmacy stock inventory system",
    src: Botika,
    description: "Personal project - Simple Inventory for Pharmacy store",
    icons: [],
    link: "https://botikanialingcoring-ph.vercel.app/",
  },
  // ... (other albums)
];

const DemoCoverflow: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const handleChangeIndex = (newIndex: number) => {
    setActiveIndex(newIndex);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  const { validateTheme } = useThemeStyle();
  const color = validateTheme("text-slate-700", "text-slate-100");

  const { xs, sm } = useBreakpoints();
  const isMobile = xs === true || sm === true;

  return (
    <>
      <SwipeableViews
        index={activeIndex}
        style={styles.root}
        onChangeIndex={handleChangeIndex}
      >
        {projects.map((album, currentIndex) => {
          const transformValue =
            currentIndex === activeIndex
              ? "translateX(0) scale(1)"
              : "translateX(-50%) scale(0.7)";
          const opacityValue = currentIndex === activeIndex ? 1 : 0.3;

          return (
            <div
              key={String(currentIndex)}
              className={` text-center flex flex-col justify-between ${
                isMobile ? "h-[30vh]" : "h-[50vh]"
              }  `}
              style={{
                opacity: opacityValue,
                transform: transformValue,
              }}
            >
              <div className="flex justify-center items-center h-screen ">
                <div className="max-w-md mx-auto p-4 flex flex-col gap-4 justify-center items-center">
                  <div className="aspect-w-4 aspect-h-3 ">
                    <Image
                      src={album.src}
                      alt={album.name}
                      objectFit="contain"
                      objectPosition="center"
                      className="rounded-lg w-[50vw] shadow-slate-400 drop-shadow-2xl"
                    />
                  </div>
                  <h3 className={`${color} font-bold text-xl `}>
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      href={album.link}
                    >
                      {album.name}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </SwipeableViews>
      <br />
      <PaginationDots
        numDots={projects.length}
        activeIndex={activeIndex}
        onClick={handleDotClick}
      />
    </>
  );
};

export default DemoCoverflow;
