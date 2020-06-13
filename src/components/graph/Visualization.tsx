import React from "react"
import Graph from "react-graph-vis"
import "./graph.css"
import GraphData from "../../models/GraphData"
import GraphNode from "../../models/GraphNode"
import GraphEdge from "../../models/GraphEdge"

const options = {
  layout: {
    hierarchical: true,
  },
  nodes: {
    shape: "hexagon",
    color: {
      border: "#ff4444",
      background: "#eeeeee",
    },
    borderWidth: 2,
  },
  edges: {
    color: "#ff4444",
    width: 2,
  },
  height: "500px",
}

const events = {
  select: function (event: any) {
    var { nodes, edges } = event
  },
}

const nodeClassesToProps = {
  repo: {
    shape: "hexagon",
    color: {
      border: "#ff4444",
      background: "#eeeeee",
    },
    mass: 50,
    size: 50,
    borderWidth: 2,
  },
  user: {
    shape: "circle",
    color: {
      border: "#ff4444",
      background: "#eeeeee",
    },
    borderWidth: 2,
  },
}

const edgeClassesToProps = {
  friend: {
    color: "#ff4444",
    width: 2,
  },
  contributor: {
    color: "#BBBBBB",
    width: 2,
  },
}

interface VisualizationProps {}

interface VisualizationState {
  graph: GraphData
  network: any
}

export default class Visualization extends React.Component<
  VisualizationProps,
  VisualizationState
> {
  constructor(props: VisualizationProps) {
    super(props)
    this.initNetworkInstance = this.initNetworkInstance.bind(this)
    this.state = {
      graph: new GraphData([], []),
      network: null,
    }
  }

  initNetworkInstance(networkInstance: any) {
    this.setState({ network: networkInstance })
  }

  update(data: GraphData) {
    this.state.network.setData(
      new GraphData(
        this.expandNodeClasses(data.nodes),
        this.expandEdgeClasses(data.edges)
      )
    )
  }

  render() {
    return (
      <Graph
        graph={this.state.graph}
        options={options}
        events={events}
        getNetwork={this.initNetworkInstance}
      />
    )
  }

  expandNodeClasses(list: GraphNode[]) {
    return list.map((item) => {
      if (nodeClassesToProps.hasOwnProperty(item.type)) {
        return { ...item, ...nodeClassesToProps[item.type] }
      }
      return item
    })
  }

  expandEdgeClasses(list: GraphEdge[]) {
    return list.map((item) => {
      if (edgeClassesToProps.hasOwnProperty(item.type)) {
        return { ...item, ...edgeClassesToProps[item.type] }
      }
      return item
    })
  }
}
