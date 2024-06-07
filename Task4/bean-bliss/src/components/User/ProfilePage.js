import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/ProfilePage.css';
import ProfileEditModal from './ProfileEditModal';

function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        fetch(`https://localhost:7256/api/User/${userId}`)
            .then(response => response.json())
            .then(data => {
                setProfile(data);
            })
            .catch(error => console.error('Error fetching profile:', error));
    
        fetch(`https://localhost:7256/api/Order/user/${userId}`)
            .then(response => response.json())
            .then(async data => {
                // Map through orders and fetch coffee name for each order
                const updatedOrders = await Promise.all(data.map(async order => {
                    try {
                        const response = await fetch(`https://localhost:7256/api/Coffee/${order.coffeeId}`);
                        const coffeeData = await response.json();
                        return { ...order, coffeeName: coffeeData.name };
                    } catch (error) {
                        console.error('Error fetching coffee data:', error);
                        return { ...order, coffeeName: 'Unknown Coffee' };
                    }
                }));
                setOrders(updatedOrders);
            })
            .catch(error => console.error('Error fetching orders:', error));
    }, []);
        
    const handleEdit = (updatedProfile) => {
        const userId = localStorage.getItem('userId');
        fetch(`https://localhost:7256/api/User?id=${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProfile),
        })
        .then(response => {
            if (response.ok) {
                setProfile(updatedProfile);
                setShowEditModal(false);
            } else {
                alert('Failed to update profile');
            }
        })
        .catch(error => console.error('Error updating profile:', error));
    };

    const handleDelete = () => {
        const userId = localStorage.getItem('userId');
        fetch(`https://localhost:7256/api/User/${userId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                alert('Profile deleted successfully');
                localStorage.removeItem('userId');
                navigate('/login');
            } else {
                alert('Error deleting profile');
            }
        })
        .catch(error => console.error('Error deleting profile:', error));
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <div className="profile-container">
                        <h2 className="mb-4">Ваша профіль</h2>
                        {profile && (
                            <div className="profile-details">
                                <p><strong>Ім'я:</strong> {profile.firstName}</p>
                                <p><strong>Прізвище:</strong> {profile.lastName}</p>
                                <p><strong>Email:</strong> {profile.email}</p>
                                <p><strong>Дата народження:</strong> {formatDate(profile.birthDate)}</p>
                                <p><strong>Номер телефону:</strong> {profile.phone}</p>
                                <button className="btn btn-primary mr-2" onClick={() => setShowEditModal(true)}>Редагувати профіль</button>
                                <button type="button" class="btn btn-outline-danger mt-3" onClick={handleDelete}>Видалити профіль</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-md-6">
                    <h2 className="mb-4">Ваші замовлення</h2>
                    {orders.length === 0 ? (
                        <p>Замовлень ще немає</p>
                    ) : (
                        <ul className="order-list">
                            {orders.map((order, index) => (
                                <li key={order.id}>
                                    <p><strong>Замовлення {index + 1}:</strong></p>
                                    <p><strong>Напій:</strong> {order.coffeeName}</p>
                                    <p><strong>Дата замовлення:</strong> {formatDate(order.orderDate)}</p>
                                    {order.price !== undefined && order.price !== null && (
                                        <p><strong>Ціна:</strong> {order.price.toFixed(2)} грн.</p>
                                    )}
                                    {index !== orders.length - 1 && <hr />}
                                </li>
                            ))}
                        </ul>
                    )}
                    {orders.length === 0 && (
                        <div className="text-center">
                            <button className="btn btn-primary px-5">Зробити замовлення</button>
                        </div>
                    )}
                </div>
            </div>
            {showEditModal && 
                <ProfileEditModal 
                    profile={profile} 
                    onSave={handleEdit} 
                    onClose={() => setShowEditModal(false)} 
                />
            }
        </div>
    );
}

export default ProfilePage;
