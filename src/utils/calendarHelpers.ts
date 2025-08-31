import { getEventsForDate, getSortedEvents } from "../data/events";

// Helper function to parse start time from time string
export const parseStartTime = (timeString: string): number => {
  // Extract start time from strings like "5:00 PM - 7:00 PM"
  const startTime = timeString.split(' - ')[0].trim();
  const [time, period] = startTime.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  
  let hour24 = hours;
  if (period === 'PM' && hours !== 12) {
    hour24 += 12;
  } else if (period === 'AM' && hours === 12) {
    hour24 = 0;
  }
  
  return hour24 * 60 + minutes; // Return minutes since midnight
};

// Get all events for the selected date using the new data structure
export const getAllEventsForDate = (date: Date) => {
  const eventsForDate = getEventsForDate(date);
  
  if (eventsForDate.length === 0) {
    return [
      {
        title: "No Event",
        time: "TBD",
        location: "TBD",
        description: "No events scheduled for this date."
      }
    ];
  }

  // Convert to the format expected by the component and sort by start time
  return eventsForDate.map(event => ({
    title: event.title,
    time: event.time,
    location: event.location,
    description: event.description
  })).sort((a, b) => {
    // Handle edge case where time is "TBD"
    if (a.time === "TBD" || b.time === "TBD") return 0;
    return parseStartTime(a.time) - parseStartTime(b.time);
  });
};

// Format the selected date to match homepage style
export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
};