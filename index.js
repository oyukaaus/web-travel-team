document.addEventListener('DOMContentLoaded', function() {
    // Background slider images
    const backgroundImages = [
        'assets/back.jpg',
        'assets/huwsgul.jpg',
        'assets/AltaiTavanBogd.jpg',
        'assets/hyrgas.jpg'
    ];

    const backgroundSlider = document.querySelector('.background-slider');
    let currentImageIndex = 0;

    // Create background slides
    backgroundImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'background-slide' + (index === 0 ? ' active' : '');
        slide.style.backgroundImage = `url(${image})`;
        backgroundSlider.appendChild(slide);
    });

    const slides = document.querySelectorAll('.background-slide');

    // Background slide change function
    function changeSlide() {
        slides[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % slides.length;
        slides[currentImageIndex].classList.add('active');
    }

    // Change slide every 4 seconds
    setInterval(changeSlide, 4000);

    // Optional: Preload images
    backgroundImages.forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
    });

    // Responsive menu toggle