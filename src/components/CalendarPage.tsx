import { useState, useEffect } from "react";
import { hasEventsOnDate, getEventsForDate } from "../data/events";
import EventDetailsCard from "./calendar/EventDetailsCard";
import CalendarWidget from "./calendar/CalendarWidget";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showEventCard, setShowEventCard] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    // Check if the clicked date has events
    const isEventDate = date && hasEventsOnDate(date);
    
    if (!isEventDate) {
      // If it's not an event date, do nothing
      return;
    }
    
    // If the same date is selected, deselect it (go back to full calendar)
    if (selectedDate && date && selectedDate.getTime() === date.getTime()) {
      handleCloseEvent();
    } else {
      // Select the new event date with animation
      setSelectedDate(date);
      
      // Show event card after calendar starts moving
      setTimeout(() => {
        setShowEventCard(true);
      }, isMobile ? 300 : 150);
    }
  };

  const handleCloseEvent = () => {
    // Start fade out immediately, then clear date after fade completes
    setShowEventCard(false);
    
    // Clear the selected date after a brief moment to allow fade animation
    setTimeout(() => {
      setSelectedDate(undefined);
    }, 100);
  };

  // Handle escape key to close event details and global arrow key navigation
  useEffect(() => {
    const handleGlobalKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedDate) {
        handleCloseEvent();
        return;
      }
      
      // Handle arrow keys for event navigation when event card is visible
      if (selectedDate && showEventCard) {
        // Get the events for the selected date to check if there are multiple
        const eventsForDate = getEventsForDate(selectedDate);
        
        if (eventsForDate.length > 1) {
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            e.stopPropagation();
            // Trigger a custom event that the EventDetailsCard can listen to
            const upEvent = new CustomEvent('navigateEvent', { detail: { direction: 'up' } });
            document.dispatchEvent(upEvent);
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            e.stopPropagation();
            // Trigger a custom event that the EventDetailsCard can listen to
            const downEvent = new CustomEvent('navigateEvent', { detail: { direction: 'down' } });
            document.dispatchEvent(downEvent);
          }
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyPress);
    return () => document.removeEventListener('keydown', handleGlobalKeyPress);
  }, [selectedDate, showEventCard]);

  // Reset event card visibility when date changes
  useEffect(() => {
    if (!selectedDate) {
      setShowEventCard(false);
    }
  }, [selectedDate]);

  const hasSelectedDate = selectedDate !== undefined;

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* White background section - only as tall as navigation bar */}
      <div className="bg-white w-full h-16"></div>
      
      {/* Turquoise background section */}
      <div className="bg-[#69d7e5] min-h-[calc(100vh-64px)] w-full">
        {/* Calendar content with proper top spacing */}
        <div className={`${isMobile ? 'px-4 pt-4 pb-8' : 'px-8 pt-8 pb-12'}`}>
          <div className="relative max-w-7xl mx-auto">
            {/* Mobile Layout */}
            {isMobile ? (
              <div className="flex flex-col gap-6">
                {/* Calendar container - full width on mobile */}
                <div className="w-full">
                  <CalendarWidget 
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                    isCompact={false}
                  />
                </div>

                {/* Event details card - below calendar on mobile */}
                {hasSelectedDate && (
                  <div 
                    className={`w-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      showEventCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                    style={{
                      transitionDelay: showEventCard ? '200ms' : '0ms'
                    }}
                  >
                    <EventDetailsCard 
                      selectedDate={selectedDate} 
                      onClose={handleCloseEvent}
                    />
                  </div>
                )}
              </div>
            ) : (
              /* Desktop Layout */
              <div className="relative w-full h-[620px]">
                {/* Calendar container - slides left when date selected */}
                <div 
                  className="absolute transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{
                    left: hasSelectedDate ? '50px' : '50%',
                    top: hasSelectedDate ? '50%' : '55%',
                    transform: hasSelectedDate 
                      ? 'translateY(-50%)' 
                      : 'translateX(-50%) translateY(-50%)',
                    width: hasSelectedDate ? '600px' : '650px',
                    zIndex: 20
                  }}
                >
                  <CalendarWidget 
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                    isCompact={hasSelectedDate}
                  />
                </div>

                {/* Event details card - positioned to the right of calendar */}
                <div 
                  className="absolute w-[360px] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{
                    right: '30px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    opacity: showEventCard ? 1 : 0,
                    visibility: showEventCard || selectedDate ? 'visible' : 'hidden',
                    transitionDelay: showEventCard ? '150ms' : '0ms',
                    zIndex: showEventCard ? 15 : 5,
                    pointerEvents: showEventCard ? 'auto' : 'none'
                  }}
                >
                  {hasSelectedDate && (
                    <EventDetailsCard 
                      selectedDate={selectedDate} 
                      onClose={handleCloseEvent}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}