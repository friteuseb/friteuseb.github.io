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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const columns = canvas.width / 20;
    const drops = Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00FF00';
        ctx.font = '15px monospace';

        drops.forEach((drop, i) => {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * 20, drop * 20);

            if (drop * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        });
    }

    setInterval(draw, 33);
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

function createSEOGraph() {
    const graphContainer = document.getElementById('seoGraph');
    if (!graphContainer) return;

    const width = graphContainer.clientWidth;
    const height = 400;

    const svg = d3.select("#seoGraph")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const nodes = [
        { id: "Cocon Sémantique", group: 1 },
        { id: "Page Principale", group: 2 },
        { id: "Sous-page 1", group: 3 },
        { id: "Sous-page 2", group: 3 },
        { id: "Sous-page 3", group: 3 }
    ];

    const links = [
        { source: "Cocon Sémantique", target: "Page Principale" },
        { source: "Page Principale", target: "Sous-page 1" },
        { source: "Page Principale", target: "Sous-page 2" },
        { source: "Page Principale", target: "Sous-page 3" }
    ];

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke", "#00FFFF")
        .attr("stroke-opacity", 0.6);

    const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", d => d.group === 1 ? 15 : 10)
        .attr("fill", d => d.group === 1 ? "#00FF00" : "#00FFFF")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    const label = svg.append("g")
        .selectAll("text")
        .data(nodes)
        .enter().append("text")
        .text(d => d.id)
        .attr("font-size", 10)
        .attr("dx", 12)
        .attr("dy", 4)
        .attr("fill", "#00FF00");

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        label
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });

    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }
}

function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.transitionDelay = `${entry.target.dataset.year - 2015}00ms`;
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

window.onerror = function(message, source, lineno, colno, error) {
    console.error("An error occurred:", message, "at", source, ":", lineno);
    return true;
};