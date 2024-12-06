const cardsContainer = document.querySelector('.day-cards');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

nextBtn.addEventListener('click', () => {
    cardsContainer.scrollBy({ left: 300, behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
    cardsContainer.scrollBy({ left: -300, behavior: 'smooth' });
});
