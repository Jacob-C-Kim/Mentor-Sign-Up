import { useState, useRef, useEffect } from "react";
import svgPaths from "../imports/svg-onqcmwzw98";
import { events, Event, getSortedEvents } from "../data/events";

function FilterButtons({ onNavigate }: { onNavigate?: (page: string) => void }) {
  // Hard navigate to CampusGroups calendar URL
  const navigateToFullCalendar = () => {
    try {
      if (window.top) {
        window.top.location.assign("https://campusgroups.rit.edu/ACS/acs-calendar/");
      } else {
        window.location.assign("https://campusgroups.rit.edu/ACS/acs-calendar/");
      }
    } catch {
      window.location.assign("https://campusgroups.rit.edu/ACS/acs-calendar/");
    }
  };

  return (
    <div className="content-stretch flex gap-[18px] items-start justify-start relative shrink-0">
      <a
        href="https://campusgroups.rit.edu/ACS/acs-calendar/"
        target="_top"
        rel="noopener"
        className="box-border content-stretch flex gap-2.5 items-center justify-center overflow-clip px-5 py-[7px] relative rounded-[10px] shrink-0 cursor-pointer transition-all duration-200 bg-[#8bd4e0] shadow-md hover:bg-[#7bc7d3] text-decoration-none"
        onClick={(e) => {
          e.preventDefault();
          navigateToFullCalendar();
        }}
      >
        <div className="font-['ITC_Avant_Garde_Gothic:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
          <p className="leading-[normal] whitespace-pre">Full Calendar</p>
        </div>
      </a>
    </div>
  );
}

// Event interface is now imported from /data/events.ts

function EventCard({ event }: { event: Event }) {
  return (
    <div className="bg-[#99e3ed] h-[265px] relative rounded-[15px] shrink-0 w-[280px] sm:w-[351px]">
      <div className="h-[265px] overflow-clip relative w-[280px] sm:w-[351px]">
        <div className="absolute content-stretch flex flex-col items-start justify-start left-[18px] text-black top-[94px] w-[237px] gap-1">
          <div className="font-['Lexend:Bold',_sans-serif] font-bold relative shrink-0 text-[18px] w-full">
            <p className="leading-[1.2]">{event.title}</p>
          </div>
          <div className="font-['Lexend:Medium',_sans-serif] font-medium relative shrink-0 text-[12px] w-full">
            <p className="leading-[1.3]">{event.time} @ {event.location}</p>
          </div>
          <div className="font-['Lexend:Medium',_sans-serif] font-medium relative shrink-0 text-[12px] w-full">
            {event.link ? (
              <p className="[text-underline-position:from-font] decoration-solid leading-[1.3] underline cursor-pointer hover:text-blue-600">
                {event.date}
              </p>
            ) : (
              <p className="leading-[1.3]">{event.date}</p>
            )}
          </div>
        </div>
        <div className="absolute bg-[rgba(255,255,255,0.5)] left-[298px] rounded-[15px] size-9 top-[94px] flex items-center justify-center">
          <div className="h-6 relative w-[21px]" data-name="calendar-days">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 24">
              <g id="calendar-days">
                <path d={svgPaths.p3ca7b300} fill="var(--fill-0, #195259)" id="Primary" />
              </g>
            </svg>
          </div>
          <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[15px]" />
        </div>
        <div className="absolute left-[18px] text-[12px] text-black top-[170px] w-[calc(100%-36px)] h-[77px] overflow-y-auto">
          <div className="font-['Lexend:Regular',_sans-serif] font-normal pr-2">
            <p className="leading-[1.4]">{event.description}</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[15px]" />
    </div>
  );
}

// Placeholder card shown when no events are available
function PlaceholderCard() {
  return (
    <div className="bg-[#99e3ed] h-[265px] relative rounded-[15px] shrink-0 w-[280px] sm:w-[351px] flex items-center justify-center">
      <div className="text-center px-6 max-h-[200px] overflow-y-auto">
        <div className="font-['Lexend:Bold',_sans-serif] font-bold text-[18px] text-black mb-2">
          <p className="leading-[1.2]">No Events Yet</p>
        </div>
        <div className="font-['Lexend:Regular',_sans-serif] font-normal text-[12px] text-black">
          <p className="leading-[1.4]">Events will be displayed here once they are added.</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[15px]" />
    </div>
  );
}

