import React from 'react';
import '../style/navBar.css'

class Header extends React.Component {
	render() {
        return (
            <div className="navbar">
            <a href="index.html">Home</a>
            <a href="about.html">About Us</a>
        </div>
        );
    }
}

export default Header;