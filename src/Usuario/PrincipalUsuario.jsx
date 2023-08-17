import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./principal-alumno.css"
import { NavBarPrincipalUsuario } from "./NavBarPrincipalUsuario"

export const PrincipalUsuario = () => {
  return (
    <>
      <div className="colegio-amanecer-dorado">
        <NavBarPrincipalUsuario />
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
                      Visualiza tu perfil y tu fecha de declamacion.
                    </p>
                    <a href="/miPerfilUsuario" className="card-link">
                      Ver Mi Perfil
                    </a>
                  </div>
                </div>
                <div className="col-1"></div>
              </div>              

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
