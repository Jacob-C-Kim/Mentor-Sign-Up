import { useState, useEffect } from "react";
import svgPaths from "../../imports/svg-onqcmwzw98";
import { getEventsForDate } from "../../data/events";
import { getAllEventsForDate, formatDate } from "../../utils/calendarHelpers";

interface EventDetailsCardProps {
  selectedDate: Date | undefined;
  onClose: () => void;
}

export default function EventDetailsCard({ 
  selectedDate, 
  onClose 
}: EventDetailsCardProps) {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!selectedDate) return null;

  const events = getAllEventsForDate(selectedDate);
  
  // Ensure we have valid events and currentEventIndex is within bounds
  if (!events || events.length === 0) {
    return null;
  }
  
  // Ensure currentEventIndex is within bounds
  const safeIndex = Math.max(0, Math.min(currentEventIndex, events.length - 1));
  const currentEvent = events[safeIndex];
  
  // Double check that currentEvent exists
  if (!currentEvent) {
    return null;
  }

  // Handle scrolling through events
  const handleScroll = (direction: 'up' | 'down') => {
    if (direction === 'down' && safeIndex < events.length - 1) {
      setCurrentEventIndex(safeIndex + 1);
    } else if (direction === 'up' && safeIndex > 0) {
      setCurrentEventIndex(safeIndex - 1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Only handle arrow keys if there are multiple events
    if (events.length <= 1) {
      return;
    }
    
    if (e.key === 'ArrowDown' && safeIndex < events.length - 1) {
      e.preventDefault();
      e.stopPropagation();
      handleScroll('down');
    } else if (e.key === 'ArrowUp' && safeIndex > 0) {
      e.preventDefault();
      e.stopPropagation();
      handleScroll('up');
    }
  };

  // Reset event index when date changes and focus the card if it has multiple events
  useEffect(() => {
    setCurrentEventIndex(0);
    setShowSwipeHint(true); // Reset hint for new date
    
    // Hide swipe hint after 4 seconds
    if (isMobile && events.length > 1) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [selectedDate, isMobile, events.length]);

  // Listen for global navigation events
  useEffect(() => {
    const handleNavigateEvent = (e: CustomEvent) => {
      if (events.length > 1) {
        const { direction } = e.detail;
        handleScroll(direction);
      }
    };

    document.addEventListener('navigateEvent', handleNavigateEvent as EventListener);
    return () => document.removeEventListener('navigateEvent', handleNavigateEvent as EventListener);
  }, [events.length, safeIndex]);

  // Touch handling for mobile swipe navigation
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (events.length <= 1 || !isMobile) return;
    setTouchEnd(null);
    setIsSwipeActive(true);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (events.length <= 1 || !isMobile) return;
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const handleTouchEnd = () => {
    setIsSwipeActive(false);
    
    if (events.length <= 1 || !isMobile || !touchStart || !touchEnd) {
      setTouchStart(null);
      setTouchEnd(null);
      return;
    }
    
    const deltaX = Math.abs(touchStart.x - touchEnd.x);
    const deltaY = touchStart.y - touchEnd.y;
    const minSwipeDistance = 40; // Reduced threshold for easier swiping
    
    // Only process vertical swipes (ignore horizontal)
    if (deltaX > Math.abs(deltaY)) {
      setTouchStart(null);
      setTouchEnd(null);
      return;
    }
    
    const isUpSwipe = deltaY > minSwipeDistance;
    const isDownSwipe = deltaY < -minSwipeDistance;

    if (isUpSwipe && safeIndex < events.length - 1) {
      handleScroll('down');
      setShowSwipeHint(false);
    }
    if (isDownSwipe && safeIndex > 0) {
      handleScroll('up');
      setShowSwipeHint(false);
    }
    
    // Reset touch state
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Auto-focus the event card when it has multiple events for keyboard navigation (desktop only)
  useEffect(() => {
    if (events.length > 1 && !isMobile) {
      // Focus the event card element after a short delay to ensure it's rendered
      const timer = setTimeout(() => {
        const eventCard = document.querySelector('[role="region"][aria-label*="Event"]') as HTMLElement;
        if (eventCard) {
          eventCard.focus();
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [selectedDate, events.length, isMobile]);

  return (
    <div className="relative">
      {/* Event card */}
      <div 
        className={`bg-[#99e3ed] relative rounded-[15px] w-full border border-white transition-all duration-300 ease-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
          isMobile ? 'h-[360px] hover:scale-[1.01]' : 'h-[400px] hover:scale-[1.02]'
        } ${isSwipeActive && isMobile ? 'scale-[0.98] brightness-95' : ''}`}
        onKeyDown={events.length > 1 && !isMobile ? handleKeyDown : undefined}
        onTouchStart={isMobile && events.length > 1 ? handleTouchStart : undefined}
        onTouchMove={isMobile && events.length > 1 ? handleTouchMove : undefined}
        onTouchEnd={isMobile && events.length > 1 ? handleTouchEnd : undefined}
        tabIndex={events.length > 1 && !isMobile ? 0 : -1}
        role={events.length > 1 ? "region" : undefined}
        aria-label={events.length > 1 ? `Event ${safeIndex + 1} of ${events.length}. ${isMobile ? 'Swipe vertically or tap buttons to navigate.' : 'Use arrow keys to navigate.'}` : undefined}
      >
        {/* Close X button in top left */}
        <button
          onClick={onClose}
          className={`absolute left-[18px] top-[18px] flex items-center justify-center bg-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.8)] rounded-full border border-white transition-all duration-200 hover:scale-110 z-10 ${
            isMobile ? 'w-10 h-10 active:scale-95' : 'w-8 h-8'
          }`}
          aria-label="Close event details"
        >
          <svg className={`text-[#195259] ${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Calendar icon in top right */}
        <div className={`absolute bg-[rgba(255,255,255,0.5)] right-[18px] rounded-[15px] top-[18px] flex items-center justify-center border border-white ${
          isMobile ? 'size-10' : 'size-9'
        }`}>
          <div className={`relative ${isMobile ? 'h-7 w-6' : 'h-6 w-[21px]'}`}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 24">
              <g id="calendar-days">
                <path d={svgPaths.p3ca7b300} fill="var(--fill-0, #195259)" id="Primary" />
              </g>
            </svg>
          </div>
        </div>

        {/* Event content */}
        <div className={`absolute content-stretch flex flex-col items-start justify-start left-[18px] w-[calc(100%-80px)] gap-1 ${
          isMobile ? 'top-[55px]' : 'top-[60px]'
        }`}>
          <div className={`font-['Lexend:Bold',_sans-serif] font-bold relative shrink-0 text-black w-full ${
            isMobile ? 'text-[16px]' : 'text-[18px]'
          }`}>
            <p className="leading-[1.2]">{currentEvent.title}</p>
          </div>
          
          <div className={`font-['Lexend:Medium',_sans-serif] font-medium relative shrink-0 text-black w-full ${
            isMobile ? 'text-[11px]' : 'text-[12px]'
          }`}>
            <p className="leading-[1.3]">{currentEvent.time} @ {currentEvent.location}</p>
          </div>
          
          <div className={`font-['Lexend:Medium',_sans-serif] font-medium relative shrink-0 text-black w-full ${
            isMobile ? 'text-[11px]' : 'text-[12px]'
          }`}>
            <p className="leading-[1.3]">{formatDate(selectedDate)}</p>
          </div>
        </div>
        
        {/* Description */}
        <div className={`absolute left-[18px] text-black w-[calc(100%-36px)] overflow-y-auto ${
          isMobile ? 'text-[11px] top-[155px] h-[130px]' : 'text-[12px] top-[175px] h-[140px]'
        }`}>
          <div className={`font-['Lexend:Regular',_sans-serif] font-normal pr-2 ${
            isMobile ? 'text-[11px]' : 'text-[12px]'
          }`}>
            <p className="leading-[1.4]">{currentEvent.description}</p>
          </div>
        </div>

        {/* Swipe indicator for mobile */}
        {events.length > 1 && isMobile && showSwipeHint && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${showSwipeHint ? 'opacity-30' : 'opacity-0'}`}>
              <svg className="w-6 h-6 text-[#195259] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              <div className="text-[#195259] text-xs font-medium">Swipe up/down</div>
              <svg className="w-6 h-6 text-[#195259] animate-bounce" style={{ animationDelay: '0.5s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            </div>
          </div>
        )}

        {/* Event counter if multiple events */}
        {events.length > 1 && (
          <div className={`absolute left-[18px] right-[18px] flex items-center justify-between ${
            isMobile ? 'bottom-[10px]' : 'bottom-[14px]'
          }`}>
            <div className={`font-['Lexend:Medium',_sans-serif] font-medium text-[#195259] ${
              isMobile ? 'text-[11px]' : 'text-[12px]'
            }`}>
              {safeIndex + 1} of {events.length} events
            </div>
            <div className={`text-[#195259] font-['Lexend:Regular',_sans-serif] ${
              isMobile ? 'text-[9px]' : 'text-[10px]'
            }`}>
              {isMobile ? 'Swipe or tap buttons' : 'Use ↑↓ keys or buttons'}
            </div>
          </div>
        )}
      </div>

      {/* Arrow navigation buttons for multiple events */}
      {events.length > 1 && (
        <>
          {isMobile ? (
            /* Mobile: Horizontal buttons at the bottom */
            <div className="absolute bottom-[50px] left-1/2 transform -translate-x-1/2 flex gap-4">
              <button
                onClick={() => {
                  handleScroll('up');
                  setShowSwipeHint(false);
                }}
                disabled={safeIndex === 0}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 ${
                  safeIndex === 0 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-[rgba(255,255,255,0.8)] text-[#195259] hover:bg-[rgba(255,255,255,0.9)] cursor-pointer shadow-md'
                }`}
                aria-label="Previous event"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => {
                  handleScroll('down');
                  setShowSwipeHint(false);
                }}
                disabled={safeIndex === events.length - 1}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 ${
                  safeIndex === events.length - 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-[rgba(255,255,255,0.8)] text-[#195259] hover:bg-[rgba(255,255,255,0.9)] cursor-pointer shadow-md'
                }`}
                aria-label="Next event"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                </button>
            </div>
          ) : (
            /* Desktop: Vertical buttons on the right */
            <div className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
              <button
                onClick={() => handleScroll('up')}
                disabled={safeIndex === 0}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                  safeIndex === 0 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#99e3ed] text-[#195259] hover:bg-[#8bd4e0] cursor-pointer'
                }`}
                aria-label="Previous event"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                onClick={() => handleScroll('down')}
                disabled={safeIndex === events.length - 1}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                  safeIndex === events.length - 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#99e3ed] text-[#195259] hover:bg-[#8bd4e0] cursor-pointer'
                }`}
                aria-label="Next event"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}