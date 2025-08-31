import { useState, useEffect, useRef } from "react";
import { NavigationHeader } from "./components/InteractiveFrame22";
import MentorSignup from "./components/MentorSignup";

export default function App() {
  const [currentPage, setCurrentPage] = useState('mentor-signup');
  const [scrollY, setScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const normalHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial header height and mobile state
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const updateHeaderHeight = () => {
      if (normalHeaderRef.current) {
        setHeaderHeight(normalHeaderRef.current.offsetHeight);
      }
    };

    checkMobile();
    
    // Set header height after a small delay to ensure proper rendering
    const timeoutId = setTimeout(updateHeaderHeight, 100);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      updateHeaderHeight();
      checkMobile();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavigation = (page: string) => {
    // Since we only have mentor signup, we can handle external navigation here
    if (page === 'home') {
      window.location.href = 'https://campusgroups.rit.edu/acs/home/';
    } else if (page === 'about-us') {
      window.location.href = 'https://campusgroups.rit.edu/ACS/about-us/';
    } else if (page === 'calendar') {
      window.location.href = 'https://campusgroups.rit.edu/ACS/acs-calendar/';
    } else if (page === 'mentor-mentee') {
      window.location.href = 'https://campusgroups.rit.edu/ACS/mentor-mentee/';
    } else if (page === 'tinikling') {
      window.location.href = 'https://campusgroups.rit.edu/ACS/tinikling/';
    }
    // mentor-signup stays on current page
    setCurrentPage('mentor-signup');
  };

  // Use default height of 77px if header height hasn't been calculated yet
  const effectiveHeaderHeight = headerHeight || 77;
  
  // Calculate transition progress for header
  const triggerPoint = effectiveHeaderHeight / 2;
  const transitionDistance = effectiveHeaderHeight / 3;
  const progress = Math.min(Math.max((scrollY - triggerPoint) / transitionDistance, 0), 1);
  
  // Determine if header should be sticky
  const isSticky = scrollY > triggerPoint;
  
  // Calculate transform and opacity based on scroll progress
  const translateY = isSticky ? 0 : Math.max(-scrollY, -effectiveHeaderHeight);
  const stickyOpacity = Math.max(progress, 0.95); // Always keep header mostly visible on mentor signup
  const stickyScale = 0.98 + (progress * 0.02);

  return (
    <div className="min-h-screen bg-[#69d7e5] relative overflow-x-hidden w-full">
      {/* Header with smooth transition - same as homepage/calendar */}
      <div 
        ref={normalHeaderRef}
        className="w-full relative z-50"
        style={{
          paddingTop: isMobile ? '8px' : '12px',
          paddingBottom: isMobile ? '8px' : '12px',
          position: isSticky ? 'fixed' : 'relative',
          top: isSticky ? '0' : 'auto',
          left: isSticky ? '0' : 'auto',
          right: isSticky ? '0' : 'auto',
          transform: isSticky ? `translateY(${translateY}px) scale(${stickyScale})` : 'none',
          backgroundColor: `rgba(255, 255, 255, ${stickyOpacity})`,
          borderBottom: `1px solid rgba(229, 231, 235, ${Math.max(stickyOpacity, 0.1)})`,
          boxShadow: `0 2px 8px -2px rgba(0, 0, 0, ${0.1 * Math.max(stickyOpacity, 0.1)})`,
          backdropFilter: stickyOpacity > 0 ? 'blur(8px)' : 'none',
          transition: isSticky ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, background-color, border-color, box-shadow'
        }}
      >
        <NavigationHeader 
          currentPage={currentPage}
          onNavigate={handleNavigation}
        />
      </div>
      
      {/* Spacer to prevent content jump when header becomes fixed */}
      {isSticky && (
        <div style={{ height: `${effectiveHeaderHeight}px` }} />
      )}
      
      <MentorSignup />
    </div>
  );
}