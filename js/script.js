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
const translateButton = document.getElementById("translate-random");
const firstButton = document.querySelector('.button-container button:first-child');

// Define supported languages
const languages = ["ar", "cn", "en", "fr", "jp", "kr", "ru", "sp"];

// Replace text dynamically
function replaceContent(translations) {
    // Translate page text elements
    document.getElementById("header").innerHTML = translations.header;
    document.getElementById("paragraph").innerHTML = translations.paragraph;
    document.getElementById("about-us").innerHTML = translations.about_us;
    document.getElementById("slideshow").innerHTML = translations.slideshow;

    // Translate all buttons to their local "Click Me"
    firstButton.textContent = translations.click_me || 'Click Me';
    themeToggle.textContent = translations.click_me || 'Click Me';
    translateButton.textContent = translations.click_me || 'Click Me';
}

// Modify the existing theme toggle script to use translations
if (themeToggle) {
    themeToggle.textContent = 'Click Me'; // Default button text

    // Event listener for the toggle button
    themeToggle.addEventListener('click', async () => {
        const currentMode = document.documentElement.getAttribute('data-theme');
        const newMode = currentMode === 'dark' ? 'light' : 'dark';

        // Try to get current translation
        let translations = {};
        try {
            const currentLanguage = localStorage.getItem('currentLanguage') || 'en';
            const response = await fetch(`translations/${currentLanguage}.json`);
            translations = await response.json();
        } catch (error) {
            console.error("Error fetching translations:", error);
        }

        // Change the theme
        document.documentElement.setAttribute('data-theme', newMode);
        localStorage.setItem('theme', newMode);
        console.log('Theme changed to:', newMode);

        // Temporarily show the new mode on the button
        const switchText = translations[`switching_to_${newMode}_mode`] || 
                           `Switching to ${newMode.charAt(0).toUpperCase() + newMode.slice(1)} Mode...`;
        
        themeToggle.textContent = switchText;
        
        // Revert to 'Click Me' after .25 seconds
        setTimeout(() => {
            themeToggle.textContent = translations.click_me || 'Click Me';
        }, 250);
    });
} else {
    console.error('Theme toggle button not found.');
}

// Translation Script
translateButton.addEventListener("click", async () => {
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
    
    // Add translation in progress class
    translateButton.classList.add('translation-in-progress');
    
    try {
        // Fetch the JSON translation file
        const response = await fetch(`translations/${randomLanguage}.json`);
        const translations = await response.json();

        // Save current language for mode switching
        localStorage.setItem('currentLanguage', randomLanguage);

        // Replace page content
        replaceContent(translations);
        console.log(`Translated to: ${randomLanguage}`);

        // Temporarily show translated "Translating..." text
        translateButton.textContent = translations.translating || 'Translating...';

        // Remove translation in progress class after a short delay
        setTimeout(() => {
            translateButton.classList.remove('translation-in-progress');
            translateButton.textContent = translations.click_me || 'Click Me';
        }, 250);
    } catch (error) {
        console.error("Error loading translation:", error);
        
        // Remove translation in progress class and show error
        translateButton.classList.remove('translation-in-progress');
        translateButton.textContent = 'Error';
        
        // Revert to original text after a short delay
        setTimeout(() => {
            translateButton.textContent = 'Click Me';
        }, 1000);
    }
});
