import { useState } from "react";
import ACSLogo from "./ACSLogo";
import campusGroupsLogo from "figma:asset/69d02b9174c751a313d8676a0de4260a34c015d1.png";
import svgPaths from "../imports/svg-61ju42v1aq";
import discordSvgPaths from "../imports/svg-pgq3ktlc4j";

function InstagramButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-[rgba(255,255,255,0.1)] relative rounded-[10px] transition-all duration-200 cursor-pointer w-full max-w-[236px] min-w-0 ${
        isHovered ? "bg-[rgba(255,255,255,0.2)] scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() =>
        window.open(
          "https://www.instagram.com/acsrit/",
          "_blank",
        )
      }
    >
      <div className="box-border flex gap-2.5 items-center justify-start overflow-clip px-4 md:px-[30px] py-2.5 h-[43px]">
        <div className="relative shrink-0 w-[25px] h-[25px] flex items-center justify-center">
          <svg
            className="w-[23px] h-[23px]"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 23 23"
          >
            <path
              d={svgPaths.p29f29c80}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </svg>
        </div>
        <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-nowrap text-white">
          <p className="leading-[normal] whitespace-pre">
            Follow us on Instagram
          </p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[10px]"
      />
    </div>
  );
}

function DiscordButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-[rgba(255,255,255,0.1)] relative rounded-[10px] transition-all duration-200 cursor-pointer w-full max-w-[236px] min-w-0 ${
        isHovered ? "bg-[rgba(255,255,255,0.2)] scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() =>
        window.open("https://discord.gg/jJBCYdkJBT", "_blank")
      }
    >
      <div className="box-border flex gap-2.5 h-[43px] items-center justify-start overflow-clip px-4 md:px-[30px] py-2.5">
        <div className="relative shrink-0 w-[25px] h-[25px] flex items-center justify-center">
          <svg
            className="w-6 h-[18.92px]"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 19"
          >
            <path
              d={discordSvgPaths.p1d146f00}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </svg>
        </div>
        <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-nowrap text-white">
          <p className="leading-[normal] whitespace-pre">
            Join our Discord server
          </p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[10px]"
      />
    </div>
  );
}

function CampusGroupsButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-[rgba(255,255,255,0.1)] relative rounded-[10px] transition-all duration-200 cursor-pointer w-full max-w-[236px] min-w-0 ${
        isHovered ? "bg-[rgba(255,255,255,0.2)] scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() =>
        window.open(
          "https://campusgroups.rit.edu/feeds?type=club&type_id=16075&tab=about",
          "_blank",
        )
      }
    >
      <div className="box-border flex gap-2.5 h-[43px] items-center justify-start overflow-clip px-4 md:px-[30px] py-2.5">
        <div className="relative shrink-0 w-[25px] h-[25px] flex items-center justify-center">
          <img
            src={campusGroupsLogo}
            alt="CampusGroups Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[12px] text-nowrap text-white">
          <p className="leading-[normal] whitespace-pre">
            Join our CampusGroups
          </p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[10px]"
      />
    </div>
  );
}

export default function Footer() {
  return (
    <div className="bg-[#23464b] relative shrink-0 w-full">
      <div className="flex flex-col md:flex-row items-start md:justify-between gap-8 md:gap-4 px-4 md:px-8 py-[40px] md:py-[63px] w-full min-h-[286px]">
        {/* Left side - Logo and contact info */}
        <div className="flex flex-col">
          <ACSLogo 
            size={61}
            className="mb-[20px]"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          />
          <div className="font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] leading-[0] not-italic text-[16px] text-white mb-[8px]">
            <p className="leading-[normal]">
              Asian Culture Society
            </p>
          </div>
          <a
            className="block font-['Lexend:Medium',_sans-serif] font-medium leading-[0] text-[12px] text-white hover:text-blue-300 transition-colors cursor-pointer mb-[8px]"
            href="mailto:acsrit@gmail.com"
          >
            <p className="leading-[normal]">
              acsrit@gmail.com
            </p>
          </a>
          <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[0] text-[10px] text-white max-w-[280px] sm:max-w-none">
            <p className="leading-[normal]">
              1 Lomb Memorial Dr, Rochester, NY 14623
            </p>
          </div>
        </div>

        {/* Right side - Social media buttons */}
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <CampusGroupsButton />
          <InstagramButton />
          <DiscordButton />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-black border-solid inset-0 pointer-events-none shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
      />
    </div>
  );
}