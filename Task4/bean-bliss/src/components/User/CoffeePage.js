import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/CoffeePage.css';

function CoffeePage() {
    const [coffeeList, setCoffeeList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://localhost:7256/api/Coffee')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setCoffeeList(data);
                } else {
                    throw new Error('Data format is incorrect');
                }
            })
            .catch(error => {
                console.error('Error fetching coffee list:', error);
                setError(error.message);
            });
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCoffeeList = coffeeList.filter(coffee =>
        coffee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Наші напої</h2>
            <div className="row mb-4">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Пошук за назвою..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="row">
                {error ? (
                    <div className="col-12">
                        <div className="alert alert-danger">
                            Error: {error}
                        </div>
                    </div>
                ) : (
                    filteredCoffeeList.map(coffee => (
                        <div key={coffee.id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{coffee.name}</h5>
                                    <p className="card-text">Тип: {coffee.type}</p>
                                    <Link to={`/user/coffee/${coffee.id}`} className="btn btn-primary">
                                        Переглянути детальніше
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default CoffeePage;