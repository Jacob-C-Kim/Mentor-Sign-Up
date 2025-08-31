import { useState } from "react";
import ACSLogo from "./ACSLogo";

export function NavigationHeader({
  currentPage = "home",
  onNavigate,
}: {
  currentPage?: string;
  onNavigate?: (page: string) => void;
} = {}) {
  const [activeSection, setActiveSection] = useState<string | null>(currentPage);

  // Exact CampusGroups routes (with trailing slashes)
  const routes: Record<string, string> = {
    home: "https://campusgroups.rit.edu/acs/home/",
    "about-us": "https://campusgroups.rit.edu/ACS/about-us/",
    calendar: "https://campusgroups.rit.edu/ACS/acs-calendar/",
    "mentor-mentee": "https://campusgroups.rit.edu/ACS/mentor-mentee/",
    tinikling: "https://campusgroups.rit.edu/ACS/tinikling/",
  };

  const linkCls = (key: string) =>
    `font-['Lexend:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[10px] md:text-[12px] text-center text-nowrap cursor-pointer transition-colors hover:text-blue-600 ${
      activeSection === key ? "text-blue-600" : "text-black"
    }`;

  // Hard navigate the parent/top frame to a specific URL (bypasses CG link rewriting)
  const navigateTop = (url: string) => {
    try {
      if (window.top) window.top.location.assign(url);
      else window.location.assign(url);
    } catch {
      window.location.assign(url);
    }
  };

  // Generic anchor that can optionally force navigation via JS (to avoid CG rewriting)
  const NavLink = ({
    keyName,
    labelDesktop,
    labelMobile,
    forceTopHref, // when true, preventDefault and use navigateTop()
  }: {
    keyName: keyof typeof routes;
    labelDesktop: string;
    labelMobile?: string;
    forceTopHref?: boolean;
  }) => (
    <a
      href={routes[keyName]}
      target="_top"
      rel="noopener"
      className={linkCls(keyName)}
      onClick={(e) => {
        e.preventDefault();
        setActiveSection(keyName);
        onNavigate?.(keyName);
        if (forceTopHref) {
          navigateTop(routes[keyName]); // guarantees exact path e.g. /ACS/about-us/
        } else {
          // For all other external links, navigate directly
          navigateTop(routes[keyName]);
        }
      }}
    >
      <p className={`leading-[normal] whitespace-pre ${labelMobile ? "hidden sm:block" : ""}`}>
        {labelDesktop}
      </p>
      {labelMobile && (
        <p className="leading-[normal] whitespace-pre block sm:hidden">{labelMobile}</p>
      )}
    </a>
  );

  return (
    <div className="w-full max-w-7xl mx-auto flex items-center justify-center gap-2 md:gap-8 px-2 md:px-6 relative">
      {/* Logo → CG home */}
      <a
        href={routes.home}
        target="_top"
        rel="noopener"
        onClick={(e) => {
          e.preventDefault();
          setActiveSection("home");
          onNavigate?.("home");
        }}
        className="md:hidden cursor-pointer"
      >
        <ACSLogo size={48} />
      </a>
      <a
        href={routes.home}
        target="_top"
        rel="noopener"
        onClick={(e) => {
          e.preventDefault();
          setActiveSection("home");
          onNavigate?.("home");
        }}
        className="hidden md:block cursor-pointer"
      >
        <ACSLogo size={61} />
      </a>

      {/* Navigation */}
      <div className="flex gap-2 md:gap-6 items-center">
        {/* Force About Us to the exact /ACS/about-us/ path to bypass CG rewriting */}
        <NavLink keyName="about-us" labelDesktop="About Us" forceTopHref />

        {/* Calendar goes to /ACS/acs-calendar/ */}
        <NavLink keyName="calendar" labelDesktop="Calendar" />

        <NavLink
          keyName="mentor-mentee"
          labelDesktop="Mentor/Mentee"
          labelMobile="Mentor"
        />
        <NavLink keyName="tinikling" labelDesktop="Tinikling" />
      </div>
    </div>
  );
}

/**
 * Reusable Hero/Welcome Section Component
 */
export function HeroSection({
  title = "asian culture society",
  subtitle = "welcome to",
  description = "RIT's largest Asian club, bringing students together to celebrate, learn, and share the rich history, culture, and art of Asian countries",
  includeHeaderSpace = true,
  headerSpaceHeight = "61px",
  topPadding = "50px",
  bottomPadding = "150px",
  fullScreen = false,
}: {
  title?: string;
  subtitle?: string;
  description?: string;
  includeHeaderSpace?: boolean;
  headerSpaceHeight?: string;
  topPadding?: string;
  bottomPadding?: string;
  fullScreen?: boolean;
} = {}) {
  return (
    <div
      className={`box-border content-stretch flex flex-col gap-[72px] items-center justify-start px-0 relative bg-white z-10 ${
        fullScreen ? "min-h-screen w-full" : "size-full"
      }`}
      style={{
        paddingTop: includeHeaderSpace
          ? `calc(${topPadding} + ${headerSpaceHeight})`
          : topPadding,
        paddingBottom: bottomPadding,
      }}
    >
      <div className="content-stretch flex flex-col gap-[5px] items-center justify-center relative shrink-0 flex-1">
        <div className="content-stretch flex flex-col items-center justify-start leading-[0] relative shrink-0 text-black">
          <div className="font-['Lexend:Regular',_sans-serif] font-normal relative shrink-0 text-[16px] md:text-[18px] text-center">
            <p className="leading-[normal]">{subtitle}</p>
          </div>
          <div className="font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] font-bold not-italic relative shrink-0 text-[28px] md:text-[40px] text-center">
            <p className="leading-[normal] font-bold px-4">{title}</p>
          </div>
        </div>
        <div className="font-['Lexend:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[12px] text-black text-center max-w-[600px] px-4 w-full">
          <p className="leading-[normal]">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Keep the original component for backward compatibility
export default function InteractiveFrame22() {
  return (
    <HeroSection
      includeHeaderSpace={true}
      headerSpaceHeight="61px"
      topPadding="50px"
      bottomPadding="150px"
      fullScreen={false}
    />
  );
}