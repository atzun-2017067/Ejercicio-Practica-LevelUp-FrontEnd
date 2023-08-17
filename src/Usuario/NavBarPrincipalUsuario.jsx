import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, NavDropdown } from 'react-bootstrap';
import "./navbar-principal-alumno.css"

export const NavBarPrincipalUsuario = () => {

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        window.location.href = "/";
    };

    const [showDropdown, setShowDropdown] = useState(false);

    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };
    return (
        <>
            <Navbar className="navbar bg-success navFooter2" expand="lg">
                <div className="container-fluid">
                    <div className='col-1'></div>
                    <Navbar.Brand >
                        <div className='col-5'>
                            <h3 style={{ color: "white" }}>Colegio Amanecer Dorado</h3>
                        </div>
                    </Navbar.Brand>

                    <div className='col-5'>
                        <Navbar.Toggle aria-controls="navbarTogglerDemo01" />
                        <Navbar.Collapse id="navbarTogglerDemo01">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className='nav-item'>
                                    <a className="nav-link text-light bg-green ov-btn-grow-ellipse btn-cerrar-sesion" onClick={cerrarSesion}>
                                        <i className="bi bi-box-arrow-in-right iniciarSesion">Cerrar Sesion</i>
                                    </a>
                                </li>
                            </ul>
                        </Navbar.Collapse>
                    </div>
                    <div className='col-1'></div>
                </div>
            </Navbar>
        </>
    );
}
