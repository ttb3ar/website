// Dark mode toggle script
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
console.log('System prefers dark mode:', prefersDarkScheme.matches);

// Set the current theme based on localStorage or system preference
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
        if (translateInitialized) return resolve(); // Don't load again
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

// Random Translation
const translateButton = document.getElementById('translate-random');
if (translateButton) {
    translateButton.addEventListener('click', async () => {
        await loadGoogleTranslate(); // Ensure Google Translate is loaded

        const languages = ['en', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'pt', 'ru'];
        const randomLanguage = languages[Math.floor(Math.random() * languages.length)];

        // Wait for the widget to initialize
        setTimeout(() => {
            const translateDropdown = document.querySelector('.goog-te-combo');
            if (translateDropdown) {
                translateDropdown.value = randomLanguage;
                translateDropdown.dispatchEvent(new Event('change')); // Trigger the change event
                console.log(`Translated to: ${randomLanguage}`);
            } else {
                console.error('Google Translate dropdown not found.');
            }
        }, 500); // Give the widget time to initialize
    });
} else {
    console.error('Translate button not found.');
}
