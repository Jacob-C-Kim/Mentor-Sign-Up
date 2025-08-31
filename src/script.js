// State management
let activeSection = null;

// DOM elements
const navItems = document.querySelectorAll('.nav-item');
const logoContainer = document.querySelector('.logo-container');
const eventsButton = document.getElementById('eventsButton');

// Navigation functionality
function handleNavClick(section) {
    // Remove active class from all nav items
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    const clickedItem = document.querySelector(`[data-section="${section}"]`);
    if (clickedItem && clickedItem.classList.contains('nav-item')) {
        clickedItem.classList.add('active');
    }
    
    // Update active section
    activeSection = section;
    
    // Log navigation (in a real app, this would handle routing)
    console.log(`Navigating to: ${section}`);
    
    // Here you could add actual navigation logic
    // For example: window.location.hash = section;
    // Or show/hide different content sections
}

// Events button functionality
function handleEventsClick() {
    console.log("Navigating to events page");
    // In a real app, this would handle routing to events page
    // For example: window.location.href = '/events';
    
    // You could also show a modal or load content dynamically
    alert("Events page would load here!");
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add click listeners to navigation items
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            handleNavClick(section);
        });
    });
    
    // Add click listener to logo
    if (logoContainer) {
        logoContainer.addEventListener('click', function() {
            handleNavClick('home');
        });
    }
    
    // Add click listener to events button
    if (eventsButton) {
        eventsButton.addEventListener('click', handleEventsClick);
    }
    
    // Optional: Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.section) {
            handleNavClick(event.state.section);
        }
    });
    
    // Optional: Set initial state based on URL hash
    const hash = window.location.hash.substring(1);
    if (hash) {
        handleNavClick(hash);
    }
});

// Utility functions for future enhancements
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

function updateURL(section) {
    // Update URL without page reload
    const newURL = window.location.pathname + '#' + section;
    history.pushState({section: section}, '', newURL);
}

// Export functions for potential use in other scripts
window.AsianCultureSociety = {
    handleNavClick: handleNavClick,
    handleEventsClick: handleEventsClick,
    showSection: showSection,
    updateURL: updateURL
};