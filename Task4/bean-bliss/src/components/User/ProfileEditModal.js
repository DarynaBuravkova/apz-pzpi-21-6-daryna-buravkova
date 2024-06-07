import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ProfileEditModal({ profile, onSave, onClose }) {
    const [updatedProfile, setUpdatedProfile] = useState({ ...profile });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSave = () => {
        onSave(updatedProfile);
    };

    const formatDate = (date) => {
        const d = new Date(date);
        if (!isNaN(d.getTime())) {
            return d.toISOString().split('T')[0];
        }
        return '';
    };

    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Редагувати профіль</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>Ім'я</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={updatedProfile.firstName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                        <Form.Label>Прізвище</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={updatedProfile.lastName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBirthDate">
                        <Form.Label>Дата народження</Form.Label>
                        <Form.Control
                            type="date"
                            name="birthDate"
                            value={formatDate(updatedProfile.birthDate)}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Номер телефону</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={updatedProfile.phone}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSave}>
                    Зберегти зміни
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ProfileEditModal;
