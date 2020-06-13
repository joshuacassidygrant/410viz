import GraphEdge from "./GraphEdge"
import GraphNode from "./GraphNode"

export default class GraphData {
  public nodes: GraphNode[]
  public edges: GraphEdge[]

  constructor(nodes: GraphNode[], edges: GraphEdge[]) {
    this.nodes = nodes
    this.edges = edges
  }
}
