import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditCoffeeModal from './EditCoffeeModal';

function DrinksPage() {
    const [coffeeList, setCoffeeList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newCoffee, setNewCoffee] = useState({
        name: '',
        type: '',
        bulk: '',
        price: '',
        description: ''
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [editCoffee, setEditCoffee] = useState({
        id: '',
        name: '',
        type: '',
        bulk: '',
        price: '',
        description: ''
    });

    useEffect(() => {
        fetchCoffeeList();
    }, []);

    const fetchCoffeeList = () => {
        fetch('https://localhost:7256/api/Coffee')
            .then(response => response.json())
            .then(data => setCoffeeList(data))
            .catch(error => console.error('Error fetching coffee list:', error));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCoffee({ ...newCoffee, [name]: value });
    };

    const handleCreateCoffee = () => {
        fetch('https://localhost:7256/api/Coffee', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...newCoffee, id: 0 })
        })
        .then(response => response.json())
        .then(() => {
            fetchCoffeeList();
            setNewCoffee({
                name: '',
                type: '',
                bulk: '',
                price: '',
                description: ''
            });
        })
        .catch(error => console.error('Error creating coffee:', error));
    };

    const handleEditCoffee = (coffee) => {
        setEditCoffee(coffee);
        setShowEditModal(true);
    };

    const handleUpdateCoffee = () => {
        fetch(`https://localhost:7256/api/Coffee/${editCoffee.id}`, {
            method: 'PUT',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editCoffee)
        })
        .then(response => response.json())
        .then(() => {
            fetchCoffeeList();
            setShowEditModal(false);
        })
        .catch(error => console.error('Error updating coffee:', error));
    };

    const handleDeleteCoffee = (id) => {
        fetch(`https://localhost:7256/api/Coffee/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': '*/*'
            }
        })
        .then(() => {
            fetchCoffeeList();
        })
        .catch(error => console.error('Error deleting coffee:', error));
    };

    const filteredCoffeeList = coffeeList.filter(coffee =>
        coffee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coffee.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Напої</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4 className="card-title">Створити новий напій</h4>
                            <div className="form-group">
                                <label htmlFor="name">Назва</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={newCoffee.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="type">Тип</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="type"
                                    name="type"
                                    value={newCoffee.type}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bulk">Кількість</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="bulk"
                                    name="bulk"
                                    value={newCoffee.bulk}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Ціна</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={newCoffee.price}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Опис</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={newCoffee.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button className="btn btn-primary btn-sm mt-2" onClick={handleCreateCoffee}>
                                Створити
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Пошук за назвою або типом..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="row">
                        {filteredCoffeeList.map(coffee => (
                            <div key={coffee.id} className="col-md-6 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{coffee.name}</h5>
                                        <p className="card-text">Тип: {coffee.type}</p>
                                        <p className="card-text">Кількість: {coffee.bulk}</p>
                                        <p className="card-text">Ціна: {coffee.price}</p>
                                        <p className="card-text">Опис: {coffee.description}</p>
                                        <div className="d-flex justify-content-centre">
                                            <button className="btn btn-outline-secondary btn-sm md-3" onClick={() => handleEditCoffee(coffee)}>
                                                Змінити
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm ms-3" onClick={() => handleDeleteCoffee(coffee.id)}>
                                                Видалити
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <EditCoffeeModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                coffee={editCoffee}
                setCoffee={setEditCoffee}
                handleUpdateCoffee={handleUpdateCoffee}
            />
        </div>
    );
}

export default DrinksPage;

