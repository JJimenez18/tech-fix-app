import React, {useEffect, useState} from 'react';
import '../css/clientsStyles.css';
import {HeaderPage} from './Headers';
import AuthError from './AuthError';
import {useNavigate} from 'react-router-dom';
import {clientsGET, IClientesPOST} from '../models/clients';
import {validaToken} from '../services/security.services';
import {altaClientes, consultaClientes} from '../services/clients.services';
import Footer from './Footer';

const Clients: React.FC = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [clientes, setClientes] = useState<clientsGET[]>([]);
    const [hasError, setHasError] = useState<boolean>(false); // Estado para manejar el error
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true); // Estado de carga
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState<IClientesPOST>({
        nombre: '',
        telefono: '',
    });

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setHasError(true); // No hay token
                setIsLoading(false); // Detenemos la carga
            } else {
                const statusCode = await validaToken(token);

                if (statusCode === 200) {
                    setIsAuthenticated(true); // Si el token es válido, actualizar el estado
                    const {
                        statusCode,
                        data: {clients},
                    } = await consultaClientes(token);

                    if (statusCode === 200) {
                        setClientes(clients);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const enviaData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevenir que la página se recargue

        const {statusCode, message} = await altaClientes(token || '', formData);
        if (statusCode !== 200) {
            setError(message);
        } else {
            const {
                statusCode,
                data: {clients},
            } = await consultaClientes(token || '');

            if (statusCode === 200) {
                formData.nombre = '';
                formData.telefono = '';
                setClientes(clients);
                setIsOpen(false);
            }
            // navigate('/clients');
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    /**
     * Agregar funcionalidad para buscar en el servico
     * esto si el filter no tiene informacion
     */

    const filteredClients = clientes.filter(
        (cliente) =>
            cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cliente.telefono.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <HeaderPage />
            <br></br>
            <div className="form-container">
                <h2 onClick={() => setIsOpen(!isOpen)} style={{cursor: 'pointer'}}>
                    Alta Clientes {isOpen ? '▲' : '▼'}
                </h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {isOpen && (
                    <div className="form-content">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={enviaData}>
                            <label htmlFor="nombre">Nombre completo</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                required
                                onChange={handleChange}
                            />

                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                type="text"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                required
                                onChange={handleChange}
                            />
                            <center>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Registrar
                                </button>
                            </center>
                        </form>
                    </div>
                )}
            </div>

            <div className="dashboard-container" style={{width: '1000px'}}>
                <h2>Clientes</h2>
                <b>Total clientes: </b>
                {clientes.length}

                {/* Search Input */}
                <div className="search-container">
                    <p>Buscar cliente: </p>
                    <input
                        type="text"
                        placeholder="🔍"
                        className="search-input"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* Table */}
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Telefono</th>
                            <th>Registro</th>
                            {/* <th>Direcciones</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.length > 0 ? (
                            filteredClients.map((patient) => (
                                <tr key={patient.idUsuario}>
                                    <td>{patient.idUsuario}</td>
                                    <td>{patient.nombre}</td>
                                    <td>{patient.telefono}</td>
                                    <td>{patient.fechaRegistro}</td>
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
            <Footer />
        </div>
    );
};

export default Clients;
