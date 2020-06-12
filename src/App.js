import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Visualization from './components/Visualization.tsx';
import {graphSampleData} from './sampleData.js';
import URLList from './components/URLList.tsx';
import Header from './components/Header.tsx';
import NavBar from './components/NavBar.tsx';

// TODO: move to analyze button
import { fetchRepo, fetchContributors, fetchFollowing } from './server/server'

function test() {
  console.log("inside test")
  fetchRepo()
  fetchContributors()
  fetchFollowing()
}

export default class App extends Component {
  render () {
    test ()
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

