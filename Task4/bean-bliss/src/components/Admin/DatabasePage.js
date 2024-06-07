import React, { useState } from 'react';
import '../../styles/DatabasePage.css'; 

function DatabasePage() {
    const [databaseName, setDatabaseName] = useState('');

    const handleBackupDatabase = () => {
        fetch(`https://localhost:7256/api/Admin/BackupDatabase?databaseName=${databaseName}`, {
            method: 'POST',
            headers: {
                'accept': '*/*',
            },
        })
        .then(response => {
            if (response.ok) {
                alert('Backup created successfully');
            } else {
                alert('Failed to create backup');
            }
        })
        .catch(error => console.error('Error creating backup:', error));
    };

    const handleRestoreDatabase = () => {
        fetch(`https://localhost:7256/api/Admin/RestoreDatabase?databaseName=${databaseName}`, {
            method: 'POST',
            headers: {
                'accept': '*/*',
            },
        })
        .then(response => {
            if (response.ok) {
                alert('Database restored successfully');
            } else {
                alert('Failed to restore database');
            }
        })
        .catch(error => console.error('Error restoring database:', error));
    };

    return (
        <div className="database-management-container container mt-4">
            <h2>Керування базою даних</h2>
            <div className="input-container mb-3">
                <label htmlFor="databaseName">Назва бази даних:</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="databaseName" 
                    value={databaseName} 
                    onChange={(e) => setDatabaseName(e.target.value)} 
                />
            </div>
            <div className="button-container mb-3">
                <button className="btn btn-success m-1" onClick={handleBackupDatabase}>Створити резервну копію</button>
                <button className="btn btn-success m-1" onClick={handleRestoreDatabase}>Відновити базу даних</button>
            </div>
        </div>
    );
}

export default DatabasePage;
