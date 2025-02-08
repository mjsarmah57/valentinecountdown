// script.js
document.addEventListener('DOMContentLoaded', function() {
    const events = [
        { day: 7, name: "Rose Day", wish: "Happy Rose Day! May your day be as beautiful as a rose and filled with love and fragrance." },
        { day: 8, name: "Propose Day", wish: "Happy Propose Day! Dare to express your feelings and make someone's day special." },
        { day: 9, name: "Chocolate Day", wish: "Happy Chocolate Day! Indulge in sweetness and share the joy with your loved ones." },
        { day: 10, name: "Teddy Day", wish: "Happy Teddy Day! Sending you a warm and cuddly teddy to hug and cherish." },
        { day: 11, name: "Promise Day", wish: "Happy Promise Day! Make promises you can keep and strengthen your bonds of love." },
        { day: 12, name: "Hug Day", wish: "Happy Hug Day! A warm hug can say a thousand words. Embrace your dear ones today." },
        { day: 13, name: "Kiss Day", wish: "Happy Kiss Day! Seal your love with a kiss and make unforgettable memories." },
        { day: 14, name: "Valentine's Day", wish: "Happy Valentine's Day! Celebrate love in all its forms and cherish your special connections." }
    ];

    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1; // Month is 0-indexed
    const currentYear = currentDate.getFullYear();

    // Check if it's February
    if (currentMonth === 2) {
        updateProgressBar(currentDay);
        displayDailyWish(currentDay);
        updateTimer(currentDay);
    } else {
        // If not February, display a default message or hide sections
        document.getElementById('event-name').textContent = "Valentine Week Not Started Yet!";
        document.getElementById('daily-wish').textContent = "Come back in February to celebrate Valentine Week.";
        document.getElementById('next-event-timer').textContent = "See you next February!";
        document.getElementById('progress-section').style.display = 'none'; // Hide progress bar if not Feb
    }


    function updateProgressBar(day) {
        const steps = document.querySelectorAll('.step');
        const progressLine = document.querySelector('.progress-line::before');
        let completedSteps = 0;

        steps.forEach(step => {
            const stepDay = parseInt(step.getAttribute('data-day'));
            if (stepDay < day) {
                step.classList.add('completed');
                completedSteps++;
            } else if (stepDay === day) {
                step.classList.add('active'); // Optionally add 'active' class for current day
            }
        });

        // Calculate progress line width based on completed steps
        let progressWidth;
        if (steps.length > 1) {
            progressWidth = (completedSteps / (steps.length - 1)) * 100;
        } else {
            progressWidth = 100; // For a single step progress bar
        }

        if (progressLine) {
            if (window.innerWidth <= 768) {
                progressLine.style.height = `${progressWidth}%`; // For vertical progress on smaller screens
                progressLine.style.width = '2px';
            } else {
                progressLine.style.width = `${progressWidth}%`; // For horizontal progress on larger screens
                progressLine.style.height = '2px';
            }
        }
    }

    function displayDailyWish(day) {
        const eventNameElement = document.getElementById('event-name');
        const wishMessageElement = document.getElementById('daily-wish');

        const todayEvent = events.find(event => event.day === day);
        if (todayEvent) {
            eventNameElement.textContent = todayEvent.name;
             if (day === 14) { // Check if it's Valentine's Day
                wishMessageElement.innerHTML = `${todayEvent.wish} <br><br><a href="https://mjsarmah57.github.io/surprise/" target="_blank" style="color: #d6336c; text-decoration: none; font-weight: bold;">Click Me For a one more gift!</a>`;
            } else {
                wishMessageElement.textContent = todayEvent.wish;
            }
        } else if (day < 7) {
            eventNameElement.textContent = "Valentine Week Countdown";
            wishMessageElement.textContent = "Valentine Week is just around the corner. Get ready to celebrate love!";
        } else if (day > 14) {
            eventNameElement.textContent = "Valentine Week Over";
            wishMessageElement.textContent = "Valentine Week 2025 has concluded. Hope you had a week full of love!";
        } else {
            eventNameElement.textContent = "Unknown Event";
            wishMessageElement.textContent = "Happy Valentine Week!";
        }
    }

    function updateTimer(currentDay) {
        const timerElement = document.getElementById('next-event-timer');
        let nextEvent = events.find(event => event.day > currentDay);

        if (nextEvent) {
            const nextEventDate = new Date(currentYear, 1, nextEvent.day); // Month 1 is February
            const timeLeft = nextEventDate.getTime() - currentDate.getTime();

            if (timeLeft > 0) {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                timerElement.textContent = `Next Event (${nextEvent.name}) in ${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
            } else {
                 // If current day is the last event day or after, show Valentine's day message
                if (currentDay <= 14) {
                    timerElement.textContent = "It's " + events.find(event => event.day === currentDay).name + "!";
                } else {
                    timerElement.textContent = "Valentine Week has ended for this year!";
                }
            }
        } else {
            timerElement.textContent = "Valentine Week has ended for this year!";
        }
    }
});
