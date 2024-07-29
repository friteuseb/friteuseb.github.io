// Fonction de debounce pour optimiser le redimensionnement
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
      const later = () => {
          clearTimeout(timeout);
          func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
  };
}

function createSEOGraph() {
  const container = d3.select("#seoGraph");
  if (!container.node()) return;

  // Réserver l'espace avant le chargement
  const containerWidth = container.node().getBoundingClientRect().width;
  const width = Math.min(containerWidth, 800);
  const height = Math.min(width * 0.75, 600);

  container.style("width", `${width}px`)
           .style("height", `${height}px`);

  // Vérifier si D3.js est chargé
  if (typeof d3 === 'undefined') {
      console.warn("D3.js n'est pas encore chargé. Le graphique sera créé une fois D3.js chargé.");
      return;
  }

  // Nettoyer le contenu existant
  container.selectAll("*").remove();

  const svg = container.append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

  // Définition des données des nœuds et des liens pour un cocon sémantique
  const nodes = [
      { id: "Cocon Sémantique", group: 1 },
      { id: "Page Principale", group: 2 },
      { id: "Sous-thème 1", group: 3 },
      { id: "Sous-thème 2", group: 3 },
      { id: "Sous-thème 3", group: 3 },
      { id: "Article 1.1", group: 4 },
      { id: "Article 1.2", group: 4 },
      { id: "Article 2.1", group: 4 },
      { id: "Article 2.2", group: 4 },
      { id: "Article 3.1", group: 4 },
      { id: "Article 3.2", group: 4 },
      { id: "Mot-clé 1", group: 5 },
      { id: "Mot-clé 2", group: 5 },
      { id: "Mot-clé 3", group: 5 },
      { id: "Lien Interne", group: 6 },
      { id: "Balise Title", group: 6 },
      { id: "Meta Description", group: 6 }
  ];

  const links = [
      { source: "Cocon Sémantique", target: "Page Principale", value: 1 },
      { source: "Page Principale", target: "Sous-thème 1", value: 2 },
      { source: "Page Principale", target: "Sous-thème 2", value: 2 },
      { source: "Page Principale", target: "Sous-thème 3", value: 2 },
      { source: "Sous-thème 1", target: "Article 1.1", value: 3 },
      { source: "Sous-thème 1", target: "Article 1.2", value: 3 },
      { source: "Sous-thème 2", target: "Article 2.1", value: 3 },
      { source: "Sous-thème 2", target: "Article 2.2", value: 3 },
      { source: "Sous-thème 3", target: "Article 3.1", value: 3 },
      { source: "Sous-thème 3", target: "Article 3.2", value: 3 },
      { source: "Article 1.1", target: "Mot-clé 1", value: 4 },
      { source: "Article 2.1", target: "Mot-clé 2", value: 4 },
      { source: "Article 3.1", target: "Mot-clé 3", value: 4 },
      { source: "Page Principale", target: "Lien Interne", value: 5 },
      { source: "Page Principale", target: "Balise Title", value: 5 },
      { source: "Page Principale", target: "Meta Description", value: 5 }
  ];

  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(d => (6 - d.value) * 20))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(30));

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#00FFFF")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", d => Math.sqrt(d.value));

  const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", d => 5 + (6 - d.group) * 3)
      .attr("fill", d => color(d.group))
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  const label = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
      .text(d => d.id)
      .attr("font-size", d => `${10 + (6 - d.group)}px`)
      .attr("dx", 12)
      .attr("dy", 4)
      .attr("fill", "#00FF00");

  function ticked() {
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
  }

  simulation.on("tick", ticked);

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

  // Permettre à la simulation de s'exécuter pendant un certain temps
  simulation.alpha(1).restart();

  // Arrêter la simulation après un délai
  setTimeout(() => {
      simulation.stop();
      console.log("Simulation stopped");
  }, 8000); // 8 secondes, ajustez si nécessaire
}

// Gestionnaire de redimensionnement optimisé
const debouncedCreateSEOGraph = debounce(createSEOGraph, 250);
window.addEventListener('resize', debouncedCreateSEOGraph);

// Initialisation
function initSEOGraph() {
  if (typeof d3 !== 'undefined') {
      createSEOGraph();
  } else {
      document.addEventListener('DOMContentLoaded', () => {
          if (typeof d3 !== 'undefined') {
              createSEOGraph();
          } else {
              console.error("D3.js n'a pas pu être chargé. Vérifiez l'inclusion du script.");
          }
      });
  }
}

initSEOGraph();