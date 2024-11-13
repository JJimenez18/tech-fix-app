import React, {useEffect, useState} from 'react';
import '../css/HomePage.css';
import {HeaderPage} from './Headers';
import {useNavigate} from 'react-router-dom';
import AuthError from './AuthError';
import {IConsultaDispositivosGET} from '../models/device';
import {validaToken} from '../services/security.services';
import Footer from './Footer';
import {consultaDispositivos} from '../services/device.services';

const JobsDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false); // Estado para manejar el error
    const [devices, setDevices] = useState<IConsultaDispositivosGET[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Estado de carga
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const validateToken = async () => {
            if (!token) {
                setHasError(true); // Marca el error si no hay token
                setIsLoading(false); // Detenemos la carga
            } else {
                const statusCode = await validaToken(token);

                if (statusCode === 200) {
                    setIsAuthenticated(true); // Si el token es válido, actualizar el estado
                    const {
                        statusCode,
                        data: {devices},
                    } = await consultaDispositivos(token);

                    if (statusCode === 200) {
                        console.log(devices);
                        setDevices(devices);
                    }
                } else {
                    localStorage.removeItem('token'); // Token inválido, manejar el error
                    setHasError(true);
                    // navigate('/'); // Redirigir si el token es inválido
                    return <AuthError />;
                }
                setIsLoading(false); // Detenemos la carga tras la validación
            }
        };

        // Validar el token inmediatamente
        validateToken();

        // Configurar el intervalo para validar cada minuto
        const intervalId = setInterval(() => {
            validateToken();
        }, 60000); // 60000 ms = 1 minuto

        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(intervalId);
    }, [navigate]);

    if (isLoading) {
        return <HeaderPage />;
    }

    if (hasError || !isAuthenticated) {
        return <AuthError />;
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    /**
     * Agregar funcionalidad para buscar en el servico
     * esto si el filter no tiene informacion
     */

    const filteredDevices = devices.filter(
        (job) =>
            job.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.descripcionFalla.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <HeaderPage />
            <br></br>
            <div className="home-body">
                <div className="dashboard-container" style={{width: '1000px'}}>
                    <h2>Ordenes de trabajo</h2>
                    <p>Revisa y administra las ordenes de trabajo</p>

                    {/* Search Input */}
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="🔍 Buscar Orden"
                            className="search-input"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

                    {/* Navigation tabs */}
                    <ul className="tabs">
                        <li className="tab active">Pendiente</li>
                        <li className="tab">En diagnostico</li>
                        <li className="tab">Diagnosticada</li>
                        <li className="tab">Reparada</li>
                        <li className="tab">Entregada</li>
                    </ul>

                    {/* Table */}
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Folio</th>
                                <th>Tipo</th>
                                <th>Modelo</th>
                                <th>Serie</th>
                                <th>Falla</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDevices.length > 0 ? (
                                filteredDevices.map((job) => (
                                    <tr key={job.idDispositivo}>
                                        <td>
                                            <a href={`/details/device/${job.idDispositivo}`}>
                                                {`${job.idDispositivo}`.substring(0, 3)}
                                            </a>
                                        </td>
                                        <td>{job.descTipoDispositivo}</td>
                                        <td>
                                            {job.modelo}
                                            {/* <span
                                        className={`badge ${job.idDispositivo === 'In Progress' ? 'badge-in-progress' : ''}`}
                                    >
                                        {job.modelo}
                                    </span> */}
                                        </td>
                                        <td>
                                            {/* <div className="progress">
                                        <div className="progress-bar" style={{width: `${job.progress}%`}}>
                                            {job.progress}%
                                        </div>
                                    </div> */}
                                            {job.serie}
                                        </td>
                                        <td>{job.descripcionFalla}</td>
                                        <td>{job.nombreCliente}</td>
                                        <td>{new Date(job.fechaRegistro).toLocaleDateString()}</td>
                                        <td>{job.idEstatusDispositivo}</td>
                                        {/* <td>
                                    <button className="btn">Pause</button>
                                </td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8}>No se encontraron resultados</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default JobsDashboard;
