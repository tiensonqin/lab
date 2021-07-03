const colors = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf"
];

window.addEventListener("DOMContentLoaded", async () => {
  const n = 4000;
  console.time("start");
  var nodes = [];
  var edges = [];
  for (var i = 0; i < n; ++i) {
    nodes.push({ id: i.toString(), label: i.toString() });
  }
  for (var j = 0; j < n; j = j + 2) {
    if (j + 5 < n) {
      edges.push({
        source: j.toString(),
        target: (j + 1).toString(),
        value: 3
      });
      edges.push({
        source: j.toString(),
        target: (j + 2).toString(),
        value: 3
      });
      edges.push({
        source: j.toString(),
        target: (j + 3).toString(),
        value: 3
      });
      edges.push({
        source: j.toString(),
        target: (j + 4).toString(),
        value: 3
      });
      edges.push({
        source: j.toString(),
        target: (j + 5).toString(),
        value: 3
      });
    }
  }

  console.dir(edges);
  const graph = new graphology.Graph();

  const style = {
    node: {
      size: 15,
      color: "#666",
      border: {
        width: 2,
        color: "#ffffff"
      },
      label: {
        content: (node) => node.id,
        type: PixiGraph.TextType.TEXT,
        fontSize: 12,
        color: "#333333",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        padding: 4
      }
    },
    edge: {
      width: 1,
      color: "#cccccc"
    }
  };
  const hoverStyle = {
    node: {
      border: {
        color: "#000000"
      },
      label: {
        backgroundColor: "rgba(238, 238, 238, 1)"
      }
    },
    edge: {
      color: "#999999"
    }
  };

  nodes.forEach((node) => {
    graph.addNode(node.id, node);
  });
  edges.forEach((link) => {
    graph.addEdge(link.source, link.target, link);
  });

  // populate Graphology graph with data
  // assign layout positions as `x`, `y` node attributes

  graph.forEachNode((node) => {
    graph.setNodeAttribute(node, "x", Math.random());
    graph.setNodeAttribute(node, "y", Math.random());
  });

  forceAtlas2.assign(graph, {
    iterations: 30,
    settings: { ...forceAtlas2.inferSettings(graph), scalingRatio: 80 }
  });

  console.timeEnd("start");

  const pixiGraph = new PixiGraph.PixiGraph({
    container: document.getElementById("main"),
    graph,
    style,
    hoverStyle
  });
});
