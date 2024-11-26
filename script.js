function initCarousel() {
    const container = document.querySelector('.carousel-container');
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentIndex = 0;
    let startX = 0;
    let currentTranslate = 0;
    let isDragging = false;

    // Clone first slide and append to end for smooth infinite loop
    const firstSlideClone = slides[0].cloneNode(true);
    track.appendChild(firstSlideClone);

    // Create dot indicators
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    function slideNext() {
        currentIndex++;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        track.style.transition = 'transform 0.5s ease-in-out';

        if (currentIndex === slides.length) {
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = 0;
                track.style.transform = `translateX(0)`;
                updateDots();
            }, 500);
        }
        updateDots();
    }

    function slidePrev() {
        if (currentIndex === 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex--;
        }
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    // Touch events
    function handleTouchStart(e) {
        isDragging = true;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        currentTranslate = -currentIndex * 100;
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const diff = (currentX - startX) / container.offsetWidth * 100;
        track.style.transform = `translateX(${currentTranslate + diff}%)`;
    }

    function handleTouchEnd() {
        if (!isDragging) return;
        isDragging = false;
        const threshold = 20; // percentage of slide width
        const diff = (currentTranslate + parseFloat(track.style.transform.slice(11))) / 100;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                slidePrev();
            } else {
                slideNext();
            }
        } else {
            goToSlide(currentIndex);
        }
    }

    // Event Listeners
    prevButton.addEventListener('click', slidePrev);
    nextButton.addEventListener('click', slideNext);

    // Touch and mouse events
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('mousedown', handleTouchStart);
    container.addEventListener('mousemove', handleTouchMove);
    container.addEventListener('mouseup', handleTouchEnd);
    container.addEventListener('mouseleave', handleTouchEnd);

    // Auto slide every 5 seconds
    const autoSlideInterval = setInterval(slideNext, 5000);

    // Pause auto-slide when hovering
    container.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    container.addEventListener('mouseleave', () => setInterval(slideNext, 5000));
}

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', initCarousel);