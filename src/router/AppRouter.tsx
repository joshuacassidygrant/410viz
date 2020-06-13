import React, { Component } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Home from "../components/views/Home"
import About from "../components/views/About"
import Header from "../components/global/Header/Header"
import NavBar from "../components/global/NavBar/NavBar"
import "../styles/App.css"
import { fetchRepo, fetchContributors, fetchFollowing, fetchFollowingList } from "../server/api"
import GraphEdge from "../models/GraphEdge"
import GraphNode from "../models/GraphNode"
import GraphData from "../models/GraphData"

var mockRepoURLs = [
  'https://github.com/facebook/react-native',
  'https://github.com/facebook/react',
  'https://github.com/twbs/bootstrap',
  'https://github.com/pytorch/pytorch',
  'https://github.com/facebook/watchman'
]

var edges: GraphEdge[]  = []
var nodes: GraphNode[] = []
var nodeIDs: number[] = []
var networkMap: { [id: number] : number[]; } = {}
var data: GraphData;

// TODO - buildData from user input and hook up to analyze button
async function buildData() {
  console.log("length start:", Object.keys(networkMap).length)
  console.log('inside buildData')
  await buildRepo()
  await buildContributors()
  buildNetwork()
  data = new GraphData(nodes, edges)
  console.log("Data: ", data)
}

async function buildRepo() {
  console.log("Building repository")
  for (let i = 0; i < mockRepoURLs.length; i++) {
    const params = mockRepoURLs[i].match(/.*\/(.*)\/(.*)$/)!
    var URLOwner = params[1]
    var URLName = params[2]
    var repoData = await fetchRepo(URLOwner, URLName);
    if (repoData) {
      var id = repoData["id"]
      var name = repoData["name"]
      var owner = repoData["owner"]["login"]
      var node = new GraphNode(id, name, "repo", owner);
      nodes.push(node)
      nodeIDs.push(node.id)
    }
  }
}

async function buildContributors() {
  console.log("Building contributors...")
  const repoNodes = Array.from(nodes)
  for (const node of repoNodes) {
    var nodeName = node.label
    var nodeOwner = node.title
    var contributorData: any[]|undefined = await fetchContributors(nodeOwner, nodeName)
    
    if (contributorData) {
      var id, name, contributions, contributorNode;
      if (contributorData.length < 20) {
        for (const contributor of contributorData) {
          id = contributor["id"]
          name = contributor["login"]
          contributions = contributor["contributions"]
          contributorNode = new GraphNode(id, name, "user", contributions)
          await appendContributorNodeAndEdge(contributorNode, node)
        }
      } else {
        for (let i = 0; i < 20; i++) {
          id = contributorData[i]["id"]
          name = contributorData[i]["login"]
          contributions = contributorData[i]["contributions"]
          contributorNode = new GraphNode(id, name, "user", contributions)
          await appendContributorNodeAndEdge(contributorNode, node)
        }
      }
    }
  }
}

async function appendContributorNodeAndEdge(contributorNode: GraphNode, node: GraphNode) {
  if (!nodeIDs.includes(contributorNode.id)) {
    nodes.push(contributorNode)
    networkMap[contributorNode.id] = []
    nodeIDs.push(contributorNode.id)
    await buildFollowingList(contributorNode)
  }

  var edge = new GraphEdge(contributorNode.id, node.id, 'contributor')
  edges.push(edge)
}

async function buildFollowingList(contributorNode: GraphNode) {
  var followingData = await fetchFollowingList(contributorNode.label)
  console.log("followingData", followingData)
  for (const acc of followingData) {
    var followingID: number = acc["id"]
    networkMap[contributorNode.id].push(followingID)
  }
  console.log("added a list to a contributor:", networkMap)
  console.log("length:", Object.keys(networkMap).length)
}

async function buildNetwork() {
  console.log("inside buildNetwork")
  console.log(networkMap)
  for (const follower of Object.keys(networkMap)) {
    for (const followee of networkMap[parseInt(follower)]) {
      if (followee in networkMap) {
        console.log('adding to network')
        var edge = new GraphEdge(parseInt(follower), followee, 'friend')
        edges.push(edge)
      }
    }
  }

}

async function buildFollowers() {
  console.log("Building followers...")
  var users = []
  for (const node of nodes) {
    if (node.type === 'user') {
      users.push(node)
    }
  }

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (i != j) {
        try {
          await fetchFollowing(users[i].label, users[j].label)
          var edge = new GraphEdge(users[i].id, users[j].id, 'friend')
          edges.push(edge)
        } catch {
          // Do nothing
        }
      }
    }
  }
  console.log("Edges after buildFollower", edges)

}

export default class AppRouter extends Component {

  componentDidMount () {
    buildData ()
  }

  render() {
    return (
      <Router>
      <div className="App">
        <div className="App-header">
          <Header/>
          <NavBar/>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
    )
  }
}