function EventsCarousel({ currentSlide, setCurrentSlide }: {
  currentSlide: number,
  setCurrentSlide: (slide: number) => void
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const lastScrollTimeRef = useRef<number>(0);
  const sortedEvents = getSortedEvents(); // Get events sorted by date
  const totalSlides = Math.max(sortedEvents.length, 1); // At least 1 slide for placeholder
  const [cardWidth, setCardWidth] = useState(351);
  const gap = 20;
  const slideWidth = cardWidth + gap;

  useEffect(() => {
    const updateCardWidth = () => {
      const newWidth = window.innerWidth < 640 ? 280 : 351;
      setCardWidth(newWidth);
    };

    // Set initial width
    updateCardWidth();

    // Listen for resize events
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Handle wheel/touchpad scrolling with balanced sensitivity
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    const now = Date.now();
    // Throttle scroll events - only allow one navigation per 500ms (reduced from 800ms)
    if (now - lastScrollTimeRef.current < 500) {
      return;
    }
    
    // Balanced thresholds for good sensitivity without being too jumpy
    const horizontalThreshold = 25; // Reduced from 50 for better sensitivity
    const verticalThreshold = 40;   // Reduced from 80 for better sensitivity
    
    // Horizontal scroll (touchpad two-finger swipe) - primary method
    if (Math.abs(e.deltaX) > horizontalThreshold && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      lastScrollTimeRef.current = now;
      if (e.deltaX > 0) {
        // Scroll right, show next slide
        nextSlide();
      } else {
        // Scroll left, show previous slide
        prevSlide();
      }
    }
    // Vertical scroll as fallback - require moderate movement
    else if (Math.abs(e.deltaY) > verticalThreshold && Math.abs(e.deltaX) < 15) {
      lastScrollTimeRef.current = now;
      if (e.deltaY > 0) {
        // Scroll down, show next slide
        nextSlide();
      } else {
        // Scroll up, show previous slide
        prevSlide();
      }
    }
  };

  // Handle touch events for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    // Minimum swipe distance
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left, show next slide
        nextSlide();
      } else {
        // Swiped right, show previous slide
        prevSlide();
      }
    }
    
    setTouchStart(null);
  };

  const currentTransform = -currentSlide * slideWidth;

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 md:px-16">
      <div className="overflow-hidden w-full relative">
        <div 
          ref={carouselRef}
          className="flex gap-5 select-none"
          style={{ 
            transform: `translateX(${currentTransform}px)`,
            transition: 'transform 300ms ease-out'
          }}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <PlaceholderCard />
          )}
        </div>
        
        {/* Left gradient fade overlay - smooth opacity transition (hidden on mobile) */}
        <div 
          className={`absolute left-0 top-0 bottom-0 w-16 pointer-events-none z-10 transition-opacity duration-300 hidden md:block ${
            currentSlide > 0 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(to right, #69d7e5 0%, #69d7e5 20%, transparent 100%)'
          }}
        />
        
        {/* Right gradient fade overlay - smooth opacity transition (hidden on mobile) */}
        <div 
          className={`absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-10 transition-opacity duration-300 hidden md:block ${
            currentSlide < totalSlides - 1 ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(to left, #69d7e5 0%, #69d7e5 20%, transparent 100%)'
          }}
        />
      </div>
      
      {/* Navigation buttons - positioned outside the carousel container */}
      <button 
        onClick={prevSlide}
        className={`absolute left-0 md:left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-1.5 md:p-2 transition-all duration-200 z-20 ${
          currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
        }`}
        disabled={currentSlide === 0}
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className={`absolute right-0 md:right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-1.5 md:p-2 transition-all duration-200 z-20 ${
          currentSlide === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
        }`}
        disabled={currentSlide === totalSlides - 1}
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

function PaginationDots({ currentSlide, onSlideChange, totalSlides }: { 
  currentSlide: number, 
  onSlideChange: (index: number) => void,
  totalSlides: number
}) {
  // Only show pagination dots if there are multiple events
  if (totalSlides <= 1) return null;

  return (
    <div className="flex gap-2 items-center justify-center">
      {Array.from({ length: totalSlides }, (_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`rounded-full transition-all duration-300 cursor-pointer hover:opacity-80 ${
            currentSlide === index 
              ? 'w-8 h-2.5 bg-white/70' 
              : 'w-2.5 h-2.5 bg-white/50'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default function EventsSection({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sortedEvents = getSortedEvents(); // Get events sorted by date
  const totalSlides = Math.max(sortedEvents.length, 1);

  return (
    <div className="bg-[#69d7e5] box-border content-stretch flex flex-col gap-[15px] items-center justify-start pb-[30px] pt-[25px] px-0 relative w-full overflow-hidden">
      <div className="flex flex-col font-['Lexend:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[20px] md:text-[25px] text-black text-center px-4">
        <p className="leading-[normal]">Events and Announcements</p>
      </div>
      <FilterButtons onNavigate={onNavigate} />
      <EventsCarousel 
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
      <PaginationDots 
        currentSlide={currentSlide}
        onSlideChange={setCurrentSlide}
        totalSlides={totalSlides}
      />
    </div>
  );
}