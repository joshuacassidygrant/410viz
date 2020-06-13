import React, { Component } from "react";
import './list.css'
import URLItemData from "../../models/URLItemData";
 
interface URLItemProps {
  delete: (key: number) => void,
  entries: URLItemData[]
}

class URLItem extends Component<URLItemProps> {
  constructor(props: URLItemProps) {
    super(props);
    this.createURL = this.createURL.bind(this);
  }

  delete(key:number) {
    this.props.delete(key);
  }

  createURL(item: URLItemData){
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