import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Home from "../components/views/Home"
import About from "../components/views/About"
import Header from "../components/global/Header/Header"
import NavBar from "../components/global/NavBar/NavBar"
import "../styles/App.css"

export default function AppRouter () {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <Header/>
          <NavBar/>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}