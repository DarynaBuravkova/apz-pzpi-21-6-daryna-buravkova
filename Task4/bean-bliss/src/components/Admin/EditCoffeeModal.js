import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function EditCoffeeModal({ show, handleClose, coffee, setCoffee, handleUpdateCoffee }) {
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCoffee({ ...coffee, [name]: value });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Редагувати напій</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="editName">Назва</label>
                    <input
                        type="text"
                        className="form-control"
                        id="editName"
                        name="name"
                        value={coffee.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="editType">Тип</label>
                    <input
                        type="text"
                        className="form-control"
                        id="editType"
                        name="type"
                        value={coffee.type}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="editBulk">Кількість</label>
                    <input
                        type="number"
                        className="form-control"
                        id="editBulk"
                        name="bulk"
                        value={coffee.bulk}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="editPrice">Ціна</label>
                    <input
                        type="number"
                        className="form-control"
                        id="editPrice"
                        name="price"
                        value={coffee.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="editDescription">Опис</label>
                    <textarea
                        className="form-control"
                        id="editDescription"
                        name="description"
                        value={coffee.description}
                        onChange={handleInputChange}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleUpdateCoffee}>
                    Зберегти зміни
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditCoffeeModal;
