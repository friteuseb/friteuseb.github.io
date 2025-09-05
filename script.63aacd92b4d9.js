document.addEventListener('DOMContentLoaded', () => {
    // Only run typeWriter if tagline exists
    const taglineElement = document.querySelector(".tagline");
    if (taglineElement) {
        typeWriter("AI-Powered Digital Transformation Specialist", 0);
    }
    
    setupSmoothScrolling();
    animateSkillBars();
    animateTimeline();
    setupLazyLoading();
    setupStickyNavigation();
});

/* desactivé pour le moment
function setupServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js').then(function(registration) {
                console.log('ServiceWorker registration successful');
            }, function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
}
*/


function typeWriter(text, i, fnCallback) {
    const taglineElement = document.querySelector(".tagline");
    if (taglineElement && i < text.length) {
        taglineElement.innerHTML = text.substring(0, i+1) + '<span aria-hidden="true"></span>';
        setTimeout(() => typeWriter(text, i + 1, fnCallback), 100);
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
    }
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-level');
            }
        });
    }, { threshold: 0.5 });

    skillLevels.forEach(skillLevel => {
        skillLevel.style.width = 0;
        observer.observe(skillLevel);
    });
}

function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.transitionDelay = `${entry.target.dataset.year - 2000}00ms`;
            } else {
                entry.target.classList.remove('visible');
                entry.target.style.transitionDelay = '0ms';
            }
        });
    }, { threshold: 0.2, rootMargin: "0px 0px -100px 0px" });

    timelineItems.forEach(item => observer.observe(item));
}

function setupLazyLoading() {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
}



document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            console.log('Menu toggled'); // Pour le débogage
        });

        // Fermer le menu lorsqu'un lien est cliqué
        const navLinks = mobileNav.getElementsByTagName('a');
        for (let link of navLinks) {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        }
    } else {
        console.error('Menu toggle or mobile nav not found');
    }
});


const quotes = [
    "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. - Christian D. Larson",
    "The only place where success comes before work is in the dictionary. - Vidal Sassoon",
    "Your time is limited, don’t waste it living someone else’s life. - Steve Jobs",
    "Don’t give up on a dream just because of the time it will take to accomplish it. The time will pass anyway. - Earl Nightingale",
    "Great things never come from comfort zones. - Unknown",
    "It is not the mountain we conquer but ourselves. - Edmund Hillary",
    "The only limits to our achievements of tomorrow are our doubts of today. - Franklin D. Roosevelt",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "Opportunities don't happen, you create them. - Chris Grosser",
    "Believe in your dreams and they may come true; believe in yourself and they will come true. - Martin Luther King Jr.",
    "Don't look back in anger, nor forward in fear, but around in awareness. - James Thurber",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "The greatest pleasure in life is doing what people say you cannot do. - Walter Bagehot",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "You are braver than you believe, stronger than you seem, and smarter than you think. - A. A. Milne",
    "Success is going from failure to failure without losing your enthusiasm. - Winston Churchill",
    "Happiness does not depend on what you have or who you are. It solely relies on what you think. - Buddha"
];

// Generate quote functionality (only if elements exist)
const generateQuoteBtn = document.getElementById('generate-quote');
const inspiringQuote = document.getElementById('inspiring-quote');

if (generateQuoteBtn && inspiringQuote) {
    generateQuoteBtn.addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        inspiringQuote.textContent = quotes[randomIndex];
    });
}

// Sticky Navigation Setup
function setupStickyNavigation() {
    const stickyNav = document.getElementById('sticky-nav');
    const header = document.querySelector('header');
    const stickyMenuToggle = document.getElementById('sticky-menu-toggle');
    const stickyNavLinks = document.querySelector('.sticky-nav-links');
    const stickyNavLinksItems = document.querySelectorAll('.sticky-nav-links a');
    const stickyLogo = document.querySelector('.sticky-logo span');
    
    if (!stickyNav || !header) return;
    
    let headerHeight = header.offsetHeight;
    let lastScrollTop = 0;
    
    // Show/hide sticky nav on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > headerHeight + 100) {
            stickyNav.classList.add('visible');
        } else {
            stickyNav.classList.remove('visible');
            // Close mobile menu when hiding sticky nav
            stickyNavLinks.classList.remove('active');
            stickyMenuToggle.classList.remove('active');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Mobile menu toggle for sticky nav
    if (stickyMenuToggle && stickyNavLinks) {
        stickyMenuToggle.addEventListener('click', () => {
            stickyNavLinks.classList.toggle('active');
            stickyMenuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    stickyNavLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            stickyNavLinks.classList.remove('active');
            stickyMenuToggle.classList.remove('active');
        });
    });
    
    // Scroll to top when clicking on logo
    if (stickyLogo) {
        stickyLogo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            stickyNavLinks.classList.remove('active');
            stickyMenuToggle.classList.remove('active');
        });
    }
    
    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sticky-nav-links a');
    
    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
    
    // Update header height on resize
    window.addEventListener('resize', () => {
        headerHeight = header.offsetHeight;
    });
}

window.onerror = function(message, source, lineno, colno, error) {
    console.error("An error occurred:", message, "at", source, ":", lineno);
    return true;
};