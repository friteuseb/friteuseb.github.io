function createSEOGraph() {
  const container = d3.select("#seoGraph");
  container.selectAll("*").remove(); // Nettoie le contenu existant

  const containerWidth = container.node().getBoundingClientRect().width;
  const width = Math.min(containerWidth, 800); // Limite la largeur maximale à 800px
  const height = Math.min(width * 0.75, 600); // Ajuste la hauteur proportionnellement, max 600px

  const svg = container.append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  // Définition des données des nœuds et des liens 
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


  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(width * 0.1))
    .force("charge", d3.forceManyBody().strength(-width * 0.25))
    .force("center", d3.forceCenter(width / 2, height / 2));

  const color = d3.scaleOrdinal(d3.schemeSet3);

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
    .attr("r", width * 0.015)
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
    .attr("font-size", `${width * 0.02}px`)
    .attr("dx", width * 0.02)
    .attr("dy", width * 0.005)
    .attr("fill", "#00FF00");

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

  // Ajout d'un gestionnaire de redimensionnement
  window.addEventListener('resize', () => {
    createSEOGraph(); // Recrée le graphique lors du redimensionnement
  });
}

// Appeler la fonction une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', createSEOGraph);