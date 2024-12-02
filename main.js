document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('hero-section');
    const bgImages = heroSection.getAttribute('data-bg-images').split(',');
    let currentIndex = 0;

    // Эхний зургийг шууд тохируулах
    heroSection.style.backgroundImage = `url(${bgImages[currentIndex]})`;

    // Зурагнуудыг урьдчилан ачаалах
    bgImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Зурагнуудыг тогтмол хугацаанд солих
    setInterval(() => {
        currentIndex = (currentIndex + 1) % bgImages.length;
        heroSection.style.backgroundImage = `url(${bgImages[currentIndex]})`;

        // Animation нэмэх, устгах
        heroSection.classList.add('animate-bg');
        setTimeout(() => {
            heroSection.classList.remove('animate-bg');
        }, 500); // CSS анимацын хугацааг тохируул
    }, 5000); // 5 секундын хугацаатайгаар солих
});