// JavaScript for your daycare website homepage

// Example: Display a welcome message when the page loads
document.addEventListener("DOMContentLoaded", function () {
    const welcomeMessage = document.createElement("p");
    welcomeMessage.textContent = "Welcome to Little Legends Academy!";
    const container = document.querySelector(".container");
    container.appendChild(welcomeMessage);
});


// Function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle the scroll event
function handleScroll() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach((element) => {
        if (isElementInViewport(element)) {
            const rect = element.getBoundingClientRect();
            // Calculate the center of the element
            const elementCenterY = rect.top + rect.height / 2;
            
            // Calculate the center of the viewport
            const viewportCenterY = window.innerHeight / 2;

            // Calculate the opacity based on the position of the element relative to the viewport
            const opacity = 1 - Math.abs(elementCenterY - viewportCenterY) / window.innerHeight;

            element.style.opacity = opacity;
        } else {
            element.style.opacity = 0; // Set opacity to 0 (hidden)
        }
    });
}



// Attach the scroll event listener
window.addEventListener('scroll', handleScroll);

// Initial check on page load
handleScroll();