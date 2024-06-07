import React, { useState, useEffect } from 'react';
import { Button, Table, Container, Form } from 'react-bootstrap';
import TechnicianEditModal from './TechnicianEditModal';

function EmployeesPage() {
    const [technicians, setTechnicians] = useState([]);
    const [newTechnician, setNewTechnician] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTechnician, setSelectedTechnician] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchTechnicians();
    }, []);

    const fetchTechnicians = () => {
        fetch('https://localhost:7256/api/Technician')
            .then(response => response.json())
            .then(data => setTechnicians(data))
            .catch(error => console.error('Помилка отримання техніків:', error));
    };

    const handleRegisterTechnician = () => {
        fetch('https://localhost:7256/api/Auth/RegisterTechnician', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTechnician)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Технік успішно зареєстровано:', data);
            fetchTechnicians(); // Перезавантаження списку техніків після реєстрації
            setNewTechnician({ email: '', password: '', confirmPassword: '' }); // Очищення форми реєстрації
        })
        .catch(error => console.error('Помилка реєстрації техніка:', error));
    };

    const handleDeleteTechnician = (id) => {
        fetch(`https://localhost:7256/api/Technician/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log('Техніка успішно видалено');
                fetchTechnicians(); // Перезавантаження списку техніків після видалення
            } else {
                console.error('Не вдалося видалити техніка');
            }
        })
        .catch(error => console.error('Помилка видалення техніка:', error));
    };

    const handleEditTechnician = (technician) => {
        setSelectedTechnician(technician);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedTechnician(null);
    };

    const handleUpdateTechnician = (id, updatedTechnician) => {
        fetch(`https://localhost:7256/api/Technician/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTechnician)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Технік успішно оновлено:', data);
            fetchTechnicians(); // Перезавантаження списку техніків після оновлення
        })
        .catch(error => console.error('Помилка оновлення техніка:', error));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTechnicians = technicians.filter(technician => {
        const fullName = `${technician.firstName} ${technician.lastName}`;
        return (
            fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            technician.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <Container className="mt-3">
            <h2 className="text-center mb-4">Співробітники</h2>

            <Container className="card w-50 mb-2 mt-1">
                <h3>Реєстрація техніка</h3>
                <Form>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Введіть email" value={newTechnician.email} onChange={e => setNewTechnician({ ...newTechnician, email: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Пароль:</Form.Label>
                        <Form.Control type="password" placeholder="Пароль" value={newTechnician.password} onChange={e => setNewTechnician({ ...newTechnician, password: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Підтвердіть пароль:</Form.Label>
                        <Form.Control type="password" placeholder="Підтвердіть пароль" value={newTechnician.confirmPassword} onChange={e => setNewTechnician({ ...newTechnician, confirmPassword: e.target.value })} />
                    </Form.Group>
                    <Button variant="primary mt-3" onClick={handleRegisterTechnician}>Зареєструвати техніка</Button>
                </Form>
            </Container>

            <h3 className="mt-4">Пошук техніків</h3>
            <Form>
                <Form.Group controlId="formSearch">
                    <Form.Control type="text" placeholder="Пошук за ім'ям або email" value={searchTerm} onChange={handleSearchChange} />
                </Form.Group>
            </Form>

            {/* Таблиця техніків */}
            <h3 className="mt-4">Техніки</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ім'я</th>
                        <th>Прізвище</th>
                        <th>Email</th>
                        <th>Телефон</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTechnicians.map(technician => (
                        <tr key={technician.id}>
                            <td>{technician.id}</td>
                            <td>{technician.firstName}</td>
                            <td>{technician.lastName}</td>
                            <td>{technician.email}</td>
                            <td>{technician.phone}</td>
                            <td>
                                <Button variant="outline-secondary" onClick={() => handleEditTechnician(technician)}>Редагувати</Button>{' '}
                                <Button variant="outline-danger" onClick={() => handleDeleteTechnician(technician.id)}>Видалити</Button>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <TechnicianEditModal
                    show={showEditModal}
                    handleClose={handleCloseEditModal}
                    technician={selectedTechnician}
                    updateTechnician={handleUpdateTechnician}
                    />
        </Container>
    );
}

export default EmployeesPage;

