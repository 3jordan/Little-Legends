function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScroll() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach((element) => {
        if (isElementInViewport(element)) {
            element.classList.add('fade-in-active');
        } else {
            element.classList.remove('fade-in-active');
        }
    });
}

window.addEventListener('scroll', handleScroll);

handleScroll();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile-friendly navigation menu
const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar ul');

navToggle.addEventListener('click', () => {
    navbar.classList.toggle('show');
});
