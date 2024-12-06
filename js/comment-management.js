const commentForm = document.getElementById('comment-form');
const nameBox = document.getElementById('name-box');
const commentBox = document.getElementById('comment-box');
const commentError = document.getElementById('comment-error');
const reviewsGrid = document.querySelector('.reviews-grid');

// Load comments from localStorage
function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(comment => addCommentToGrid(comment.name, comment.text));
}

// Save comments to localStorage
function saveComment(name, text) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push({ name, text });
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Remove a comment from localStorage
function removeComment(name, text) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const updatedComments = comments.filter(comment => comment.name !== name || comment.text !== text);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
}

// Add a comment to the grid
function addCommentToGrid(name, text) {
    const newReview = document.createElement('div');
    newReview.classList.add('review-card');
    newReview.innerHTML = `
        <p>"${text}"</p>
        <p class="reviewer new">- ${name}</p>
        <button class="remove-btn" style="background-color: orange; color: white; border: none; padding: 0.5rem; cursor: pointer; border-radius: 4px;">Устгах</button>
    `;

    const removeBtn = newReview.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => {
        reviewsGrid.removeChild(newReview);
        removeComment(name, text);
    });

    reviewsGrid.appendChild(newReview);
}

// Handle form submission
commentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameText = nameBox.value.trim();
    const commentText = commentBox.value.trim();

    if (nameText === '' || commentText === '') {
        commentError.style.display = 'block';
    } else {
        commentError.style.display = 'none';
        addCommentToGrid(nameText, commentText);
        saveComment(nameText, commentText);

        nameBox.value = '';
        commentBox.value = '';
    }
});

// Load comments when the page loads
document.addEventListener('DOMContentLoaded', loadComments);
