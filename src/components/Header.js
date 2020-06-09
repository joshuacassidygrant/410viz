import React from 'react';
import '../style/header.css'

class Header extends React.Component {
	render() {
        return (
            <div className="header">
            <h1>Project Name</h1>
            <p>CPSC 410 Project 2</p>
        </div>
        );
    }
}

export default Header;