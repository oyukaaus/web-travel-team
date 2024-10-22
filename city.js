// Add toggle event to buttons
document.querySelectorAll('.itinerary-button').forEach(button => {
    button.addEventListener('click', function() {
        // Get the target content section
        const target = document.querySelector(this.dataset.target);
        
        // Toggle visibility
        target.classList.toggle('show');
    });
});
