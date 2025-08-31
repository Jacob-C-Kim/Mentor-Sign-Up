import { useState, useEffect } from "react";
import { Calendar } from "../ui/calendar";
import { getEventDates } from "../../data/events";

interface CalendarWidgetProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  isCompact?: boolean;
}

export default function CalendarWidget({ 
  selectedDate, 
  onDateSelect, 
  isCompact = false 
}: CalendarWidgetProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get event dates from the events data
  const eventDates = getEventDates();

  // Custom onSelect handler to prevent automatic selection behavior
  const handleDateSelect = (date: Date | undefined) => {
    // Always call our custom handler instead of the Calendar's default behavior
    onDateSelect(date);
  };

  return (
    <div 
      className="bg-white rounded-3xl shadow-lg w-full max-w-none transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{
        padding: isMobile ? (isCompact ? '20px' : '24px') : (isCompact ? '28px' : '40px')
      }}
    >
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        className="rounded-md border-0 w-full calendar-with-events transition-all duration-300 ease-out"
        modifiers={{
          hasEvent: eventDates,
        }}
        modifiersClassNames={{
          hasEvent: "has-event",
        }}
        defaultMonth={new Date()} // Current month
        showOutsideDays={false}
        classNames={{
          months: "flex flex-col gap-0 w-full",
          month: "flex flex-col gap-0 w-full",
          caption: `flex justify-center pt-0 relative items-center w-full ${
            isMobile ? (isCompact ? 'mb-3 px-2' : 'mb-4 px-4') : (isCompact ? 'mb-4 px-6' : 'mb-8 px-10')
          }`,
          caption_label: `text-black font-bold transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isMobile ? (isCompact ? 'text-xl' : 'text-2xl') : (isCompact ? 'text-2xl' : 'text-4xl')
          }`,
          nav: "flex items-center gap-2",
          nav_button: `bg-transparent opacity-70 hover:opacity-100 border-0 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center ${
            isMobile 
              ? 'w-10 h-10 p-2 active:scale-95' 
              : (isCompact ? 'w-8 h-8 p-3' : 'w-10 h-10 p-3')
          }`,
          nav_button_previous: "absolute left-0 top-1/2 transform -translate-y-1/2",
          nav_button_next: "absolute right-0 top-1/2 transform -translate-y-1/2",
          table: "w-full border-collapse",
          head_row: `flex w-full ${
            isMobile ? (isCompact ? 'mb-2' : 'mb-3') : (isCompact ? 'mb-3' : 'mb-6')
          }`,
          head_cell: `text-gray-600 font-medium flex-1 text-center py-2 ${
            isMobile ? 'text-xs' : (isCompact ? 'text-sm' : 'text-base')
          }`,
          row: `flex w-full ${
            isMobile ? (isCompact ? 'mb-1' : 'mb-1') : (isCompact ? 'mb-1' : 'mb-3')
          }`,
          cell: "relative flex-1 text-center p-1",
          day: `w-full font-medium hover:bg-gray-100 transition-all duration-200 mx-auto flex items-center justify-center cursor-pointer rounded-xl border-0 ${
            isMobile 
              ? 'h-10 text-sm active:scale-95' 
              : (isCompact ? 'h-10 text-base hover:scale-105' : 'h-16 text-xl hover:scale-105')
          }`,
          day_selected: "bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 rounded-xl transform scale-105",
          day_today: "bg-gray-100 text-gray-900 font-bold rounded-xl",
          day_outside: "opacity-0 pointer-events-none",
          day_disabled: "text-gray-300 opacity-50",
        }}
      />
    </div>
  );
}