document.addEventListener("DOMContentLoaded", function () {
    const monthYearElement = document.getElementById("currentDate");
    const calendarBody = document.getElementById("calendar-body");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const viewMonthButton = document.getElementById("viewMonth");
    const viewWeekButton = document.getElementById("viewWeek");

    const currentDate = new Date();
    let currentView = "month"; // Default view is "month"

    // Sample event data (replace with your actual event data)
    const eventData = [
        { date: new Date(2023, 8, 5), title: "Event 1", description: "Description for Event 1" },
        { date: new Date(2023, 8, 15), title: "Event 2", description: "Description for Event 2" },
        // Add more events as needed
    ];

    // Function to display event pop-up
  // Function to display event pop-up
function displayEventPopup(date) {
    // Clear any existing event popups
    const existingPopups = document.querySelectorAll(".event-popup");
    existingPopups.forEach(popup => {
        document.body.removeChild(popup);
    });

    const formattedDate = date.toLocaleDateString();

    // Find the events for the clicked date
    const eventsForDate = eventData.filter(event => {
        return event.date.toDateString() === date.toDateString();
    });

    if (eventsForDate.length > 0) {
        // Create and display the event pop-up
        const popup = document.createElement("div");
        popup.classList.add("event-popup");
        popup.innerHTML = `
            <h2>Events on ${formattedDate}</h2>
            <ul>
                ${eventsForDate.map(event => `<li>${event.title}: ${event.description}</li>`).join("")}
            </ul>
            <button id="close-popup">Close</button>
        `;

        document.body.appendChild(popup);

        // Add event listener to close the pop-up when the close button is clicked
        const closeButton = document.getElementById("close-popup");
        closeButton.addEventListener("click", () => {
            document.body.removeChild(popup);
        });
    }
}


    function generateCalendar() {
        monthYearElement.innerText = currentView === "month" ? `${getMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}` : `Week of ${getFormattedDate(currentDate)}`;
        calendarBody.innerHTML = "";

        if (currentView === "month") {
            generateMonthView();
        } else if (currentView === "week") {
            generateWeekView();
        }
    }

    function generateMonthView() {
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const startingDayOfWeek = firstDayOfMonth.getDay(); // Get the day of the week for the 1st day (0 = Sunday, 1 = Monday, ...)
    
        // Create table rows for each week
        for (let i = 0; i < Math.ceil((daysInMonth + startingDayOfWeek) / 7); i++) {
            const row = document.createElement("tr");
    
            // Create table cells for each day of the month
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("td");
                const day = i * 7 + j - startingDayOfWeek + 1; // Calculate the day number
    
                if (day >= 1 && day <= daysInMonth) {
                    // Find events for the current date
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                    const eventsForDate = eventData.filter(event => {
                        return event.date.toDateString() === date.toDateString();
                    });
    
                    if (eventsForDate.length > 0) {
                        // Add a visual indicator for days with events
                        cell.classList.add("event-day");
                        cell.innerHTML = `<span class="event-indicator"></span>${day}`;
                    } else {
                        cell.textContent = day;
                    }
    
                    // Add click event to display events
                    cell.addEventListener("click", () => {
                        displayEventPopup(date);
                    });
                } else {
                    cell.textContent = ""; // Display empty cells for days outside the month's range
                }
    
                row.appendChild(cell);
            }
    
            calendarBody.appendChild(row);
        }
    }
    
    
    

    function generateWeekView() {
        const selectedDate = new Date(currentDate); // Copy of currentDate

        // Determine the start and end dates for the week
        const startOfWeek = selectedDate.getDate() - selectedDate.getDay() + 1;
        const endOfWeek = startOfWeek + 6;

        // Create a table row for the week
        const row = document.createElement("tr");

        // Loop through the days of the week and create table cells
        for (let day = startOfWeek; day <= endOfWeek; day++) {
            const cell = document.createElement("td");

            if (day < 1 || day > new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()) {
                // Display empty cells for days outside the month's range
                cell.textContent = "";
            } else {
                selectedDate.setDate(day);
                cell.textContent = day;
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }

    function getMonthName(month) {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return months[month];
    }

    function getFormattedDate(date) {
        // Format the date as needed for the week view
        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    function updateCalendarView() {
        generateCalendar();
    }

    function toggleMonthView() {
        currentView = "month";
        updateCalendarView();
    }

    function toggleWeekView() {
        currentView = "week";
        updateCalendarView();
    }

    viewMonthButton.addEventListener("click", toggleMonthView);
    viewWeekButton.addEventListener("click", toggleWeekView);

    prevButton.addEventListener("click", () => {
        if (currentView === "month") {
            currentDate.setMonth(currentDate.getMonth() - 1);
        } else if (currentView === "week") {
            currentDate.setDate(currentDate.getDate() - 7);
        }
        updateCalendarView();
    });

    nextButton.addEventListener("click", () => {
        if (currentView === "month") {
            currentDate.setMonth(currentDate.getMonth() + 1);
        } else if (currentView === "week") {
            currentDate.setDate(currentDate.getDate() + 7);
        }
        updateCalendarView();
    });

    const calendarCells = document.querySelectorAll("#calendar-body td");
    calendarCells.forEach(cell => {
        cell.addEventListener("click", () => {
            const day = parseInt(cell.textContent);
            const month = currentDate.getMonth();
            const year = currentDate.getFullYear();
            const selectedDate = new Date(year, month, day);
            displayEventPopup(selectedDate);
        });
    });

    // Initial view: Month
    generateCalendar();
});
