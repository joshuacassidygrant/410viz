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
import { fetchRepo, fetchContributors, fetchFollowing } from "../server/api"
import GraphEdge from "../models/GraphEdge"
import GraphNode from "../models/GraphNode"
import GraphData from "../models/GraphData"
import { resolve } from "path"

var mockRepoURLs = [
  'https://github.com/facebook/react-native',
  'https://github.com/facebook/react',
  'https://github.com/twbs/bootstrap',
  'https://github.com/pytorch/pytorch',
  'https://github.com/facebook/watchman'
]

var edges: GraphEdge[]  = []
var nodes: GraphNode[] = []
var data: GraphData;

// TODO - buildData from user input and hook up to analyze button
async function buildData() {
  await buildRepo()
  await buildContributors()
  await buildFollowers()
  data = new GraphData(nodes, edges)
  console.log("Data: ", data)
}

async function buildRepo() {
  console.log("inside build repo")
  for (var i = 0; i < mockRepoURLs.length; i++) {
    const params = mockRepoURLs[i].match(/.*\/(.*)\/(.*)$/)!
    var URLOwner = params[1]
    var URLName = params[2]
    console.log("buildData URL:", mockRepoURLs[i])
    var repoData = await fetchRepo(URLOwner, URLName);
    console.log("repoData:", repoData)
    if (repoData) {
      var id = repoData["id"]
      var name = repoData["name"]
      var owner = repoData["owner"]["login"]
      var node = new GraphNode(id, name, "repo", owner);
      nodes.push(node)
    }
  }
}

async function buildContributors() {
  console.log("build contributors")
  for (const node of nodes) {
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
      }
      } else {
        for (var i = 0; i < 20; i++) {
          id = contributorData[i]["id"]
          name = contributorData[i]["login"]
          contributions = contributorData[i]["contributions"]
          contributorNode = new GraphNode(id, name, "user", contributions)
        }
      }

      if (contributorNode) {
        var edge = new GraphEdge(contributorNode.id, node.id, 'contributor')
        nodes.push(contributorNode)
        edges.push(edge)
      }

    }
  }
}

async function buildFollowers() {
  var users = []
  for (const node in nodes) {
    if (node.type === 'user') {
      users.push(node)
    }
  }

  for (var i = 0; i < users.length; i++) {
    for (var j = 0; j < users.length; j++) {
      if (i === j) return
      else {
        var isFollowing_j = await fetchFollowing(users[i].label, users[j].label)
        if (isFollowing_j) {
          var edge = new GraphEdge(users[i].id, users[j].id, 'friend')
          edges.push(edge)
        }
      }
    }
  }

}

export default class AppRouter extends Component {
  render() {
    buildData ()
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