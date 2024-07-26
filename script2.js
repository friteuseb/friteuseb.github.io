// Chatbot IA
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
    const message = userInput.value;
    if (message.trim() !== '') {
        addMessage('Vous', message);
        // Simulation de réponse du chatbot (à remplacer par une vraie IA)
        setTimeout(() => {
            addMessage('Assistant IA', "Je suis désolé, je suis encore en cours de développement. Je ne peux pas répondre à votre demande pour le moment.");
        }, 1000);
        userInput.value = '';
    }
});

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Timeline interactive
const timelineData = [
    { year: 2023, event: "Led AI integration projects for major clients" },
    { year: 2021, event: "Expanded consulting services to include advanced SEO techniques" },
    { year: 2019, event: "Joined Talan Group as a Strategic Planner and Digital Consultant" },
    { year: 2017, event: "Implemented digital transformation strategies for Fortune 500 companies" },
    { year: 2015, event: "Began specializing in AI-driven marketing solutions" }
];

const timelineContainer = document.getElementById('timeline-container');

function createTimeline() {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    timelineContainer.appendChild(svg);

    const lineY = 200;
    const startX = 50;
    const endX = timelineContainer.clientWidth - 50;
    const intervalX = (endX - startX) / (timelineData.length - 1);

    // Draw main line
    const mainLine = document.createElementNS(svgNS, "line");
    mainLine.setAttribute("x1", startX);
    mainLine.setAttribute("y1", lineY);
    mainLine.setAttribute("x2", endX);
    mainLine.setAttribute("y2", lineY);
    mainLine.setAttribute("stroke", "#00FFFF");
    mainLine.setAttribute("stroke-width", "2");
    svg.appendChild(mainLine);

    timelineData.forEach((item, index) => {
        const x = startX + index * intervalX;
        
        // Create circle for each event
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", lineY);
        circle.setAttribute("r", "8");
        circle.setAttribute("fill", "#00FFFF");
        svg.appendChild(circle);

        // Add year text
        const yearText = document.createElementNS(svgNS, "text");
        yearText.setAttribute("x", x);
        yearText.setAttribute("y", lineY + 30);
        yearText.setAttribute("text-anchor", "middle");
        yearText.setAttribute("fill", "#00FF00");
        yearText.textContent = item.year;
        svg.appendChild(yearText);

        // Add event text
        const eventText = document.createElementNS(svgNS, "text");
        eventText.setAttribute("x", x);
        eventText.setAttribute("y", index % 2 === 0 ? lineY - 20 : lineY + 60);
        eventText.setAttribute("text-anchor", "middle");
        eventText.setAttribute("fill", "#00FF00");
        eventText.textContent = item.event;
        svg.appendChild(eventText);
    });
}

window.addEventListener('load', createTimeline);
window.addEventListener('resize', createTimeline);

// Compétences en 3D
function create3DSkills() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('skills-3d-container').appendChild(renderer.domElement);

    const skills = [
        { name: "AI", level: 0.9 },
        { name: "Digital Strategy", level: 0.95 },
        { name: "Data Analysis", level: 0.85 },
        { name: "SEO", level: 0.8 },
        { name: "Project Management", level: 0.75 }
    ];

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });

    skills.forEach((skill, index) => {
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = (index - 2) * 2;
        cube.scale.y = skill.level * 2;
        scene.add(cube);

        const textGeometry = new THREE.TextGeometry(skill.name, {
            font: new THREE.Font(), // You'll need to load a font
            size: 0.3,
            height: 0.1
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(cube.position.x - 0.5, -1.5, 0);
        scene.add(textMesh);
    });

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        scene.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

window.addEventListener('load', create3DSkills);

// Générateur de proposition de valeur
const valuePropForm = document.getElementById('value-prop-form');
const valuePropResult = document.getElementById('value-prop-result');

valuePropForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const industry = document.getElementById('industry').value;
    const targetAudience = document.getElementById('target-audience').value;
    const uniqueSellingPoint = document.getElementById('unique-selling-point').value;

    const generatedProp = `Pour les ${targetAudience} dans l'industrie ${industry}, notre ${uniqueSellingPoint} offre une solution unique qui transforme votre approche business.`;

    valuePropResult.textContent = generatedProp;
});

// Visualisation de données
function createDataViz() {
    const data = {
        labels: ['AI Projects', 'Digital Strategies', 'SEO Campaigns', 'Client Satisfaction'],
        datasets: [{
            label: 'Performance Metrics',
            data: [85, 90, 78, 95],
            backgroundColor: 'rgba(0, 255, 255, 0.2)',
            borderColor: 'rgba(0, 255, 255, 1)',
            borderWidth: 1
        }]
    };

    const ctx = document.createElement('canvas');
    document.getElementById('data-viz-container').appendChild(ctx);

    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 100,
                    fontColor: '#00FF00'
                },
                gridLines: {
                    color: 'rgba(0, 255, 0, 0.1)'
                }
            },
            legend: {
                labels: {
                    fontColor: '#00FF00'
                }
            }
        }
    });
}

window.addEventListener('load', createDataViz);