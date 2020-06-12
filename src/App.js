import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Visualization from './components/Visualization.tsx';
import {graphSampleData} from './sampleData.js';
import URLList from './components/URLList.tsx';
import Header from './components/Header.tsx';
import NavBar from './components/NavBar.tsx';
import { fetchRepo, fetchContributors, fetchFollowing } from './server/api'
import GraphNode from './models/GraphNode';

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
  for (var i = 0; i < mockRepoURLs.length; i++) {
    console.log("buildData URL:", mockRepoURLs[i])
    const params = mockRepoURLs[i].match(/.*\/(.*)\/(.*)$/)
    console.log("PARAMS", params)
    let repoData = await fetchRepo(params[1], params[2]);
    let id = repoData["id"]
    let name = repoData["name"]
    let node = new GraphNode(id, name, "repo", name);
    nodes.push(node)
  }

  fetchContributors("octocat", "Hello-World")
  fetchFollowing()
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

