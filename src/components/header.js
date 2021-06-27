import React from 'react'
import ghost from '../assets/ghost.gif'
import hamburger from "../assets/download.png"

const Header = ({setModal}) => {
    return <header> 
        <div className='logo'>
            <span> YUNG <img src={ghost} height="40px" /> FANTOM </span> 
        </div>
        
    </header>
}

export default Header;

