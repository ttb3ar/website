// Dark Mode Toggle Script
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

const themeToggle = document.getElementById('theme-toggle');
themeToggle.textContent = currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode';

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';

    // Temporary text change for a few seconds
    themeToggle.textContent = theme === 'dark' ? 'Switching to Dark Mode...' : 'Switching to Light Mode...';
    setTimeout(() => themeToggle.textContent = 'Click Me', 2000);
});

// Random Language Button Script
const languages = ['es', 'fr', 'de', 'ja', 'zh', 'it', 'ar', 'ru', 'pt', 'nl']; // Language codes
const randomLangButton = document.getElementById('random-lang-button');

randomLangButton.addEventListener('click', () => {
    const randomLang = languages[Math.floor(Math.random() * languages.length)]; // Randomly pick a language
    const googleFrame = document.querySelector('.goog-te-combo'); // Google Translate dropdown

    if (googleFrame) {
        googleFrame.value = randomLang; // Set dropdown to the random language
        googleFrame.dispatchEvent(new Event('change')); // Simulate user action
    }
});
