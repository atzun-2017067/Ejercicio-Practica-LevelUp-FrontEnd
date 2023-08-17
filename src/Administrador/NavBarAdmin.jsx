import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import './navbar-admin.css'

export const NavBarAdmin = () => {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        window.location.href = "/";
    };

    const regresarAVistaAdmin = () => {
        navigate("/vistaAdmin"); // Redirigir a /vistaAdmin usando navigate
    };

    return (
        <>
            <nav className="navbar bg-light fixed-top">
                <div className="container-fluid">
                    <button className="btn btn-info btn-regresar" onClick={regresarAVistaAdmin}>
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
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <hr />
                                <li className="nav-item">
                                    <a className="nav-link" href="/listaUsuarios">Usuarios</a>
                                </li>
                                <hr />
                            </ul>
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