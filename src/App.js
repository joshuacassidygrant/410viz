import React, { Component } from 'react';
import './App.css';
import Visualization from './components/Visualization';
import {graphSampleData} from './sampleData.js';
import URLList from './components/URLList';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { fetchRepo, fetchContributors, fetchFollowing } from './server/api'
import GraphNode from './models/GraphNode';
import GraphEdge from './models/GraphEdge';
import GraphData from './models/GraphData';

// User max input is 5
var mockRepoURLs = [
  'https://github.com/facebook/react-native',
  'https://github.com/facebook/react',
  'https://github.com/twbs/bootstrap',
  'https://github.com/pytorch/pytorch',
  'https://github.com/facebook/watchman'
]

var edges = []
var nodes = []
var data;

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
    const params = mockRepoURLs[i].match(/.*\/(.*)\/(.*)$/)
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
    var contributorData = await fetchContributors(nodeOwner, nodeName)
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
        contributions = contributorData["contributions"]
        contributorNode = new GraphNode(id, name, "user", contributions)
      }
    }
    var edge = new GraphEdge(contributorNode.id, node.id, 'contributor')
    nodes.push(contributorNode)
    edges.push(edge)
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

export default class App extends Component {
  render () {
    buildData ()
    return (
      <div className="App">
  
        <body className="App-header">
          <Header/>
          <NavBar/>
          <h1>Network Diagram Builder</h1>
          <URLList/>
          <Visualization graph={graphSampleData}/>
        </body>
      </div>
    );
  }
}

