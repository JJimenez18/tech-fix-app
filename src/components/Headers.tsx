import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/userProfile.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const HeaderPage: React.FC = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const redirectTo = (url: string) => {
        navigate(url);
    };

    // Función para alternar el menú
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Función para cerrar sesión
    const handleLogout = () => {
        // Aquí podrías agregar la lógica para cerrar sesión
        localStorage.removeItem('token');
        return navigate('/');
    };

    return (
        /**
         * Top Navigation Menu
         */
        <header className="top-nav">
            <div className="logo">TechFix Tracker Gestiona tus Reparaciones</div>
            <nav>
                <ul className="menu">
                    <li>
                        <a onClick={() => redirectTo('/home')}>Principal</a>
                    </li>
                    <li>
                        <a onClick={() => redirectTo('/clients')}>Clientes</a>
                    </li>
                    <li>
                        <a onClick={() => redirectTo('/addDevice')}>Orden de trabajo</a>
                    </li>
                    <li>
                        <a>Contáctanos</a>
                    </li>
                </ul>
            </nav>
            <div className="user-profile">
                <span className="user-icon" onClick={toggleMenu}>
                    <i className="fas fa-user"></i> {/* Ícono de usuario usando Font Awesome */}
                </span>

                {menuOpen && (
                    <div className="dropdown-menu">
                        <button onClick={() => redirectTo('/editProfile')}>Editar Perfil</button>
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                )}
            </div>
        </header>
    );
};
