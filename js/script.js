function resetLanguage() {
    localStorage.removeItem('currentLanguage');
}

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
const hackedButton = document.getElementById('translate-hacked');

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
    hackedButton.textContent = translations.click_me || 'Click Me';
    // Add this line to translate the last button
    document.querySelector('.button-container button:last-child').textContent = translations.click_me || 'Click Me';

    // Translate the dashboard
    document.querySelector("#cyber-dashboard h2").textContent = translations.dashboard_title || "Cybersecurity Dashboard";
    document.querySelector("#ip-address-label").textContent = translations.ip_label || "Your IP Address:";
    document.querySelector("#browser-info-label").textContent = translations.browser_label || "Your Browser:";
    document.querySelector("#https-status-label").textContent = translations.https_label || "HTTPS Status:";
    document.querySelector("#https-status").textContent = window.location.protocol === "https:"
        ? translations.https_secure || "Secure (HTTPS)"
        : translations.https_insecure || "Not Secure (HTTP)";
    document.querySelector("#security-tip").textContent = translations.security_tip || "Security Tip: Never trust links from unknown sources!";
}

// Modify the existing theme toggle script to use translations
if (themeToggle) {
    themeToggle.textContent = 'Click Me'; // Default button text

    // Event listener for the toggle button
    themeToggle.addEventListener('click', async () => {
        const currentMode = document.documentElement.getAttribute('data-theme');
        const newMode = currentMode === 'dark' ? 'light' : 'dark';

        // Add the animation class
        themeToggle.classList.add('theme-switching');

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
        
        // Remove the animation class and revert text after .25 seconds
        setTimeout(() => {
            themeToggle.classList.remove('theme-switching');
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

window.addEventListener('pageshow', async () => {
    const savedLanguage = localStorage.getItem('currentLanguage');
    if (!savedLanguage) {
        resetLanguage(); // Reset to default if no language is saved
        return;
    }

    try {
        const response = await fetch(`translations/${savedLanguage}.json`);
        const translations = await response.json();
        replaceContent(translations);
    } catch (error) {
        console.error("Error loading saved translation:", error);
        resetLanguage();
    }
});

// Cybersecurity Dashboard Implementation
document.addEventListener("DOMContentLoaded", () => {
    // Fetch user's IP address
    const ipAddressSpan = document.getElementById("ip-address");
    ipAddressSpan.textContent = "Unavailable in generic mode";

    // Detect user's browser
    const browserInfoSpan = document.getElementById("browser-info");
    browserInfoSpan.textContent = navigator.userAgent;

    // Check HTTPS status
    const httpsStatusSpan = document.getElementById("https-status");
    if (window.location.protocol === "https:") {
        httpsStatusSpan.textContent = "Secure (HTTPS)";
    } else {
        httpsStatusSpan.textContent = "Not Secure (HTTP)";
    }

    // Check if cookies are enabled
    const cookiesEnabledSpan = document.getElementById("cookies-enabled");
    cookiesEnabledSpan.textContent = navigator.cookieEnabled ? 'Enabled' : 'Disabled';
});
