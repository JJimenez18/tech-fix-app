import React, {useState} from 'react';
import '../css/addDevice.css';
import {HeaderPage} from './Headers';

const AddDevice: React.FC = () => {
    const [formData, setFormData] = useState({
        marca: 'Lenovo',
        modelo: 'Legion Y540',
        año: '2019',
        sistemaOperativo: 'Windows 10',
        descripcion: 'Problema con la pantalla',
        nombreCliente: 'Pedro Alvarez',
        correo: 'pedro.alvarez@gmail.com',
        telefono: '+52',
        celular: '55 1234 5678',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    return (
        <>
            <HeaderPage />
            <br></br>
            <div className="form-container">
                <h2>Nuevo Equipo</h2>
                <form>
                    <label htmlFor="marca">Marca</label>
                    <input type="text" id="marca" name="marca" value={formData.marca} onChange={handleChange} />

                    <label htmlFor="modelo">Modelo</label>
                    <input type="text" id="modelo" name="modelo" value={formData.modelo} onChange={handleChange} />

                    <label htmlFor="año">Año</label>
                    <input type="text" id="año" name="año" value={formData.año} onChange={handleChange} />

                    <label htmlFor="sistemaOperativo">Sistema Operativo</label>
                    <input
                        type="text"
                        id="sistemaOperativo"
                        name="sistemaOperativo"
                        value={formData.sistemaOperativo}
                        onChange={handleChange}
                    />

                    <label htmlFor="descripcion">Descripción del problema</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                    ></textarea>

                    <h3>Cliente</h3>

                    <label htmlFor="nombreCliente">Nombre</label>
                    <input
                        type="text"
                        id="nombreCliente"
                        name="nombreCliente"
                        value={formData.nombreCliente}
                        onChange={handleChange}
                    />

                    <label htmlFor="correo">Correo Electrónico</label>
                    <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} />

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                type="text"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="celular">Celular</label>
                            <input
                                type="text"
                                id="celular"
                                name="celular"
                                value={formData.celular}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddDevice;
