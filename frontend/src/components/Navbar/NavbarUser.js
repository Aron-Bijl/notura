import React, {useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../../Store';
import { MenuItemsUser } from "./MenuItemsUser";
import { MenuItemsAdmin } from "./MenuItemsAdmin";
import './Navbar.css';
import SearchBar from './SearchBar';


function NavbarUser() {

    const { state } = useContext(Store);
    const { userInfo } = state;

    const [value, setClick] = useState(false);


    useEffect(() => {
      }, [userInfo]);

        return(
            <nav className='NavbarItems'>
                <div className="container align">
                    <Link to={"/"} ><logo className='navbar-logo'> Notura </logo> </Link> 
                    <ul className={value ? 'nav-menu active' : 'nav-menu'}>
                        {userInfo.isAdmin ? (MenuItemsAdmin.map((item, index) => {
                                return ( <li key={index}  onClick={() =>  setClick(!value)}><Link className={item.cName} to={item.url}> {item.title} </Link></li> )
                        })) : 
                        (MenuItemsUser.map((item, index) => {
                                return ( <li key={index}  onClick={() =>  setClick(!value)}><Link className={item.cName} to={item.url}> {item.title} </Link></li> )
                        }))}
                    </ul>
                    <div className='search-login'>

                 

                    <div className="menu-icon" onClick={() =>  setClick(!value)}>
                        <i className={value ? "fas fa-times" : "fas fa-bars"}></i>
                    </div>
                            {       
                                <Link to="/profile" className="user">
                                    <div className="avatar">
                                            <img className="rounded-circle" src={userInfo.imgAuthor} alt={userInfo.name} />
                                            {/* <p>{userInfo.name}</p> */}
                                    </div>
                                </Link> 
                            }

                    <SearchBar />
                    
                    </div>

                </div>
            </nav>
        );
    
}

export default NavbarUser;