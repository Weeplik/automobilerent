const thumbnails = document.querySelectorAll('.thumbnail');
const reviewsList = document.getElementById('reviewsList');
const reviewForm = document.getElementById('reviewForm');
const storageKey = 'carDetailReviews';

const defaultReviews = [
    {
        name: 'Иван Петров',
        date: '15 июня 2026',
        rating: 5,
        text: 'Отличный автомобиль! Очень комфортный салон, плавная коробка передач. Машина в идеальном состоянии. Компания предоставила автомобиль вовремя и без проблем. Спасибо большое за сервис!'
    },
    {
        name: 'Анна Смирнова',
        date: '14 июня 2026',
        rating: 4,
        text: 'Хороший выбор для путешествия по России. Расходует топливо немного больше, чем ожидалось, но в целом остались довольны. Машина едет хорошо, кондиционер работает отлично. Рекомендую!'
    }
];

function renderReview(review) {
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review';
    reviewItem.innerHTML = `
        <div class="review-header">
            <div>
                <div class="review-name">${review.name}</div>
                <div class="review-date">${review.date}</div>
            </div>
            <div class="review-rating">${'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</div>
        </div>
        <p class="review-text">${review.text}</p>
    `;
    reviewsList.appendChild(reviewItem);
}

function getSavedReviews() {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return defaultReviews;
    try {
        return JSON.parse(saved);
    } catch (e) {
        return defaultReviews;
    }
}

function saveReviews(reviews) {
    localStorage.setItem(storageKey, JSON.stringify(reviews));
}

function loadReviews() {
    reviewsList.innerHTML = '';
    getSavedReviews().forEach(renderReview);
}

const imageOverlay = document.getElementById('imageOverlay');
const overlayImage = document.getElementById('overlayImage');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        const largeSrc = thumbnail.dataset.large;
        if (largeSrc) {
            overlayImage.src = largeSrc;
            imageOverlay.style.display = 'flex';
        }
    });
});

imageOverlay?.addEventListener('click', () => {
    imageOverlay.style.display = 'none';
    overlayImage.src = '';
});

reviewForm?.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('reviewName').value.trim();
    const text = document.getElementById('reviewText').value.trim();
    const rating = parseInt(document.getElementById('reviewRating').value, 10);
    if (!name || !text || !rating) return;

    const reviews = getSavedReviews();
    const date = new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
    const newReview = { name, date, rating, text };
    reviews.unshift(newReview);
    saveReviews(reviews);
    renderReview(newReview);
    reviewForm.reset();
});

loadReviews();
