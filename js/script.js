// Dark mode toggle script
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.textContent = 'Click Me';
    themeToggle.addEventListener('click', () => {
        const currentMode = document.documentElement.getAttribute('data-theme');
        const newMode = currentMode === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newMode);
        localStorage.setItem('theme', newMode);
        themeToggle.textContent = `Switching to ${newMode} Mode...`;
        setTimeout(() => themeToggle.textContent = 'Click Me', 250);
    });
}

// Google Translate Script Loader
let translateInitialized = false;

function loadGoogleTranslate() {
    return new Promise((resolve) => {
        if (translateInitialized) return resolve(); // Avoid reloading
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);

        window.googleTranslateElementInit = function () {
            new google.translate.TranslateElement(
                { pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
                'google_translate_element'
            );
            translateInitialized = true;
            resolve();
        };
    });
}

// Wait for dropdown to appear
function waitForTranslateDropdown() {
    return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
            const translateDropdown = document.querySelector('.goog-te-combo');
            if (translateDropdown) {
                clearInterval(checkInterval);
                resolve(translateDropdown);
            }
        }, 100); // Check every 100ms
        setTimeout(() => {
            clearInterval(checkInterval);
            console.error('Google Translate dropdown not found after timeout.');
        }, 5000); // Timeout after 5 seconds
    });
}

// Random Translation
const translateButton = document.getElementById('translate-random');
if (translateButton) {
    translateButton.addEventListener('click', async () => {
        await loadGoogleTranslate(); // Ensure Google Translate is loaded
        const dropdown = await waitForTranslateDropdown(); // Wait for dropdown

        if (dropdown) {
            const languages = ['en', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'pt', 'ru'];
            const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
            dropdown.value = randomLanguage;
            dropdown.dispatchEvent(new Event('change')); // Trigger translation
            console.log(`Translated to: ${randomLanguage}`);
        }
    });
} else {
    console.error('Translate button not found.');
}
