import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useParams } from 'react-router-dom';
import '../../styles/MachineDetailsPage.css';

function MachineDetailsPage() {
    const { id } = useParams();
    const [machine, setMachine] = useState(null);
    const [editedMachine, setEditedMachine] = useState({});
    const [coffeeId, setCoffeeId] = useState('');
    const [availableCoffees, setAvailableCoffees] = useState([]);
    const [machineCoffees, setMachineCoffees] = useState([]);
    const [machineParameters, setMachineParameters] = useState([]);
    const [machineStatus, setMachineStatus] = useState(null); // Changed initial state to null
    const [region, setRegion] = useState(null);

    useEffect(() => {
        fetch(`https://localhost:7256/api/Machine/${id}`)
            .then(response => response.json())
            .then(data => {
                setMachine(data);
                setEditedMachine(data); // Заповнюємо editedMachine початковими даними
                return fetch(`https://localhost:7256/api/Region/${data.regionId}`);
            })
            .then(response => response.json())
            .then(data => setRegion(data))
            .catch(error => console.error('Error fetching data:', error));

        fetch(`https://localhost:7256/api/Coffee`)
            .then(response => response.json())
            .then(data => setAvailableCoffees(data))
            .catch(error => console.error('Error fetching available coffees:', error));

        fetch(`https://localhost:7256/api/Coffee/CofeeMachine/${id}`)
            .then(response => response.json())
            .then(data => setMachineCoffees(data))
            .catch(error => console.error('Error fetching machine coffees:', error));

        fetch(`https://localhost:7256/api/MachineParametr?machineId=${id}`)
            .then(response => response.json())
            .then(data => setMachineParameters(data))
            .catch(error => console.error('Error fetching machine parameters:', error));

        fetch(`https://localhost:7256/api/MachineStatus/${id}`)
            .then(response => response.json())
            .then(data => setMachineStatus(data))
            .catch(error => console.error('Error fetching machine status:', error));
    }, [id]);

    const handleEditMachine = () => {
        fetch(`https://localhost:7256/api/Machine/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedMachine)
        })
        .then(response => {
            if (response.ok) {
                alert('Machine edited successfully');
                setMachine(editedMachine);
            } else {
                alert('Failed to edit machine');
            }
        })
        .catch(error => console.error('Error editing machine:', error));
    };

    const handleDeleteMachine = () => {
        fetch(`https://localhost:7256/api/Machine/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Machine deleted successfully');
                window.location.href = '/';
            } else {
                alert('Failed to delete machine');
            }
        })
        .catch(error => console.error('Error deleting machine:', error));
    };

    const handleAddCoffee = () => {
        fetch(`https://localhost:7256/api/Machine/Coffee?machineId=${id}&coffeeId=${coffeeId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Coffee added successfully');
                fetch(`https://localhost:7256/api/Coffee/CofeeMachine/${id}`)
                    .then(response => response.json())
                    .then(data => setMachineCoffees(data))
                    .catch(error => console.error('Error fetching machine coffees:', error));
            } else {
                alert('Failed to add coffee');
            }
        })
        .catch(error => console.error('Error adding coffee:', error));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedMachine({ ...editedMachine, [name]: value });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleString('uk-UA', { timeZone: 'UTC' });
        return formattedDate;
    };

    if (!machine || !region) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Деталі машини</h2>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Інформація про машину</h3>
                            <p>ID: {machine.id}</p>
                            <p>Назва: {machine.name}</p>
                            <p>Адреса: {machine.address}</p>
                            <p>Працює: {machine.isWorking ? 'Так' : 'Ні'}</p>
                            <p>Регіон: {region.city}, {region.country}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Редагувати машину</h3>
                            <Form>
                                <Form.Group controlId="formMachineName">
                                    <Form.Label>Назва</Form.Label>
                                    <Form.Control type="text" name="name" value={editedMachine.name || ''} onChange={handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="formMachineAddress">
                                    <Form.Label>Адреса</Form.Label>
                                    <Form.Control type="text" name="address" value={editedMachine.address || ''} onChange={handleInputChange} />
                                </Form.Group>
                            </Form>
                            <Button variant="outline-primary mt-4" onClick={handleEditMachine}>Редагувати машину</Button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Видалити машину</h3>
                            <button type="button" className="btn btn-outline-danger" onClick={handleDeleteMachine}>Видалити машину</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    <h3 className="card-title">Додати каву</h3>
                    <Form>
                        <Form.Group controlId="formCoffeeId">
                            <Form.Label>Кава</Form.Label>
                            <Form.Control as="select" value={coffeeId} onChange={(e) => setCoffeeId(e.target.value)}>
                                <option value="">Оберіть каву</option>
                                {availableCoffees.map(coffee => (
                                    <option key={coffee.id} value={coffee.id}>{coffee.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <Button variant="success mt-4" onClick={handleAddCoffee}>Додати каву</Button>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    <h3 className="card-title">Параметри машини</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Температура</th>
                                <th>Сила</th>
                                <th>Об'єм</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{machineParameters.temperature}</td>
                                <td>{machineParameters.strength}</td>
                                <td>{machineParameters.volume}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    <h3 className="card-title">Статус машини</h3>
                    {machineStatus ? (
                        <>
                            <div className="mb-3">
                                <h5>Рівень кави</h5>
                                <ProgressBar now={machineStatus.cofeeLevel} label={`${machineStatus.cofeeLevel}%`} />
                            </div>
                            <div className="mb-3">
                                <h5>Рівень води</h5>
                                <ProgressBar now={machineStatus.waterLevel} label={`${machineStatus.waterLevel}%`} />
                            </div>
                            <div className="mb-3">
                                <h5>Рівень молока</h5>
                                <ProgressBar now={machineStatus.milkLevel} label={`${machineStatus.milkLevel}%`} />
                            </div>
                            <div className="mb-3">
                                <h5>Рівень цукру</h5>
                                <ProgressBar now={machineStatus.sugarLevel} label={`${machineStatus.sugarLevel}%`} />
                            </div>
                            <div>
                                <h5>Дата моніторингу</h5>
                                <p>{formatDate(machineStatus.monitoringDate)}</p>
                            </div>
                        </>
                    ) : (
                        <p>Завантаження статусу машини...</p>
                    )}
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    <h3 className="card-title">Напої машини</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Назва</th>
                            </tr>
                        </thead>
                        <tbody>
                            {machineCoffees.map(coffee => (
                                <tr key={coffee.id}>
                                    <td>{coffee.id}</td>
                                    <td>{coffee.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default MachineDetailsPage;