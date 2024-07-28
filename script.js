document.addEventListener('DOMContentLoaded', () => {
    setupCodeRain();
    typeWriter("AI-Powered Digital Transformation Specialist", 0);
    setupSmoothScrolling();
    animateSkillBars();
    createSEOGraph();
    animateTimeline();
    setupLazyLoading();
    setupServiceWorker();
    setupFloatingContactButton();
});

function setupCodeRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'code-rain';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 15;
    const columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00FF00';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    function animate() {
        draw();
        requestAnimationFrame(animate);
    }

    animate();
}

function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        document.querySelector(".tagline").innerHTML = text.substring(0, i+1) + '<span aria-hidden="true"></span>';
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

function setupFloatingContactButton() {
    const contactButton = document.createElement('button');
    contactButton.innerHTML = 'Contact';
    contactButton.id = 'floating-contact';
    contactButton.onclick = openContactForm;
    document.body.appendChild(contactButton);
}

function openContactForm() {
    // Code pour ouvrir le formulaire de contact
    console.log("Ouverture du formulaire de contact");
    // Ici, vous pouvez ajouter le code pour afficher votre formulaire de contact
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



window.onerror = function(message, source, lineno, colno, error) {
    console.error("An error occurred:", message, "at", source, ":", lineno);
    return true;
};