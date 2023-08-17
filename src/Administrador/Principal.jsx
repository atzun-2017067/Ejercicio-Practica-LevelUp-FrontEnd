import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./principal.css"
import { NavBarPrincipalAdmin } from "./NavBarPrincipalAdmin"

export const Principal = () => {
  return (
    <>
      <div className="colegio-amanecer-dorado">
        <NavBarPrincipalAdmin />
        <div className="container-fluid">
          <div className="row">

            <div className="col-1"></div>
            <div className="col-10">
              <div className="row mt-3 mb-4">
                <div className="col-1"></div>
                <div className="col-10 d-flex justify-content-center">
                  <div className="card" style={{ width: "60%" }}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="Icono Perfil"
                      className="card-icon"
                    />
                    <h2>Mi Perfil</h2>
                    <p>
                      Visualiza tu informacion personal
                    </p>
                    <a href="/miPerfil" className="card-link">
                      Ver Mi Perfil
                    </a>
                  </div>
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row mt-3 mb-4">
                <div className="col-1"></div>
                <div className="col-10 d-flex justify-content-center">
                  <div className="card" style={{ width: "60%" }}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/6073/6073873.png"
                      alt="Icono Perfil"
                      className="card-icon"
                    />
                    <h2>Usuarios</h2>
                    <p>
                      Visualiza los usuarios
                    </p>
                    <a href="/listaUsuarios" className="card-link">
                      Ver Usuarios
                    </a>
                  </div>
                </div>
                <div className="col-1"></div>
              </div>
              <div className="col-1"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
