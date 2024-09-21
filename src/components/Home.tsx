import React from 'react';
import '../css/HomePage.css';
import {HeaderPage} from './Headers';

interface Job {
    id: number;
    name: string;
    status: string;
    progress: number;
    createdAt: string;
}

const jobs: Job[] = [
    {id: 123, name: 'Marketing Campaign', status: 'In Progress', progress: 75, createdAt: '8/31/2022'},
    {id: 124, name: 'Customer Segmentation', status: 'In Progress', progress: 60, createdAt: '8/31/2022'},
    {id: 125, name: 'Sales Forecasting', status: 'In Progress', progress: 45, createdAt: '8/31/2022'},
    {id: 126, name: 'Product Recommendations', status: 'In Progress', progress: 30, createdAt: '8/31/2022'},
    {id: 127, name: 'Churn Analysis', status: 'In Progress', progress: 15, createdAt: '8/31/2022'},
];

const JobsDashboard: React.FC = () => {
    return (
        <div>
            <HeaderPage />
            <br></br>
            <div className="dashboard-container">
                <h2>Ordenes de trabajo</h2>
                <p>Revisa y administra las ordenes de trabajo</p>

                {/* Search Input */}
                <div className="search-container">
                    <input type="text" placeholder="🔍 Buscar Orden" className="search-input" />
                </div>

                {/* Navigation tabs */}
                <ul className="tabs">
                    <li className="tab active">Pendiente</li>
                    <li className="tab">En revision</li>
                    <li className="tab">Completada</li>
                    <li className="tab">Diagnosticada</li>
                    <li className="tab">Cancelada</li>
                    <li className="tab">todo</li>
                </ul>

                {/* Table */}
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Proceso</th>
                            <th>Creado por</th>
                            <th>Modifica</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.id}>
                                <td>
                                    <a href={`#job/${job.id}`}>#{job.id}</a>
                                </td>
                                <td>{job.name}</td>
                                <td>
                                    <span
                                        className={`badge ${job.status === 'In Progress' ? 'badge-in-progress' : ''}`}
                                    >
                                        {job.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="progress">
                                        <div className="progress-bar" style={{width: `${job.progress}%`}}>
                                            {job.progress}%
                                        </div>
                                    </div>
                                </td>
                                <td>{job.createdAt}</td>
                                <td>
                                    <button className="btn">Pause</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JobsDashboard;
