import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function NewMachineModal({ show, handleClose, locations, technicians, handleCreateNewMachine }) {
    const [newMachineData, setNewMachineData] = useState({
        name: '',
        address: '',
        regionId: '',
        techId: ''
    });

    useEffect(() => {
        setNewMachineData({
            name: '',
            address: '',
            regionId: '',
            techId: ''
        });
    }, [show]);

    const handleRegionChange = (event) => {
        setNewMachineData({ ...newMachineData, regionId: event.target.value });
    };

    const handleTechnicianChange = (event) => {
        setNewMachineData({ ...newMachineData, techId: event.target.value });
    };

    const handleSubmit = () => {
        handleCreateNewMachine(newMachineData);
        handleClose(); // Закриття модального вікна після створення машини
    };

    return (
        <Modal show={show} onHide={handleClose} style={{ zIndex: show ? '1050' : '-1' }}>
            <Modal.Header closeButton>
                <Modal.Title>Створити нову машину</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="machineName">Назва машини:</label>
                    <input type="text" className="form-control" id="machineName" value={newMachineData.name} onChange={(e) => setNewMachineData({ ...newMachineData, name: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="machineAddress">Адреса:</label>
                    <input type="text" className="form-control" id="machineAddress" value={newMachineData.address} onChange={(e) => setNewMachineData({ ...newMachineData, address: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="region">Регіон:</label>
                    <select className="form-control" id="region" value={newMachineData.regionId} onChange={handleRegionChange}>
                        <option value="">Оберіть регіон</option>
                        {locations.map(location => (
                            <option key={location.id} value={location.id}>
                                {location.city}, {location.country}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="technician">Технік:</label>
                    <select className="form-control" id="technician" value={newMachineData.techId} onChange={handleTechnicianChange}>
                        <option value="">Оберіть техніка</option>
                        {technicians.map(technician => (
                            <option key={technician.id} value={technician.id}>
                                {technician.lastName}, {technician.firstName}
                            </option>
                        ))}
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>Створити</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewMachineModal;