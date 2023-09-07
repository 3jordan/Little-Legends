document.addEventListener('DOMContentLoaded', function () {
    const faqQuestions = document.querySelectorAll('.faq-question');

    function toggleFaqAnswer(event) {
        const answer = event.currentTarget.nextElementSibling; // Get the next sibling (the answer)
        if (answer) {
            answer.classList.toggle('show-answer');
        }
    }

    faqQuestions.forEach(function (faqQuestion) {
        faqQuestion.addEventListener('click', toggleFaqAnswer);
    });
});


// JavaScript for the slideshow (if you still want to include it)
const slider = document.querySelector('.slider');
const slidesContainer = document.querySelector('.slides-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }
    showSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    }
    showSlide(currentIndex);
});

// Initial setup
showSlide(currentIndex);
