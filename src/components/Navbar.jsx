import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = ({ }) => {

    return (
        <div className='navigation'>
            <ul>
                <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Accueil</li>
                </NavLink>
                <NavLink to="/clubs" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Clubs</li>
                </NavLink>
                <NavLink to="/clubs/add" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Add Club</li>
                </NavLink>
                <NavLink to="/players" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Players</li>
                </NavLink>
                <NavLink to="/players/add" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Add Player</li>
                </NavLink>
            </ul>
        </div>
    );
};

export default Navbar;
