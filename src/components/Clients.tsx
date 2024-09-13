import React from 'react';
import '../css/clientsStyles.css';
import { HeaderPage } from './Headers';

interface Patient {
    name: string;
    id: number;
    type: string;
    insuranceCode: string;
    flag: string;
}

const patients: Patient[] = [
    {name: 'Sarah Johnson', id: 123456, type: 'Primary', insuranceCode: 'PPO', flag: '🌲'},
    {name: 'John Anderson', id: 234567, type: 'Secondary', insuranceCode: 'HMO', flag: '⛺️'},
    {name: 'Emily Davis', id: 345678, type: 'Tertiary', insuranceCode: 'EPO', flag: '🌄'},
    {name: 'Michael Smith', id: 456789, type: 'Primary', insuranceCode: 'POS', flag: '🏞'},
    {name: 'Jessica Miller', id: 567890, type: 'Secondary', insuranceCode: 'HSA', flag: '🏜'},
    {name: 'Ryan Taylor', id: 678901, type: 'Tertiary', insuranceCode: 'FSA', flag: '🚩'},
    {name: 'Amanda White', id: 789012, type: 'Primary', insuranceCode: 'Medicare', flag: '🌅'},
    {name: 'Daniel Harris', id: 890123, type: 'Secondary', insuranceCode: 'Medicaid', flag: '🏖'},
    {name: 'Lauren Brown', id: 901234, type: 'Tertiary', insuranceCode: 'Tricare', flag: '🏕'},
    {name: 'Christopher Turner', id: 12345, type: 'Primary', insuranceCode: 'VSP', flag: '🏝'},
];

const Clients: React.FC = () => {
    return (
        <div>
            <HeaderPage/>
            <br></br>
            <div className="dashboard-container">
                <h2>Patients</h2>
                <p>1,234 Patients</p>

                {/* Search Input */}
                <div className="search-container">
                    <input type="text" placeholder="🔍 Search patients" className="search-input" />
                </div>

                {/* Table */}
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Insurance Code</th>
                            <th>Flag</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.name}</td>
                                <td>{patient.id}</td>
                                <td>
                                    <span className={`badge ${patient.type.toLowerCase()}`}>{patient.type}</span>
                                </td>
                                <td>{patient.insuranceCode}</td>
                                <td>{patient.flag}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Clients;
