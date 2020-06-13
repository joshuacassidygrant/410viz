import React, {Component, RefObject} from "react"
import Visualization from "../graph/Visualization"
import URLList from "../url/URLList"
import { getGraphSampleData } from "../../sampleData"

export default class Home extends Component {
  private vis: RefObject<Visualization>
  private urls: RefObject<URLList>

  constructor(props: any) {
    super(props)
    this.vis = React.createRef()
    this.urls = React.createRef()
  }

  handleAnalyze = () => {
    if (this.urls.current == null || this.vis.current == null) {
      console.log("missing refs")
      return
    } 

    let urls = this.urls.current.getItems().map(urlData => urlData.text)
    console.log(urls)
    //  Prep diagram here with calls to each url!
    console.log("Analyzing...")
    this.vis.current.update(getGraphSampleData())
  }

  render() {
    return (
      <div className="Home">
        <h1>Network Diagram Builder</h1>
        <URLList ref={this.urls} handleAnalyze={this.handleAnalyze}/>
        <Visualization ref={this.vis}/>
      </div>
    )
  }
}
