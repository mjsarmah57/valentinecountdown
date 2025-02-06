// script.js
document.addEventListener('DOMContentLoaded', function() {
    const dayWishTitle = document.getElementById('dayWishTitle');
    const wishTimer = document.getElementById('timer');
    const wishMessageDiv = document.getElementById('wishMessage');
    const wishText = document.getElementById('wishText');
    const musicButton = document.getElementById('musicButton');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const progressSteps = document.querySelectorAll('.progress-step');
    const countdownTitle = document.getElementById('countdownTitle');
    const dailyWishSection = document.getElementById('dailyWish');


    let musicPlaying = true;
    dailyWishSection.style.display = 'none'; // Initially hide daily wish


    const valentineWeekWishes = [
        {
            day: 7,
            month: 1, // January is 0, February is 1 (Month is 0-indexed)
            wishDayName: "Rose Day",
            wish: "Happy Rose Day, my love! Just like roses, your presence fills my life with beauty and fragrance."
        },
        {
            day: 8,
            month: 1,
            wishDayName: "Propose Day",
            wish: "On this Propose Day, I want to ask you again and again - will you continue to be mine forever? Happy Propose Day!"
        },
        {
            day: 9,
            month: 1,
            wishDayName: "Chocolate Day",
            wish: "Sweet as chocolates, you make every day delightful. Happy Chocolate Day to my sweetest girlfriend!"
        },
        {
            day: 10,
            month: 1,
            wishDayName: "Teddy Day",
            wish: "Sending you a big teddy hug on Teddy Day! Hope this cuddly bear reminds you of my warm embrace."
        },
        {
            day: 11,
            month: 1,
            wishDayName: "Promise Day",
            wish: "On this Promise Day, I promise to always cherish, love, and support you. Happy Promise Day, my dear!"
        },
        {
            day: 12,
            month: 1,
            wishDayName: "Hug Day",
            wish: "Sending you the warmest hugs on Hug Day. Can't wait to hug you in person! Happy Hug Day!"
        },
        {
            day: 13,
            month: 1,
            wishDayName: "Kiss Day",
            wish: "Wishing you a day full of sweet kisses on Kiss Day! Sending you all my love and kisses."
        },
        
        {
            day: 14,
            month: 1,
            wishDayName: "Valentine's Day",
            wish: "Happy Valentine's Day to the love of my life! Every day with you feels like Valentine's Day. I love you more than words can say."
        }
    ];


    function displayWish(wish) {
        // Function to display the wish message and update UI elements
        dayWishTitle.textContent = `Happy ${wish.wishDayName}!`;
        wishText.textContent = wish.wish;
        wishMessageDiv.style.display = 'block'; // Show wish message
        wishTimer.style.display = 'none';      // Hide timer
        dailyWishSection.style.display = 'block'; // Make sure daily wish section is visible
        countdownTitle.textContent = "Today's Wish:"; // Update countdown title to indicate wish is shown
    }


    function startTimerForNextWish() {
        const now = new Date(); // Get current date and time
        const currentMonth = now.getMonth();
        const currentDate = now.getDate();
        const currentYear = now.getFullYear();
        const currentHour = now.getHours();


        let todayWishData = null;
        let nextWishDayData = null;
        let todayWishIndex = -1; // Initialize today's wish index


        // Iterate through the valentineWeekWishes array to find today's and the next wish
        for (let i = 0; i < valentineWeekWishes.length; i++) {
            const wishDay = valentineWeekWishes[i];
            if (currentMonth === wishDay.month && currentDate === wishDay.day) {
                // Check if the current date matches a wish day
                todayWishData = wishDay;
                todayWishIndex = i; // Store the index of today's wish
                if (currentHour >= 0) {
                    // If it's today's wish day and current hour is past midnight (00:00:00), display wish immediately
                    displayWish(todayWishData);
                    // Intentionally NOT returning here, we want to start timer for the next day *after* displaying today's wish
                    break; // Break after finding today's wish
                }
            } else if (new Date(currentYear, wishDay.month, wishDay.day) > now) {
                // If the wish day is in the future, it's the next wish day
                nextWishDayData = wishDay;
                break; // Take the first future wish day as the next target
            }
        }


        if (nextWishDayData) {
            // If there is a next wish day in the future, start countdown timer
            countdownTitle.textContent = "Next Wish Reveal:";
            // Set the target time to midnight (00:00:00) of the next wish day
            const nextWishRevealTime = new Date(currentYear, nextWishDayData.month, nextWishDayData.day, 0, 0, 0).getTime();


            const timerInterval = setInterval(function() {
                const currentTime = new Date().getTime(); // Get current time inside the interval for accurate countdown
                const timeLeft = nextWishRevealTime - currentTime; // Calculate time difference


                if (timeLeft <= 0) {
                    // When timer reaches zero (midnight of next wish day)
                    clearInterval(timerInterval); // Stop the timer

                    if (todayWishIndex + 1 < valentineWeekWishes.length) {
                        // If there are more wishes in the week after today's wish
                        const nextDayWish = valentineWeekWishes[todayWishIndex + 1]; // Get the wish for the *next* day in sequence
                        displayWish(nextDayWish); // Display the wish for the next day
                        setActiveProgressStep(); // Update progress bar to reflect current day
                        startTimerForNextWish(); // Restart timer to count down to the *following* wish day
                    } else {
                        // If it was the last wish day (Valentine's Day), show completion message
                        countdownTitle.textContent = "Valentine's Week Complete!";
                        wishTimer.textContent = "Hope you enjoyed Valentine's Week!";
                        wishTimer.style.display = 'none'; // Hide timer when week is complete
                    }


                } else {
                    // While timer is still running, calculate and display remaining time
                    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                    wishTimer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`; // Update timer display
                }
            }, 1000); // Update timer every 1 second
        } else if (todayWishData) {
             // If it's today's wish day but no future wishes (e.g., on or after Valentine's Day)
             displayWish(todayWishData); // Just display today's wish
             countdownTitle.textContent = "Valentine's Week Complete!"; // Update title to week complete message
             wishTimer.style.display = 'none'; // Hide timer as week is complete
        }
         else {
            // If no wish day found at all (should not usually happen in Valentine's week context, but as a fallback)
            countdownTitle.textContent = "Valentine's Week Complete!";
            wishTimer.textContent = "Hope you enjoyed Valentine's Week!";
            wishTimer.style.display = 'none'; // Hide timer when week is complete
        }
    }



    function setActiveProgressStep() {
        // Function to highlight active step in the progress bar based on current date
        const todayDate = new Date().getDate();
        progressSteps.forEach(step => {
            const stepDay = parseInt(step.dataset.day);
            if (todayDate >= stepDay) {
                step.classList.add('active'); // Add 'active' class for styling the step as completed/current
            } else {
                step.classList.remove('active'); // Remove 'active' class for future steps
            }
        });
    }


    musicButton.addEventListener('click', function() {
        // Music button click handler to toggle background music
        if (musicPlaying) {
            backgroundMusic.pause();
            musicButton.innerHTML = '<i class="fas fa-music"></i> Music: Off';
        } else {
            backgroundMusic.play();
            musicButton.innerHTML = '<i class="fas fa-music"></i> Music: On';
        }
        musicPlaying = !musicPlaying; // Toggle music state
    });


    setActiveProgressStep(); // Set initial active step on progress bar
    startTimerForNextWish(); // Start the timer logic to manage wish reveals and countdowns
    backgroundMusic.play(); // Start background music on page load
});