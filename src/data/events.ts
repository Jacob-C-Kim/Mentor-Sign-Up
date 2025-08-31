// Asian Culture Society Events Data
// This file contains all ACS events and can be easily edited to add, remove, or modify events

export interface Event {
  id: number;
  title: string;
  time: string;
  location: string;
  date: string;
  dateObject: Date; // For calendar integration
  description: string;
  link?: string;
}

// Events array - Add new events in any order, they will be automatically sorted chronologically
export const events: Event[] = [
  {
    id: 1,
    title: "First GBM",
    time: "5:00 PM - 7:00 PM",
    location: "Bamboo Room",
    date: "August 29th, 2025",
    dateObject: new Date(2025, 7, 29), // Month is 0-indexed
    description: "Kick off the semester at our First General Body Meeting (GBM)! We'll start the year with fun icebreakers and a chance to meet new people, connect with returning members, and get to know the community."
  },
  {
    id: 2,
    title: "Tinikling Open Practice",
    time: "1:00 PM - 3:00 PM",
    location: "Upper Dance Studio",
    date: "August 30th, 2025",
    dateObject: new Date(2025, 7, 30),
    description: "Come check out our Tinikling Open Practice! This is a casual session where anyone can try out tinikling, meet new people, and experience one of the most iconic traditional Filipino dances. No experience is required. Just come have fun, learn the basics, and see if joining the team is right for you."
  },
  {
    id: 3,
    title: "Summer Festival",
    time: "5:00 PM - 8:00 PM",
    location: "Greek Lawn",
    date: "August 31st, 2025",
    dateObject: new Date(2025, 7, 31),
    description: "Celebrate summer with an evening of culture and community in collaboration with Wadaiko. Explore booths with games and activities, meet new people, and enjoy a live Wadaiko performance that brings the excitement of traditional Japanese drumming to campus."
  },
  {
    id: 5,
    title: "Speed Dating",
    time: "1:00 PM - 3:00 PM",
    location: "SHED 4350",
    date: "September 7th, 2025",
    dateObject: new Date(2025, 8, 7),
    description: "Start your Mentor/Mentee journey with our Speed Dating event! This session gives participants a chance to rotate through short one-on-one conversations. Mentors and mentees will be able to introduce themselves, ask questions, and get to know multiple people in a structured, timed format before being paired for the semester."
  },
  {
    id: 4,
    title: "Beach Day",
    time: "4:30 PM - 8:00 PM",
    location: "Ontario Beach Park",
    date: "September 13th, 2025",
    dateObject: new Date(2025, 8, 13),
    description: "Spend the afternoon at the beach with pizza, volleyball, spikeball, and time to relax by the water. Beach Day is all about playing games, enjoying the outdoors, and having a fun evening with friends before the semester gets busy."
  }
];

// Helper function to get events for a specific date
export const getEventsForDate = (date: Date): Event[] => {
  return events.filter(event => 
    event.dateObject.getDate() === date.getDate() &&
    event.dateObject.getMonth() === date.getMonth() &&
    event.dateObject.getFullYear() === date.getFullYear()
  );
};

// Helper function to check if a date has events
export const hasEventsOnDate = (date: Date): boolean => {
  return getEventsForDate(date).length > 0;
};

// Helper function to get all events sorted by date (earliest first)
export const getSortedEvents = (): Event[] => {
  return [...events].sort((a, b) => a.dateObject.getTime() - b.dateObject.getTime());
};

// Helper function to get all event dates for calendar highlighting
export const getEventDates = (): Date[] => {
  return events.map(event => event.dateObject);
};