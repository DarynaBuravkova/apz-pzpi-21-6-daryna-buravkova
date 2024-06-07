import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/MachinesPage.css';
import ModalDrinks from './ModalDrinks';

function MachinesPage() {
    const [machines, setMachines] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [locations, setLocations] = useState([]);
    const [locationDetails, setLocationDetails] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [selectedMachineCoffees, setSelectedMachineCoffees] = useState([]);

    useEffect(() => {
        fetch('https://localhost:7256/api/Region')
            .then(response => response.json())
            .then(data => {
                setLocations(data);
                const locationMap = {};
                data.forEach(location => {
                    locationMap[location.id] = location;
                });
                setLocationDetails(locationMap);
            })
            .catch(error => console.error('Error fetching locations:', error));

        fetchMachines();
    }, []);

    const fetchMachines = (locationId = null) => {
        const url = locationId 
            ? `https://localhost:7256/Region/${locationId}` 
            : 'https://localhost:7256/api/Machine';
        
        fetch(url)
            .then(response => response.json())
            .then(data => setMachines(Array.isArray(data) ? data : []))
            .catch(error => console.error('Error fetching machines:', error));
    };

    const handleLocationChange = (event) => {
        const locationId = event.target.value;
        setSelectedLocation(locationId);
        fetchMachines(locationId);
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const fetchMachineCoffees = (machineId) => {
        fetch(`https://localhost:7256/Coffee/${machineId}`)
            .then(response => response.json())
            .then(data => {
                setSelectedMachineCoffees(data);
            })
            .catch(error => console.error('Error fetching machine coffees:', error));
    };

    const handleShowModal = (machine) => {
        setSelectedMachine(machine);
        fetchMachineCoffees(machine.id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedMachine(null);
        setSelectedMachineCoffees([]);
    };

    const getAddress = (machine) => {
        const location = locationDetails[machine.regionId];
        return location ? `${machine.address}, ${location.city}, ${location.country}` : machine.address;
    };

    const getStatus = (isWorking) => {
        return isWorking ? 'Працює' : 'Не працює';
    };

    const filteredMachines = machines.filter(machine => {
        const matchesLocation = selectedLocation ? machine.regionId === parseInt(selectedLocation) : true;
        const matchesStatus = selectedStatus ? machine.isWorking === (selectedStatus === 'true') : true;
        return matchesLocation && matchesStatus;
    });

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Автомати з кавою</h2>
            <div className="row mb-4">
                <div className="col">
                    <select className="form-control" value={selectedLocation} onChange={handleLocationChange}>
                        <option value="">Всі локації</option>
                        {locations.map(location => (
                            <option key={location.id} value={location.id}>
                                {location.city}, {location.country}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <select className="form-control" value={selectedStatus} onChange={handleStatusChange}>
                        <option value="">Всі статуси</option>
                        <option value="true">Працює</option>
                        <option value="false">Не працює</option>
                    </select>
                </div>
            </div>
            <div className="row">
                {filteredMachines.map(machine => (
                    <div key={machine.id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{machine.name}</h5>
                                <p className="card-text">Адреса: {getAddress(machine)}</p>
                                <p className="card-text">Статус: {getStatus(machine.isWorking)}</p>
                                <button className="btn btn-primary" onClick={() => handleShowModal(machine)}>
                                    Переглянути напої
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedMachine && (
                <ModalDrinks
                    show={showModal}
                    handleClose={handleCloseModal}
                    machine={selectedMachine}
                    coffees={selectedMachineCoffees}
                />
            )}
        </div>
    );
}

export default MachinesPage;
