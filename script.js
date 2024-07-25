document.addEventListener('DOMContentLoaded', (event) => {
    // Code Rain Effect
    function setupCodeRain() {
        try {
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
        } catch (error) {
            console.error("Error setting up code rain:", error);
        }
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
   // Fonction pour créer le graphique SEO
function createSEOGraph() {
    const graphContainer = document.getElementById('seoGraph');
    if (!graphContainer) {
        console.warn("SEO Graph container not found. Skipping graph creation.");
        return;
    }

    // Définition des dimensions du graphique
    const width = graphContainer.clientWidth;
    const height = 600;

    // Création du SVG
    const svg = d3.select("#seoGraph")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Définition des données du graphique (comme dans votre fichier original)
    const nodes = [
        { id: "Site Web", group: 1 },
        { id: "Page d'accueil", group: 2 },
        { id: "Services", group: 2 },
        { id: "Blog", group: 2 },
        { id: "Contact", group: 2 },
        { id: "SEO", group: 3 },
        { id: "Cocon Sémantique", group: 3 },
        { id: "Mots-clés", group: 3 },
        { id: "Backlinks", group: 3 },
        { id: "Contenu", group: 4 },
        { id: "Structure", group: 4 },
        { id: "Optimisation On-page", group: 4 },
        { id: "Optimisation Technique", group: 4 },
        { id: "Analyse", group: 5 },
        { id: "Stratégie", group: 5 }
    ];

    const links = [
        { source: "Site Web", target: "Page d'accueil", value: 1 },
        { source: "Site Web", target: "Services", value: 1 },
        { source: "Site Web", target: "Blog", value: 1 },
        { source: "Site Web", target: "Contact", value: 1 },
        { source: "SEO", target: "Cocon Sémantique", value: 2 },
        { source: "SEO", target: "Mots-clés", value: 2 },
        { source: "SEO", target: "Backlinks", value: 2 },
        { source: "SEO", target: "Contenu", value: 2 },
        { source: "SEO", target: "Structure", value: 2 },
        { source: "SEO", target: "Optimisation On-page", value: 2 },
        { source: "SEO", target: "Optimisation Technique", value: 2 },
        { source: "SEO", target: "Analyse", value: 2 },
        { source: "SEO", target: "Stratégie", value: 2 },
        { source: "Cocon Sémantique", target: "Structure", value: 3 },
        { source: "Cocon Sémantique", target: "Contenu", value: 3 },
        { source: "Mots-clés", target: "Contenu", value: 3 },
        { source: "Mots-clés", target: "Optimisation On-page", value: 3 },
        { source: "Backlinks", target: "Stratégie", value: 3 },
        { source: "Contenu", target: "Optimisation On-page", value: 3 },
        { source: "Structure", target: "Optimisation Technique", value: 3 },
        { source: "Analyse", target: "Stratégie", value: 3 }
    ];

    // Créer une simulation de force
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(width / 2, height / 2));

    // Définir l'échelle de couleur
    const color = d3.scaleOrdinal(d3.schemeSet3);

    // Créer les liens
    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke", "#00FFFF")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", d => Math.sqrt(d.value));

    // Créer les nœuds
    const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", 10)
        .attr("fill", d => color(d.group))
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // Ajouter des étiquettes aux nœuds
    const label = svg.append("g")
        .selectAll("text")
        .data(nodes)
        .enter().append("text")
        .text(d => d.id)
        .attr("font-size", 12)
        .attr("dx", 12)
        .attr("dy", 4)
        .attr("fill", "#00FF00");

    // Définir les fonctions de glissement
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

    // Mettre à jour les positions
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
}

// Assurez-vous que le DOM est chargé avant d'appeler la fonction
document.addEventListener('DOMContentLoaded', () => {
    createSEOGraph();
});

    // Timeline Animation
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (timelineItems.length === 0) {
            console.warn("No timeline items found");
            return;
        }
        
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

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Initialize everything
    setupCodeRain();
    typeWriter("AI-Powered Digital Transformation Specialist", 0);
    setupSmoothScrolling();
    animateSkillBars();
    createSEOGraph(); // Remplacé createSEOChart par createSEOGraph
    animateTimeline();
});

window.onerror = function(message, source, lineno, colno, error) {
    console.error("An error occurred:", message, "at", source, ":", lineno);
    return true;
};