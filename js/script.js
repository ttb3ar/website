// Theme Toggle Script
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

// Set the initial theme
document.documentElement.setAttribute('data-theme', currentTheme);

// Update the button text based on the theme
themeToggle.textContent = currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode';

// Add event listener for toggle button
themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme); // Save theme preference
    themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
});
