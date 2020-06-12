import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Visualization from './components/Visualization';
import {graphSampleData} from './sampleData.js';
import URLList from './components/URLList';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { fetchRepo, fetchContributors, fetchFollowing } from './server/api'
import GraphNode from './models/GraphNode';
import GraphEdge from './models/GraphEdge';

// User max input is 5
let mockRepoURLs = [
  'https://github.com/facebook/react-native',
  'https://github.com/facebook/react',
  'https://github.com/twbs/bootstrap',
  'https://github.com/pytorch/pytorch',
  'https://github.com/facebook/watchman'
]

let edges = []
let nodes = []

// TODO - buildData from user input and hook up to analyze button
async function buildData() {
  buildRepo()
  buildContributors()
  buildFollowers()
}

async function buildRepo() {
  for (var i = 0; i < mockRepoURLs.length; i++) {
    const params = mockRepoURLs[i].match(/.*\/(.*)\/(.*)$/)
    let owner = params[1]
    let name = params[2]
    console.log("buildData URL:", mockRepoURLs[i])
    let repoData = await fetchRepo(owner, name);
    let id = repoData["id"]
    let name = repoData["name"]
    let owner = repoData["owner"]["login"]
    let node = new GraphNode(id, name, "repo", owner);
    nodes.push(node)
  }
}

async function buildContributors() {
  for (const node of nodes) {
    let name = nodes[i].label
    let owner = nodes[i].title
    let contributorData = await fetchContributors(owner, name)
    let contributor;
    if (contributorData.length < 20) {
      for (const contributor of contributorData) {
        let id = contributor["id"]
        let name = contributor["login"]
        let contributions = contributor["contributions"]
        contributor = new GraphNode(id, name, "user", contributions)
      }
    } else {
      for (var i = 0; i < 20; i++) {
        let id = contributorData[i]["id"]
        let name = contributorData[i]["login"]
        let contributions = contributorData["contributions"]
        contributor = new GraphNode(id, name, "user", contributions)
      }
    }
    let edge = new GraphEdge(contributor.id, node.id, 'contributor')
    nodes.push(contributor)
    edges.push(edge)
  }
}

async function buildFollowers() {
  let users = []
  for (const node in nodes) {
    if (node.type == 'user') {
      users.push(node)
    }
  }

  for (var i = 0; i < users.length; i++) {
    for (var j = 0; j < users.length; j++) {
      if (i == j) return
      else {
        isFollowing_j = await fetchFollowing(users[i].label, users[j].label)
        if (isFollowing_j) {
          let edge = new GraphEdge(users[i].id, users[j].id, 'friend')
          edges.push(edge)
        }
      }
    }
  }
}

export default class App extends Component {
  render () {
    // buildData ()
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

