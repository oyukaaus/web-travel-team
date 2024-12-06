// Handle option card selections
document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', function () {
        // Deselect other cards of the same type
        document.querySelectorAll(`.option-card[data-type="${this.getAttribute('data-type')}"]`).forEach(otherCard => {
            otherCard.classList.remove('selected');
        });

        // Select this card
        this.classList.add('selected');

        // Optionally, store the selected card's price in a variable or object
        const type = this.getAttribute('data-type');
        const price = parseInt(this.getAttribute('data-price')) || 0;

        // You can update some global or local state to store this selected option's data
        // selectedOptions[type] = price;
    });
});
