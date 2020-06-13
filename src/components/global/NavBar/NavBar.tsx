import React from "react"
import { Link } from "react-router-dom"
import "./navBar.css"
import { fetchRepository, reactURL } from "../../../api/github"

export default function NavBar() {
  function fetch () {
    fetchRepository (reactURL)
  } 
  
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <button onClick={fetch} className="NavbarItem">Fetch</button>
    </div>
  )
}
