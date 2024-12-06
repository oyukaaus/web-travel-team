document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero-section');
    const bgImages = heroSection.getAttribute('data-bg-images').split(',');
    let currentIndex = 0;

    // Apply the first image immediately
    heroSection.style.backgroundImage = `url(${bgImages[currentIndex]})`;

    // Preload all images
    bgImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Change background image periodically
    setInterval(() => {
        currentIndex = (currentIndex + 1) % bgImages.length;
        heroSection.style.backgroundImage = `url(${bgImages[currentIndex]})`;

        // Optional: Add and remove animation class
        heroSection.classList.add('animate-bg');
        setTimeout(() => {
            heroSection.classList.remove('animate-bg');
        }, 500); // Match your CSS animation duration
    }, 5000); // Change every 5 seconds
});
