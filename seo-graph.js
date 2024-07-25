// Set up the SVG container
const width = 800;
const height = 600;
const svg = d3.select("#seoGraph")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Define the graph data
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

// Create a force simulation
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id).distance(100))
  .force("charge", d3.forceManyBody().strength(-200))
  .force("center", d3.forceCenter(width / 2, height / 2));

// Define color scale
const color = d3.scaleOrdinal(d3.schemeSet3);

// Create links
const link = svg.append("g")
  .selectAll("line")
  .data(links)
  .enter().append("line")
  .attr("stroke", "#00FFFF")
  .attr("stroke-opacity", 0.6)
  .attr("stroke-width", d => Math.sqrt(d.value));

// Create nodes
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

// Add labels to nodes
const label = svg.append("g")
  .selectAll("text")
  .data(nodes)
  .enter().append("text")
  .text(d => d.id)
  .attr("font-size", 12)
  .attr("dx", 12)
  .attr("dy", 4)
  .attr("fill", "#00FF00");

// Define drag functions
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

// Add tooltips
const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

node.on("mouseover", (event, d) => {
  tooltip.transition()
    .duration(200)
    .style("opacity", .9);
  tooltip.html(d.id)
    .style("left", (event.pageX + 10) + "px")
    .style("top", (event.pageY - 28) + "px");
})
.on("mouseout", () => {
  tooltip.transition()
    .duration(500)
    .style("opacity", 0);
});

// Update positions
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