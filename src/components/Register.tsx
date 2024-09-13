import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/formStyles.css';

export const Register: React.FC  = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        // Aquí puedes manejar la lógica de registro, como enviar los datos al servidor.
        console.log('User registered with:', {firstName, lastName, password});
    };
    const navigate = useNavigate();

    const redirectToLogin = () => {
        navigate('/');
    };

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{minHeight: '80vh'}}>
            <div className="row w-100 justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Crea tu cuenta</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="userName">Nombre de usuario</label>
                                    <br></br>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="userName"
                                        placeholder="Usuario"
                                        value={userName}
                                        onChange={(event) => setUserName(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="firstName">Nombre(s)</label>
                                    <br></br>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        placeholder="Escribe tu nombre"
                                        value={firstName}
                                        onChange={(event) => setFirstName(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="lastName">Apellidos</label>
                                    <br></br>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        placeholder="Escribe tus apellidos"
                                        value={lastName}
                                        onChange={(event) => setLastName(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">Contraseña</label>
                                    <br></br>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="contraseña1234"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="confirmPassword">Confirma tu contraseña</label>
                                    <br></br>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        placeholder="Confirma tu contraseña"
                                        value={confirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                        required
                                    />
                                </div>
                                <br></br>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Registrate
                                </button>
                            </form>
                            <div className="text-center mt-4">
                                <p>
                                    Si, ya tienes cuenta{' '}
                                    <button className="btn btn-link" onClick={redirectToLogin}>
                                        Inicia sesión
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
