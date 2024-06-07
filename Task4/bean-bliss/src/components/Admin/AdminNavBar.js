import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../../styles/NavBar.css'; 

function AdminNavBar() {
    return (
        <div>
        <div className="sidebar">
            <h2>Адмін панель</h2>
            <ul>
                <li><Link to="/admin/database">База даних</Link></li>
                <li><Link to="/admin/orders">Замовлення</Link></li>
                <li><Link to="/admin/machines">Автомати з кавою</Link></li>
                <li><Link to="/admin/drinks">Напої</Link></li>
                <li>
                    <Link to="/admin/accounts">Акаунти</Link>
                    <ul>
                        <li><Link to="/admin/accounts/employees">Технічні працівники</Link></li>
                        <li><Link to="/admin/accounts/users">Користувачі</Link></li>
                    </ul>
                </li>
                <li><Link to="/">Вийти</Link></li> {/* Посилання на головну сторінку */}
            </ul>            
        </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default AdminNavBar;
