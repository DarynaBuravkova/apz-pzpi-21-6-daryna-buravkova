import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../components/Home/Homepage';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import UserHeader from '../components/User/UserHeader';
import CoffeePage from '../components/User/CoffeePage';
import MachinesPage from '../components/User/MachinesPage';
import ProfilePage from '../components/User/ProfilePage';
import CoffeeConcretePage from '../components/User/CoffeeConcretePage';
import AdminNavBar from '../components/Admin/AdminNavBar';
import DatabasePage from '../components/Admin/DatabasePage';
import OrdersPage from '../components/Admin/OrdersPage';
import MachinesControlPage from '../components/Admin/MachinesControlPage';
import EmployeesPage from '../components/Admin/EmployeesPage';
import UsersPage from '../components/Admin/UsersPage';
import DrinksPage from '../components/Admin/DrinksPage';
import MachineDetailsPage from '../components/Admin/MachineDetailsPage';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<UserHeader />}>
                <Route path="coffee" element={<CoffeePage />} />
                <Route path="coffee/:id" element={<CoffeeConcretePage />} />
                <Route path="machines" element={<MachinesPage />} />
                <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path="/admin" element={<AdminNavBar />}>
                <Route path="database" element={<DatabasePage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="machines" element={<MachinesControlPage />} />
                <Route path="machines/:id" element={<MachineDetailsPage />} />
                <Route path="drinks" element={<DrinksPage />} />
                <Route path="accounts/employees" element={<EmployeesPage />} />
                <Route path="accounts/users" element={<UsersPage />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
