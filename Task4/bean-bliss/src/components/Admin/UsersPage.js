import React, { useState, useEffect } from 'react';
import { Table, Container, Form } from 'react-bootstrap';

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('uk-UA', options);
}

function UsersPage() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch('https://localhost:7256/api/User')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Помилка отримання користувачів:', error));
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`;
        return (
            fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <Container className="mt-3">
            <h2 className="text-center mb-4">Список користувачів</h2>

            <Form>
                <Form.Group controlId="formSearch">
                    <Form.Control type="text" placeholder="Пошук за іменем або email" value={searchTerm} onChange={handleSearchChange} />
                </Form.Group>
            </Form>

            <h3 className="mt-4">Користувачі</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ім'я</th>
                        <th>Прізвище</th>
                        <th>Дата народження</th>
                        <th>Телефон</th>
                        <th>Email</th>
                        <th>Роль</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{formatDate(user.birthDate)}</td> {/* Форматування дати */}
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default UsersPage;

