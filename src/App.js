import React from 'react';
// import './App.css';
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
        <Visualizaiton />
      </body>
    </div>
  );
}

export default App;
