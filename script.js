document.addEventListener('DOMContentLoaded', (event) => {
    // Code Rain Effect
    function setupCodeRain() {
        const canvas = document.createElement('canvas');
        canvas.id = 'code-rain';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const columns = canvas.width / 20;
        const drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00FF00';
            ctx.font = '15px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(draw, 33);
    }

    // Dark Mode Toggle
    function setupDarkModeToggle() {
        const toggleSwitch = document.getElementById('darkModeToggle');
        const currentTheme = localStorage.getItem('theme');

        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            if (currentTheme === 'dark') {
                toggleSwitch.checked = true;
            }
        }

        function switchTheme(e) {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        }

        toggleSwitch.addEventListener('change', switchTheme, false);
    }

    // Typing Effect
    function typeWriter(text, i, fnCallback) {
        if (i < text.length) {
            document.querySelector(".tagline").innerHTML = text.substring(0, i+1) + '<span aria-hidden="true"></span>';
            setTimeout(function() {
                typeWriter(text, i + 1, fnCallback)
            }, 100);
        } else if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 700);
        }
    }

    // Smooth Scrolling
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

    // Skill Bars Animation
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

    // SEO Chart
    function createSEOChart() {
        const ctx = document.getElementById('seoChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Organic Traffic',
                    data: [1000, 1500, 2000, 2500, 3000, 3500],
                    borderColor: 'rgb(0, 255, 0)',
                    tension: 0.1
                }, {
                    label: 'Keyword Rankings',
                    data: [10, 15, 20, 25, 30, 35],
                    borderColor: 'rgb(0, 255, 255)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgb(0, 255, 0)'
                        }
                    }
                }
            }
        });
    }

    // Timeline Animation
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.5 });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Initialize everything
    setupCodeRain();
    setupDarkModeToggle();
    typeWriter("AI-Powered Digital Transformation Specialist", 0);
    setupSmoothScrolling();
    animateSkillBars();
    createSEOChart();
    animateTimeline();
});