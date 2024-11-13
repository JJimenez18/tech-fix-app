import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {deviceResponseGET, IDetallaFalla, IDetalleAlta} from '../models/device';
import {validaToken} from '../services/security.services';
import AuthError from './AuthError';
import {HeaderPage} from './Headers';
import Footer from './Footer';
import {consultaDispositivos, registraFallasDispositivos} from '../services/device.services';
import '../css/detailsFound.css';

const DeviceDetails: React.FC = () => {
    const {idDevice} = useParams();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false); // Estado para manejar el error
    const [respDevices, setDevices] = useState<deviceResponseGET>({
        devices: [],
        fallas: [],
    });
    const {devices, fallas} = respDevices;
    const [isLoading, setIsLoading] = useState(true); // Estado de carga
    const [error, setError] = useState<string | null>(null);
    // const [imageBase64, setImageBase64] = useState<string | null>(null);

    const [detalles, setDetalles] = useState<IDetalleAlta[]>([]);
    const [descripcion, setDescripcion] = useState('');
    const [reparacionSugerida, setReparacionSugerida] = useState('');

    const token = localStorage.getItem('token');
    const idTipoUsuario = localStorage.getItem('idTipoUsuario');

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
                    const {statusCode, data} = await consultaDispositivos(token, idDevice);

                    if (statusCode === 200 && data) {
                        console.log(data);
                        setDevices(data);
                    } else {
                        setError('Sin resultados');
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

    /* const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result as string);
            };
            reader.readAsDataURL(file); // Convierte la imagen a base64
            console.log(imageBase64);
        }
    }; */

    const enviaData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevenir que la página se recargue
        const data: IDetallaFalla = {
            folio: idDevice || '',
            idTecnicoRegistra: '1',
            fallas: detalles,
        };
        const {statusCode, message} = await registraFallasDispositivos(token || '', data);
        if (statusCode !== 200) {
            setError(message);
        } else {
            setDetalles([]);
            const {statusCode, data} = await consultaDispositivos(token || '', idDevice);

            if (statusCode === 200 && data) {
                console.log(data);
                setDevices(data);
            } else {
                setError('Sin resultados');
            }
        }
    };

    const agregarDetalle = () => {
        if (descripcion && reparacionSugerida) {
            setDetalles([...detalles, {descripcion, reparacionSugerida}]);
            setDescripcion('');
            setReparacionSugerida('');
        }
    };

    const eliminarDetalle = (index: number) => {
        const nuevosDetalles = detalles.filter((_, i) => i !== index);
        setDetalles(nuevosDetalles);
    };

    return (
        <div>
            <HeaderPage />
            <br></br>
            <div className="add-body">
                <div className="form-container">
                    <h2>Detalle del dispositivo</h2>
                    <form>
                        <label htmlFor="idCliente">Cliente</label>
                        <input
                            type="text"
                            id="marca"
                            name="marca"
                            value={devices[0].nombreCliente}
                            required
                            // onChange={handleChange}
                            readOnly
                        />

                        <label htmlFor="marca">Marca</label>
                        <input
                            type="text"
                            id="marca"
                            name="marca"
                            value={devices[0].marca}
                            required
                            // onChange={handleChange}
                            readOnly
                        />

                        <label htmlFor="modelo">Modelo</label>
                        <input
                            type="text"
                            id="modelo"
                            name="modelo"
                            value={devices[0].modelo}
                            required
                            // onChange={handleChange}
                            readOnly
                        />

                        <label htmlFor="serie">Serie</label>

                        <input
                            type="text"
                            id="serie"
                            name="serie"
                            value={devices[0].serie}
                            required
                            // onChange={handleChange}
                            readOnly
                        />

                        <label htmlFor="idTipoDispositivo">Tipo de dispositivo</label>
                        <input
                            type="text"
                            id="idTipoDispositivo"
                            name="idTipoDispositivo"
                            value={devices[0].descTipoDispositivo}
                            required
                            // onChange={handleChange}
                            readOnly
                        />

                        <label htmlFor="descripcionFalla">Descripción del problema</label>
                        <textarea
                            id="descripcionFalla"
                            name="descripcionFalla"
                            value={devices[0].descripcionFalla}
                            required
                            // onChange={handleChange}
                            readOnly
                        />

                        <label htmlFor="descripcionVisual">Descripción visual</label>
                        <textarea
                            id="descripcionVisual"
                            name="descripcionVisual"
                            value={devices[0].descripcionVisual || ''}
                            required
                            // onChange={handleChange}
                            readOnly
                        />
                    </form>
                    {/* <center>
                    <h3>Carga tus evidencias</h3>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />

                    {imageBase64 && (
                        <div>
                            <h4>Vista previa:</h4>
                            <img src={imageBase64} alt="Cargada" style={{maxWidth: '25%'}} />
                        </div>
                    )}
                </center> */}
                    <h2>Diagnostico</h2>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th>Reparación Sugerida</th>
                                <th>Técnico</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fallas.length > 0 ? (
                                fallas.map((job) => (
                                    <tr key={job.idDispositivo}>
                                        <td>{job.descripcion}</td>
                                        <td> {job.reparacionSugerida} </td>
                                        <td> {job.idTecnicoRegistra} </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8}>No se encontraron resultados</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {['1', '5'].includes(idTipoUsuario ? `${idTipoUsuario}` : '') ? (
                        <>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div style={{maxWidth: '600px', margin: '0 auto'}}>
                                <h3>Reporte de diagnostico</h3>
                                <div style={{marginBottom: '10px'}}>
                                    <input
                                        type="text"
                                        placeholder="Descripción"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        style={{width: '95%', padding: '10px', marginBottom: '10px'}}
                                        required
                                    />
                                    <textarea
                                        placeholder="Reparación Sugerida"
                                        value={reparacionSugerida}
                                        onChange={(e) => setReparacionSugerida(e.target.value)}
                                        style={{width: '95%', padding: '10px', marginBottom: '10px'}}
                                        required
                                    />
                                    <button onClick={agregarDetalle} style={{width: '100%', padding: '10px'}}>
                                        Agregar Falla
                                    </button>
                                </div>

                                {detalles.length > 0 && (
                                    <div>
                                        <h4>Detalles de Fallas:</h4>
                                        <table style={{width: '100%', borderCollapse: 'collapse'}}>
                                            <thead>
                                                <tr>
                                                    <th style={{borderBottom: '1px solid #ddd', padding: '10px'}}>
                                                        Descripción
                                                    </th>
                                                    <th style={{borderBottom: '1px solid #ddd', padding: '10px'}}>
                                                        Reparación Sugerida
                                                    </th>
                                                    <th style={{borderBottom: '1px solid #ddd', padding: '10px'}}>
                                                        Acciones
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {detalles.map((detalle, index) => (
                                                    <tr key={index}>
                                                        <td style={{borderBottom: '1px solid #ddd', padding: '10px'}}>
                                                            {detalle.descripcion}
                                                        </td>
                                                        <td style={{borderBottom: '1px solid #ddd', padding: '10px'}}>
                                                            {detalle.reparacionSugerida}
                                                        </td>
                                                        <td style={{borderBottom: '1px solid #ddd', padding: '10px'}}>
                                                            <button
                                                                onClick={() => eliminarDetalle(index)}
                                                                style={{padding: '5px 10px'}}
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                            <br></br>
                            {detalles.length > 0 ? (
                                <>
                                    <form onSubmit={enviaData}>
                                        <center>
                                            <button type="submit" className="btn btn-primary btn-block">
                                                Registrar diagnostico
                                            </button>
                                        </center>
                                    </form>
                                </>
                            ) : null}
                        </>
                    ) : null}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DeviceDetails;
