import React from 'react';
import Graph from "react-graph-vis";
import '../graph.css';
import GraphData from './GraphData';
import GraphNode from './GraphNode';
import GraphEdge from './GraphEdge';
    
const options = {
layout: {
    hierarchical: true
},
nodes: {
    shape: "hexagon",
    color: {
        border: "#ff4444",
        background: "#eeeeee"
    },
    borderWidth: 2
},
edges: {
    color: "#ff4444",
    width: 2
},
height: "500px"
};

const events = {
    select: function(event: any) {
        var { nodes, edges } = event;
    }
};


const nodeClassesToProps = {
    repo: {
        shape: "hexagon",
        color: {
            border: "#ff4444",
            background: "#eeeeee"
        },
        mass: 50,
        size: 50,
        borderWidth: 2
    },
    user: {
        shape: "circle",
        color: {
            border: "#ff4444",
            background: "#eeeeee"
        },
        borderWidth: 2
    }
}

const edgeClassesToProps = {
    friend: {
        color: "#ff4444",
        width: 2
    },
    contributor: {
        color: "#BBBBBB",
        width: 2
    }
}

interface VisualizationProps {
    graph: GraphData
}

export default class Visualization extends React.Component<VisualizationProps> {
    
    public graph: GraphData = new GraphData([], []);

    componentWillMount() {
        this.graph = {
            nodes: this.expandNodeClasses(this.props.graph.nodes),
            edges: this.expandEdgeClasses(this.props.graph.edges)
        }
    }

    render() {
        return (
            <Graph graph={this.graph} options={options} events={events} />
        )
    }

    expandNodeClasses(list: GraphNode[]) {
        return list.map(item => {
            if (nodeClassesToProps.hasOwnProperty(item.type)) {
                return {...item, ...nodeClassesToProps[item.type]}
            }
            return item;
        })
    }


    expandEdgeClasses(list: GraphEdge[]) {
        return list.map(item => {
            if (edgeClassesToProps.hasOwnProperty(item.type)) {
                return {...item, ...edgeClassesToProps[item.type]}
            }
            return item;
        })
    }
}