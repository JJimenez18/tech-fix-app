import React, {useEffect, useState} from 'react';
import '../css/addDevice.css';
import {HeaderPage} from './Headers';
import AuthError from './AuthError';
import {clientsGET, ITiposDispositivosGET} from '../models/clients';
import {useNavigate} from 'react-router-dom';
import {consultaClientes, consultaTiposDispositivos} from '../services/clients.services';
import {validaToken} from '../services/security.services';
import {altaDispositivos} from '../services/device.services';
import {IAltaDispositivoI} from '../models/device';
import Footer from './Footer';

const AddDevice: React.FC = () => {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState<clientsGET[]>([]);
    const [tiposDisp, setTiposDisp] = useState<ITiposDispositivosGET[]>([]);
    const [hasError, setHasError] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<IAltaDispositivoI>({
        idTipoDispositivo: 0,
        serie: '',
        marca: '',
        modelo: '',
        descripcionFalla: '',
        idCliente: 0,
    });

    const token = localStorage.getItem('token');
    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setHasError(true); // No hay token
                setIsLoading(false); // Detenemos la carga
            } else {
                const statusCode = await validaToken(token);

                if (statusCode === 200) {
                    setIsAuthenticated(true);
                    const {
                        statusCode,
                        data: {clients},
                    } = await consultaClientes(token);

                    const {
                        statusCode: statusTypes,
                        data: {devicesTypes},
                    } = await consultaTiposDispositivos(token);

                    if (statusCode === 200) {
                        setClientes(clients);
                    }

                    if (statusTypes === 200) {
                        console.log(devicesTypes);
                        setTiposDisp(devicesTypes);
                    }
                } else {
                    localStorage.removeItem('token'); // Token inválido
                    setHasError(true);
                    navigate('/'); // Redirige si el token es inválido
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

        const {statusCode, message} = await altaDispositivos(token || '', formData);
        if (statusCode !== 200) {
            setError(message);
        } else {
            navigate('/home');
        }
    };

    return (
        <>
            <HeaderPage />
            <br></br>
            <div className="form-container">
                <h2>Nuevo Equipo</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={enviaData}>
                    <label htmlFor="idCliente">Cliente</label>
                    <select id="idCliente" name="idCliente" value={Number(formData.idCliente)} required onChange={handleChange}>
                        <option value="">Seleccione</option>
                        {clientes.map((cliente, index) => (
                            <option key={index} value={Number(cliente.idUsuario)}>
                                {cliente.nombre}
                            </option>
                        ))}
                    </select>
                    <br></br>
                    <label htmlFor="marca">Marca</label>
                    <input type="text" id="marca" name="marca" value={formData.marca} required onChange={handleChange} />

                    <label htmlFor="modelo">Modelo</label>
                    <input type="text" id="modelo" name="modelo" value={formData.modelo} required onChange={handleChange} />

                    <label htmlFor="serie">Serie</label>
                        
                        <input type="text" id="serie" name="serie" value={formData.serie} required onChange={handleChange} />

                    <label htmlFor="idTipoDispositivo">Tipo de dispositivo</label>
                    <select
                        id="idTipoDispositivo"
                        name="idTipoDispositivo"
                        required
                        value={formData.idTipoDispositivo}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione</option>
                        {tiposDisp.map((cliente, index) => (
                            <option key={index} value={cliente.idTipo}>
                                {cliente.descripcion}
                            </option>
                        ))}
                    </select>
                    <br></br>
                    <label htmlFor="descripcionFalla">Descripción del problema</label>
                    <textarea
                        id="descripcionFalla"
                        name="descripcionFalla"
                        value={formData.descripcionFalla}
                        required
                        onChange={handleChange}
                    ></textarea>
                    <label htmlFor="descripcionVisual">Descripción visual</label>
                    <textarea
                        id="descripcionVisual"
                        name="descripcionVisual"
                        value={formData.descripcionVisual}
                        onChange={handleChange}
                    ></textarea>
                    <center>
                        <button type="submit" className="btn btn-primary btn-block">
                            Registrar
                        </button>
                    </center>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default AddDevice;
