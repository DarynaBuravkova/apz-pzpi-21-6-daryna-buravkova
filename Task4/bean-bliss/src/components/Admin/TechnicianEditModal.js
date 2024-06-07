import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

function TechnicianEditModal({ show, handleClose, technician, updateTechnician }) {
    const [editedTechnician, setEditedTechnician] = useState(technician);

    useEffect(() => {
        setEditedTechnician(technician);
    }, [technician]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedTechnician(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = () => {
        updateTechnician(editedTechnician.id, editedTechnician);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Редагувати Спеціаліста</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="firstName">Ім'я:</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" value={editedTechnician?.firstName || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Прізвище:</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={editedTechnician?.lastName || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Електрона адреса:</label>
                    <input type="email" className="form-control" id="email" name="email" value={editedTechnician?.email || ''} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Номер телефону:</label>
                    <input type="text" className="form-control" id="phone" name="phone" value={editedTechnician?.phone || ''} onChange={handleChange} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleUpdate}>Оновити</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TechnicianEditModal;
