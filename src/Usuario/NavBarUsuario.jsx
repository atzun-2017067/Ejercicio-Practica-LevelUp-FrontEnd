import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import './navbar-alumno.css'

export const NavBarUsuario = () => {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        window.location.href = "/";
    };

    const regresarAVistaUsuario = () => {
        navigate("/vistaUsuario"); // Redirigir a /vistaProfesor usando navigate
    };

    return (
        <>
            <nav className="navbar bg-light fixed-top">
                <div className="container-fluid">
                    <button className="btn btn-info btn-regresar" onClick={regresarAVistaUsuario}>
                        <i className="fa-sharp fa-solid fa-arrow-left"></i>
                        {" "}
                        Regresar
                    </button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end navbar-titulo" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-body">
                            <center><p><strong>Rutas rapidas</strong></p></center>
                            <button className="btn btn-link nav-link" onClick={cerrarSesion}>
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}