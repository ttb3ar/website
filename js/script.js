document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }

    // Initial theme setup
    const savedTheme = localStorage.getItem('theme') || 'light';
    console.log('Initial theme:', savedTheme);

    // Ensure the data-theme is set on html, not body
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log('Changing theme from', currentTheme, 'to', newTheme);
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
        
        // Force a reflow to ensure styles are applied
        document.documentElement.offsetHeight;
    });
});
