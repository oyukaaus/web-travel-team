document.addEventListener('DOMContentLoaded', function() {
    // Array of background images
    const backgroundImages = [
        'assets/back.jpg',
        'assets/huwsgul.jpg',
        'assets/AltaiTavanBogd.jpg',
        'assets/hyrgas.jpg'
    ];

    const backgroundSlider = document.querySelector('.background-slider');
    let currentImageIndex = 0;

    // Create initial slides
    backgroundImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'background-slide' + (index === 0 ? ' active' : '');
        slide.style.backgroundImage = `url(${image})`;
        backgroundSlider.appendChild(slide);
    });

    const slides = document.querySelectorAll('.background-slide');

    // Function to change slide
    function changeSlide() {
        // Remove active class from current slide
        slides[currentImageIndex].classList.remove('active');
        
        // Update index
        currentImageIndex = (currentImageIndex + 1) % slides.length;
        
        // Add active class to new slide
        slides[currentImageIndex].classList.add('active');
    }

    // Set interval to change slides every 3 seconds (3000 milliseconds)
    setInterval(changeSlide, 3000);

    // Optional: Preload images for smoother transitions
    backgroundImages.forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
    });
});