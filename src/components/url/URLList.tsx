import React from "react"
import URLItem from "./URLItem"
import URLItemData from "../../models/URLItemData"
import "./submit.css"

interface URLListProps {
  handleAnalyze: () => void
}

interface URLListState {
  value: string
  items: URLItemData[]
}

class URLList extends React.Component<URLListProps, URLListState> {
  public _inputElement: HTMLInputElement | null

  public getItems = () => {
    return this.state.items
  }

  constructor(props: URLListProps) {
    super(props)
    this.state = {
      value: "",
      items: [],
    }

    this._inputElement = null
    this.handleChange = this.handleChange.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.addItem = this.addItem.bind(this)
  }

  handleChange(event: any) {
    this.setState({ value: event.target.value })
  }

  deleteItem(key: number) {
    var filteredItems = this.state.items.filter(function (item) {
      return item.key !== key
    })

    this.setState({
      items: filteredItems,
    })
  }

  addItem(e: any) {
    e.preventDefault()

    if (this._inputElement?.value !== "") {
      let value: string = this._inputElement?.value || "Undefined"
      var newItem = new URLItemData(Math.floor(Date.now() / 1000), value)

      this.setState((prevState) => {
        return {
          items: [...prevState.items, newItem],
        }
      })

      if (this._inputElement != null) {
        this._inputElement.value = ""
      }

      this.setState({
        value: "",
      })
    }
  }

  render() {
    return (
      <div>
        <div className="urlForm">
          <form onSubmit={this.addItem}>
            <label>
              <input
                type="text"
                id="myInput"
                placeholder="Input a GitHub URL"
                value={this.state.value}
                onChange={this.handleChange}
                ref={(a) => (this._inputElement = a)}
              />
            </label>
            <input type="submit" value="Add" className="addBtn" />
            <input
              type="button"
              value="Analyze"
              className="addBtn"
              onClick={this.props.handleAnalyze}
            />
          </form>
        </div>
        {/* TODO: Button to generate Viz from list of URLs */}
        <div>
          <URLItem entries={this.state.items} delete={this.deleteItem} />
        </div>
      </div>
    )
  }
}

export default URLList