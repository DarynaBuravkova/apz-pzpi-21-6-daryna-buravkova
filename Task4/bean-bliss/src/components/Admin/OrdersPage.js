import React, { useState, useEffect } from 'react';
import '../../styles/OrdersPage.css';

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('https://localhost:7256/api/Order', {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                },
            });
            const ordersData = await response.json();
            const ordersWithMachineNames = await Promise.all(ordersData.map(async order => {
                const machineResponse = await fetch(`https://localhost:7256/api/Machine/${order.machineId}`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                    },
                });
                const machineData = await machineResponse.json();
                return {
                    ...order,
                    machineName: machineData.name,
                };
            }));
            setOrders(ordersWithMachineNames);
            setFilteredOrders(ordersWithMachineNames);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchId(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const filterOrders = () => {
        let filtered = orders;

        if (searchId) {
            filtered = filtered.filter(order => order.id.toString().includes(searchId));
        }

        if (startDate) {
            filtered = filtered.filter(order => new Date(order.orderDate) >= new Date(startDate));
        }

        if (endDate) {
            filtered = filtered.filter(order => new Date(order.orderDate) <= new Date(endDate));
        }

        setFilteredOrders(filtered);
    };

    useEffect(() => {
        filterOrders();
    }, [searchId, startDate, endDate]);

    return (
        <div className="orders-page-container container mt-4">
            <h2 className="text-center mb-4">Всі замовлення</h2>
            <div className="filter-container mb-4">
                <div className="form-group">
                    <label htmlFor="searchId">Пошук за ID:</label>
                    <input
                        type="text"
                        id="searchId"
                        className="form-control"
                        value={searchId}
                        onChange={handleSearchChange}
                        placeholder="Введіть ID замовлення"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="startDate">Початкова дата:</label>
                    <input
                        type="date"
                        id="startDate"
                        className="form-control"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">Кінцева дата:</label>
                    <input
                        type="date"
                        id="endDate"
                        className="form-control"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
            </div>
            <ul className="orders-list">
                {filteredOrders.map(order => (
                    <li key={order.id}>
                        <div className="order-info">
                            <p><strong>Номер замовлення:</strong> {order.id}</p>
                            <p><strong>Назва машини:</strong> {order.machineName}</p>
                            <p><strong>Дата:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                            <p><strong>Статус:</strong> {order.orderStatus}</p>
                        </div>
                        <hr />
                    </li>
                ))}
            </ul>
            {showModal && selectedOrder && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close-btn" onClick={() => setShowModal(false)}>×</span>
                            <h2>Інформація про замовлення</h2>
                            <pre>{selectedOrder}</pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrdersPage;
