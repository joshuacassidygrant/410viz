import React from 'react';
import '../style/submit.css'
import URLItem from "./URLItem";
import URLItemData from './URLItemData';


interface URLListProps {

}
interface URLListState {
  value: string,
  items: URLItemData[]
}


class URLList extends React.Component<URLListProps, URLListState> {
  public _inputElement: HTMLInputElement | null;

	constructor(props: URLListProps) {
        super(props);
        this.state = {
          value: '',
          items: []
      };

      this._inputElement = null;
    
        this.handleChange = this.handleChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
      }
    
      handleChange(event: any) {
        this.setState({value: event.target.value});
      }
    
      deleteItem(key: number) {
        var filteredItems = this.state.items.filter(function (item) {
          return (item.key !== key);
        });
       
        this.setState({
          items: filteredItems
        });
      }

      addItem(e: any) {
        if (this._inputElement?.value !== "") {
          let value:string = this._inputElement?.value || "Undefined";
          var newItem = new URLItemData(Math.floor(Date.now() / 1000), value);
       
          this.setState((prevState) => {
            return { 
              items: prevState.items.concat(newItem) 
            };
          });
         
          if (this._inputElement != null) {
            this._inputElement.value = "";
          }

          this.setState({
            value: ''
          });
        }

        e.preventDefault();
      }
    
      render() {
        return (
          <body>
            <div className="urlForm">
          <form onSubmit={this.addItem}>
            <label>
              <input type="text" id="myInput" placeholder="Input a GitHub URL" value={this.state.value} onChange={this.handleChange} ref={(a) => this._inputElement = a} />
            </label>
            <input type="submit" value="Add" className="addBtn"/>
            <input type="submit" value="Analyze" className="addBtn"/>
          </form>
          </div>
          {/* TODO: Button to generate Viz from list of URLs */}
          <div>
          <URLItem entries={this.state.items}
          delete={this.deleteItem}/>
          </div>
          </body>
        );
      }
}

export default URLList;

