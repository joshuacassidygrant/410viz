import React, {Component, RefObject} from 'react';
import './App.css';
import getGraphSampleData from './sampleData.js';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Visualization from './components/Visualization';
import URLList from './components/URLList';

export default class App extends Component {
  private vis: RefObject<Visualization>;
  private urls: RefObject<URLList>;

  constructor(props: any) {
    super(props);
    this.vis = React.createRef();
    this.urls = React.createRef();
  }

  render() {
    return (
      <div className="App">
  
        <div className="App-header">
          <Header/>
          <NavBar/>
          <h1>Network Diagram Builder</h1>
          <URLList ref={this.urls} handleAnalyze={this.handleAnalyze}/>
          <Visualization ref={this.vis}/>
        </div>
      </div>
    );
  }

  handleAnalyze = () => {
    if (this.urls.current == null || this.vis.current == null) {
      console.log("missing refs");
      return;
    } 

    let urls = this.urls.current.getItems().map(urlData => urlData.text);
    console.log(urls);
    //  Prep diagram here with calls to each url!
    console.log("Analyzing...");
    this.vis.current.update(getGraphSampleData());
  }
}
