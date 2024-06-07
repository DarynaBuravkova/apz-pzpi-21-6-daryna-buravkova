import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../../styles/NavBar.css';

function UserHeader() {
    return (
        <div>
            <nav className="sidebar">
                <ul>
                    <li><Link to="/user/coffee">Напої</Link></li>
                    <li><Link to="/user/machines">Автомати з кавою</Link></li>
                    <li><Link to="/user/profile">Профіль</Link></li>
                    <li><Link to="/">Вийти</Link></li> 
                </ul>
            </nav>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default UserHeader;
