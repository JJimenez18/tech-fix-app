import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/userProfile.css'

export const HeaderPage: React.FC = () => {
    const navigate = useNavigate();

    const redirectToClients = () => {
        return navigate('/clients');
    };

    const redirectToHome = () => {
        return navigate('/home');
    };

    const redirectToAddDevice = () => {
        return navigate('/addDevice');
    };
    const [menuOpen, setMenuOpen] = useState(false);

    // Función para alternar el menú
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Función para cerrar sesión
    const handleLogout = () => {
        // Aquí podrías agregar la lógica para cerrar sesión
        return navigate('/');
    };

    // Función para editar perfil
    const handleEditProfile = () => {
        // Aquí podrías agregar la lógica para redirigir a la edición de perfil
        console.log('Editar perfil');
    };

    return (
        /**
         * Top Navigation Menu
         */
        <header className="top-nav">
            <div className="logo">TechFix Tracker Seguimiento de Reparaciones</div>
            <nav>
                <ul className="menu">
                    <li>
                        <a href="#data-catalog" onClick={redirectToHome}>
                            Principal
                        </a>
                    </li>
                    <li>
                        <a href="#data-catalog" onClick={redirectToClients}>
                            Clientes
                        </a>
                    </li>
                    <li>
                        <a href="#jobs" onClick={redirectToAddDevice}>
                            Orden de trabajo
                        </a>
                    </li>
                    <li>
                        <a href="#workspace">Workspace</a>
                    </li>
                    <li>
                        <a href="#api">API</a>
                    </li>
                    <li>
                        <a href="#model">Model</a>
                    </li>
                    <li>
                        <a href="#docs">Docs</a>
                    </li>
                </ul>
            </nav>
            <div className="user-profile">
                <span className="user-icon" onClick={toggleMenu}>
                    👤
                </span>

                {menuOpen && (
                    <div className="dropdown-menu">
                        <button onClick={handleEditProfile}>Editar Perfil</button>
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                )}
            </div>
        </header>
    );
};
