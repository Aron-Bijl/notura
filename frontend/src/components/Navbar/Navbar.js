import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { MenuItems } from "./MenuItems";
import './Navbar.css';
import SearchBar from './SearchBar';

class Navbar extends Component {
    state = { clicked: false };

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    render(){
        return(
            <nav className='NavbarItems'>
                <div className='container align'>
                    <Link to={"/"} ><div className='navbar-logo'> Notura </div> </Link> 
                    <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                        {MenuItems.map((item, index)=> {
                            return (
                                <li key={index}><Link className={item.cName} to={item.url}> {item.title} </Link></li>
                            )
                        }) }
                    </ul>
                    <div className='search-login'>
                        <Link to="/login"><Button>Login</Button></Link>
                        {/*<div className='menu-icon' onClick={this.handleClick}>
                            <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                        </div> */}
                        <SearchBar/>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;