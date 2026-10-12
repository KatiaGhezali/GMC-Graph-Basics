// Define the graph class

class Graph {
  constructor(directed = false) {
    this.adjacencyList = {};
    this.directed = directed;
  }

  // add a vertex
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // Add an edge
  addEdge(vertex1, vertex2) {
    //Create vertices if they don't exist
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    // Add and edge if it doesn't already exist
    if (!this.adjacencyList[vertex1].includes(vertex2)) {
      this.adjacencyList[vertex1].push(vertex2);
    }

    if (!this.directed) {
      if (!this.adjacencyList[vertex2].includes(vertex1)) {
        this.adjacencyList[vertex2].push(vertex1);
      }
    }
  }

  // Remove an edge
  removeEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
      return;
    }
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (vertex) => vertex !== vertex2,
    );

    if (!this.directed) {
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
        (vertex) => vertex !== vertex1,
      );
    }
  }
  hasEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1]) {
      return false;
    }

    return this.adjacencyList[vertex1].includes(vertex2);
  }

  printGraph() {
    for (const vertex in this.adjacencyList) {
      console.log(`${vertex} -> ${this.adjacencyList[vertex].join(", ")}`);
    }
  }

  // Depth First search : DFS
  DFS(startVertex) {
    if (!this.adjacencyList[startVertex]) {
      console.log("Vertex not found.");
      return;
    }

    const visited = new Set();
    const result = [];

    const visit = (vertex) => {
      visited.add(vertex);
      result.push(vertex);

      for (const neighbor of this.adjacencyList[vertex]) {
        if (!visited.has(neighbor)) {
          visit(neighbor);
        }
      }
    };

    visit(startVertex);

    console.log("DFS:", result.join(" -> "));
    return result;
  }

  // Breadth First search : BFS

  BFS(startVertex) {
    if (!this.adjacencyList[startVertex]) {
      console.log("Vertex not found.");
      return;
    }

    const visited = new Set([startVertex]);
    const queue = [startVertex];
    const result = [];

    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);

      for (const neighbor of this.adjacencyList[vertex]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    console.log("BFS:", result.join(" -> "));
    return result;
  }
}

// Tests

// Create an undirected graph

const graph = new Graph(false);

//Add edges
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");

console.log("--- Graph ---");
graph.printGraph();

console.log("\n--- Check Edges ---");
console.log("A-B:", graph.hasEdge("A", "B"));
console.log("B-E:", graph.hasEdge("B", "E"));

console.log("\n--- Traversals ---");
graph.DFS("A");
graph.BFS("A");

console.log("\n--- Remove Edge A-B ---");
graph.removeEdge("A", "B");
graph.printGraph();

console.log("\nA-B:", graph.hasEdge("A", "B"));

// Create a directed graph

console.log("\n--- Directed Graph ---");

const directedGraph = new Graph(true);

directedGraph.addEdge("A", "B");
directedGraph.addEdge("A", "C");
directedGraph.addEdge("B", "D");

directedGraph.printGraph();

directedGraph.DFS("A");
directedGraph.BFS("A");

console.log("A-B:", directedGraph.hasEdge("A", "B"));
console.log("B-A:", directedGraph.hasEdge("B", "A"));

directedGraph.removeEdge("A", "B");
console.log("A-B after removal:", directedGraph.hasEdge("A", "B"));
