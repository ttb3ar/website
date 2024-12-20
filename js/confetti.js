// Confetti particle creator
function createConfettiParticle() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const confetti = document.createElement('div');
    
    // Random starting position across the top of the screen
    const startX = Math.random() * window.innerWidth;
    
    confetti.style.position = 'fixed';
    confetti.style.left = startX + 'px';
    confetti.style.top = '-5px';  // Start just above the viewport
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.pointerEvents = 'none';
    confetti.style.borderRadius = '50%';
    confetti.style.zIndex = '9999';
    
    document.body.appendChild(confetti);

    // Random horizontal velocity (swaying)
    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 3;
    const vx = Math.cos(angle) * velocity;
    const vy = 5 + Math.random() * 3; // Falling speed

    // Add rotation
    let rotation = 0;
    const rotationSpeed = Math.random() * 10 - 5;

    setTimeout(() => {
        if (document.body.contains(confetti)) {
            document.body.removeChild(confetti);
        }
    }, 2000);

    requestAnimationFrame(function animate() {
        const currentLeft = parseFloat(confetti.style.left);
        const currentTop = parseFloat(confetti.style.top);
        
        confetti.style.left = (currentLeft + vx) + 'px';
        confetti.style.top = (currentTop + vy) + 'px';
        
        // Add rotation animation
        rotation += rotationSpeed;
        confetti.style.transform = `rotate(${rotation}deg)`;

        if (document.body.contains(confetti) && currentTop < window.innerHeight) {
            requestAnimationFrame(animate);
        }
    });
}

// Create continuous confetti
function startConfetti() {
    // Create initial burst
    for(let i = 0; i < 50; i++) {
        setTimeout(() => createConfettiParticle(), Math.random() * 500);
    }
    
    // Continue creating confetti
    const interval = setInterval(() => {
        createConfettiParticle();
    }, 50);

    // Stop after 2 seconds
    setTimeout(() => clearInterval(interval), 2000);
}

// Start confetti when page loads
window.addEventListener('load', startConfetti);
