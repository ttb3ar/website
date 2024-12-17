// Dark mode toggle script
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
console.log('System prefers dark mode:', prefersDarkScheme.matches);

// Set the current theme based on localStorage or system preference
const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
console.log('Current theme:', currentTheme);

// Set the initial theme
document.documentElement.setAttribute('data-theme', currentTheme);

// Get the theme toggle button
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.textContent = 'Click Me'; // Default button text

    // Event listener for the toggle button
    themeToggle.addEventListener('click', () => {
        const currentMode = document.documentElement.getAttribute('data-theme');
        const newMode = currentMode === 'dark' ? 'light' : 'dark';

        // Change the theme
        document.documentElement.setAttribute('data-theme', newMode);
        localStorage.setItem('theme', newMode);
        console.log('Theme changed to:', newMode);

        // Temporarily show the new mode on the button
        themeToggle.textContent = `Switching to ${newMode.charAt(0).toUpperCase() + newMode.slice(1)} Mode...`;
        
        // Revert to 'Click Me' after .25 seconds
        setTimeout(() => {
            themeToggle.textContent = 'Click Me';
        }, 250);
    });
} else {
    console.error('Theme toggle button not found.');
}

// Function to replace content dynamically
function replaceContent(translations) {
    document.getElementById("header").innerHTML = translations.header;
    document.getElementById("paragraph").innerHTML = translations.paragraph;
    document.getElementById("about-us").innerHTML = translations.about_us;
    document.getElementById("slideshow").innerHTML = translations.slideshow;
}

// Event listener for the translate button
const translateButton = document.getElementById("translate-random");
translateButton.addEventListener("click", async () => {
    // Fade out the content before replacing text
    const mainContent = document.querySelector("main");
    mainContent.classList.add("fade-out");
    
    const randomLanguage = ["en", "fr", "es", "ja"][Math.floor(Math.random() * 4)];

    try {
        // Fetch the translation
        const response = await fetch(`translations/${randomLanguage}.json`);
        const translations = await response.json();

        // Wait for the fade-out to complete before updating content
        setTimeout(() => {
            replaceContent(translations);

            // Fade in the content
            mainContent.classList.remove("fade-out");
            mainContent.classList.add("fade-in");

            console.log(`Translated to: ${randomLanguage}`);
        }, 300); // 300ms to match fade-out duration
    } catch (error) {
        console.error("Error loading translation:", error);
    }
});
