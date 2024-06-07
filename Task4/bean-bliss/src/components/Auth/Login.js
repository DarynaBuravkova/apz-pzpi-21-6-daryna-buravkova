import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://localhost:7256/api/Auth/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('userId', data.userId); // Store user ID in local storage
                console.log('User ID:', data.userId); // Log the retrieved user ID
                const role = data.role; // Assuming response contains a role property
                if (role === 'Admin') {
                    navigate('/admin/database');
                } else if (role === 'User') {
                    navigate('/user/coffee'); // Redirect to profile page
                } else {
                    alert('Unknown role');
                }
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-container">
            <div className="form-box">
                <h1>Ввійти в аккаунт</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Ввійти
                    </button>
                </form>
                <p className="register-link">
                    Ще не зареєстровані? <Link to="/register">Зареєструватися тут</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;

