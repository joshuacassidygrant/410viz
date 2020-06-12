import React from 'react';
import logo from './logo.svg';
import './App.css';
import Visualization from './components/Visualization.tsx';
import {graphSampleData} from './sampleData.js';
import URLList from './components/URLList.tsx';
import Header from './components/Header.tsx';
import NavBar from './components/NavBar.tsx';

function App() {
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

export default App;
