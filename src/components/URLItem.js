import React, { Component } from "react";
import '../style/list.css'
 
class URLItem extends Component {
    constructor(props) {
        super(props);
        this.createURL = this.createURL.bind(this);
      }

      delete(key) {
        this.props.delete(key);
      }

  createURL(item) {
        return <li onClick={() => this.delete(item.key)} 
                key={item.key}>{item.text}</li>
  }
 
  render() {
    var urlEntries = this.props.entries;
    var listItems = urlEntries.map(this.createURL);
 
    return (
      <ul className="myUL">
          {listItems}
      </ul>
    );
  }
};
 
export default URLItem;