import React, {Component, RefObject} from "react"
import Visualization from "../graph/Visualization"
import URLList from "../url/URLList"
import buildData from "../../api/networkBuilder";
import GraphData from "../../models/GraphData";

const mockRepoURLs = [
  'https://github.com/facebook/react-native',
  'https://github.com/facebook/react',
  'https://github.com/twbs/bootstrap',
  'https://github.com/pytorch/pytorch',
  'https://github.com/facebook/watchman'
]

export default class Home extends Component {
  private vis: RefObject<Visualization>
  private urls: RefObject<URLList>

  constructor(props: any) {
    super(props)
    this.vis = React.createRef()
    this.urls = React.createRef()
  }

  updateVis = (graphData: GraphData) => {
    this.vis.current?.update(graphData)
  }

  handleAnalyze = () => {
    if (this.urls.current === null || this.vis.current === null) {
      console.log("missing refs")
      return
    } 

    let urls = this.urls.current.getItems().map(urlData => urlData.text)
    console.log(urls)
    //  Prep diagram here with calls to each url!
    if (urls.length === 0) {
      console.log("No urls chosen, using defaults.")
      buildData(mockRepoURLs, this.updateVis)
    } else if (this.validateUrls(urls)) {
      console.log("Analyzing...")
      buildData(urls, this.updateVis);
    } else {
      alert("Bad urls!")
    }
  }

  validateUrls(urls: string[]) {
    return urls.every(this.isUrl)
  }

  // From https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  isUrl = (str: string) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str)
  }

  render() {
    return (
      <div className="Home">
        <URLList ref={this.urls} handleAnalyze={this.handleAnalyze}/>
        <Visualization ref={this.vis}/>
      </div>
    )
  }
}
