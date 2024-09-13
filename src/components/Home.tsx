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
                <h2>Jobs</h2>
                <p>View and manage your jobs</p>

                {/* Search Input */}
                <div className="search-container">
                    <input type="text" placeholder="🔍 Search patients" className="search-input" />
                </div>

                {/* Navigation tabs */}
                <ul className="tabs">
                    <li className="tab active">Pending</li>
                    <li className="tab">Running</li>
                    <li className="tab">Succeeded</li>
                    <li className="tab">Failed</li>
                    <li className="tab">Canceled</li>
                    <li className="tab">All</li>
                </ul>

                {/* Table */}
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Progress</th>
                            <th>Created At</th>
                            <th>Action</th>
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
