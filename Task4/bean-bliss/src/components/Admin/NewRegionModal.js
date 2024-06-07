import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

function NewRegionModal({ show, handleClose, handleCreateNewRegion }) {
    const [newLocationCity, setNewLocationCity] = useState('');
    const [newLocationCountry, setNewLocationCountry] = useState('');

    useEffect(() => {
        if (show) {
            setNewLocationCity('');
            setNewLocationCountry('');
        }
    }, [show]);

    const handleCreateRegion = () => {
        handleCreateNewRegion(newLocationCity, newLocationCountry);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} style={{ zIndex: show ? '1050' : '-1' }}>
            <Modal.Header closeButton>
                <Modal.Title>Створити нову локацію</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="newLocationCity">Місто</label>
                    <input
                        type="text"
                        className="form-control"
                        id="newLocationCity"
                        value={newLocationCity}
                        onChange={(e) => setNewLocationCity(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newLocationCountry">Країна</label>
                    <input
                        type="text"
                        className="form-control"
                        id="newLocationCountry"
                        value={newLocationCountry}
                        onChange={(e) => setNewLocationCountry(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCreateRegion}>
                    Створити
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewRegionModal;

