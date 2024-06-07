import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; 

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://localhost:7256/api/Auth/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, confirmPassword, role: 'User' }), // Додаємо роль User
            });

            if (response.ok) {
                alert('Registration successful!');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-container">
            <div className="form-box">
                <h1>Реєстрація</h1>
                <form onSubmit={handleRegister}>
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
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Зареєструватися
                    </button>
                </form>
                <p className="register-link">
                    Вже маєте акаунт? <Link to="/login">Увійти тут</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;

