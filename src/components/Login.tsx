import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/formStyles.css';

interface LoginProps {
    onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onLogin(email, password);
    };

    /* const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }; */

    const redirectToPage = () => {
        return navigate('/register');
    };

    const redirectToHomePage = () => {
        return navigate('/home');
    };

    return (
        <div
            className="container d-flex align-items-center justify-content-center bg-light text-dark"
            style={{minHeight: '80vh'}}
        >
            <div className="row w-100 justify-content-center">
                <div className="col-md-5">
                    <div className='card bg-white'>
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <img
                                    src="https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/box-arrow-in-right.svg"
                                    alt="logo"
                                    width="72"
                                />
                            </div>
                            <h3 className="text-center mb-3">Tech-Fix</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Correo electrónico</label>
                                    <br></br>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="ejemplo@ejemplo.com"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
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
                                        placeholder="constraseña1234"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required
                                    />
                                </div>
                                <br></br>
                                <center>
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Iniciar sesión
                                    </button>
                                </center>
                            </form>
                            <div className="text-center mt-3">
                              <br></br>
                                <a href="#">¿Olvidaste tu constraseña?</a>
                            </div>
                            <div className="text-center mt-2">
                                <p>
                                    No tienes cuenta{' '}
                                    <br></br>
                                    <button className="btn btn-link" onClick={redirectToPage}>
                                        Registrate
                                    </button>
                                </p>
                            </div>
                            <div className="text-center mt-2">
                                <p>
                                    <button className="btn btn-link" onClick={redirectToHomePage}>
                                        Home
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

export default Login;
