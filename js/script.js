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

// Google Translate Random Language Button
const translateButton = document.getElementById('translate-random');
if (translateButton) {
    translateButton.addEventListener('click', () => {
        const languages = ['en', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'pt', 'ru'];
        const randomLanguage = languages[Math.floor(Math.random() * languages.length)];

        // Dynamically load the Google Translate script
        const googleTranslateScript = document.createElement('script');
        googleTranslateScript.src = `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
        document.body.appendChild(googleTranslateScript);

        // Google Translate initialization function
        window.googleTranslateElementInit = function() {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: languages.join(','),
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');

            // Translate the page to the selected random language
            setTimeout(() => {
                const translateElement = document.querySelector('.goog-te-combo');
                if (translateElement) {
                    translateElement.value = randomLanguage;
                    translateElement.dispatchEvent(new Event('change')); // Trigger the change event to perform translation
                }
            }, 200);
        };
    });
} else {
    console.error('Translate button not found.');
}
