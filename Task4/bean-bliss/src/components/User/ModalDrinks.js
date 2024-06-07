import React, { useEffect, useState } from 'react';
import { Modal} from 'react-bootstrap';

function ModalDrinks({ show, handleClose, machine }) {
    const [machineCoffees, setMachineCoffees] = useState([]);

    useEffect(() => {
        if (machine) {
            fetch(`https://localhost:7256/api/Coffee/CofeeMachine/${machine.id}`)
                .then(response => response.json())
                .then(data => setMachineCoffees(data))
                .catch(error => console.error('Error fetching machine coffees:', error));
        }
    }, [machine]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Напої для машини {machine.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {machineCoffees.length > 0 ? (
                    <ul>
                        {machineCoffees.map(coffee => (
                            <li key={coffee.id}>
                                <strong>{coffee.name}</strong> - {coffee.price} грн.
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Немає доступних напоїв</p>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default ModalDrinks;

