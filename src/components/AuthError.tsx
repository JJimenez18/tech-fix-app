import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/authError.css'

const AuthError: React.FC = () => {
    const navigate = useNavigate();

    // Redirige al login después de 3 segundos automáticamente
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer); // Limpiar el timer al desmontar el componente
    }, [navigate]);

    return (
        <div className="auth-error-container">
            <h2 className="auth-error-title">Error de Autenticación</h2>
            <p className="auth-error-message">
                No estás autenticado. Serás redirigido al login en unos segundos...
            </p>
            <button className="auth-error-button" onClick={() => navigate('/')}>
                Ir al login ahora
            </button>
        </div>
    );
};

export default AuthError;
