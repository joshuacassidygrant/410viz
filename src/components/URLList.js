import React from 'react';
import '../style/submit.css'
import URLItem from "./URLItem";

class URLList extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
          value: '',
          items: []
      };
    
        this.handleChange = this.handleChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
          return (item.key !== key);
        });
       
        this.setState({
          items: filteredItems
        });
      }

      addItem(e) {
        if (this._inputElement.value !== "") {
          var newItem = {
            text: this._inputElement.value,
            key: Date.now()
          };
       
          this.setState((prevState) => {
            return { 
              items: prevState.items.concat(newItem) 
            };
          });
         
          this._inputElement.value = "";
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
            <input type="submit" value="Submit" className="addBtn"/>
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

