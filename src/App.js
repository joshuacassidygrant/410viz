import React from 'react';
import logo from './logo.svg';
import './App.css';
import Visualization from './components/Visualization';
import {graphSampleData} from './sampleData.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Visualization graph={graphSampleData}/>
      </header>
    </div>
  );
}

export default App;
