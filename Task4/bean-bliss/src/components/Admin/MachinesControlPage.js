import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewMachineModal from './NewMachineModal';
import NewRegionModal from './NewRegionModal';

function MachinesControlPage() {
    const [machines, setMachines] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [searchName, setSearchName] = useState('');
    const [locations, setLocations] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [locationDetails, setLocationDetails] = useState({});
    const [showMachineModal, setShowMachineModal] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);

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

        fetch('https://localhost:7256/api/Technician')
            .then(response => response.json())
            .then(data => setTechnicians(data))
            .catch(error => console.error('Error fetching technicians:', error));

        fetch('https://localhost:7256/api/Machine')
            .then(response => response.json())
            .then(data => setMachines(data))
            .catch(error => console.error('Error fetching machines:', error));
    }, []);

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleSearchNameChange = (event) => {
        setSearchName(event.target.value);
    };

    const handleShowLocationModal = () => {
        setShowLocationModal(true);
    };

    const handleCloseLocationModal = () => {
        setShowLocationModal(false);
    };

    const getAddress = (machine) => {
        const location = locationDetails[machine.regionId];
        return location ? `${machine.address}, ${location.city}, ${location.country}` : machine.address;
    };

    const getStatus = (isWorking) => {
        return isWorking ? 'Працює' : 'Не працює';
    };

    const handleCreateNewMachine = (newMachineData) => {
        fetch(`https://localhost:7256/api/Machine?regionId=${newMachineData.regionId}&techId=${newMachineData.techId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 0,
                name: newMachineData.name,
                address: newMachineData.address,
                isWorking: true, 
                regionId: newMachineData.regionId,
                techId: newMachineData.techId
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Machine created successfully');
                fetch('https://localhost:7256/api/Machine')
                    .then(response => response.json())
                    .then(data => setMachines(data))
                    .catch(error => console.error('Error fetching machines:', error));
            } else {
                alert('Machine created');
            }
        })
        .catch(error => console.error('Error creating machine:', error));
    };

    const handleCreateNewRegion = (city, country) => {
        fetch('https://localhost:7256/api/Region', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 0,
                city: city,
                country: country
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Location created successfully');
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
            } else {
                alert('Failed to create location');
            }
        })
        .catch(error => console.error('Error creating location:', error));
    };

    const filteredMachines = machines.filter(machine => {
        const matchesLocation = selectedLocation ? machine.regionId === parseInt(selectedLocation) : true;
        const matchesName = searchName ? machine.name.toLowerCase().includes(searchName.toLowerCase()) : true;
        return matchesLocation && matchesName;
    });

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Контроль автоматів з кавою</h2>
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
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Пошук за назвою"
                        value={searchName}
                        onChange={handleSearchNameChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button type="button" className="btn btn-primary mb-3" onClick={() => setShowMachineModal(true)}>
                        Створити нову машину
                    </button>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-primary mb-3" onClick={handleShowLocationModal}>
                        Створити нову локацію
                    </button>
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
                                <Link to={`/admin/machines/${machine.id}`} className="btn btn-primary">
                                    Переглянути детальніше
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <NewMachineModal
                show={showMachineModal}
                handleClose={() => setShowMachineModal(false)}
                locations={locations}
                technicians={technicians}
                handleCreateNewMachine={handleCreateNewMachine}
            />
            <NewRegionModal
                show={showLocationModal}
                handleClose={handleCloseLocationModal}
                handleCreateNewRegion={handleCreateNewRegion}
            />
        </div>
    );
}

export default MachinesControlPage;
