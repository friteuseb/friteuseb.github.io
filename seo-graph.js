// Set up the SVG container
const width = 600;
const height = 400;
const svg = d3.select("#seoGraph")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Define the graph data
const nodes = [
  { id: "Home", group: 1 },
  { id: "Services", group: 2 },
  { id: "SEO", group: 3 },
  { id: "Content", group: 3 },
  { id: "Analytics", group: 3 },
  { id: "Case Studies", group: 2 },
  { id: "Blog", group: 4 },
  { id: "Contact", group: 5 }
];

const links = [
  { source: "Home", target: "Services", value: 1 },
  { source: "Home", target: "Case Studies", value: 1 },
  { source: "Home", target: "Blog", value: 1 },
  { source: "Services", target: "SEO", value: 2 },
  { source: "Services", target: "Content", value: 2 },
  { source: "Services", target: "Analytics", value: 2 },
  { source: "SEO", target: "Content", value: 3 },
  { source: "SEO", target: "Analytics", value: 3 },
  { source: "Content", target: "Analytics", value: 3 },
  { source: "Case Studies", target: "SEO", value: 2 },
  { source: "Case Studies", target: "Content", value: 2 },
  { source: "Blog", target: "SEO", value: 2 },
  { source: "Blog", target: "Content", value: 2 },
  { source: "Home", target: "Contact", value: 1 }
];

// Create a force simulation
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id))
  .force("charge", d3.forceManyBody().strength(-100))
  .force("center", d3.forceCenter(width / 2, height / 2));

// Define color scale
const color = d3.scaleOrdinal(d3.schemeSet2);

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
  .attr("r", 8)
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
  .attr("font-size", 10)
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