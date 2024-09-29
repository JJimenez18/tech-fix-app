import React from 'react';
import '../css/footer.css'; // Asegúrate de que este archivo ya tenga estilos consistentes

const Footer: React.FC = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} TechFix Tracker. Todos los derechos reservados.</p>
                {/* <ul className="footer-links">
                    <li>
                        <a href="/privacy">Política de Privacidad</a>
                    </li>
                    <li>
                        <a href="/terms">Términos y Condiciones</a>
                    </li>
                    <li>
                        <a href="/contact">Contáctanos</a>
                    </li>
                </ul> */}
            </div>
        </footer>
    );
};

export default Footer;
