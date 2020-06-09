import React from 'react';
import logo from './logo.svg';
import './App.css';
import Visualization from './components/Visualization';
import {graphSampleData} from './sampleData.js';
import Visualizaiton from './components/Visualization';
import URLList from './components/URLList';
import Header from './components/Header';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">

      <body className="App-header">
        <Header/>
        <NavBar/>
        <h1>Network Diagram Builder</h1>
        <URLList/>
        <Visualizaiton graph={graphSampleData}/>
      </body>
    </div>
  );
}

export default App;
