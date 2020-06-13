import GraphData from "./models/GraphData"
import GraphNode from "./models/GraphNode"
import GraphEdge from "./models/GraphEdge"

interface SampleData {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

let graphSampleData: SampleData = {
  nodes: [
    { id: 1, label: "Node 1", type: "repo", title: "node 1 tootip text" },
    { id: 2, label: "Node 2", type: "user", title: "node 2 tootip text" },
    { id: 3, label: "Node 3", type: "repo", title: "node 3 tootip text" },
    { id: 4, label: "Node 4", type: "user", title: "node 4 tootip text" },
    { id: 5, label: "Node 5", type: "user", title: "node 5 tootip text" },
    { id: 6, label: "Node 1", type: "repo", title: "node 1 tootip text" },
    { id: 7, label: "Node 2", type: "user", title: "node 2 tootip text" },
    { id: 8, label: "Node 3", type: "repo", title: "node 3 tootip text" },
    { id: 9, label: "Node 4", type: "user", title: "node 4 tootip text" },
    { id: 10, label: "Node 5", type: "user", title: "node 5 tootip text" },
  ],
  edges: [
    { from: 1, to: 2, type: "friend" },
    { from: 1, to: 3, type: "contributor" },
    { from: 2, to: 4, type: "friend" },
    { from: 2, to: 5, type: "contributor" },
    { from: 1, to: 9, type: "friend" },
    { from: 10, to: 2, type: "contributor" },
    { from: 3, to: 7, type: "friend" },
    { from: 6, to: 5, type: "contributor" },
    { from: 8, to: 1, type: "friend" },
  ],
}

export const getGraphSampleData = () => {
  return new GraphData(graphSampleData.nodes, graphSampleData.edges)
}